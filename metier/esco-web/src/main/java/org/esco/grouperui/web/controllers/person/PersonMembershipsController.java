package org.esco.grouperui.web.controllers.person;

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
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.StoredData;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.utils.AbstractMembershipsController;

/**
 * It is the controller of the tab memberships in the person properties.
 * Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
public class PersonMembershipsController extends AbstractMembershipsController {

    /**
     * The default serial id generated.
     */
    private static final long        serialVersionUID = -5318226972895150022L;

    /** Logger. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(PersonMembershipsController.class);

    /**
     * Default constructor.
     */
    public PersonMembershipsController() {
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
     * Retrieve the list of Memberships (Group) of the current group.
     * 
     * @return the xml with the value if there some rows to return.
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     */
    public String findMemberships() throws ESCOGroupNotFoundException, ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {

        return this.abstractFindMemberships(this.getPersonController().getGrouperService(), this
                .getPersonController().getPerson().getId());
    }

    /**
     * Output the data as an XML stream.
     * 
     * @return the XML data.
     */
    public String dataResult() {

        final String theRows = this.getParam("rows");
        final String thePage = this.getParam("page");
        final String theSortBy = this.getParam("sidx");
        final String theSortType = this.getParam("sord");

        // The object that store the data.
        if (this.storedData == null) {
            this.storedData = new StoredData();
        } else {
            this.storedData.cleanListOfSortable();
        }

        this.extractItems();

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
    public Boolean getIsModified() {
        return Boolean.FALSE;
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String theIndex, final String theNewValue) {
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        return this.getListResumeMembership("PERSON_RESUME.MEMBERSHIPS.TITLE", PersonMembershipsController.class);
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {
        String personId = this.getPersonController().getPerson().getId();

        this.errorClassesNames.clear();
        this.errorData.clear();

        // Add members to the group
        Iterator < Sortable > itAddMemb = this.addedData.iterator();
        while (itAddMemb.hasNext()) {
            this.addOrRemoveMembers(true, personId, itAddMemb.next());
        }

        // Remove members from the group
        Iterator < Sortable > itDelMemb = this.deletedData.iterator();
        while (itDelMemb.hasNext()) {
            this.addOrRemoveMembers(false, personId, itDelMemb.next());
        }
        return this.isExistSomeErrors();
    }

    /**
     * Add or remove members to a group.
     * 
     * @param theType
     *            Boolean if true -> add else remove
     * @param theSubject
     *            The subject id to add as members
     * @param theSortable
     *            The sortable to add members.
     */
    public void addOrRemoveMembers(final Boolean theType, final String theSubject, final Sortable theSortable) {
        IGrouperService grouperService = this.getPersonController().getGrouperService();
        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
            PersonMembershipsController.LOGGER.error(e, "Subject not found");
        } catch (ESCOSubjectNotUniqueException e) {
            PersonMembershipsController.LOGGER.error(e, "Subject not unique");
        }
        String groupName = "";
        List < String > members = new ArrayList < String >();
        // If the membership has not already been added
        if (!theSortable.isSaved()) {
            groupName = theSortable.getValueFormCol("name");
            members.add(theSubject);

            try {
                // Call the service that will add the memberships
                if (theType) {
                    grouperService.addMembers(userConnected, groupName, members);
                } else {
                    grouperService.removeMembers(userConnected, groupName, members);
                }

            } catch (ESCOBusinessException ebe) {
                this.handleException(ebe, theSortable.getValueFormCol("id"));
            } finally {
                // If no error, the current element is defined as saved
                if (this.errorClassesNames.isEmpty()) {
                    theSortable.setSaved(Boolean.TRUE);
                } else {
                    theSortable.setSaved(Boolean.FALSE);
                }
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
                    for (Sortable added : this.deletedData) {
                        if (theSubjectId.equals(added.getValueFormCol("id"))) {
                            this.errorData.add(added);
                            break;
                        }
                    }
                }
    }

    public String getAttributeKey(final String theIndex) {
        return null;
    }

}
