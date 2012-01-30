package org.esco.grouperui.web.controllers.stemmodifications;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.faces.context.FacesContext;

import org.apache.commons.lang.StringUtils;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOAttributeException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Attribute;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.DataTypeEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.summary.TypeDataSmmary;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.StemController;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class StemModificationsAttributesController. <br/>
 * Requirement(s): <br/>
 * [RECIA-ESCO-L1-004]
 * 
 * @author Sopra Group
 */
public class StemModificationsAttributesController extends AbstractControllerAware {

    /** the serial uid. */
    private static final long                serialVersionUID              = -8590403241391323372L;

    /** Logger. */
    private static final IESCOLogger         LOGGER                        = ESCOLoggerFactory
                                                                                   .getLogger(StemModificationsAttributesController.class);

    /** The key to retrieve the regexp of the parent stem name. */
    private static final String              KEY_PARENT                    = "parent";

    /** The group to retrieve the regexp of the parent stem name. */
    private static final String              GROUP_STEM_PARENT_NAME_REGEXP = "org.esco.grouperui.stem.parent.name.regexp";

    /** The current list of stem (attributes) of the said stem. */
    private final List < String >            stemAttributes;

    /** The updated stem attributes. */
    private final Map < String, String >     updatedStemAttributes;

    /** The attributes of the stem that raised an error. */
    private final List < String >            errorAttributes;

    /** The xmlProducer wrapper. */
    private IWrapper < XmlProducer, String > xmlProducerWrapper;

    /** Wrapper for generate JSON from object. */
    private IWrapper < XmlProducer, String > jsonWrapper;

    /**
     * Default constructor.
     */
    public StemModificationsAttributesController() {
        this.stemAttributes = new ArrayList < String >();
        this.updatedStemAttributes = new HashMap < String, String >();
        this.errorAttributes = new ArrayList < String >();
    }

    /**
     * get TabsController for this tab and cast it in appropriate class.
     * 
     * @return GroupController.
     */
    public StemController getStemController() {
        return (StemController) super.getTabsController();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear() {
        this.stemAttributes.clear();
        this.updatedStemAttributes.clear();
        this.errorAttributes.clear();
        super.clear();
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        List < Resume > listResume = new ArrayList < Resume >();
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();

        List < String > cells = null;
        Attribute attribute = null;

        colNames.add(new ColInfo("STEM.ATTRIBUTE.NAME"));
        colNames.add(new ColInfo("STEM.ATTRIBUTE.VALUE", Boolean.FALSE, DataTypeEnum.INPUT));

        resume.setColInfos(colNames);

        // Iterate on the updated stems.
        if (!this.updatedStemAttributes.isEmpty()) {
            Iterator < Attribute > itStemAttributes = this.getStemAttributes().iterator();
            while (itStemAttributes.hasNext()) {
                cells = new ArrayList < String >();

                // Attribute to display
                attribute = itStemAttributes.next();

                if (null != this.updatedStemAttributes.get(attribute.getKey())) {
                    // Key
                    indexs.add(attribute.getKey());
                    cells.add(this.getString(attribute.getKey() + ".label"));

                    // Value of the attribute
                    cells.add(attribute.getValues());

                    // If an error occurred while saving the stem
                    if (this.errorAttributes.contains(attribute.getKey())) {
                        typeData.add(TypeDataSmmary.ERROR.name());
                    } else
                        // If the stem has been saved successfully
                        if (this.getStemController().getStem().isSaved()) {
                            typeData.add(TypeDataSmmary.SAVED.name());
                        } else
                            // If the stem has to be created
                            if (this.getStemController().getIsCreation()) {
                                typeData.add(TypeDataSmmary.ADDED.name());
                            } else {
                                // If the stem has to be updated
                                typeData.add(TypeDataSmmary.UPDATED.name());
                            }

                    datas.add(cells);
                }
            }
        }

        resume.setTitle("STEM.ATTRIBUTE.OF.STEM");
        resume.setIndex(indexs);
        resume.setControllerClass(StemModificationsAttributesController.class.getName());
        resume.setData(datas);
        resume.setTypeData(typeData);
        resume.setSaved(typeData.contains(TypeDataSmmary.SAVED.name()) && this.errorData.size() == 0);

        listResume.add(resume);

        this.errorClassesNames.clear();
        this.errorData.clear();
        return listResume;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isModified() {
        return !this.updatedStemAttributes.isEmpty();
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {

        Person userConnected = null;

        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
        } catch (ESCOSubjectNotUniqueException e) {
        }

        String stemID = null;
        Boolean status = null;

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorAttributes.clear();

        // If the stem has already been saved successfully,
        // there is nothing to do

        if (!this.updatedStemAttributes.isEmpty()) {
            // We need to apply modifications on the original stem

            try {

                Stem parentStem = this.getStemController().getGrouperService().findStemByUuid(userConnected,
                        this.getStemController().getParentStem().getUuid());

                // If the stem is created
                if (this.getStemController().getIsCreation()) {

                    Stem updatedStem = new Stem();
                    for (Entry < String, String > mapField : this.updatedStemAttributes.entrySet()) {
                        // recovery of the value of the map of modifications
                        String value = this.updatedStemAttributes.get(mapField.getKey());
                        // if the value is null, recovery original value
                        if (null != value) {
                            if (mapField.getKey().equals(ESCOConstantes.DISPLAY_EXTENSION)) {
                                StemModificationsAttributesController.LOGGER.debug("Add field for value : "
                                        + mapField.getKey() + " -> " + value);
                                if (StringUtils.isEmpty(parentStem.getDisplayName())) {
                                    updatedStem.addMappingFieldCol(ESCOConstantes.DISPLAY_NAME, value);
                                } else {
                                    updatedStem.addMappingFieldCol(ESCOConstantes.DISPLAY_NAME, parentStem
                                            .getDisplayName()
                                            + ESCOConstantes.STEM_NAME_SEPARATOR + value);
                                }
                                updatedStem.addMappingFieldCol(mapField.getKey(), value);
                            } else
                                if (mapField.getKey().equals(ESCOConstantes.EXTENSION)) {
                                    if (StringUtils.isEmpty(parentStem.getName())) {
                                        updatedStem.addMappingFieldCol(ESCOConstantes.NAME, value);
                                    } else {
                                        updatedStem.addMappingFieldCol(ESCOConstantes.NAME, parentStem.getName()
                                                + ESCOConstantes.STEM_NAME_SEPARATOR + value);
                                    }
                                    updatedStem.addMappingFieldCol(mapField.getKey(), value);
                                } else {
                                    updatedStem.addMappingFieldCol(mapField.getKey(), value);
                                }
                        }
                    }

                    // Call the service that will create the stem
                    stemID = this.getStemController().getGrouperService().stemCreate(userConnected, updatedStem);
                    // Update the stem with his new ID
                    this.getStemController().getStem().setUuid(stemID);
                } else {
                    Stem updatedStem = this.getStemController().getGrouperService().findStemByUuid(userConnected,
                            this.getStemController().getStem().getUuid());

                    for (Entry < String, String > mapField : updatedStem.getMappingFieldCol().entrySet()) {
                        // recovery of the value of the map of modifications
                        String value = this.updatedStemAttributes.get(mapField.getKey());
                        // if the value is null, recovery original value
                        if (null != value) {
                            StemModificationsAttributesController.LOGGER.debug("Add field for value : "
                                    + mapField.getKey() + " -> " + value);

                            if (mapField.getKey().equals(ESCOConstantes.DISPLAY_EXTENSION)) {
                                if (StringUtils.isEmpty(parentStem.getDisplayName())) {
                                    updatedStem.addMappingFieldCol(ESCOConstantes.DISPLAY_NAME, value);
                                } else {
                                    updatedStem.addMappingFieldCol(ESCOConstantes.DISPLAY_NAME, parentStem
                                            .getDisplayName()
                                            + ESCOConstantes.STEM_NAME_SEPARATOR + value);
                                }
                                updatedStem.addMappingFieldCol(mapField.getKey(), value);
                            } else
                                if (mapField.getKey().equals(ESCOConstantes.EXTENSION)) {
                                    if (StringUtils.isEmpty(parentStem.getName())) {
                                        updatedStem.addMappingFieldCol(ESCOConstantes.NAME, value);
                                    } else {
                                        updatedStem.addMappingFieldCol(ESCOConstantes.NAME, parentStem.getName()
                                                + ESCOConstantes.STEM_NAME_SEPARATOR + value);
                                    }
                                    updatedStem.addMappingFieldCol(mapField.getKey(), value);
                                } else {
                                    updatedStem.addMappingFieldCol(mapField.getKey(), value);
                                }
                        }
                    }
                    // Call the service that will modify the stem
                    this.getStemController().getGrouperService().stemUpdate(userConnected, updatedStem);
                }
            } catch (ESCOBusinessException ebe) {
                this.handleException(ebe, "");
            } finally {
                // If the stem was saved successfully
                if (this.errorClassesNames.isEmpty()) {
                    this.getStemController().getStem().setSaved(Boolean.TRUE);
                }
            }
        }

        // Errors ?
        if (this.errorClassesNames.isEmpty()) {
            this.getStemController().setIsCreation(false);
            status = Boolean.TRUE;
        } else {
            status = Boolean.FALSE;
        }

        return new Status(status);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void doSpecificException(final ESCOBusinessException theEbe, final String theSubjectId) {
        if (theEbe instanceof ESCOAttributeException) {
            this.errorAttributes.addAll(((ESCOAttributeException) theEbe).getAttributes());
        }
    }

    /**
     * Allow to retrieve attributes information from a stem.
     * 
     * @return the list of attributes.
     */
    public List < Attribute > getStemAttributes() {
        List < Attribute > attributes = new ArrayList < Attribute >();
        String value = null;

        // Check if the current stem is null, ie: no stem found with uuid from
        // parameter
        if (this.getStemController().getStem() != null) {
            Set < String > extension = null;

            Map < String, String > mappingFieldCol = this.getStemController().getStem().getMappingFieldCol();
            for (Entry < String, String > mapField : mappingFieldCol.entrySet()) {
                // recovery of the value of the map of modifications
                value = this.updatedStemAttributes.get(mapField.getKey());
                // if the value is null, recovery original value
                if (null == value) {
                    value = mapField.getValue();
                }
                StemModificationsAttributesController.LOGGER.debug("Add field for value : " + mapField.getKey()
                        + " -> " + value);
                extension = new HashSet < String >();
                extension.add(value);
                attributes.add(new Attribute(mapField.getKey(), extension));
            }
        }

        return attributes;
    }

    /**
     * Allow to retrieve attributes information from a stem.
     * 
     * @return the list of attributes.
     */
    public String getOriginalStemAttributes() {
        Map < String, String > attributes = new HashMap < String, String >();
        if (this.getStemController().getStem() != null) {
            Map < String, String > mappingFieldCol = this.getStemController().getStem().getMappingFieldCol();
            for (Entry < String, String > mapField : mappingFieldCol.entrySet()) {
                attributes.put(mapField.getKey(), mapField.getValue());
            }
        }
        XmlProducer producer = new XmlProducer();
        producer.setTarget(attributes);
        return this.jsonWrapper.wrap(producer);
    }

    /**
     * Allow to retrieve the group of inputs (modification or creation).
     * 
     * @return the group.
     */
    public String getGroupInput() {
        String result = null;
        boolean creation = this.getStemController().getIsCreation();

        if (creation) {
            result = "creation";
        } else {
            result = "modification";
        }

        return result;
    }

    /**
     * Allow to update stem attributes (method called on change).
     * 
     * @return .
     */
    public String updateAttributesOnChange() {

        String idInput = this.getParam(ESCOConstantes.ID_INPUT);
        String value = this.getParam(ESCOConstantes.VALUE);

        String idStem = this.getStemController().getStem().getUuid();
        Map < String, String > mappingFieldCol = null;

        // Only if the stem uuid is posted.
        if (idStem != null) {
            // in modification
            mappingFieldCol = this.getStemController().getStem().getMappingFieldCol();
        } else {
            // in creation fields are empty
        }

        if (null != idStem) {
            if (!value.equals(mappingFieldCol.get(idInput))) {
                this.updatedStemAttributes.put(idInput, value);
            } else {
                this.updatedStemAttributes.remove(idInput);
            }
        } else {
            this.updatedStemAttributes.put(idInput, value);
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Allow to know if the name of the parent stem matches the regexp
     * parameterized.
     * 
     * @return true if the name of the parent stem matches the regexp
     *         parameterized else return false
     */
    public boolean getHasRightModificationExtension() {
        boolean result = false;
        String parentStemName = null;
        boolean creation = this.getStemController().getIsCreation();

        // if modification
        if (!creation) {
            // Recovery of the regexp
            FacesContext context = FacesContext.getCurrentInstance();
            IParameterService parameterService = (IParameterService) context.getApplication().createValueBinding(
                    ESCOConstantes.PARAMETER_SERVICE).getValue(context);

            List < Parameter > listParameters = parameterService.findParametersById(
                    StemModificationsAttributesController.GROUP_STEM_PARENT_NAME_REGEXP,
                    StemModificationsAttributesController.KEY_PARENT);
            String regexp = null;

            // the list should contain one element
            if (null != listParameters && listParameters.size() == 1) {
                regexp = listParameters.get(0).getValue();

                // Recovery of the parent stem name
                String name = this.getStemController().getStem().getName();

                if (null != name) {
                    String[] tabParentStemName = name.split(ESCOConstantes.STEM_NAME_SEPARATOR);

                    if (null != tabParentStemName) {
                        switch (tabParentStemName.length) {
                            case 0:
                                // error
                                StemModificationsAttributesController.LOGGER.error("The stem name is incorrect.");
                                parentStemName = null;
                                break;
                            case 1:
                                // no parent
                                parentStemName = "";
                                break;

                            default:
                                parentStemName = name.substring(0, name.length()
                                        - (tabParentStemName[tabParentStemName.length - 1].length() + 1));
                                break;
                        }

                        // if the name matches the regexp parameterized
                        if (null != parentStemName && parentStemName.matches(regexp)) {
                            result = true;
                        } else {
                            result = false;
                        }
                    } else {
                        // error
                        StemModificationsAttributesController.LOGGER.error("The stem name is incorrect.");
                        result = false;
                    }
                } else {
                    // error
                    StemModificationsAttributesController.LOGGER.error("Recovery stem name can not.");
                    result = false;
                }
            } else {
                // error
                StemModificationsAttributesController.LOGGER.error("Recovery of the regexp can not.");
                result = false;
            }
        } else {
            // else in creation, extension modification is allowed
            result = true;
        }

        return result;
    }

    /**
     * Setter for xmlProducerWrapper.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set.
     */
    @Override
    public final void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
    }

    /**
     * Getter for errorClassesNames.
     * 
     * @return the errorClassesNames to get.
     */
    public final List < String > getErrorClassesNames() {
        List < String > errors = new ArrayList < String >();
        String errorName = null;

        // Iterate on the list to drop the errors that appear more than once.
        Iterator < String > itErrors = this.errorClassesNames.iterator();
        while (itErrors.hasNext()) {
            errorName = itErrors.next();
            if (!errors.contains(errorName)) {
                errors.add(errorName);
            }
        }
        return errors;
    }

    /**
     * {@inheritDoc}
     */
    public void discardModification(final String index) {
        // Look for the attribute in the update list
        if (null != this.updatedStemAttributes.get(index)) {
            // Discard modification on the attribute
            this.updatedStemAttributes.remove(index);
            // Remove the attribute from the error list
            if (this.errorAttributes.contains(index)) {
                this.errorAttributes.remove(index);
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String index, final String newValue) {

        int iteration = 0;
        int idAttribute = Integer.parseInt(index);
        Attribute attribute = null;

        // Iterate on the updated stems.
        Iterator < Attribute > itStemAttributes = this.getStemAttributes().iterator();
        while (itStemAttributes.hasNext()) {
            // Attribute
            attribute = itStemAttributes.next();
            if (null != this.updatedStemAttributes.get(attribute.getKey())) {
                // Check the index of the attribute
                if (idAttribute == iteration) {
                    // Replace the value of the attribute
                    this.updatedStemAttributes.put(attribute.getKey(), newValue);
                    // Remove the attribute from the error list
                    if (this.errorAttributes.contains(attribute.getKey())) {
                        this.errorAttributes.remove(attribute.getKey());
                    }
                    break;
                }
                iteration++;
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    public String getAttributeKey(final String index) {

        int iteration = 0;
        int idAttribute = Integer.parseInt(index);
        Attribute attribute = null;
        String attributeKey = null;

        // Iterate on the updated stems.
        Iterator < Attribute > itStemAttributes = this.getStemAttributes().iterator();
        while (itStemAttributes.hasNext()) {
            // Attribute
            attribute = itStemAttributes.next();
            if (null != this.updatedStemAttributes.get(attribute.getKey())) {
                // Check the index of the attribute
                if (idAttribute == iteration) {
                    // Get the attribute key
                    attributeKey = attribute.getKey();
                    break;
                }
                iteration++;
            }
        }

        return attributeKey;
    }

    /**
     * Setter of the jsonWrapper property.
     * 
     * @param theJsonWrapper
     *            the jsonWrapper to set
     */
    public void setJsonWrapper(final IWrapper < XmlProducer, String > theJsonWrapper) {
        this.jsonWrapper = theJsonWrapper;
    }

}
