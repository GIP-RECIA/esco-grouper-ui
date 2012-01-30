package org.esco.grouperui.web.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.faces.context.FacesContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.StemPrivilegeEnum;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOStemNotDeleteException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOStemNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Attribute;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.XMLResultString;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.plugins.AbstractTabsControllerAware;
import org.esco.grouperui.web.plugins.ITabController;
import org.esco.grouperui.web.utils.FaceContextUtils;
import org.esco.grouperui.web.utils.I18nExceptionAdapter;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class StemController. <br/>
 * Requirement(s): <br/>
 * [RECIA-ESCO-L1-003] <br/>
 * [RECIA-ESCO-L1-004] <br/>
 * [RECIA-ESCO-L1-005]
 * 
 * @author achesneau
 */
public class StemController extends AbstractTabsControllerAware {

    /** The default serial id generated. */
    private static final long                serialVersionUID          = 7264200314055495520L;

    /** Logger. */
    private static final IESCOLogger         LOGGER                    = ESCOLoggerFactory
                                                                               .getLogger(StemController.class);
    /**
     * the id of spring declaration.
     */
    private static final String              TABS_CONTROLLER_ID        = "stemController";

    /** Get Parameter : stemUuid. */
    private static final String              PARAM_STEM_UUID           = "stemUuid";

    /** Get Parameter : stemName. */
    private static final String              PARAM_STEM_NAME           = "stemName";

    /** Get Parameter : targetStemName. */
    private static final String              PARAM_TARGET_STEM_NAME    = "targetStemName";

    /** Get Parameter : initialization. */
    private static final String              PARAM_STEM_INIT           = "init";

    /**
     * The default message exception.
     */
    private static final String              DEFAULT_MESSAGE_EXCEPTION = "DEFAULT_MESSAGE_EXCEPTION";

    /** The GrouperService that provide services from grouper. */
    private IGrouperService                  grouperService;

    /** */
    private IParameterService                parameterService;

    /** The parent stem. */
    protected Stem                           parentStem;

    /** The stem. */
    private Stem                             stem;

    /** The xmlProducer wrapper. */
    private IWrapper < XmlProducer, String > xmlProducerWrapper;

    /** The list of privilege the use have. */
    private List < Privilege >               privilegesOnCurrentStem;

    /** Boolean to check if the save have been done. */
    private boolean                          saveCall                  = Boolean.FALSE;

    /** Boolean to check if we are in creation or in modification. */
    private Boolean                          creation                  = Boolean.FALSE;

    /** The list of errors the happened while saving the modifications. */
    private List < String >                  errors                    = new ArrayList < String >();

    /**
     * Default constructor.
     */
    public StemController() {
    }

    /**
     * Move the stem to an other stem.
     * 
     * @return the result of the move operation.
     * @throws ESCOSubjectNotUniqueException
     *             if the subject is not unique.
     * @throws ESCOSubjectNotFoundException
     *             if the subject is not found.
     * @throws ESCOStemNotUniqueException
     *             if the stem is not unique.
     * @throws ESCOStemNotFoundException
     *             if the stem is not found.
     */
    public String moveStem() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException,
            ESCOStemNotFoundException, ESCOStemNotUniqueException {

        String theStemId = this.getParam(StemController.PARAM_STEM_UUID);
        String theStemName = this.getParam(StemController.PARAM_STEM_NAME);
        String theTargetStemName = this.getParam(StemController.PARAM_TARGET_STEM_NAME);

        Validate.notNull(theStemId);
        Validate.notNull(theStemName);
        Validate.notNull(theTargetStemName);

        String theError = "";
        IGrouperService grouperService = this.getGrouperService();
        Person userConnected = PersonController.getConnectedPerson();

        Stem targetStem = new Stem();
        targetStem.setName(theTargetStemName);

        try {
            grouperService.moveStem(userConnected, theStemName, targetStem);
        } catch (ESCOBusinessException e) {
            StemController.LOGGER.error(e);
            theError = e.getClass().getSimpleName();
        }

        XmlProducer producer = new XmlProducer();
        if ("".equals(theError)) {
            Stem stem = this.grouperService.findStemByUuid(userConnected, theStemId);
            producer.setTarget(new org.esco.grouperui.web.beans.Error(true, stem.getDisplayName()));
        } else {
            theError = I18nExceptionAdapter.getExceptionString(this.getI18nService(), theError,
                    StemController.DEFAULT_MESSAGE_EXCEPTION);
            producer.setTarget(new org.esco.grouperui.web.beans.Error(false, theError));
        }
        producer.setTypesOfTarget(org.esco.grouperui.web.beans.Error.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Delete the stem.
     * 
     * @return the result of the delete operation
     * @throws ESCOSubjectNotFoundException
     *             if the person looses the connection.
     * @throws ESCOSubjectNotUniqueException
     *             if the person looses the connection.
     */
    public String deleteStem() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        String theStemId = this.stem.getUuid();
        Validate.notNull(theStemId);

        String theError = "";
        IGrouperService grouperService = this.getGrouperService();
        Person userConnected = PersonController.getConnectedPerson();

        try {
            grouperService.stemDelete(userConnected, theStemId);
        } catch (ESCOInsufficientPrivilegesException e) {
            StemController.LOGGER.error(e);
            theError = e.getClass().getSimpleName();
        } catch (ESCOStemNotFoundException e) {
            StemController.LOGGER.error(e);
            theError = e.getClass().getSimpleName();
        } catch (ESCOStemNotDeleteException e) {
            StemController.LOGGER.error(e);
            theError = e.getClass().getSimpleName();
        }
        XmlProducer producer = new XmlProducer();
        if ("".equals(theError)) {
            producer.setTarget(new org.esco.grouperui.web.beans.Error(true, ""));
        } else {
            // Get the internationalized message and if not exist the default
            // value.
            theError = I18nExceptionAdapter.getExceptionString(this.getI18nService(), theError,
                    StemController.DEFAULT_MESSAGE_EXCEPTION);
            producer.setTarget(new org.esco.grouperui.web.beans.Error(false, theError));
        }
        this.clearModification();

        producer.setTypesOfTarget(org.esco.grouperui.web.beans.Error.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getTabsControllerId() {
        return StemController.TABS_CONTROLLER_ID;
    }

    /**
     * {@inheritDoc}
     */
    public void doAddVariableToContext(final FacesContext theFacesContext) {
        FaceContextUtils.addVariableToContext(theFacesContext, "stem", this.getStem());
    }

    /**
     * Setter for grouperServiceExt.
     * 
     * @param theGrouperService
     *            the grouperService to set.
     */
    public final void setGrouperService(final IGrouperService theGrouperService) {
        this.grouperService = theGrouperService;
    }

    /**
     * Get the parent stem.
     * 
     * @return the parent stem.
     */
    public Stem getParentStem() {
        return this.parentStem;
    }

    /**
     * setter for property parameterService.
     * 
     * @param theParameterService
     *            the parameterService to set
     */
    public void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

    /**
     * setter for property xmlProducerWrapper.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set
     */
    public void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
    }

    /**
     * Initialization of the stem.
     * 
     * @throws ESCOStemNotUniqueException
     *             if the stem is not unique.
     * @throws ESCOStemNotFoundException
     *             if the stem is not found.
     */
    public void initStemAttributes() throws ESCOStemNotFoundException, ESCOStemNotUniqueException {
        boolean needCacheSession = ESCOConstantes.TREE_FROM_CALL.equals(this.fromCall());
        if (needCacheSession) {
            this.clearModification();
        }
        if (this.stem == null || needCacheSession) {

            Person person = null;
            try {
                person = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e1) {
            } catch (ESCOSubjectNotUniqueException e1) {
            }

            String uuid = this.getStemUuid();
            this.privilegesOnCurrentStem = null;
            this.parentStem = null;

            if (ESCOConstantes.TRUE.equals(this.getParam(ESCOConstantes.PARAM_CREATION_CALL))) {
                this.creation = Boolean.TRUE;
                this.stem = new Stem();
                String stemUuid = this.getParam(StemController.PARAM_STEM_UUID);

                if (!StringUtils.isEmpty(stemUuid)) {
                    this.parentStem = this.getGrouperService().findStemByUuid(person, stemUuid);
                }

            } else {
                this.creation = Boolean.FALSE;
                if (!StringUtils.isEmpty(uuid)) {
                    this.stem = this.grouperService.findStemByUuid(person, uuid);
                }

                String parentName = "";

                if (this.stem.getName().indexOf(":") != -1) {
                    parentName = this.stem.getName().substring(0,
                            this.stem.getName().indexOf(":" + this.stem.getExtension()));
                } else {
                    parentName = ESCOConstantes.STEM_NAME_SEPARATOR;
                }

                if (!StringUtils.isEmpty(parentName)) {
                    this.parentStem = this.getGrouperService().findStemByName(person, parentName);
                }
            }
        }
    }

    /**
     * Initialization of the stem.
     * 
     * @return always true
     * @throws ESCOStemNotUniqueException
     *             if the stem is not unique.
     * @throws ESCOStemNotFoundException
     *             if the stem is not found.
     */
    public boolean getInitParameters() throws ESCOStemNotFoundException, ESCOStemNotUniqueException {
        this.initStemAttributes();
        return true;
    }

    /**
     * Allow to retrieve attributes information from a stem.
     * 
     * @return the list of attributes.
     */
    public List < Attribute > getStemAttributes() {
        List < Attribute > attributes = new ArrayList < Attribute >();

        // Check if the current stem is null, ie: no stem found with uuid from
        // parameter
        if (this.getStem() != null) {
            Set < String > extension = null;

            Map < String, String > mappingFieldCol = this.getStem().getMappingFieldCol();
            for (Entry < String, String > mapField : mappingFieldCol.entrySet()) {
                StemController.LOGGER.debug("Add field for value : " + mapField.getKey() + " -> "
                        + mapField.getValue());
                extension = new HashSet < String >();

                if (org.esco.grouperui.services.ESCOConstantes.NULL_DATA_IN_THIS_MAPPING_FIELD_COL.equals(mapField
                        .getValue())) {
                    extension.add(ESCOConstantes.EMPTY_DATA);
                } else {
                    extension.add(mapField.getValue());
                }
                attributes.add(new Attribute(mapField.getKey(), extension));
            }
        }

        return attributes;
    }

    /**
     * Allow to retrieve the display name of the stem.
     * 
     * @return the display name of the stem.
     */
    public String getDisplayName() {
        String result = null;

        if (this.stem != null) {
            result = this.stem.getDisplayName();
        } else
            if (this.getParam("displayName") != null) {
                result = this.getParam("displayName");
            }

        return result;
    }

    /**
     * Allow to retrieve the display name of the stem.
     * 
     * @return the display name of the stem.
     */
    public String getDisplayExtension() {
        String result = null;

        if (this.stem != null) {
            result = this.stem.getDisplayExtension();
        }
        return result;
    }

    /**
     * Check if need to redirect to parent.
     * 
     * @return true if need redirection to parent, false otherwise.
     */
    public String getNeedToRedirectToParent() {
        return this.getParam("needToRedirect");
    }

    /**
     * Allow to retrieve the name (path) of the stem.
     * 
     * @return the name (path) of the stem.
     */

    public String getNameSearchPath() {
        String result = ESCOConstantes.ROOT_NAME;

        if (this.creation && this.parentStem != null && this.parentStem.getName() != null) {
            // add the root element to the parentStem
            result = ESCOConstantes.STEM_NAME_SEPARATOR + this.parentStem.getName();
        } else
            if (this.stem != null && this.stem.getName() != null) {
                result = "";
                String[] aux = this.stem.getName().split(":");
                for (String element : aux) {
                    result += element + ":";
                }
                // add the root element and delete the last :
                result = ESCOConstantes.STEM_NAME_SEPARATOR + result.substring(0, result.length() - 1);
            }

        return result;
    }

    /**
     * Allow to retrieve the name (path) of the stem.
     * 
     * @return the name (path) of the stem.
     */
    public String getDisplayNameSearchPath() {
        String result = ESCOConstantes.ROOT_NAME;

        if (this.creation && this.parentStem != null && this.parentStem.getDisplayName() != null) {
            // add the root element to the parentStem
            result = ESCOConstantes.STEM_NAME_SEPARATOR + this.parentStem.getDisplayName();
        } else
            if (this.stem != null && this.stem.getDisplayName() != null) {
                result = "";
                String[] aux = this.stem.getDisplayName().split(":");
                for (String element : aux) {
                    result += element + ":";
                }
                // add the root element and delete the last :
                result = ESCOConstantes.STEM_NAME_SEPARATOR + result.substring(0, result.length() - 1);
            }

        return result;
    }

    /**
     * Retrieve the stemUuid from the request.
     * 
     * @return the stemUuid.
     */
    public String getStemUuid() {
        String uuid = this.getParam(StemController.PARAM_STEM_UUID);
        return uuid;
    }

    /**
     * Retrieve the caller name from the request.
     * 
     * @return the caller name.
     */
    public String fromCall() {
        String from = this.getParam(ESCOConstantes.PARAM_FROM_CALL);
        return from;

    }

    /**
     * Allow to retrieve the name of the stem.
     * 
     * @return the name of the stem.
     */
    public String getName() {
        String result = null;

        if (this.stem != null) {
            result = this.stem.getName();
        }
        return result;
    }

    /**
     * getter for property grouperService.
     * 
     * @return the grouperService
     */
    public IGrouperService getGrouperService() {
        return this.grouperService;
    }

    /**
     * getter for property parameterService.
     * 
     * @return the parameterService
     */
    public IParameterService getParameterService() {
        return this.parameterService;
    }

    /**
     * getter for property stem.
     * 
     * @return the stem
     */
    public Stem getStem() {
        return this.stem;
    }

    /**
     * Check if the current status is an initialization.
     * 
     * @return true if initialization sequence, false else.
     */
    public boolean isInit() {
        return Boolean.valueOf(this.getParam(StemController.PARAM_STEM_INIT));
    }

    /**
     * Check if one of the stems properties have been change.
     * 
     * @return the XML data.
     */
    public String isModifiedStems() {

        Boolean status = Boolean.FALSE;

        // Clear all the sub controller
        Iterator < ITabController > controller = this.tabControllers.iterator();
        ITabController currentController = null;
        while (controller.hasNext()) {
            currentController = controller.next();
            if (currentController.isModified()) {
                status = Boolean.TRUE;
                break;
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(status));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Allow to clear all the sub controller.
     * 
     * @return the xml status (true / false).
     */
    public String clearModification() {
        if (this.tabControllers != null) {
            Iterator < ITabController > controller = this.tabControllers.iterator();
            ITabController currentController = null;
            while (controller.hasNext()) {
                currentController = controller.next();
                currentController.clear();
            }
        }
        // Reinitialize the previous errors
        this.errors.clear();

        // Reinitialize the saveCall attribute
        this.saveCall = Boolean.FALSE;

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * call each controller for compute summary.
     * 
     * @return list off all summary for each controller.
     */
    public List < Resume > getListResume() {
        Iterator < ITabController > controller = this.tabControllers.iterator();

        List < Resume > resumes = new ArrayList < Resume >();
        this.errors.clear();
        while (controller.hasNext()) {
            ITabController iStemController = controller.next();

            if (iStemController.getTabInfo().getIsResume()) {
                resumes.addAll(iStemController.getListResume());
            }
        }

        return resumes;
    }

    /**
     * Check if the save action have been done.
     * 
     * @return true if the save action have been done, false else.
     */
    public boolean getSaveCall() {
        return this.saveCall;
    }

    /**
     * Check if we are in creation.
     * 
     * @return true if one is being created, false else.
     */
    public boolean getIsCreation() {
        return this.creation;
    }

    /**
     * Setter for creation.
     * 
     * @param theCreation
     *            the creation to set.
     */
    public void setIsCreation(final boolean theCreation) {
        this.creation = theCreation;
    }

    /**
     * Allow to save the modification on a group.
     * 
     * @return the xml status (true / false).
     */
    public String saveStem() {
        Iterator < ITabController > controller = this.tabControllers.iterator();
        Status status = null;
        String result = null;
        String stemId = null;

        // Reinitialize the previous errors
        this.errors.clear();

        while (controller.hasNext()) {
            ITabController iStemController = controller.next();

            status = iStemController.save();
            if (null != status.getStatus() && !status.getStatus()) {
                this.errors = iStemController.getErrorClassesNames();
                break;
            }
        }

        this.saveCall = Boolean.TRUE;

        stemId = this.stem.getUuid();

        // Clear modifications for all the controllers if no error happened
        if (this.errors.isEmpty()) {
            // Set the result
            result = stemId;
            // Clear the modifications
            this.clearModification();
            // Unset the current stem
            this.stem = null;

            this.parentStem = null;

            this.creation = Boolean.FALSE;
        } else {
            // Set the result to false
            result = "false";
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new XMLResultString(result));
        producer.setTypesOfTarget(XMLResultString.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Retrieve the privileges of the user on the current stem.
     */
    private void getPrivileges() {

        Person person = null;
        try {
            person = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e1) {
        } catch (ESCOSubjectNotUniqueException e1) {
        }
        String stemName = this.getStem().getName();

        this.privilegesOnCurrentStem = this.getGrouperService().findStemPrivileges(person, stemName);
    }

    /**
     * Check if the user has the role for creating a stem.
     * 
     * @return true if the user has the right, false else.
     */
    public Boolean getHasStem() {
        if (this.privilegesOnCurrentStem == null) {
            this.getPrivileges();
        }
        Boolean hasStem = Boolean.FALSE;

        if (this.creation) {
            hasStem = Boolean.TRUE;
        }

        for (Privilege privilege : this.privilegesOnCurrentStem) {
            if (StemPrivilegeEnum.STEM.getValue().equals(privilege.getPrivilegeName())) {
                hasStem = Boolean.TRUE;
                break;
            }
        }

        return hasStem;
    }

    /**
     * Check if the user has the role for creating a group.
     * 
     * @return true if the user has the right, false else.
     */
    public Boolean getHasCreate() {
        if (this.privilegesOnCurrentStem == null) {
            this.getPrivileges();
        }
        Boolean hasStem = Boolean.FALSE;
        for (Privilege privilege : this.privilegesOnCurrentStem) {
            if (StemPrivilegeEnum.CREATE.getValue().equals(privilege.getPrivilegeName())) {
                hasStem = Boolean.TRUE;
                break;
            }
        }
        return hasStem;
    }

    /**
     * Getter for errors.
     * 
     * @return the errors to get.
     */
    public final List < String > getErrors() {
        return this.errors;
    }

    /**
     * Discard a modification that raised an exception.
     * 
     * @return the result.
     */
    public String discardModification() {

        final String idModification = this.getParam("id");
        final String controllerClass = this.getParam("controllerClass");

        Iterator < ITabController > controller = this.tabControllers.iterator();
        while (controller.hasNext()) {
            ITabController iStemController = controller.next();

            if (iStemController.getClass().getName().equals(controllerClass)) {
                iStemController.discardModification(idModification);
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Apply changes made on the attribute that raised an exception.
     * 
     * @return the result.
     */
    public String applyModification() {
        final String idModification = this.getParam("id");
        final String newValue = this.getParam("newValue");

        Iterator < ITabController > controller = this.tabControllers.iterator();
        while (controller.hasNext()) {
            ITabController iStemController = controller.next();
            iStemController.applyModification(idModification, newValue);
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Getter for the attribute key that is modified.
     * 
     * @return the result.
     */
    public String getAttributeKey() {
        final String idModification = this.getParam("id");
        String attributeKey = null;

        Iterator < ITabController > controller = this.tabControllers.iterator();
        while (controller.hasNext()) {
            ITabController iStemController = controller.next();
            attributeKey = iStemController.getAttributeKey(idModification);
            if (null != attributeKey) {
                break;
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new XMLResultString(attributeKey));
        producer.setTypesOfTarget(XMLResultString.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Get if the stem is empty or not.
     * 
     * @return true if empty else false otherwise.
     */
    public Boolean getIsEmptyStem() {
        Boolean result = Boolean.FALSE;
        if (this.stem != null) {
            result = this.stem.getIsEmpty();
        }
        return result;
    }
}
