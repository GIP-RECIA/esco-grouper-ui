package org.esco.grouperui.web.controllers.groupProperties;

import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.PrivilegesRadioEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.controllers.GroupController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.utils.AbstractPrivilegeGroupController;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class GroupPrivilegesGroupController. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class GroupPrivilegesGroupController extends AbstractPrivilegeGroupController {

    /**
     * The UID of the class.
     */
    private static final long        serialVersionUID = 1276822780935740635L;

    /** Logger. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(GroupPrivilegesGroupController.class);

    /**
     * Default constructor.
     */
    public GroupPrivilegesGroupController() {
        super();
    }

    /**
     * get TabsController for this tab and cast it in appropriate class.
     * 
     * @return GroupController.
     */
    public GroupController getGroupController() {
        return (GroupController) super.getTabsController();
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        return this.abstractGetListResume("PRIVILEGE_ON_GROUP", GroupPrivilegesGroupController.class);
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {

        Boolean status = null;

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorData.clear();

        String groupUiid = this.getGroupController().getGroup().getIdGroup();
        IGrouperService grouperService = this.getGroupController().getGrouperService();

        // Update privileges to the group.
        for (Sortable sortable : this.data) {
            Group currentGroup = (Group) this.subjectToSortable.wrap((Subject) sortable);
            Sortable updateGroupPrivilege = this.subjectToSortable.wrap((Subject) this.updatedGroups
                    .get(currentGroup.getIdGroup()));
            if (updateGroupPrivilege != null && !updateGroupPrivilege.isSaved()) {

                this.assignOrRemovePrivilege(grouperService, true, updateGroupPrivilege, currentGroup, groupUiid);
                this.assignOrRemovePrivilege(grouperService, false, updateGroupPrivilege, currentGroup, groupUiid);
            }
        }

        // Add privileges to the group.
        for (Sortable sortable : this.addedData) {
            this.assignOrRemovePrivilege(grouperService, true, this.subjectToSortable.wrap((Subject) sortable),
                    null, groupUiid);
        }

        // Delete privileges to the group.
        for (Sortable sortable : this.deletedData) {
            this.assignOrRemovePrivilege(grouperService, false, this.subjectToSortable.wrap((Subject) sortable),
                    null, groupUiid);
        }

        if (this.errorClassesNames.isEmpty()) {
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
    public void doAddGroup(final Group group) {
        Person person = null;
        try {
            person = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e1) {
        } catch (ESCOSubjectNotUniqueException e1) {
        }

        List < Privilege > privileges = this.getGroupController().getGrouperService().findDefaultGroupPrivileges(
                person, group.getName());

        // Retrieving the highest privilege //
        group.setUserRight(GroupPrivilegeEnum.NONE);
        Privilege currentPrivilege = null;
        Iterator < Privilege > itPrivilege = privileges.iterator();
        while (itPrivilege.hasNext()) {
            currentPrivilege = itPrivilege.next();
            GroupPrivilegeEnum currentLevel = GroupPrivilegeEnum.fromValue(currentPrivilege.getPrivilegeName());

            // OptIn case
            if (GroupPrivilegeEnum.OPTIN.equals(currentLevel)) {
                group.setCanOptin(true);
            }

            // OptOut case
            if (GroupPrivilegeEnum.OPTOUT.equals(currentLevel)) {
                group.setCanOptout(true);
            }

            // Privileges case
            if (currentLevel.gt(group.getUserRight())) {
                group.setUserRight(currentLevel);
            }
        }
    }

    /**
     * Retrieve the list of Memberships (Group) of the current group.
     * 
     * @return the xml status.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     * @throws CloneNotSupportedException
     *             if the clone operation failed.
     */
    public String findPrivileges() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            CloneNotSupportedException {

        String thePrivilegeType = this.getParam("privilegeType");

        // Set the default Membership type if null.
        if (thePrivilegeType == null) {
            this.privilegeScopeEnum = PrivilegesRadioEnum.IMMEDIATE;
        } else {
            this.privilegeScopeEnum = PrivilegesRadioEnum.valueOf(PrivilegesRadioEnum.fromLabel(thePrivilegeType)
                    .name());
        }

        // this.clearContext();
        this.data.clear();

        Members member = new Members();
        // Initializing.
        this.getGroupController().initGroupAttributes();

        // The list of groups.
        List < Group > groups = null;

        if (this.getGroupController().getGroup() != null) {

            // The group id from which we want to retrieve the privileges.
            String groupId = this.getGroupController().getGroup().getIdGroup();

            // The person from which we want to open the grouper session.
            Person person = null;
            try {
                person = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e) {
                GroupPrivilegesGroupController.LOGGER.error(e, "Subject not found");
            } catch (ESCOSubjectNotUniqueException e) {
                GroupPrivilegesGroupController.LOGGER.error(e, "Subject not unique");
            }

            groups = this.getGroupController().getGrouperService().findSubjectPrivilegesGroup(person, groupId,
                    ScopeEnum.valueOf(this.privilegeScopeEnum.name()));

            // Adding the groups.
            Iterator < Group > itGroup = groups.iterator();
            while (itGroup.hasNext()) {
                member.addGroup(itGroup.next());
            }

            Iterator < Subject > itSubject = member.getSubjects().iterator();
            while (itSubject.hasNext()) {
                this.data.add(itSubject.next());
            }
        }

        this.addedItems();

        if (this.storedData != null) {
            this.storedData.setUnSelectAll();
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(this.isRowToReturn()));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Output the data as an XML stream.
     * 
     * @return the XML data.
     */
    public String dataResult() {
        return this.abstractDataResult();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void doDelete(final List < Sortable > theList) {
        Iterator < Sortable > itSortable = theList.iterator();
        while (itSortable.hasNext()) {
            Subject aGroup = (Subject) itSortable.next();
            if (this.updatedGroups.containsKey(aGroup.getId())) {
                this.updatedGroups.remove(aGroup.getId());
            }
        }
    }

}
