package org.esco.grouperui.web.controllers.groupProperties;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Response;
import org.esco.grouperui.domaine.beans.Responses;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOAddMemberException;
import org.esco.grouperui.exceptions.business.ESCODeleteMemberException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.controllers.GroupController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.utils.AbstractMembershipsController;

/**
 * Class GroupMembershipsController. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
public class GroupMembershipsController extends AbstractMembershipsController {

    /**
     * The UID of the class.
     */
    private static final long        serialVersionUID = 1276822780935740635L;

    /** Logger. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(GroupMembershipsController.class);

    /**
     * Default constructor.
     */
    public GroupMembershipsController() {
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
        return this.getListResumeMembership("membership_view.label", GroupMembershipsController.class);
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {

        String groupId = this.getGroupController().getGroup().getIdGroup();

        this.errorClassesNames.clear();
        this.errorData.clear();

        // Add memberships to the group
        Iterator < Sortable > itAddMemb = this.addedData.iterator();
        while (itAddMemb.hasNext()) {
            this.addOrRemoveMemberships(true, groupId, itAddMemb.next());
        }

        // Remove memberships from the group
        Iterator < Sortable > itDelMemb = this.deletedData.iterator();
        while (itDelMemb.hasNext()) {
            this.addOrRemoveMemberships(false, groupId, itDelMemb.next());
        }

        return this.isExistSomeErrors();
    }

    /**
     * Add or remove memberships to a group.
     * 
     * @param theType
     *            Boolean if true -> add else remove
     * @param theGroupId
     *            The id of the group to add as member
     * @param theSortable
     *            The memberships to add to the group.
     */
    public void addOrRemoveMemberships(final Boolean theType, final String theGroupId, final Sortable theSortable) {

        IGrouperService grouperService = this.getGroupController().getGrouperService();
        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
            GroupMembershipsController.LOGGER.error(e, "Subject not found");
        } catch (ESCOSubjectNotUniqueException e) {
            GroupMembershipsController.LOGGER.error(e, "Subject not unique");
        }

        String membership = "";
        List < String > currentGroup = new ArrayList < String >();
        // If the membership has not already been added
        if (!theSortable.isSaved()) {
            membership = theSortable.getValueFormCol("name");
            currentGroup.add(theGroupId);

            try {
                if (theType) {
                    // Call the service that will add the memberships
                    grouperService.addMembers(userConnected, membership, currentGroup);
                } else {
                    // Call the service that will remove the memberships
                    grouperService.removeMembers(userConnected, membership, currentGroup);
                }
                theSortable.setSaved(Boolean.TRUE);
            } catch (ESCOBusinessException ebe) {
                theSortable.setSaved(Boolean.FALSE);
                this.handleException(ebe, theSortable.getValueFormCol("id"));
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void doSpecificException(final ESCOBusinessException theEbe, final String theSubjectId) {
        if (theEbe instanceof ESCOAddMemberException) {
            Responses responses = ((ESCOAddMemberException) theEbe).getResponses();
            for (Response response : responses.getResponses()) {
                for (Sortable added : this.addedData) {
                    if (response.getEntry().equals(added.getValueFormCol("id"))) {
                        this.errorData.add(added);
                        break;
                    }
                }
            }
        } else
            if (theEbe instanceof ESCODeleteMemberException) {
                Responses responses = ((ESCODeleteMemberException) theEbe).getResponses();
                for (Response response : responses.getResponses()) {
                    for (Sortable added : this.deletedData) {
                        if (response.getEntry().equals(added.getValueFormCol("id"))) {
                            this.errorData.add(added);
                            break;
                        }
                    }
                }
            } else
                if (theEbe instanceof ESCOInsufficientPrivilegesException) {
                    boolean found = false;
                    for (Sortable added : this.addedData) {
                        if (theSubjectId.equals(added.getValueFormCol("id"))) {
                            this.errorData.add(added);
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        for (Sortable added : this.deletedData) {
                            if (theSubjectId.equals(added.getValueFormCol("id"))) {
                                this.errorData.add(added);
                                break;
                            }
                        }
                    }
                }
    }

    /**
     * Retrieve the list of Memberships (Group) of the current group.
     * 
     * @return the xml with the value if there some rows to return.
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     * @throws CloneNotSupportedException
     *             if the clone operation failed.
     */
    public String findMemberships() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException, CloneNotSupportedException {

        // Initializing.
        this.getGroupController().initGroupAttributes();

        return this.abstractFindMemberships(this.getGroupController().getGrouperService(), this
                .getGroupController().getGroupUuid());
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
    public void applyModification(final String theIndex, final String theNewValue) {
    }

    /**
     * {@inheritDoc}
     */
    public String getAttributeKey(final String theIndex) {
        return null;
    }

}
