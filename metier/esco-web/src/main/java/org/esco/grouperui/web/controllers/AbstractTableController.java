/**
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.esco.grouperui.web.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.ISortableWrapper;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.StoredData;
import org.esco.grouperui.web.controllers.search.SearchController;
import org.esco.grouperui.web.controllers.search.StemSearchController;
import org.esco.grouperui.web.utils.FaceContextUtils;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Abstract class than permits to manage the addition search and delete
 * selection.<br />
 * Requirements: [RECIA-ESCO-L1-007] [RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
public abstract class AbstractTableController extends AbstractContextAwareController {

    /**
     * The serial UID of the class.
     */
    private static final long                  serialVersionUID = 1074456223726523539L;

    /**
     * the default logger.
     */
    private static final IESCOLogger           LOGGER           = ESCOLoggerFactory
                                                                        .getLogger(AbstractTableController.class);

    /** The current list of members of the said group. */
    protected List < Sortable >                data;

    /** The added data. */
    protected List < Sortable >                addedData;

    /** The data in error. */
    protected List < Sortable >                errorData;

    /** The deleted data. */
    protected List < Sortable >                deletedData;

    /** The errors that occurred while saving the modifications. */
    protected List < String >                  errorClassesNames;

    /** The RowData wrapper. */
    protected ISortableWrapper                 sortableRowDataWrapper;

    /** The xmlProducer wrapper. */
    protected IWrapper < XmlProducer, String > xmlProducerWrapper;

    /** The data in the table data. */
    protected StoredData                       storedData;

    /**
     * Default constructor.
     */
    public AbstractTableController() {
        this.data = new ArrayList < Sortable >();
        this.addedData = new ArrayList < Sortable >();
        this.deletedData = new ArrayList < Sortable >();
        this.errorData = new ArrayList < Sortable >();
        this.errorClassesNames = new ArrayList < String >();
    }

    /**
     * Clear all the data in the different list.
     */
    public void clear() {
        this.addedData.clear();
        this.deletedData.clear();
        this.errorData.clear();
        this.errorClassesNames.clear();
        this.clearContext();
    }

    /**
     * Clear the context data when the type of privilege change.
     */
    public void clearContext() {
        if (this.addedData != null) {
            for (int i = 0; i < this.addedData.size(); i++) {
                this.addedData.get(i).setSelected(false);
            }
        }
        if (this.storedData != null) {
            this.storedData.cleanListOfSortable();
        }
        if (this.data != null) {
            this.data.clear();
        }
    }

    /**
     * If after the find member, there is some result to the dataresult
     * function.
     * 
     * @return true if result
     */
    public Boolean isRowToReturn() {

        int cpt = 0;
        cpt += this.addedData.size();
        cpt += this.data.size();
        cpt -= this.deletedData.size();
        return cpt > 0;

    }

    /**
     * Extra function to check if there is any modification.
     * 
     * @return true.
     */
    public boolean doIsModified() {
        return true;
    }

    /**
     * Get if the data have been modified.
     * 
     * @return True if data modified else false.
     */
    public boolean isModified() {
        boolean result = false;
        if (!this.doIsModified() || !this.addedData.isEmpty() || !this.deletedData.isEmpty()) {
            result = true;
        }
        return result;
    }

    /**
     * Get if the user add some members.
     * 
     * @return the result in xml format.
     */
    public String getIsExistAddedItems() {
        Boolean result = Boolean.FALSE;
        if (this.addedData != null && this.addedData.size() > 0) {
            result = Boolean.TRUE;
        }
        if (this.deletedData != null && this.deletedData.size() > 0) {
            result = Boolean.TRUE;
        }

        return result.toString();
    }

    /**
     * Get the item in the added list.
     * 
     * @param theIdItem
     *            The id of item searched.
     * @return the item searched.
     */
    public Sortable getAddedItem(final String theIdItem) {
        Sortable result = null;
        Iterator < Sortable > itSortable = this.addedData.iterator();
        while (itSortable.hasNext()) {
            Sortable sortable = itSortable.next();
            try {
                Subject subject = (Subject) sortable;
                if (subject.getId().equals(theIdItem)) {
                    result = subject;
                    break;
                }
            } catch (ClassCastException e) {
                // It is a folder and not a subject
                Stem stem = (Stem) sortable;
                if (stem.getUuid().equals(theIdItem)) {
                    result = stem;
                    break;
                }
            }
        }

        return result;
    }

    /**
     * Get the item in the grouper list.
     * 
     * @param theIdItem
     *            The id of item searched.
     * @return the item searched.
     */
    public Sortable getItem(final String theIdItem) {
        Sortable result = null;
        Iterator < Sortable > itSortable = this.data.iterator();
        while (itSortable.hasNext()) {
            Sortable sortable = itSortable.next();
            try {
                Subject subject = (Subject) sortable;
                if (subject.getId().equals(theIdItem)) {
                    result = subject;
                    break;
                }
            } catch (ClassCastException e) {
                // It is a folder and not a subject
                Stem stem = (Stem) sortable;
                if (stem.getUuid().equals(theIdItem)) {
                    result = stem;
                    break;
                }
            }
        }

        return result;
    }

    /**
     * Get if all item are selected.
     * 
     * @return true if all item are selected.
     */
    public String getIsSelectedAll() {
        String result = Boolean.FALSE.toString();
        if (this.storedData != null) {
            result = this.storedData.getIsAllItemsSelected();
        }
        return result;
    }

    /**
     * Permits to all child class to personalize the deleteItems function.
     * 
     * @param theList
     *            The list of items deleted.
     */
    public void doDelete(final List < Sortable > theList) {
    }

    /**
     * Delete group in the group property.
     * 
     * @return the xml result.
     */
    public String deleteItems() {

        List < Sortable > deletedGroup = this.storedData.getSelected();
        this.doDelete(deletedGroup);

        for (Sortable sortable : deletedGroup) {
            if (this.data.contains(sortable)) {
                this.deletedData.add(sortable);
            } else
                if (this.addedData.contains(sortable)) {
                    this.addedData.remove(sortable);
                }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(this.isRowToReturn()));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Set select all rows in the storedPrivilegesGroup property.
     * 
     * @return the xml result.
     */
    public String selectedRows() {
        final String theRows = this.getParam("rows");
        final String theTypeOfSelect = this.getParam("typeOfSelect");
        Boolean result = null;

        if ("all".equals(theTypeOfSelect)) {
            result = this.storedData.setSelectAll();
        } else
            if ("unselectall".equals(theTypeOfSelect)) {
                result = this.storedData.setUnSelectAll();
            } else {

                if (theRows == null || "".equals(theRows)) {
                    result = this.storedData.setSelected(new String[0]);
                } else {
                    result = this.storedData.setSelected(theRows.split(","));
                }
            }
        // Create and return the XML status.
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(result));
        producer.setTypesOfTarget(Status.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Permits to all child class to personalize the addedItems function.
     * 
     * @param theGroup
     *            The group to personalize.
     */
    public void doAddGroup(final Group theGroup) {
    }

    /**
     * Permits to all child class to personalize the addedItems function.
     * 
     * @param theStem
     *            The stem to personalize.
     */
    public void doAddStem(final Stem theStem) {
    }

    /**
     * Permits to all child class to personalize the addedItems function.
     * 
     * @param thePerson
     *            The person to personalize.
     */
    public void doAddPerson(final Person thePerson) {
    }

    /**
     * Permits to all child class to personalize the addedItems function.
     * 
     * @param theSubject
     *            The subject to personalize.
     */
    public void doAddSubject(final Subject theSubject) {
    }

    /**
     * Add some members to the added members list.
     */
    public void addedItems() {
        String fromResponse = this.getParam(ESCOConstantes.FROM_RESPONSE);
        FacesContext context = FacesContext.getCurrentInstance();
        Members member = new Members();
        if ("AdditionSearch".equals(fromResponse)) {

            SearchController controller = (SearchController) FaceContextUtils.getValueFromContext(context,
                    "searchController");

            if (controller.isAdditionSearchGroupSearch()) {
                Iterator < Group > itGroups = controller.getSelectedGroup().iterator();
                while (itGroups.hasNext()) {
                    Group group = itGroups.next();
                    this.doAddGroup(group);
                    member.addGroup(group);
                }
            } else {
                Iterator < Person > itPersons = controller.getSelectedPerson().iterator();
                while (itPersons.hasNext()) {
                    Person person = itPersons.next();
                    // add if the person is not the connected person
                    this.doAddPerson(person);
                    member.addPerson(person);
                }
            }

            Iterator < Subject > itSubject = member.getSubjects().iterator();
            while (itSubject.hasNext()) {
                Subject subject = itSubject.next();
                subject.setAdded(true);
                subject.setSelected(false);
                this.doAddSubject(subject);
                boolean founded = false;
                for (int i = 0; i < this.data.size(); i++) {
                    if (((Subject) this.data.get(i)).getId().equals(subject.getId())) {
                        founded = true;
                        break;
                    }
                }

                if (!founded) {
                    if (!this.addedData.contains(subject)) {
                        this.addedData.add(subject);
                        this.deletedData.remove(subject);
                    }
                } else {
                    // Remove the initial item deleted
                    try {
                        for (int i = 0; i < this.deletedData.size(); i++) {
                            if (((Subject) this.deletedData.get(i)).getId().equals(subject.getId())) {
                                this.deletedData.remove(i);
                                break;
                            }
                        }

                    } catch (NullPointerException e) {
                        // NOTHING TO DO
                    }
                }
            }
        } else
            if ("StemSearch".equals(fromResponse)) {
                StemSearchController controller = (StemSearchController) FaceContextUtils.getValueFromContext(
                        context, "stemSearchController");
                Iterator < Stem > itStems = controller.getSelectedStem().iterator();
                while (itStems.hasNext()) {
                    Stem stem = null;
                    try {
                        stem = itStems.next().clone();
                    } catch (CloneNotSupportedException e) {
                        // This exception should never happen
                        AbstractTableController.LOGGER.error(e);
                    }
                    this.doAddStem(stem);
                    stem.setAdded(true);
                    stem.setSelected(false);

                    boolean founded = false;
                    for (int i = 0; i < this.data.size(); i++) {
                        if (((Stem) this.data.get(i)).getUuid().equals(stem.getUuid())) {
                            founded = true;
                            break;
                        }
                    }

                    if (!founded) {
                        if (!this.addedData.contains(stem)) {
                            this.addedData.add(stem);
                            this.deletedData.remove(stem);
                        }
                    } else {
                        // Remove the initial item deleted
                        try {
                            for (int i = 0; i < this.deletedData.size(); i++) {
                                if (((Stem) this.deletedData.get(i)).getUuid().equals(stem.getUuid())) {
                                    this.deletedData.remove(i);
                                    break;
                                }
                            }
                        } catch (NullPointerException e) {
                            // NOTHING TO DO
                        }
                    }
                }
            }
    }

    /**
     * Permits to all child class to personalize the extractItems function.
     * 
     * @return true or false.
     */
    public boolean addAdded() {
        return true;
    }

    /**
     * Permits to all child class to personalize the extractItems function.
     * 
     * @return true or false.
     */
    public boolean removeDeleted() {
        return true;
    }

    /**
     * Permits to all child class to personalize the extractItems function.
     * 
     * @return true or false.
     */
    public boolean addItems() {
        return true;
    }

    /**
     * extract all members to be watch.
     */
    public void extractItems() {
        // merge all list : deleted, addedMembers and members
        if (this.storedData == null) {
            this.storedData = new StoredData();
        } else {
            this.storedData.cleanListOfSortable();
        }

        if (this.addItems()) {
            Iterator < Sortable > itMemb = this.data.iterator();
            while (itMemb.hasNext()) {
                this.storedData.addRowDataResult(itMemb.next());
            }
        }

        if (this.addAdded()) {
            Iterator < Sortable > itAddMemb = this.addedData.iterator();
            while (itAddMemb.hasNext()) {
                this.storedData.addRowDataResult(itAddMemb.next());
            }
        }

        if (this.removeDeleted()) {
            Iterator < Sortable > itDelMemb = this.deletedData.iterator();
            while (itDelMemb.hasNext()) {
                this.storedData.delRowDataResult(itDelMemb.next());
            }
        }
    }

    /**
     * Override if you need to define specific action for exception.
     * 
     * @param theEbe
     *            the exception to be handled.
     * @param theSubjectId
     *            the subject id in error.
     */
    public void doSpecificException(final ESCOBusinessException theEbe, final String theSubjectId) {
    }

    /**
     * @param theEbe
     *            the exception to be handled.
     * @param theSubjectId
     *            the subject id in error.
     */
    public void handleException(final ESCOBusinessException theEbe, final String theSubjectId) {
        AbstractTableController.LOGGER.error(theEbe);
        // Class of the error that will be displayed
        this.errorClassesNames.add(theEbe.getClass().getSimpleName());
        this.doSpecificException(theEbe, theSubjectId);
    }

    /**
     * Setter of the xmlProducerWrapper property.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set
     */
    public void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
    }

    /**
     * Setter of the sortableRowDataWrapper property.
     * 
     * @param theSortableRowDataWrapper
     *            the sortableRowDataWrapper to set
     */
    public void setSortableRowDataWrapper(final ISortableWrapper theSortableRowDataWrapper) {
        this.sortableRowDataWrapper = theSortableRowDataWrapper;
    }

}
