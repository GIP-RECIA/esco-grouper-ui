package org.esco.grouperui.web.controllers.person;

import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.PrivilegesRadioEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.utils.AbstractPrivilegeGroupController;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * It is the controller of the tab Privileges on group in the person properties.
 * Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
public class PersonPrivilegesGroupController extends AbstractPrivilegeGroupController {

    /**
     * The default serial id generated.
     */
    private static final long serialVersionUID = -271818961669744632L;

    /**
     * Default constructor.
     */
    public PersonPrivilegesGroupController() {
        super();
    }

    /**
     * get TabsController for this tab and cast it in appropriate class.
     * 
     * @return PersonController.
     */
    public PersonController getPersonController() {
        return (PersonController) super.getTabsController();
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

        List < Privilege > privileges = this.getPersonController().getGrouperService().findDefaultGroupPrivileges(
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
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     */
    public String findPrivileges() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {

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
        // The list of groups.
        List < Group > groups = null;

        if (this.getPersonController().getPerson() != null) {

            // The group name from which we want to retrieve the privileges.
            String personUuid = this.getPersonController().getPerson().getId();

            // The person from which we want to open the grouper session.
            Person person = PersonController.getConnectedPerson();

            groups = this.getPersonController().getGrouperService().findSubjectPrivilegesGroup(person, personUuid,
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

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        return this.abstractGetListResume("PERSON.PRIVILEGES.OF.GROUP", PersonPrivilegesGroupController.class);
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {

        Boolean status = null;

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorData.clear();

        String personUiid = this.getPersonController().getPerson().getId();
        IGrouperService grouperService = this.getPersonController().getGrouperService();

        // Update privileges to the group.
        for (Sortable sortable : this.data) {
            Group currentGroup = (Group) this.subjectToSortable.wrap((Subject) sortable);
            Sortable updateGroupPrivilege = this.subjectToSortable.wrap((Subject) this.updatedGroups
                    .get(currentGroup.getIdGroup()));
            if (updateGroupPrivilege != null && !updateGroupPrivilege.isSaved()) {

                this.assignOrRemovePrivilege(grouperService, true, updateGroupPrivilege, currentGroup, personUiid);
                this
                        .assignOrRemovePrivilege(grouperService, false, updateGroupPrivilege, currentGroup,
                                personUiid);
            }
        }

        // Add privileges to the group.
        for (Sortable sortable : this.addedData) {
            this.assignOrRemovePrivilege(grouperService, true, this.subjectToSortable.wrap((Subject) sortable),
                    null, personUiid);
        }

        // Delete privileges to the group.
        for (Sortable sortable : this.deletedData) {
            this.assignOrRemovePrivilege(grouperService, false, this.subjectToSortable.wrap((Subject) sortable),
                    null, personUiid);
        }

        if (this.errorClassesNames.isEmpty()) {
            status = Boolean.TRUE;
        } else {
            status = Boolean.FALSE;
        }

        return new Status(status);
    }

}
