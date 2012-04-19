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
package org.esco.grouperui.web.controllers.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.PrivilegesRadioEnum;
import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.DataTypeEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.summary.TypeDataSmmary;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.groupProperties.PrivilegeDisplayUtils;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * It is the abstract controller of the tab Privileges in all privileges
 * controller. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
public abstract class AbstractPrivilegeGroupController extends AbstractControllerAware {

    /**
     * The default generated id of the class.
     */
    private static final long                serialVersionUID = 6369149959868168663L;

    /**
     * Logger for this class.
     */
    private static final IESCOLogger         LOGGER           = ESCOLoggerFactory
                                                                      .getLogger(AbstractPrivilegeGroupController.class);

    /** The updated group privileges. */
    protected Map < String, Sortable >       updatedGroups;

    /** The original group update privileges. */
    protected Map < String, Sortable >       originalGroups;

    /**
     * Privileges radio enum.
     */
    protected PrivilegesRadioEnum            privilegeScopeEnum;

    /**
     *
     */
    protected IWrapper < Subject, Sortable > subjectToSortable;

    /**
     * The default constructor.
     */
    public AbstractPrivilegeGroupController() {
        this.updatedGroups = new HashMap < String, Sortable >();
        this.originalGroups = new HashMap < String, Sortable >();
    }

    /**
     * The general dataResult of the privilege grid.
     * 
     * @return the xml of the lines in the grid
     */
    public String abstractDataResult() {
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
                    Subject aGroup = (Subject) itSortable.next();
                    if (aGroup.getId().equals(key)) {
                        this.storedData.delRowDataResult(aGroup);
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
     * Allow to update a group privileges.
     * 
     * @return the xml status.
     */
    public String updatePrivilege() {

        String idGroup = this.getParam("idElement");
        // If need to add to update list.
        boolean needToAdd = false;

        String optin = this.getParam("optin");
        String optout = this.getParam("optout");
        String view = this.getParam("view");
        String read = this.getParam("read");
        String update = this.getParam("update");
        String administrate = this.getParam("administrate");

        // We retrieve the updated privileges on group if already updated.
        Subject updateGroup = (Subject) this.getAddedItem(idGroup);

        if (updateGroup == null) {
            updateGroup = (Subject) this.updatedGroups.get(idGroup);
            if (updateGroup == null) {
                updateGroup = (Subject) ((Subject) this.getItem(idGroup)).clone();
                this.originalGroups.put(idGroup, this.getItem(idGroup));
                needToAdd = true;
            }
        }

        GroupPrivilegeEnum theRight = GroupPrivilegeEnum.fromValue(updateGroup
                .getValueFormCol(ESCOConstantes.USER_RIGHT_VALUE));

        if (optin != null) {
            // OptIn is true
            if (optin.equals(ESCOConstantes.TRUE)) {
                // Adding the VIEW privilege
                if (theRight.eq(GroupPrivilegeEnum.NONE)) {
                    updateGroup
                            .addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.VIEW.name());
                }
            }
            // Adding the OptIn
            updateGroup.addMappingFieldCol("canOptin", Boolean.valueOf(optin.equals(ESCOConstantes.TRUE))
                    .toString());
        }

        if (optout != null) {
            // OptOut is true
            if (optout.equals(ESCOConstantes.TRUE)) {
                // Adding the VIEW privilege
                if (theRight.eq(GroupPrivilegeEnum.NONE)) {
                    updateGroup
                            .addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.VIEW.name());
                }
            }
            updateGroup.addMappingFieldCol("canOptout", Boolean.valueOf(optout.equals(ESCOConstantes.TRUE))
                    .toString());
        }

        if (view != null) {
            if (view.equals(ESCOConstantes.TRUE)) {
                updateGroup.addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.VIEW.name());
            } else {
                updateGroup.addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.NONE.name());
                updateGroup.addMappingFieldCol("canOptin", Boolean.FALSE.toString());
                updateGroup.addMappingFieldCol("canOptout", Boolean.FALSE.toString());
            }
        }

        if (read != null) {
            if (read.equals(ESCOConstantes.TRUE)) {
                updateGroup.addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.READ.name());
            } else {
                updateGroup.addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.VIEW.name());
            }
        }
        if (update != null) {
            if (update.equals(ESCOConstantes.TRUE)) {
                updateGroup.addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.UPDATE.name());
            } else {
                updateGroup.addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.READ.name());
            }
        }
        if (administrate != null) {
            if (administrate.equals(ESCOConstantes.TRUE)) {
                updateGroup.addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.ADMIN.name());
            } else {
                updateGroup.addMappingFieldCol(ESCOConstantes.USER_RIGHT_VALUE, GroupPrivilegeEnum.UPDATE.name());
            }
        }
        if (needToAdd) {
            this.updatedGroups.put(idGroup, updateGroup);
        } else {
            Sortable theOrignGroup = this.originalGroups.get(idGroup);
            if (theOrignGroup != null) {
                if (theOrignGroup.getValueFormCol(ESCOConstantes.USER_RIGHT_VALUE).toUpperCase().equals(
                        updateGroup.getValueFormCol(ESCOConstantes.USER_RIGHT_VALUE).toUpperCase())) {
                    if (theOrignGroup.getValueFormCol("canOptin").toUpperCase().equals(
                            updateGroup.getValueFormCol("canOptin").toUpperCase())) {
                        if (theOrignGroup.getValueFormCol("canOptout").toUpperCase().equals(
                                updateGroup.getValueFormCol("canOptout").toUpperCase())) {
                            // The updateGroup and origin is same.
                            this.updatedGroups.remove(idGroup);
                            this.originalGroups.remove(idGroup);
                        }
                    }
                }
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear() {
        this.updatedGroups.clear();
        this.originalGroups.clear();
        super.clear();
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
    @Override
    public boolean addAdded() {
        return this.privilegeScopeEnum != PrivilegesRadioEnum.EFFECTIVE;
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String theIndex, final String theNewValue) {
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

        // Discard modifications on updated group privileges.
        if (sortableToRemove == null) {
            sortableToRemove = this.updatedGroups.get(theIndex);
        }

        if (sortableToRemove != null) {
            this.addedData.remove(sortableToRemove);
            this.deletedData.remove(sortableToRemove);
            this.updatedGroups.remove(theIndex);
            this.originalGroups.remove(theIndex);
            this.errorData.remove(this.subjectToSortable.wrap((Subject) sortableToRemove));
            sortableToRemove = null;
        }
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
     * Adds an element to the summary.
     * 
     * @param theIndexs
     *            the id fo groups
     * @param theTypeData
     *            the type of data after update (error, save, added, deleted or
     *            updated)
     * @param theDatas
     *            the updated elements
     * @param theOriginals
     *            the original elements
     * @param theSortable
     *            the updated element
     * @param theDataSmmary
     *            the type of data in the summary (added, deleted or updated)
     */
    public void addElementToSummary(final List < String > theIndexs, final List < String > theTypeData,
            final List < List < String >> theDatas, final List < List < String >> theOriginals,
            final Sortable theSortable, final TypeDataSmmary theDataSmmary) {
        List < String > cells = new ArrayList < String >();
        List < String > origins = new ArrayList < String >();
        Boolean itemPresent = true;
        Boolean areError = false;

        Group currentGroup = (Group) this.subjectToSortable.wrap((Subject) theSortable);
        Sortable updateGroupPrivilege = this.subjectToSortable.wrap((Subject) this.updatedGroups.get(currentGroup
                .getIdGroup()));

        cells.add(theSortable.getValueFormCol(ESCOConstantes.DISPLAY_EXTENSION));
        cells.add(theSortable.getValueFormCol(ESCOConstantes.DISPLAY_NAME));

        if (updateGroupPrivilege != null) {
            PrivilegeDisplayUtils.assignDisplayPrivilege((Group) updateGroupPrivilege, cells);
        } else {
            PrivilegeDisplayUtils.assignDisplayPrivilege(currentGroup, cells);
        }

        if (TypeDataSmmary.UPDATED.equals(theDataSmmary)) {

            if (updateGroupPrivilege != null) {
                origins.add(theSortable.getValueFormCol(ESCOConstantes.DISPLAY_EXTENSION));
                origins.add(theSortable.getValueFormCol(ESCOConstantes.DISPLAY_NAME));

                PrivilegeDisplayUtils.assignDisplayPrivilege(currentGroup, origins);
            } else {
                itemPresent = false;
            }
        } else {
            origins.add("");
            origins.add("");

            origins.add("");
            origins.add("");
            origins.add("");
            origins.add("");
            origins.add("");
            origins.add("");
        }

        for (Sortable sortable : this.errorData) {
            if (theSortable.getValueFormCol("id").equals(sortable.getValueFormCol("id"))) {
                areError = true;
                break;
            }
        }

        if (itemPresent) {
            // Are the group privileges in error ?
            if (areError) {
                theTypeData.add(TypeDataSmmary.ERROR.name());
            } else {
                // Have the privileges already been updated successfully ?
                if (theSortable.isSaved()) {
                    theTypeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    theTypeData.add(theDataSmmary.name());
                }
            }
            theIndexs.add(currentGroup.getIdGroup());
            theDatas.add(cells);
            theOriginals.add(origins);
        }
    }

    /**
     * Get the generic resume.
     * 
     * @param theTitle
     *            The title o.f the group summary.
     * @param theController
     *            The controller caller.
     * @return The list resume.
     */
    public List < Resume > abstractGetListResume(final String theTitle, final Class theController) {
        List < Resume > listResume = new ArrayList < Resume >();
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < List < String >> originals = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();

        colNames.add(new ColInfo(ESCOConstantes.DISPLAY_EXTENSION));
        colNames.add(new ColInfo(ESCOConstantes.DISPLAY_NAME));

        colNames.add(new ColInfo("optin", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("optout", Boolean.FALSE, DataTypeEnum.CHECKBOX));

        colNames.add(new ColInfo("view", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("read", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("update", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("admin", Boolean.FALSE, DataTypeEnum.CHECKBOX));

        resume.setColInfos(colNames);

        // Iterate on the updated groups.
        for (Sortable sortable : this.data) {
            this.addElementToSummary(indexs, typeData, datas, originals, sortable, TypeDataSmmary.UPDATED);
        }

        // Iterated on the added privileges.
        for (Sortable sortable : this.addedData) {
            this.addElementToSummary(indexs, typeData, datas, originals, sortable, TypeDataSmmary.ADDED);
        }

        // Iterate on the deleted privileges.
        for (Sortable sortable : this.deletedData) {
            this.addElementToSummary(indexs, typeData, datas, originals, sortable, TypeDataSmmary.DELETED);
        }

        resume.setTitle(theTitle);
        resume.setIndex(indexs);
        resume.setControllerClass(theController.getName());
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
     * Assign or remove some privileges to the subject.
     * 
     * @param theGrouperService
     *            The grouper service of the controller.
     * @param theType
     *            True if assign and false if remove.
     * @param theSortableToGrant
     *            The sortable to grant.
     * @param theOriginalSortableToGrant
     *            The original sortable to grant or null if not updateType.
     * @param theSubjectIdConcerned
     *            The parent subject.
     */
    public void assignOrRemovePrivilege(final IGrouperService theGrouperService, final Boolean theType,
            final Sortable theSortableToGrant, final Sortable theOriginalSortableToGrant,
            final String theSubjectIdConcerned) {

        Privilege privilege = new Privilege();
        String groupToGrant = ((Group) theSortableToGrant).getIdGroup();

        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
            AbstractPrivilegeGroupController.LOGGER.error(e, "Subject not found");
        } catch (ESCOSubjectNotUniqueException e) {
            AbstractPrivilegeGroupController.LOGGER.error(e, "Subject not unique");
        }

        try {
            // Assign privileges
            List < GroupPrivilegeEnum > privileges = null;
            if (theOriginalSortableToGrant != null) {
                if (theType) {
                    privileges = PrivilegeDisplayUtils.getPrivilegesToAssign((Group) theOriginalSortableToGrant,
                            (Group) theSortableToGrant);
                } else {
                    privileges = PrivilegeDisplayUtils.getPrivilegesToRemove((Group) theOriginalSortableToGrant,
                            (Group) theSortableToGrant);
                }
            } else {
                privileges = PrivilegeDisplayUtils.getPrivilegesToAssignOrRemove((Group) theSortableToGrant);
            }

            for (GroupPrivilegeEnum privilegeNameEnum : privileges) {

                String privilegeAux = privilegeNameEnum.getName();
                privilege.setPrivilegeName(privilegeAux);
                if (theType) {
                    theGrouperService.assignGroupPrivileges(userConnected, theSubjectIdConcerned, groupToGrant,
                            privilege);
                } else {
                    theGrouperService.removeGroupPrivileges(userConnected, theSubjectIdConcerned, groupToGrant,
                            privilege);
                }

            }
            theSortableToGrant.setSaved(Boolean.TRUE);
        } catch (ESCOBusinessException ebe) {
            this.handleException(ebe, groupToGrant);
            this.errorData.add(theSortableToGrant);
            theSortableToGrant.setSaved(Boolean.FALSE);
        }

    }

    /**
     * Get if exist some errors.
     * 
     * @return The status of the existed errors.
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
     * Setter of the subjectToSortable property.
     * 
     * @param theSubjectToSortable
     *            the subjectToSortable to set
     */
    public void setSubjectToSortable(final IWrapper < Subject, Sortable > theSubjectToSortable) {
        this.subjectToSortable = theSubjectToSortable;
    }

}
