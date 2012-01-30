package org.esco.grouperui.web.controllers.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.faces.model.SelectItem;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.MembershipsRadioEnum;
import org.esco.grouperui.web.beans.group.StoredData;
import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.summary.TypeDataSmmary;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * It is the abstract controller of the tab Memberships in all memberships
 * controller.
 */
public abstract class AbstractMembershipsController extends AbstractControllerAware {

    /**
     * The default generated uid of the class.
     */
    private static final long      serialVersionUID = 929054071668635331L;

    /**
     * The current tab type.
     */
    protected MembershipsRadioEnum memberTypeEnum;

    /**
     * Retrieve the list of Memberships (Group) of the current group.
     * 
     * @param theGrouperService
     *            The grouper service.
     * @param theSubjectId
     *            the subject witch want to retrieve memberships.
     * @return the xml with the value if there some rows to return.
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     */
    public String abstractFindMemberships(final IGrouperService theGrouperService, final String theSubjectId)
            throws ESCOGroupNotFoundException, ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {

        String theMembershipType = this.getParam("membershipType");

        // Set the default Membership type if null.
        if (theMembershipType == null) {
            this.memberTypeEnum = MembershipsRadioEnum.IMMEDIATE;
        } else {
            this.memberTypeEnum = MembershipsRadioEnum.valueOf(MembershipsRadioEnum.fromLabel(theMembershipType)
                    .name());
        }

        this.data.clear();
        Members member = new Members();

        // The list of groups.
        List < Group > groups = null;

        if (theSubjectId != null) {

            // The group name from which we want to retrieve the memberships.
            groups = theGrouperService.findMemberships(PersonController.getConnectedPerson(), theSubjectId,
                    ScopeEnum.valueOf(this.memberTypeEnum.name()));

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
    public String abstractDataResult() {

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
    @Override
    public boolean addAdded() {
        return this.memberTypeEnum != MembershipsRadioEnum.EFFECTIVE;
    }

    /**
     * Get the list of resume to the memberships tabs.
     * 
     * @param theLabelOfTitle
     *            : The title of the resume.
     * @param theControllerClass
     *            : The class odf the parent controller.
     * @return The list of resume.
     */
    public List < Resume > getListResumeMembership(final String theLabelOfTitle, final Class theControllerClass) {
        List < Resume > listResume = new ArrayList < Resume >();
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();
        Sortable sortable;
        List < String > cells = null;

        colNames.add(new ColInfo("displayExtension"));
        colNames.add(new ColInfo("displayName"));

        resume.setColInfos(colNames);

        // Iterate on the added memberships.
        Iterator < Sortable > itAddMemb = this.addedData.iterator();
        while (itAddMemb.hasNext()) {
            sortable = itAddMemb.next();

            cells = new ArrayList < String >();

            indexs.add(sortable.getValueFormCol("id"));

            cells.add(sortable.getValueFormCol("displayExtension"));
            cells.add(sortable.getValueFormCol("displayName"));

            // Is the membership in error ?
            if (this.errorData.contains(sortable)) {
                typeData.add(TypeDataSmmary.ERROR.name());
            } else
                // Has the membership already been added successfully ?
                if (sortable.isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.ADDED.name());
                }

            datas.add(cells);
        }

        // Iterate on the deleted memberships.
        Iterator < Sortable > itDelMemb = this.deletedData.iterator();
        while (itDelMemb.hasNext()) {
            sortable = itDelMemb.next();

            cells = new ArrayList < String >();

            indexs.add(sortable.getValueFormCol("id"));

            cells.add(sortable.getValueFormCol("displayExtension"));
            cells.add(sortable.getValueFormCol("displayName"));

            // Is the membership in error ?
            if (this.errorData.contains(sortable)) {
                typeData.add(TypeDataSmmary.ERROR.name());
            } else
                // Has the membership already been deleted successfully ?
                if (sortable.isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.DELETED.name());
                }

            datas.add(cells);
        }

        resume.setTitle(theLabelOfTitle);
        resume.setColInfos(colNames);
        resume.setIndex(indexs);
        resume.setControllerClass(theControllerClass.getName());
        resume.setData(datas);
        resume.setTypeData(typeData);
        resume.setSaved(typeData.contains(TypeDataSmmary.SAVED.name()) && this.errorData.size() == 0);

        listResume.add(resume);

        this.errorClassesNames.clear();
        this.errorData.clear();

        return listResume;

    }

    /**
     * Get if exist some errors.
     * 
     * @return The status result.
     */
    public Status isExistSomeErrors() {
        Status result = null;
        if (this.errorClassesNames.isEmpty()) {
            result = new Status(Boolean.TRUE);
        } else {
            result = new Status(Boolean.FALSE);
        }
        return result;
    }

    /**
     * Get the list of the membership radio.
     * 
     * @return a list of SelectIem for the radio button.
     */
    public List < SelectItem > getListMembershipsRadio() {
        MembershipsRadioEnum[] enums = MembershipsRadioEnum.values();

        List < SelectItem > selectItems = new ArrayList < SelectItem >();

        for (MembershipsRadioEnum membershipsRadio : enums) {
            selectItems.add(new SelectItem(membershipsRadio.getLabel(), this
                    .getString(membershipsRadio.getLabel())));
        }

        return selectItems;
    }

    /**
     * The default radio for memberships.
     * 
     * @return the default label for memberships radio.
     */
    public MembershipsRadioEnum getDefaultMembershipsRadio() {
        return MembershipsRadioEnum.IMMEDIATE;
    }

    /**
     * {@inheritDoc}
     */
    public void discardModification(final String theIndex) {

        // Discard the modifications on added group privileges.
        Sortable sortableToRemove = null;
        for (Sortable sortable : this.addedData) {
            if (theIndex.equals(((Subject) sortable).getId())) {
                sortableToRemove = sortable;
                break;
            }
        }

        // Discard modifications on deleted group privileges.
        for (Sortable sortable : this.deletedData) {
            if (theIndex.equals(((Subject) sortable).getId())) {
                sortableToRemove = sortable;
                break;
            }
        }

        if (sortableToRemove != null) {
            this.addedData.remove(sortableToRemove);
            this.deletedData.remove(sortableToRemove);
            sortableToRemove = null;
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
     * Setter of the memberTypeEnum property.
     * 
     * @param memberTypeEnum
     *            the memberTypeEnum to set
     */
    public void setMemberTypeEnum(final MembershipsRadioEnum memberTypeEnum) {
        this.memberTypeEnum = memberTypeEnum;
    }

    /**
     * Get the memberTypeEnum property.
     * 
     * @return the memberTypeEnum
     */
    public MembershipsRadioEnum getMemberTypeEnum() {
        return this.memberTypeEnum;
    }
}
