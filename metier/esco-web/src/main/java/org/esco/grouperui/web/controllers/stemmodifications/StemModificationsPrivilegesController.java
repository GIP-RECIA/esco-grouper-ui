package org.esco.grouperui.web.controllers.stemmodifications;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.faces.model.SelectItem;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.StemPrivilegeEnum;
import org.esco.grouperui.domaine.beans.StemPrivileges;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.PrivilegeTypeEnum;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.PrivilegesRadioEnum;
import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.DataTypeEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.summary.TypeDataSmmary;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.controllers.EscoSecurityContext;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.StemController;
import org.esco.grouperui.web.controllers.groupProperties.PrivilegeDisplayUtils;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class StemPrivilegesController. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004] <br/>
 * [RECIA-ESCO-L1-005]
 * 
 * @author ctrimoreau
 */
public class StemModificationsPrivilegesController extends AbstractControllerAware {

    /**
     * serialVersionUID.
     */
    private static final long                             serialVersionUID = 1276822780935740635L;

    /** Logger. */
    private static final IESCOLogger                      LOGGER           = ESCOLoggerFactory
                                                                                   .getLogger(StemModificationsPrivilegesController.class);

    /** The updated stem privileges. */
    private final Map < String, Sortable >                updatedStems;

    /** The original updated stem privileges. */
    private final Map < String, Map < String, Boolean > > originalStems;

    /** The current tab type. */
    private ScopeEnum                                     privilegeTypeEnum;

    /**
     * Default constructor.
     */
    public StemModificationsPrivilegesController() {
        super();
        this.updatedStems = new HashMap < String, Sortable >();
        this.originalStems = new HashMap < String, Map < String, Boolean > >();
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
        this.updatedStems.clear();
        this.originalStems.clear();
        super.clear();
    }

    /**
     * Get if the data have been modified.
     * 
     * @return True if data modified else false.
     */
    @Override
    public boolean doIsModified() {
        return this.updatedStems.isEmpty();
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        List < Resume > listResume = new ArrayList < Resume >();
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < List < String >> originals = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();
        List < String > cells = null;
        List < String > origins = null;
        Sortable sortable;

        colNames.add(new ColInfo("STEM.PRIVILEGE_STEM_COLUMN_1"));

        colNames.add(new ColInfo("STEM.PRIVILEGE_STEM_COLUMN_2", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("STEM.PRIVILEGE_STEM_COLUMN_3", Boolean.FALSE, DataTypeEnum.CHECKBOX));

        resume.setColInfos(colNames);

        // Iterate on the updated subjects.
        Iterator < Sortable > itSubject = this.data.iterator();
        while (itSubject.hasNext()) {
            Subject currentSubject = (Subject) itSubject.next();

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            Sortable updateSubjectPrivilege = this.updatedStems.get(currentSubject.getId());
            if (updateSubjectPrivilege != null) {

                indexs.add(currentSubject.getId());

                if (null != currentSubject.getValueFormCol("displayExtension")
                        && !"".equals(currentSubject.getValueFormCol("displayExtension"))) {
                    cells.add(currentSubject.getValueFormCol("displayExtension"));
                    origins.add(currentSubject.getValueFormCol("displayExtension"));
                } else {
                    cells.add(currentSubject.getValueFormCol("displayName"));
                    origins.add(currentSubject.getValueFormCol("displayName"));
                }

                PrivilegeDisplayUtils.assignDisplayStemPrivilege((Subject) updateSubjectPrivilege, cells,
                        currentSubject, origins);

                // Are the stem privileges in error ?
                if (this.errorData.contains(updateSubjectPrivilege)) {
                    typeData.add(TypeDataSmmary.ERROR.name());
                } else {
                    // Have the stem privileges already been saved
                    // successfully
                    if (updateSubjectPrivilege.isSaved()) {
                        typeData.add(TypeDataSmmary.SAVED.name());
                    } else {
                        typeData.add(TypeDataSmmary.UPDATED.name());
                    }
                }

                datas.add(cells);
                originals.add(origins);
            }
        }

        // Iterate on the added privileges.
        Iterator < Sortable > itAddPrivilege = this.addedData.iterator();
        while (itAddPrivilege.hasNext()) {
            sortable = itAddPrivilege.next();

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            indexs.add(((Subject) sortable).getId());

            if (null != sortable.getValueFormCol("displayExtension")
                    && !"".equals(sortable.getValueFormCol("displayExtension"))) {
                cells.add(sortable.getValueFormCol("displayExtension"));
            } else {
                cells.add(sortable.getValueFormCol("displayName"));
            }
            origins.add("");

            cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(((Subject) sortable).getHasStem()));
            origins.add("");
            cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(((Subject) sortable).getHasCreate()));
            origins.add("");

            // Are the stem privileges in error ?
            if (this.errorData.contains(sortable)) {
                typeData.add(TypeDataSmmary.ERROR.name());
            } else
                // Have the stem privileges already been saved successfully
                if (sortable.isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.ADDED.name());
                }

            datas.add(cells);
            originals.add(origins);
        }

        // Iterate on the delete privileges.
        Iterator < Sortable > itDelPrivilege = this.deletedData.iterator();
        while (itDelPrivilege.hasNext()) {
            sortable = itDelPrivilege.next();

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            indexs.add(((Subject) sortable).getId());

            if (null != sortable.getValueFormCol("displayExtension")
                    && !"".equals(sortable.getValueFormCol("displayExtension"))) {
                cells.add(sortable.getValueFormCol("displayExtension"));
            } else {
                cells.add(sortable.getValueFormCol("displayName"));
            }
            origins.add("");

            cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(((Subject) sortable).getHasStem()));
            origins.add("");
            cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(((Subject) sortable).getHasCreate()));
            origins.add("");

            // Are the stem privileges in error ?
            if (this.errorData.contains(sortable)) {
                typeData.add(TypeDataSmmary.ERROR.name());
            } else
                // Have the stem privileges already been saved successfully
                if (sortable.isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.DELETED.name());
                }

            datas.add(cells);
            originals.add(origins);
        }

        resume.setTitle("PrivilegesStem_view.label");
        resume.setIndex(indexs);
        resume.setControllerClass(StemModificationsPrivilegesController.class.getName());
        resume.setData(datas);
        resume.setOriginals(originals);
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
    public Status save() {
        IGrouperService grouperService = this.getStemController().getGrouperService();
        Stem stem = this.getStemController().getStem();
        Person userConnected = new Person();
        userConnected.setId(EscoSecurityContext.getUserSecurity().getId());
        Boolean status = null;

        Sortable sortable;
        String subjectId = null;
        Privilege privilege = new Privilege();
        privilege.setPrivilegeType(PrivilegeTypeEnum.NAMING.getValue());

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorData.clear();

        // Update group privileges
        for (Sortable aSubject : this.data) {
            Subject currentSubject = (Subject) aSubject;
            Sortable updateSubjectPrivilege = this.updatedStems.get(currentSubject.getId());
            if (updateSubjectPrivilege != null && !updateSubjectPrivilege.isSaved()) {

                subjectId = currentSubject.getId();

                try {
                    // Assign or remove privileges based on original rights
                    privilege.setPrivilegeName(StemPrivilegeEnum.STEM.getValue());
                    // Assign Stem privilege
                    if (PrivilegeDisplayUtils.hasToAssignPrivilege(currentSubject.getHasStem(),
                            ((Subject) updateSubjectPrivilege).getHasStem())) {
                        // Call the service that will assign the privilege on
                        // the stem
                        grouperService.assignStemPrivileges(userConnected, subjectId, stem.getUuid(), privilege);
                    } else
                        // Remove Stem privilege
                        if (PrivilegeDisplayUtils.hasToRemovePrivilege(currentSubject.getHasStem(),
                                ((Subject) updateSubjectPrivilege).getHasStem())) {
                            // Call the service that will remove the privilege
                            // on the stem
                            grouperService.removeStemPrivileges(userConnected, subjectId, stem.getUuid(),
                                    privilege);
                        }

                    privilege.setPrivilegeName(StemPrivilegeEnum.CREATE.getValue());
                    // Assign Create privilege
                    if (PrivilegeDisplayUtils.hasToAssignPrivilege(currentSubject.getHasCreate(),
                            ((Subject) updateSubjectPrivilege).getHasCreate())) {
                        // Call the service that will assign the privilege on
                        // the stem
                        grouperService.assignStemPrivileges(userConnected, subjectId, stem.getUuid(), privilege);
                    } else
                        // Remove Create privilege
                        if (PrivilegeDisplayUtils.hasToRemovePrivilege(currentSubject.getHasCreate(),
                                ((Subject) updateSubjectPrivilege).getHasCreate())) {
                            // Call the service that will remove the privilege
                            // on the stem
                            grouperService.removeStemPrivileges(userConnected, subjectId, stem.getUuid(),
                                    privilege);
                        }
                } catch (ESCOBusinessException ebe) {
                    this.handleException(ebe, subjectId);
                } finally {
                    // If no error, the current element is defined as saved
                    if (this.errorClassesNames.isEmpty()) {
                        updateSubjectPrivilege.setSaved(Boolean.TRUE);
                    } else {
                        this.errorData.add(updateSubjectPrivilege);
                    }
                }
            }
        }

        // Add privileges to the stem.
        for (Sortable aSubject : this.addedData) {
            sortable = aSubject;
            // If the stem privileges have not already been added successfully
            if (!sortable.isSaved()) {
                subjectId = ((Subject) sortable).getId();
                try {
                    // Assign Stem privilege
                    if (null != sortable.getValueFormCol("hasStem")
                            && "true".equals(sortable.getValueFormCol("hasStem"))) {
                        privilege.setPrivilegeName(StemPrivilegeEnum.STEM.getValue());
                        // Call the service that will assign the privilege on
                        // the stem
                        grouperService.assignStemPrivileges(userConnected, subjectId, stem.getUuid(), privilege);
                    }

                    // Assign Create privilege
                    if (null != sortable.getValueFormCol("hasCreate")
                            && "true".equals(sortable.getValueFormCol("hasCreate"))) {
                        privilege.setPrivilegeName(StemPrivilegeEnum.CREATE.getValue());
                        // Call the service that will assign the privilege on
                        // the stem
                        grouperService.assignStemPrivileges(userConnected, subjectId, stem.getUuid(), privilege);
                    }
                } catch (ESCOBusinessException ebe) {
                    this.handleException(ebe, subjectId);
                } finally {
                    // If no error, the current element is defined as saved
                    if (this.errorClassesNames.isEmpty()) {
                        sortable.setSaved(Boolean.TRUE);
                    } else {
                        this.errorData.add(sortable);
                    }
                }
            }
        }

        // Remove privileges to the stem.
        for (Sortable aSubject : this.deletedData) {
            sortable = aSubject;
            // If the stem privileges have not already been saved successfully
            if (!sortable.isSaved()) {
                subjectId = ((Subject) sortable).getId();
                try {
                    // Remove Stem privilege
                    privilege.setPrivilegeName(StemPrivilegeEnum.STEM.getValue());
                    // Call the service that will remove the privilege on the
                    // stem
                    grouperService.removeStemPrivileges(userConnected, subjectId, stem.getUuid(), privilege);

                    // Remove Create privilege
                    privilege.setPrivilegeName(StemPrivilegeEnum.CREATE.getValue());
                    // Call the service that will remove the privilege on the
                    // stem
                    grouperService.removeStemPrivileges(userConnected, subjectId, stem.getUuid(), privilege);
                } catch (ESCOBusinessException ebe) {
                    this.handleException(ebe, subjectId);
                } finally {
                    // If no error, the current element is defined as saved
                    if (this.errorClassesNames.isEmpty()) {
                        sortable.setSaved(Boolean.TRUE);
                    } else {
                        this.errorData.add(sortable);
                    }
                }
            }
        }

        if (this.errorClassesNames.isEmpty()) {
            status = Boolean.TRUE;
        } else {
            status = Boolean.FALSE;
        }

        return new Status(status);
    }

    /**
     * Retrieve the list of Privileges (Group or Person) of the current stem.
     * 
     * @return the xml status (true / false).
     */
    public String findPrivileges() {

        String thePrivilegeType = this.getParam("privilegeType");
        if (thePrivilegeType == null) {
            this.privilegeTypeEnum = ScopeEnum.IMMEDIATE;
        } else {
            this.privilegeTypeEnum = ScopeEnum.valueOf(PrivilegesRadioEnum.fromLabel(thePrivilegeType).name());
        }

        this.clearContext();

        // The list of privileges.
        List < Privilege > privileges = null;

        List < Subject > subjects = null;

        ParameterGroup parameterGroup = null;
        Iterator < Parameter > itParam = null;
        Parameter parameter = null;

        if (this.getStemController().getStem() != null && !this.getStemController().getIsCreation()) {

            // Dynamic parameters
            List < String > attributes = new ArrayList < String >();
            IParameterService parameterService = this.getStemController().getParameterService();

            parameterGroup = parameterService.findParametersByGroup("org.esco.grouperui.stem.privileges.attribut");

            // We retrieve the parameters from the database.
            itParam = parameterGroup.getParameters().iterator();
            while (itParam.hasNext()) {
                parameter = itParam.next();
                attributes.add(parameter.getKey());
            }

            // Dynamic source
            Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
            parameterGroup = parameterService.findParametersByGroup("org.esco.grouperui.stem.privileges.map");

            itParam = parameterGroup.getParameters().iterator();
            while (itParam.hasNext()) {
                parameter = itParam.next();
                sources.put(parameter.getValue(), SourceTypeEnum.valueOf(parameter.getKey().toUpperCase()));
            }

            // The stem name from which we want to retrieve the privileges.
            String stemName = this.getStemController().getStem().getName();

            // The person from which we want to open the grouper session.
            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e) {
                StemModificationsPrivilegesController.LOGGER.error(e, "Subject not found");
            } catch (ESCOSubjectNotUniqueException e) {
                StemModificationsPrivilegesController.LOGGER.error(e, "Subject not unique");
            }
            // The Membership Type selected via the Radio Button.
            PrivilegesRadioEnum radioType = PrivilegesRadioEnum.fromLabel(thePrivilegeType.toUpperCase());
            if (radioType == null) {
                radioType = PrivilegesRadioEnum.IMMEDIATE;
            }

            // The list of Subject corresponding to the find parameters.
            privileges = this.getStemController().getGrouperService().findStemPrivileges(userConnected,
                    attributes, sources, stemName, ScopeEnum.valueOf(radioType.name()));

            StemPrivileges stemPrivileges = new StemPrivileges(privileges);
            subjects = stemPrivileges.getSubjects();

            Iterator < Subject > itSubject = subjects.iterator();
            while (itSubject.hasNext()) {
                this.data.add(itSubject.next());
            }
        }
        this.addedItems();

        // Create and return the XML status.
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(this.isRowToReturn()));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Output the data as an XML stream.
     * 
     * @return the xml status (true / false).
     */
    public String dataResult() {

        final String theRows = this.getParam("rows");
        final String thePage = this.getParam("page");
        final String theSortBy = this.getParam("sidx");
        final String theSortType = this.getParam("sord");

        this.extractItems();

        // Remove all items update and add the update version.
        if (this.addAdded()) {
            Set < String > keySet = this.updatedStems.keySet();
            List < Sortable > sortables = this.storedData.getListOfSortable();
            for (String key : keySet) {
                Iterator < Sortable > itSortable = sortables.iterator();
                boolean findItem = false;
                while (itSortable.hasNext() && !findItem) {
                    Subject aSubject = (Subject) itSortable.next();
                    if (aSubject.getId().equals(key)) {
                        this.storedData.delRowDataResult(aSubject);
                        this.storedData.addRowDataResult(this.updatedStems.get(key));
                        findItem = true;
                    }
                }
            }
        }
        this.storedData.setIsExistingAddedItem(this.getIsExistAddedItems());
        this.storedData.setNbResultDisplay(theRows);
        this.storedData.setCurrentPage(thePage);

        TableData tableData = TableDataFactory.populate(this.storedData, this.sortableRowDataWrapper, theSortBy,
                theSortType);

        return this.xmlProducerWrapper.wrap(TableDataFactory.getProducer(tableData));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean addAdded() {
        return this.privilegeTypeEnum != ScopeEnum.EFFECTIVE;
    }

    /**
     * Allow to update a stem privileges.
     * 
     * @return the xml status (true / false).
     */
    public String updatePrivilege() {

        String elementID = this.getParam("idElement");
        boolean needToAdd = false;

        String hasStem = this.getParam("hasStem");
        String hasCreate = this.getParam("hasCreate");

        // We retrieve the updated privileges on stem if already updated.

        Subject updateSubject = (Subject) this.getAddedItem(elementID);

        if (updateSubject == null) {
            updateSubject = (Subject) this.updatedStems.get(elementID);
            if (updateSubject == null) {
                updateSubject = (Subject) ((Subject) this.getItem(elementID)).clone();
                Map < String, Boolean > theMap = new HashMap < String, Boolean >();
                theMap.put("hasStem", ((Subject) this.getItem(elementID)).getHasStem());
                theMap.put("hasCreate", ((Subject) this.getItem(elementID)).getHasCreate());
                this.originalStems.put(elementID, theMap);
                needToAdd = true;
            }
        }

        if (hasStem != null) {
            updateSubject.setHasStem(hasStem.equals("true"));
        }

        if (hasCreate != null) {
            updateSubject.setHasCreate(hasCreate.equals("true"));
        }

        // Only one group in the list of group of the members class because
        // we add it to convert group to subject.
        if (needToAdd) {
            this.updatedStems.put(elementID, updateSubject);
        } else {
            Map theOriginalStemRight = this.originalStems.get(elementID);
            if (theOriginalStemRight != null) {
                if (theOriginalStemRight.get("hasStem") == updateSubject.getHasStem()) {
                    if (theOriginalStemRight.get("hasCreate") == updateSubject.getHasCreate()) {
                        this.updatedStems.remove(elementID);
                        this.originalStems.remove(elementID);
                    }
                }
            }
        }

        // Create and return the XML status.
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void doDelete(final List < Sortable > theList) {
        Iterator < Sortable > itSortable = theList.iterator();
        while (itSortable.hasNext()) {
            Subject aSubject = (Subject) itSortable.next();
            if (this.updatedStems.containsKey(aSubject.getId())) {
                this.updatedStems.remove(aSubject.getId());
                this.originalStems.remove(aSubject.getId());
            }
        }
    }

    /**
     * Get the list of the membership radio.
     * 
     * @return a list of SelectIem for the radio button.
     */
    public List < SelectItem > getListPrivilegesRadio() {
        PrivilegesRadioEnum[] enums = PrivilegesRadioEnum.values();

        List < SelectItem > selectItems = new ArrayList < SelectItem >();
        // If creation
        if (!this.getStemController().getIsCreation()) {
            for (PrivilegesRadioEnum privilegesRadio : enums) {
                selectItems.add(new SelectItem(privilegesRadio.getLabel(), this.getString(privilegesRadio
                        .getLabel())));
            }
        } else {
            // Else management
            PrivilegesRadioEnum privilegesRadio = PrivilegesRadioEnum.IMMEDIATE;
            selectItems
                    .add(new SelectItem(privilegesRadio.getLabel(), this.getString(privilegesRadio.getLabel())));
        }

        return selectItems;
    }

    /**
     * The default radio for privileges.
     * 
     * @return the default label for privileges radio.
     */
    public PrivilegesRadioEnum getDefaultPrivilegesRadio() {
        return PrivilegesRadioEnum.IMMEDIATE;
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
            // else we are in modification
            result = "modification";
        }

        return result;
    }

    /**
     * {@inheritDoc}
     */
    public void discardModification(final String index) {

        Sortable sortable;

        // Discard the modifications on added stem privileges.
        List < Sortable > addedStemPrivilegesToRemove = new ArrayList < Sortable >();
        Iterator < Sortable > itAddGroupPrivileges = this.addedData.iterator();
        while (itAddGroupPrivileges.hasNext()) {
            sortable = itAddGroupPrivileges.next();
            if (index.equals(((Subject) sortable).getId())) {
                addedStemPrivilegesToRemove.add(sortable);
            }
        }
        Iterator < Sortable > itRemAddedGroupPrivileges = addedStemPrivilegesToRemove.iterator();
        while (itRemAddedGroupPrivileges.hasNext()) {
            sortable = itRemAddedGroupPrivileges.next();
            this.addedData.remove(sortable);
            this.errorData.remove(sortable);
        }

        // Discard the modifications on deleted stem privileges.
        List < Sortable > deletedStemPrivilegesToRemove = new ArrayList < Sortable >();
        Iterator < Sortable > itDelGroupPrivileges = this.deletedData.iterator();
        while (itDelGroupPrivileges.hasNext()) {
            sortable = itDelGroupPrivileges.next();
            if (index.equals(((Subject) sortable).getId())) {
                deletedStemPrivilegesToRemove.add(sortable);
            }
        }
        Iterator < Sortable > itRemDeletedGroupPrivileges = deletedStemPrivilegesToRemove.iterator();
        while (itRemDeletedGroupPrivileges.hasNext()) {
            sortable = itRemDeletedGroupPrivileges.next();
            this.deletedData.remove(sortable);
            this.errorData.remove(sortable);
        }

        // Discard the modifications on updated stem privileges.
        List < Sortable > updatedStemPrivilegesToRemove = new ArrayList < Sortable >();
        Iterator < Sortable > itStemPrivilege = this.data.iterator();
        while (itStemPrivilege.hasNext()) {
            Subject currentSubject = (Subject) itStemPrivilege.next();
            if (index.equals(currentSubject.getId())) {
                Sortable updateStemPrivilege = this.updatedStems.get(currentSubject.getId());
                if (updateStemPrivilege != null) {
                    updatedStemPrivilegesToRemove.add(updateStemPrivilege);
                }
            }
        }
        Iterator < Sortable > itRemUpdatedGroupPrivileges = updatedStemPrivilegesToRemove.iterator();
        while (itRemUpdatedGroupPrivileges.hasNext()) {
            sortable = itRemUpdatedGroupPrivileges.next();
            this.updatedStems.remove(((Subject) sortable).getId());
            this.originalStems.remove(((Subject) sortable).getId());
            this.errorData.remove(sortable);
        }

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
    public void applyModification(final String index, final String newValue) {
    }

    /**
     * {@inheritDoc}
     */
    public String getAttributeKey(final String index) {
        return null;
    }
}
