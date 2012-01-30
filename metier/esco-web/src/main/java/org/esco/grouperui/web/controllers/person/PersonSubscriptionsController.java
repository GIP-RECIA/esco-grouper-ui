package org.esco.grouperui.web.controllers.person;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.XMLResultString;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.I18nExceptionAdapter;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * It is the controller of the tab subscriptions in the person properties.
 * Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
public class PersonSubscriptionsController extends AbstractControllerAware {

    /**
     * The default message exception.
     */
    private static final String DEFAULT_MESSAGE_EXCEPTION  = "DEFAULT_MESSAGE_EXCEPTION";
    /**
     * The web parameter to get the type of subscription(OPTIN or OPTOUT).
     */
    private static final String TYPE_OF_SUBSCRIPTION_PARAM = "typeOfSubscription";
    /**
     * The web parameter to get the group id.
     */
    private static final String GROUP_ID_PARAMS            = "groupId";
    /**
     * The default serial id generated.
     */
    private static final long   serialVersionUID           = -5318226972895150022L;

    /**
     * Default constructor.
     */
    public PersonSubscriptionsController() {
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
     * The method call by ajax to find subscriptions.
     * 
     * @return the producted xml
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     */
    public String findSubscriptions() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        this.findSubscriptionsMethod();
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(this.isRowToReturn()));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Find all the subscriptions of the person.
     * 
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     */
    public void findSubscriptionsMethod() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {

        this.data.clear();
        Members member = new Members();

        // The list of groups.
        List < Group > groups = null;

        if (this.getPersonController().getPerson() != null) {

            // The group name from which we want to retrieve the memberships.
            groups = this.getPersonController().getGrouperService().findGroupsMemberOptinOptout(
                    this.getPersonController().getPerson());

            // Adding the groups to the memberships.
            Iterator < Group > itGroup = groups.iterator();
            while (itGroup.hasNext()) {
                member.addGroup(itGroup.next());
            }

            Iterator < Subject > itSubject = member.getSubjects().iterator();
            while (itSubject.hasNext()) {
                this.data.add(itSubject.next());
            }
        }
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

        this.extractItems();
        this.manageRowsDisplaying();

        this.storedData.setIsExistingAddedItem(this.getIsExistAddedItems());
        this.storedData.setNbResultDisplay(theRows);
        this.storedData.setCurrentPage(thePage);

        TableData tableData = TableDataFactory.populate(this.storedData, this.sortableRowDataWrapper, theSortBy,
                theSortType);

        return this.xmlProducerWrapper.wrap(TableDataFactory.getProducer(tableData));
    }

    /**
     * Remove all the row that is not necessary to display in the grid.
     */
    public void manageRowsDisplaying() {

        List < Sortable > sortablesToAdd = new ArrayList < Sortable >();

        List < Sortable > sortables = this.storedData.getListOfSortable();

        for (Sortable sortable : sortables) {
            String isMember = sortable.getValueFormCol(ESCOConstantes.IS_MEMBER);
            String canOptin = sortable.getValueFormCol(ESCOConstantes.CAN_OPTIN);

            if (!(ESCOConstantes.FALSE.equals(isMember) && ESCOConstantes.FALSE.equals(canOptin))) {
                sortablesToAdd.add(sortable);
            }
        }
        this.storedData.setListOfSortable(sortablesToAdd);
    }

    /**
     * Subscribe or Unsubscribe to a group.
     * 
     * @return the producted xml
     * @throws ESCOSubjectNotUniqueException
     *             if the user loose the connection.
     * @throws ESCOSubjectNotFoundException
     *             if the user loose the connection.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique
     * @throws ESCOGroupNotFoundException
     *             if the group is not found
     */
    public String subscribeOrUnsubscribeToGroup() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException, ESCOGroupNotFoundException, ESCOGroupNotUniqueException {
        String theGroupId = this.getParam(PersonSubscriptionsController.GROUP_ID_PARAMS);
        String theType = this.getParam(PersonSubscriptionsController.TYPE_OF_SUBSCRIPTION_PARAM);
        Validate.notNull(theGroupId);
        Validate.notNull(theType);

        Sortable theSortable = null;
        IGrouperService grouperService = this.getPersonController().getGrouperService();
        Person userConnected = PersonController.getConnectedPerson();

        for (Sortable sortable : this.data) {
            if (sortable.getValueFormCol(ESCOConstantes.ID_PROPERTY).equals(theGroupId)) {
                theSortable = sortable;
                break;
            }
        }
        if (theSortable == null) {
            // We try to found the group in grouper
            theSortable = grouperService.findGroupByUid(userConnected, theGroupId);
            if (theSortable == null) {
                this.errorClassesNames.add(ESCOGroupNotFoundException.class.getSimpleName());
            }
        }

        if (theSortable != null) {

            List < String > members = new ArrayList < String >();
            members.add(this.getPersonController().getPerson().getId());

            try {
                // Call the service that will add the memberships
                if (theType.equals(GroupPrivilegeEnum.OPTIN.name())) {
                    grouperService.addMembers(userConnected, theSortable.getValueFormCol("name"), members);
                    theSortable.addMappingFieldCol(ESCOConstantes.IS_MEMBER, ESCOConstantes.TRUE);
                } else {
                    grouperService.removeMembers(userConnected, theSortable.getValueFormCol("name"), members,
                            false);
                    theSortable.addMappingFieldCol(ESCOConstantes.IS_MEMBER, ESCOConstantes.FALSE);
                }

            } catch (ESCOBusinessException ebe) {
                this.handleException(ebe, theGroupId);
            }
        }

        if (this.errorClassesNames.isEmpty()) {
            XmlProducer producer = new XmlProducer();
            producer.setTarget(new Status(true));
            producer.setTypesOfTarget(Status.class);
            return this.xmlProducerWrapper.wrap(producer);
        } else {
            // Get the internationalized message and if not exist the default
            // value.
            String theError = I18nExceptionAdapter.getExceptionString(this.getI18nService(),
                    this.errorClassesNames.get(0), PersonSubscriptionsController.DEFAULT_MESSAGE_EXCEPTION);
            XmlProducer producer = new XmlProducer();
            producer.setTarget(new XMLResultString(theError));
            producer.setTypesOfTarget(XMLResultString.class);
            return this.xmlProducerWrapper.wrap(producer);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean addAdded() {
        // Not use because there is not a summary for the person 's
        // subscriptions.
        return false;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean removeDeleted() {
        // Not use because there is not a summary for the person 's
        // subscriptions.
        return false;
    }

    /**
     * {@inheritDoc}
     */
    public Boolean getIsModified() {
        // There is not a summary for the person 's subscriptions.
        return Boolean.FALSE;
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String theIndex, final String theNewValue) {
        // Not use because there is not a summary for the person 's
        // subscriptions.
    }

    /**
     * {@inheritDoc}
     */
    public void discardModification(final String theIndex) {
        // Not use because there is not a summary for the person 's
        // subscriptions.
    }

    /**
     * {@inheritDoc}
     */
    public String getAttributeKey(final String theIndex) {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public List < String > getErrorClassesNames() {
        // Not use because there is not a summary for the person 's
        // subscriptions.
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        // Not use because there is not a summary for the person 's
        // subscriptions.
        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isModified() {
        // Not use because there is not a summary for the person 's
        // subscriptions.
        return false;
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {
        // Not use because there is not a summary for the person 's
        // subscriptions.
        return new Status(Boolean.TRUE);
    }
}
