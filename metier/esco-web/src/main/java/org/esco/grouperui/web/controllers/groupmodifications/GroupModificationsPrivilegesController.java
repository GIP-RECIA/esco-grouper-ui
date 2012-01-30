package org.esco.grouperui.web.controllers.groupmodifications;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.faces.model.SelectItem;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.GroupPrivileges;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
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
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.PrivilegesRadioEnum;
import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.DataTypeEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.summary.TypeDataSmmary;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.controllers.EscoSecurityContext;
import org.esco.grouperui.web.controllers.GroupModificationController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.groupProperties.PrivilegeDisplayUtils;
import org.esco.grouperui.web.controllers.groupProperties.SubjectToSortableWrapper;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class StemPrivilegesController. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-009] <br/>
 * [RECIA-ESCO-L1-010]
 * 
 * @author ctrimoreau
 */
public class GroupModificationsPrivilegesController extends AbstractControllerAware {

    /**
     *
     */
    private static final long              serialVersionUID = 1276822780935740635L;

    /** Logger. */
    private static final IESCOLogger       LOGGER           = ESCOLoggerFactory
                                                                    .getLogger(GroupModificationsPrivilegesController.class);

    /** The updated stem privileges. */
    private final Map < String, Sortable > updatedGroups;

    /** The original group update privileges. */
    private final Map < String, Sortable > originalGroups;

    /** The current tab type. */
    private ScopeEnum                      privilegeTypeEnum;

    /**
     * Default constructor.
     */
    public GroupModificationsPrivilegesController() {
        super();
        this.updatedGroups = new HashMap < String, Sortable >();
        this.originalGroups = new HashMap < String, Sortable >();
    }

    /**
     * get TabsController for this tab and cast it in appropriate class.
     * 
     * @return GroupController.
     */
    public GroupModificationController getGroupController() {
        return (GroupModificationController) super.getTabsController();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear() {
        super.clear();
        this.updatedGroups.clear();
        this.originalGroups.clear();
    }

    /**
     * Get if the data have been modified.
     * 
     * @return True if data modified else false.
     */
    @Override
    public boolean doIsModified() {
        return this.updatedGroups.isEmpty();
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        List < Resume > listResume = new ArrayList < Resume >();

        listResume.add(this.getResume());
        this.errorClassesNames.clear();
        this.errorData.clear();
        return listResume;
    }

    /**
     * {@inheritDoc}
     */
    public Resume getResume() {
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < List < String >> originals = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();
        List < String > cells = null;
        List < String > origins = null;
        Sortable sortable;
        SubjectToSortableWrapper subjetToSortable = new SubjectToSortableWrapper();

        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_1"));

        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_2", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_3", Boolean.FALSE, DataTypeEnum.CHECKBOX));

        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_4", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_5", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_6", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_7", Boolean.FALSE, DataTypeEnum.CHECKBOX));

        resume.setColInfos(colNames);

        // Iterate on the updated subjects.
        Iterator < Sortable > itSubject = this.data.iterator();
        while (itSubject.hasNext()) {
            Group currentGroup = (Group) subjetToSortable.wrap((Subject) itSubject.next());

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            Sortable updateGroupPrivilege = subjetToSortable.wrap((Subject) this.updatedGroups.get(currentGroup
                    .getIdGroup()));
            if (updateGroupPrivilege != null) {

                indexs.add(currentGroup.getIdGroup());

                if (null != currentGroup.getDisplayExtension() && !"".equals(currentGroup.getDisplayExtension())) {
                    cells.add(currentGroup.getDisplayExtension());
                } else {
                    cells.add(currentGroup.getDisplayName());
                }
                origins.add("");

                PrivilegeDisplayUtils.assignDisplayPrivilege((Group) updateGroupPrivilege, cells);
                PrivilegeDisplayUtils.assignDisplayPrivilege(currentGroup, origins);

                // Are the group privileges in error ?
                if (this.errorData.contains(updateGroupPrivilege)) {
                    typeData.add(TypeDataSmmary.ERROR.name());
                } else {
                    // Have the group privileges already been saved
                    // successfully
                    if (updateGroupPrivilege.isSaved()) {
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
            sortable = subjetToSortable.wrap((Subject) itAddPrivilege.next());

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            indexs.add(((Group) sortable).getIdGroup());

            if (null != sortable.getValueFormCol("displayExtension")
                    && !"".equals(sortable.getValueFormCol("displayExtension"))) {
                cells.add(sortable.getValueFormCol("displayExtension"));
            } else {
                cells.add(sortable.getValueFormCol("displayName"));
            }
            origins.add("");

            PrivilegeDisplayUtils.assignDisplayPrivilege((Group) sortable, cells);
            origins.add("");
            origins.add("");
            origins.add("");
            origins.add("");
            origins.add("");
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

        // Iterate on the deleted privileges.
        Iterator < Sortable > itDelPrivilege = this.deletedData.iterator();
        while (itDelPrivilege.hasNext()) {
            sortable = subjetToSortable.wrap((Subject) itDelPrivilege.next());

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            indexs.add(((Group) sortable).getIdGroup());

            if (null != sortable.getValueFormCol("displayExtension")
                    && !"".equals(sortable.getValueFormCol("displayExtension"))) {
                cells.add(sortable.getValueFormCol("displayExtension"));
            } else {
                cells.add(sortable.getValueFormCol("displayName"));
            }
            origins.add("");

            PrivilegeDisplayUtils.assignDisplayPrivilege((Group) sortable, cells);
            origins.add("");
            origins.add("");
            origins.add("");
            origins.add("");
            origins.add("");
            origins.add("");

            // Are the group privileges in error ?
            if (this.errorData.contains(sortable)) {
                typeData.add(TypeDataSmmary.ERROR.name());
            } else
                // Have the group privileges already been saved successfully
                if (sortable.isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.DELETED.name());
                }

            datas.add(cells);
            originals.add(origins);
        }

        resume.setTitle("PrivilegesGroup_view.label");
        resume.setIndex(indexs);
        resume.setControllerClass(GroupModificationsPrivilegesController.class.getName());
        resume.setData(datas);
        resume.setOriginals(originals);
        resume.setTypeData(typeData);
        resume.setSaved(typeData.contains(TypeDataSmmary.SAVED.name()) && this.errorData.size() == 0);

        return resume;
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {
        IGrouperService grouperService = this.getGroupController().getGrouperService();
        Group group = this.getGroupController().getGroup();
        Person userConnected = new Person();
        userConnected.setId(EscoSecurityContext.getUserSecurity().getId());
        Boolean status = null;
        SubjectToSortableWrapper subjetToSortable = new SubjectToSortableWrapper();

        Sortable sortable;
        String groupToGrant = null;
        List < GroupPrivilegeEnum > privilegesToAssign = null;
        List < GroupPrivilegeEnum > privilegesToRemove = null;
        Iterator < GroupPrivilegeEnum > itPrivilegeToAssign = null;
        Iterator < GroupPrivilegeEnum > itPrivilegeToRemove = null;
        Privilege privilege = new Privilege();
        privilege.setPrivilegeType(PrivilegeTypeEnum.ACCESS.getValue());

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorData.clear();

        // Update group privileges.
        for (Sortable aGroup : this.data) {
            Group currentGroup = (Group) subjetToSortable.wrap((Subject) aGroup);

            Sortable updateGroupPrivilege = subjetToSortable.wrap((Subject) this.updatedGroups.get(currentGroup
                    .getIdGroup()));
            if (updateGroupPrivilege != null && !updateGroupPrivilege.isSaved()) {

                groupToGrant = currentGroup.getIdGroup();

                try {
                    // Assign or remove privileges based on original rights

                    // Assign rights to the group
                    privilegesToAssign = PrivilegeDisplayUtils.getPrivilegesToAssign(currentGroup,
                            (Group) updateGroupPrivilege);
                    itPrivilegeToAssign = privilegesToAssign.iterator();
                    while (itPrivilegeToAssign.hasNext()) {
                        privilege.setPrivilegeName(itPrivilegeToAssign.next().getName());
                        // Call the service that will assign the privilege to
                        // the group
                        grouperService.assignGroupPrivileges(userConnected, groupToGrant, group.getIdGroup(),
                                privilege);

                    }

                    // Remove rights to the group
                    privilegesToRemove = PrivilegeDisplayUtils.getPrivilegesToRemove(currentGroup,
                            (Group) updateGroupPrivilege);
                    itPrivilegeToRemove = privilegesToRemove.iterator();
                    while (itPrivilegeToRemove.hasNext()) {
                        privilege.setPrivilegeName(itPrivilegeToRemove.next().getName());
                        // Call the service that will remove the privilege to
                        // the group
                        grouperService.removeGroupPrivileges(userConnected, groupToGrant, group.getIdGroup(),
                                privilege);
                    }
                } catch (ESCOBusinessException ebe) {
                    this.handleException(ebe, groupToGrant);
                } finally {
                    // If no error, the current element is defined as saved
                    if (this.errorClassesNames.isEmpty()) {
                        updateGroupPrivilege.setSaved(Boolean.TRUE);
                    } else {
                        this.errorData.add(updateGroupPrivilege);
                    }
                }
            }
        }

        // Add privileges to the group.
        for (Sortable aGroup : this.addedData) {
            sortable = subjetToSortable.wrap((Subject) aGroup);
            // If the group privileges have not already been added successfully
            if (!sortable.isSaved()) {
                groupToGrant = ((Group) sortable).getIdGroup();
                try {
                    // Assign privileges
                    privilegesToAssign = PrivilegeDisplayUtils.getPrivilegesToAssignOrRemove((Group) sortable);
                    itPrivilegeToAssign = privilegesToAssign.iterator();
                    while (itPrivilegeToAssign.hasNext()) {
                        privilege.setPrivilegeName(itPrivilegeToAssign.next().getName());
                        // Call the service that will assign
                        // the privilege to the group
                        grouperService.assignGroupPrivileges(userConnected, groupToGrant, group.getIdGroup(),
                                privilege);
                    }
                } catch (ESCOBusinessException ebe) {
                    this.handleException(ebe, groupToGrant);
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

        // Remove privileges from the group.
        for (Sortable aGroup : this.deletedData) {
            sortable = subjetToSortable.wrap((Subject) aGroup);
            // If the group privileges have not already been deleted
            // successfully
            if (!sortable.isSaved()) {
                groupToGrant = ((Group) sortable).getIdGroup();
                try {
                    // Remove privileges
                    privilegesToRemove = PrivilegeDisplayUtils.getPrivilegesToAssignOrRemove((Group) sortable);
                    itPrivilegeToRemove = privilegesToRemove.iterator();
                    while (itPrivilegeToRemove.hasNext()) {
                        privilege.setPrivilegeName(itPrivilegeToRemove.next().getName());
                        // Call the service that will remove
                        // the privilege to the group
                        grouperService.removeGroupPrivileges(userConnected, groupToGrant, group.getIdGroup(),
                                privilege);
                    }
                } catch (ESCOBusinessException ebe) {
                    this.handleException(ebe, groupToGrant);
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

        // The list of groups.
        List < Privilege > privileges = null;

        List < Subject > subjects = null;

        ParameterGroup parameterGroup = null;
        Iterator < Parameter > itParam = null;
        Parameter parameter = null;

        if (this.getGroupController().getGroup() != null && !this.getGroupController().getIsCreation()) {

            // Dynamic parameters
            List < String > attributes = new ArrayList < String >();
            IParameterService parameterService = this.getGroupController().getParameterService();

            parameterGroup = parameterService
                    .findParametersByGroup("org.esco.grouperui.group.privileges.attribut");

            // We retrieve the parameters from the database.
            itParam = parameterGroup.getParameters().iterator();
            while (itParam.hasNext()) {
                parameter = itParam.next();
                attributes.add(parameter.getKey());
            }

            // Dynamic source
            Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
            parameterGroup = parameterService.findParametersByGroup("org.esco.grouperui.group.privileges.map");

            itParam = parameterGroup.getParameters().iterator();
            while (itParam.hasNext()) {
                parameter = itParam.next();
                sources.put(parameter.getValue(), SourceTypeEnum.valueOf(parameter.getKey().toUpperCase()));
            }

            // The stem name from which we want to retrieve the privileges.
            String groupName = this.getGroupController().getGroup().getName();

            // The person from which we want to open the grouper session.
            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e1) {
                GroupModificationsPrivilegesController.LOGGER.error("Subject not found", e1);
            } catch (ESCOSubjectNotUniqueException e1) {
                GroupModificationsPrivilegesController.LOGGER.error("Subject not unique", e1);
            }

            // The Membership Type selected via the Radio Button.
            PrivilegesRadioEnum radioType = PrivilegesRadioEnum.fromLabel(thePrivilegeType.toUpperCase());
            if (radioType == null) {
                radioType = PrivilegesRadioEnum.IMMEDIATE;
            }

            // The list of Subject corresponding to the find parameters.
            privileges = this.getGroupController().getGrouperService().findGroupPrivileges(userConnected,
                    attributes, sources, groupName, ScopeEnum.valueOf(radioType.name()));

            GroupPrivileges groupPrivileges = new GroupPrivileges(privileges);
            subjects = groupPrivileges.getSubjects();

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
            Set < String > keySet = this.updatedGroups.keySet();
            List < Sortable > sortables = this.storedData.getListOfSortable();
            for (String key : keySet) {
                Iterator < Sortable > itSortable = sortables.iterator();
                boolean findItem = false;
                while (itSortable.hasNext() && !findItem) {
                    Subject aSubject = (Subject) itSortable.next();
                    if (aSubject.getId().equals(key)) {
                        this.storedData.delRowDataResult(aSubject);
                        this.storedData.addRowDataResult(this.updatedGroups.get(key));
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
    public void doAddSubject(final Subject subject) {
        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e1) {
        } catch (ESCOSubjectNotUniqueException e1) {
        }

        List < Privilege > privileges = null;
        String currentGroupName = this.getGroupController().getGroup().getName();
        // In creation mode, the name of the current group is empty
        if (!"".equals(currentGroupName)) {
            privileges = this.getGroupController().getGrouperService().findDefaultGroupPrivileges(userConnected,
                    currentGroupName);
        }

        // Retrieving the highest privilege //
        subject.setSubjectRight(GroupPrivilegeEnum.NONE);
        GroupPrivilegeEnum currentLevel = null;
        if (privileges != null) {
            for (Privilege currentPrivilege : privileges) {
                currentLevel = GroupPrivilegeEnum.fromValue(currentPrivilege.getPrivilegeName());

                // OptIn case
                if (GroupPrivilegeEnum.OPTIN.equals(currentLevel)) {
                    subject.setOptin(true);
                }

                // OptOut case
                if (GroupPrivilegeEnum.OPTOUT.equals(currentLevel)) {
                    subject.setOptout(true);
                }

                // Privileges case
                if (currentLevel.gt(subject.getSubjectRight())) {
                    subject.setSubjectRight(currentLevel);
                }
            }
        }
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
        // If need to add to update list.
        boolean needToAdd = false;

        String optin = this.getParam("optin");
        String optout = this.getParam("optout");
        String view = this.getParam("view");
        String read = this.getParam("read");
        String update = this.getParam("update");
        String administrate = this.getParam("administrate");

        Subject updateSubject = (Subject) this.getAddedItem(elementID);

        if (updateSubject == null) {
            updateSubject = (Subject) this.updatedGroups.get(elementID);
            if (updateSubject == null) {
                Subject aux = (Subject) this.getItem(elementID);
                if (aux.getValueFormCol("canOptin") == null) {
                    aux.addMappingFieldCol("canOptin", ESCOConstantes.FALSE);
                }
                if (aux.getValueFormCol("canOptout") == null) {
                    aux.addMappingFieldCol("canOptout", ESCOConstantes.FALSE);
                }
                updateSubject = (Subject) aux.clone();
                this.originalGroups.put(elementID, aux);
                needToAdd = true;
            }
        }

        GroupPrivilegeEnum theRight = updateSubject.getSubjectRight();

        if (theRight == null) {
            theRight = GroupPrivilegeEnum.NONE;
        }

        if (optin != null) {
            // OptIn is true
            if (optin.equals(ESCOConstantes.TRUE)) {
                // Adding the VIEW privilege
                if (theRight.eq(GroupPrivilegeEnum.NONE)) {
                    updateSubject.setSubjectRight(GroupPrivilegeEnum.VIEW);
                }
            }
            // Adding the OptIn
            updateSubject.addMappingFieldCol("canOptin", Boolean.valueOf(optin.equals(ESCOConstantes.TRUE))
                    .toString());
        }

        if (optout != null) {
            // OptOut is true
            if (optout.equals(ESCOConstantes.TRUE)) {
                // Adding the VIEW privilege
                if (theRight.eq(GroupPrivilegeEnum.NONE)) {
                    updateSubject.setSubjectRight(GroupPrivilegeEnum.VIEW);
                }
            }
            updateSubject.addMappingFieldCol("canOptout", Boolean.valueOf(optout.equals(ESCOConstantes.TRUE))
                    .toString());
        }

        if (view != null) {
            if (view.equals(ESCOConstantes.TRUE)) {
                updateSubject.setSubjectRight(GroupPrivilegeEnum.VIEW);
            } else {
                updateSubject.setSubjectRight(GroupPrivilegeEnum.NONE);
                updateSubject.setOptin(false);
                updateSubject.setOptout(false);
            }
        }
        if (read != null) {
            if (read.equals(ESCOConstantes.TRUE)) {
                updateSubject.setSubjectRight(GroupPrivilegeEnum.READ);
            } else {
                updateSubject.setSubjectRight(GroupPrivilegeEnum.VIEW);
            }
        }
        if (update != null) {
            if (update.equals(ESCOConstantes.TRUE)) {
                updateSubject.setSubjectRight(GroupPrivilegeEnum.UPDATE);
            } else {
                updateSubject.setSubjectRight(GroupPrivilegeEnum.READ);
            }
        }
        if (administrate != null) {
            if (administrate.equals(ESCOConstantes.TRUE)) {
                updateSubject.setSubjectRight(GroupPrivilegeEnum.ADMIN);
            } else {
                updateSubject.setSubjectRight(GroupPrivilegeEnum.UPDATE);
            }
        }

        // Only one group in the list of group of the members class because
        // we add it to convert group to subject.
        if (needToAdd) {
            this.updatedGroups.put(elementID, updateSubject);
        } else {
            Sortable theOrignGroup = this.originalGroups.get(elementID);
            if (theOrignGroup != null) {
                if (theOrignGroup.getValueFormCol(ESCOConstantes.USER_RIGHT_VALUE).toUpperCase().equals(
                        updateSubject.getValueFormCol(ESCOConstantes.USER_RIGHT_VALUE).toUpperCase())) {
                    if (theOrignGroup.getValueFormCol("canOptin").toUpperCase().equals(
                            updateSubject.getValueFormCol("canOptin").toUpperCase())) {
                        if (theOrignGroup.getValueFormCol("canOptout").toUpperCase().equals(
                                updateSubject.getValueFormCol("canOptout").toUpperCase())) {
                            // The updateGroup and origin is same.
                            this.updatedGroups.remove(elementID);
                            this.originalGroups.remove(elementID);
                        }
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
            if (this.updatedGroups.containsKey(aSubject.getId())) {
                this.updatedGroups.remove(aSubject.getId());
                this.originalGroups.remove(aSubject.getId());
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
        if (!this.getGroupController().getIsCreation()) {
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
        boolean creation = this.getGroupController().getIsCreation();

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
        List < Sortable > addedGroupPrivilegesToRemove = new ArrayList < Sortable >();
        Iterator < Sortable > itAddGroupPrivileges = this.addedData.iterator();
        while (itAddGroupPrivileges.hasNext()) {
            sortable = itAddGroupPrivileges.next();
            if (index.equals(((Subject) sortable).getId())) {
                addedGroupPrivilegesToRemove.add(sortable);
            }
        }
        Iterator < Sortable > itRemAddedGroupPrivileges = addedGroupPrivilegesToRemove.iterator();
        while (itRemAddedGroupPrivileges.hasNext()) {
            sortable = itRemAddedGroupPrivileges.next();
            this.addedData.remove(sortable);
            this.errorData.remove(sortable);
        }

        // Discard the modifications on deleted group privileges.
        List < Sortable > deletedGroupPrivilegesToRemove = new ArrayList < Sortable >();
        Iterator < Sortable > itDelGroupPrivileges = this.deletedData.iterator();
        while (itDelGroupPrivileges.hasNext()) {
            sortable = itDelGroupPrivileges.next();
            if (index.equals(((Subject) sortable).getId())) {
                deletedGroupPrivilegesToRemove.add(sortable);
            }
        }
        Iterator < Sortable > itRemDeletedGroupPrivileges = deletedGroupPrivilegesToRemove.iterator();
        while (itRemDeletedGroupPrivileges.hasNext()) {
            sortable = itRemDeletedGroupPrivileges.next();
            this.deletedData.remove(sortable);
            this.errorData.remove(sortable);
        }

        // Discard the modifications on updated stem privileges.
        List < Sortable > updatedGroupPrivilegesToRemove = new ArrayList < Sortable >();
        Iterator < Sortable > itStemPrivilege = this.data.iterator();
        while (itStemPrivilege.hasNext()) {
            Subject currentSubject = (Subject) itStemPrivilege.next();
            if (index.equals(currentSubject.getId())) {
                Sortable updateGroupPrivilege = this.updatedGroups.get(currentSubject.getId());
                if (updateGroupPrivilege != null) {
                    updatedGroupPrivilegesToRemove.add(updateGroupPrivilege);
                }
            }
        }
        Iterator < Sortable > itRemUpdatedGroupPrivileges = updatedGroupPrivilegesToRemove.iterator();
        while (itRemUpdatedGroupPrivileges.hasNext()) {
            sortable = itRemUpdatedGroupPrivileges.next();
            this.updatedGroups.remove(((Subject) sortable).getId());
            this.originalGroups.remove(((Subject) sortable).getId());
            Iterator < Sortable > iterator = this.errorData.iterator();
            while (iterator.hasNext()) {
                Sortable sortable2 = iterator.next();
                if (sortable2.getValueFormCol("id").equals(sortable.getValueFormCol("id"))) {
                    this.errorData.remove(sortable);
                }
            }
        }

    }

    /**
     * {@inheritDoc}
     */
    public List < String > getErrorClassesNames() {
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
