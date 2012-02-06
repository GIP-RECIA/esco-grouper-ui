package org.esco.grouperui.web.controllers.groupProperties;

import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Stem;
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
import org.esco.grouperui.web.controllers.utils.AbstractPrivilegeStemController;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class GroupPrivilegesStemController. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
public class GroupPrivilegesStemController extends AbstractPrivilegeStemController {

    /**
     * The UID of the class.
     */
    private static final long        serialVersionUID = 1276822780935740635L;

    /** Logger. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(GroupPrivilegesStemController.class);

    /**
     * Default constructor.
     */
    public GroupPrivilegesStemController() {
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
        return this.abstractGetListResume("PRIVILEGE_ON_STEM", GroupPrivilegesStemController.class);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Status save() {

        IGrouperService grouperService = this.getGroupController().getGrouperService();
        Group group = this.getGroupController().getGroup();

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorData.clear();

        // Update group privileges
        for (Sortable sortable : this.data) {
            Stem currentStem = (Stem) sortable;
            Sortable updateStemPrivilege = this.updatedStem.get(currentStem.getUuid());
            if (updateStemPrivilege != null) {
                this.assignOrRemovePrivilegeToStem(grouperService, group.getIdGroup(), currentStem,
                        updateStemPrivilege, null);
            }
        }

        // Add privileges to the stem.
        for (Sortable sortable : this.addedData) {
            Stem currentStem = (Stem) sortable;
            this
                    .assignOrRemovePrivilegeToStem(grouperService, group.getIdGroup(), currentStem, null,
                            Boolean.TRUE);
        }

        // Remove privileges to the stem.
        for (Sortable sortable : this.deletedData) {
            Stem currentStem = (Stem) sortable;
            this.assignOrRemovePrivilegeToStem(grouperService, group.getIdGroup(), currentStem, null,
                    Boolean.FALSE);
        }

        return this.isExistSomeErrors();
    }

    /**
     * Retrieve the list of Memberships (Group) of the current group.
     * 
     * @return the XML result of the function.
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
        this.getGroupController().resetCurrentPrivilegeOption();

        // Set the default Membership type if null.
        if (thePrivilegeType == null) {
            this.privilegeScopeEnum = PrivilegesRadioEnum.IMMEDIATE;
        } else {
            this.privilegeScopeEnum = PrivilegesRadioEnum.valueOf(PrivilegesRadioEnum.fromLabel(thePrivilegeType)
                    .name());
        }

        // this.clearContext();
        this.data.clear();

        // Initializing.
        this.getGroupController().initGroupAttributes();

        // The list of groups.
        List < Stem > stems = null;

        if (this.getGroupController().getGroup() != null) {

            // The group name from which we want to retrieve the privileges.
            String groupId = this.getGroupController().getGroup().getIdGroup();

            // The person from which we want to open the grouper session.
            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e) {
                GroupPrivilegesStemController.LOGGER.error(e, "Subject not found");
            } catch (ESCOSubjectNotUniqueException e) {
                GroupPrivilegesStemController.LOGGER.error(e, "Subject not unique");
            }
            // The Membership Type selected via the Radio Button.
            PrivilegesRadioEnum radioType = PrivilegesRadioEnum.fromLabel(thePrivilegeType.toUpperCase());
            if (radioType == null) {
                radioType = PrivilegesRadioEnum.IMMEDIATE;
            }

            stems = this.getGroupController().getGrouperService().findSubjectPrivilegesStem(userConnected,
                    groupId, ScopeEnum.valueOf(radioType.name()));
            // Adding the groups to the stored group privileges.
            Iterator < Stem > itStem = stems.iterator();
            while (itStem.hasNext()) {
                Stem current = itStem.next();
                this.data.add(current);
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
            Stem aStem = (Stem) itSortable.next();
            if (this.updatedStem.containsKey(aStem.getUuid())) {
                this.updatedStem.remove(aStem.getUuid());
            }
        }
    }
}
