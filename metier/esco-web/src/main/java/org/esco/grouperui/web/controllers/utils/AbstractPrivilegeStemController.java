package org.esco.grouperui.web.controllers.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.StemPrivilegeEnum;
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
 * Class AbstractPrivilegeStemController. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */

public abstract class AbstractPrivilegeStemController extends AbstractControllerAware {

    /**
     * The default generated id of the class.
     */
    private static final long                serialVersionUID = 7274697903134661226L;

    /** Logger. */
    private static final IESCOLogger         LOGGER           = ESCOLoggerFactory
                                                                      .getLogger(AbstractPrivilegeStemController.class);

    /** The updated stem privileges. */
    protected Map < String, Sortable >       updatedStem;

    /** The original group update privileges. */
    protected Map < String, Stem >           originalStems;

    /**
     * The privilege scope enum.
     */
    protected PrivilegesRadioEnum            privilegeScopeEnum;

    /**
     * Wrap subject to sortable.
     */
    protected IWrapper < Subject, Sortable > subjectToSortable;

    /**
     * Default constructor.
     */
    public AbstractPrivilegeStemController() {
        this.updatedStem = new HashMap < String, Sortable >();
        this.originalStems = new HashMap < String, Stem >();
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

        this.extractItems();

        // Remove all items update and add the update version.
        Set < String > keySet = this.updatedStem.keySet();
        List < Sortable > sortables = this.storedData.getListOfSortable();
        for (String key : keySet) {
            Iterator < Sortable > itSortable = sortables.iterator();
            boolean findItem = false;
            while (itSortable.hasNext() && !findItem) {
                Stem aStem = (Stem) itSortable.next();
                if (aStem.getUuid().equals(key)) {
                    this.storedData.delRowDataResult(aStem);
                    this.storedData.addRowDataResult(this.updatedStem.get(key));
                    findItem = true;
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

    public void assignOrRemovePrivilegeToStem(final IGrouperService theGrouperService, final String theSubjectId,
            final Stem theCurrentStem, final Sortable theUpdatedStem, final Boolean isAssign) {

        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
            AbstractPrivilegeStemController.LOGGER.error("Subject not found", e);
        } catch (ESCOSubjectNotUniqueException e) {
            AbstractPrivilegeStemController.LOGGER.error("Subject not unique", e);
        }
        Boolean hasToAssignPrivilegeStem = Boolean.FALSE;
        Boolean hasToRemovePrivilegeStem = Boolean.FALSE;
        Boolean hasToAssignPrivilegeCreate = Boolean.FALSE;
        Boolean hasToRemovePrivilegeCreate = Boolean.FALSE;

        if (theUpdatedStem != null) {
            if (!theUpdatedStem.isSaved()) {
                hasToAssignPrivilegeStem = PrivilegeDisplayUtils.hasToAssignPrivilege(theCurrentStem.getHasStem(),
                        ((Stem) theUpdatedStem).getHasStem());

                hasToRemovePrivilegeStem = PrivilegeDisplayUtils.hasToRemovePrivilege(theCurrentStem.getHasStem(),
                        ((Stem) theUpdatedStem).getHasStem());

                hasToAssignPrivilegeCreate = PrivilegeDisplayUtils.hasToAssignPrivilege(theCurrentStem
                        .getHasCreate(), ((Stem) theUpdatedStem).getHasCreate());

                hasToRemovePrivilegeCreate = PrivilegeDisplayUtils.hasToRemovePrivilege(theCurrentStem
                        .getHasCreate(), ((Stem) theUpdatedStem).getHasCreate());
            }
        } else {
            if (!theCurrentStem.isSaved()) {
                hasToAssignPrivilegeStem = isAssign == Boolean.TRUE && theCurrentStem.getHasStem();
                hasToRemovePrivilegeStem = isAssign == Boolean.FALSE && theCurrentStem.getHasStem();
                hasToAssignPrivilegeCreate = isAssign == Boolean.TRUE && theCurrentStem.getHasCreate();
                hasToRemovePrivilegeCreate = isAssign == Boolean.FALSE && theCurrentStem.getHasCreate();
            }
        }

        this.assignOrRemovePrivilegeToStemService(theGrouperService, userConnected, theSubjectId, theCurrentStem,
                theUpdatedStem, hasToAssignPrivilegeStem, hasToRemovePrivilegeStem, StemPrivilegeEnum.STEM);

        this.assignOrRemovePrivilegeToStemService(theGrouperService, userConnected, theSubjectId, theCurrentStem,
                theUpdatedStem, hasToAssignPrivilegeCreate, hasToRemovePrivilegeCreate, StemPrivilegeEnum.CREATE);
    }

    /**
     * Call the service to assign or remove privileges.
     * 
     * @param theGrouperService
     *            The grouper service.
     * @param theUserConnected
     *            The connected user.
     * @param theSubjectId
     *            The subject id (group or person)
     * @param theCurrentStem
     *            The current stem.
     * @param theUpdatedStem
     *            The updated value of the current stem.
     * @param hasToAssignPrivilege
     *            True if it is assignation of the privilege and remove
     *            otherwise.
     * @param hasToRemovePrivilege
     *            True if it is assignation of the privilege and remove
     * @param thePrivilege
     *            the privilege to assoign or remove
     */
    public void assignOrRemovePrivilegeToStemService(final IGrouperService theGrouperService,
            final Person theUserConnected, final String theSubjectId, final Stem theCurrentStem,
            final Sortable theUpdatedStem, final Boolean hasToAssignPrivilege, final Boolean hasToRemovePrivilege,
            final StemPrivilegeEnum thePrivilege) {

        String stemToGrant = theCurrentStem.getUuid();
        try {
            Privilege privilege = new Privilege();
            privilege.setPrivilegeName(thePrivilege.getValue());
            if (hasToAssignPrivilege) {
                theGrouperService.assignStemPrivileges(theUserConnected, theSubjectId, stemToGrant, privilege);
            }
            if (hasToRemovePrivilege) {
                theGrouperService.removeStemPrivileges(theUserConnected, theSubjectId, stemToGrant, privilege);
            }

            if (theUpdatedStem != null) {
                theUpdatedStem.setSaved(Boolean.TRUE);
            } else {
                theCurrentStem.setSaved(Boolean.TRUE);
            }
        } catch (ESCOBusinessException ebe) {
            this.handleException(ebe, stemToGrant);
            if (theUpdatedStem != null) {
                this.errorData.add(theUpdatedStem);
                theUpdatedStem.setSaved(Boolean.FALSE);
            } else {
                this.errorData.add(theCurrentStem);
                theCurrentStem.setSaved(Boolean.FALSE);
            }
        }
    }

    /**
     * Get if exist some errors.
     * 
     * @return the status of the existence of errors.
     */
    public Status isExistSomeErrors() {
        Boolean result = Boolean.FALSE;
        if (this.errorClassesNames.isEmpty()) {
            result = Boolean.TRUE;
        }
        return new Status(result);
    }

    /**
     * Allow to update a stem privileges.
     * 
     * @return the XML result.
     * @throws CloneNotSupportedException
     */
    public String updatePrivilege() throws CloneNotSupportedException {

        String idStem = this.getParam("idElement");
        Boolean needToAdd = false;

        String hasStem = this.getParam("hasStem");
        String hasCreate = this.getParam("hasCreate");

        // We retrieve the updated privileges on stem if already updated.
        Stem updateStem = (Stem) this.getAddedItem(idStem);

        if (updateStem == null) {
            updateStem = (Stem) this.updatedStem.get(idStem);
            if (updateStem == null) {
                updateStem = ((Stem) this.getItem(idStem)).getCopy();
                this.originalStems.put(idStem, ((Stem) this.getItem(idStem)).getCopy());
                needToAdd = true;
            }
        }

        if (hasStem != null) {
            updateStem.setHasStem(hasStem.equals(ESCOConstantes.TRUE));
        }

        if (hasCreate != null) {
            updateStem.setHasCreate(hasCreate.equals(ESCOConstantes.TRUE));
        }

        if (needToAdd) {
            this.updatedStem.put(idStem, updateStem);
        } else {
            Stem theOriginalStem = this.originalStems.get(idStem);
            if (theOriginalStem != null) {
                if (theOriginalStem.getHasStem() == updateStem.getHasStem()) {
                    if (theOriginalStem.getHasCreate() == updateStem.getHasCreate()) {
                        this.updatedStem.remove(idStem);
                        this.originalStems.remove(idStem);
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
    public void doDelete(final List < Sortable > theList) {
        Iterator < Sortable > itSortable = theList.iterator();
        while (itSortable.hasNext()) {
            Stem aStem = (Stem) itSortable.next();
            if (this.updatedStem.containsKey(aStem.getUuid())) {
                this.updatedStem.remove(aStem.getUuid());
                this.originalStems.remove(aStem.getUuid());
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear() {
        this.updatedStem.clear();
        this.originalStems.clear();
        super.clear();
    }

    /**
     * Get if the data have been modified.
     * 
     * @return True if data modified else false.
     */
    @Override
    public boolean doIsModified() {
        return this.updatedStem.isEmpty();
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
            sortableToRemove = this.updatedStem.get(theIndex);
        }

        if (sortableToRemove != null) {
            this.addedData.remove(sortableToRemove);
            this.deletedData.remove(sortableToRemove);
            this.updatedStem.remove(theIndex);
            this.originalStems.remove(theIndex);
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
        List < String > cells = null;
        List < String > origins = null;
        Sortable sortable;

        colNames.add(new ColInfo("displayStemExtension"));
        colNames.add(new ColInfo("displayName"));

        colNames.add(new ColInfo("createStem", Boolean.FALSE, DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("createGroup", Boolean.FALSE, DataTypeEnum.CHECKBOX));

        resume.setColInfos(colNames);

        // Iterate on the updated groups.
        for (Sortable aStem : this.data) {
            sortable = aStem;
            Stem currentStem = (Stem) aStem;

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            Sortable updateStemPrivilege = this.updatedStem.get(currentStem.getUuid());
            if (updateStemPrivilege != null) {

                indexs.add(currentStem.getUuid());

                cells.add(currentStem.getDisplayExtension());
                origins.add(currentStem.getDisplayExtension());
                cells.add(currentStem.getDisplayName());
                origins.add(currentStem.getDisplayName());

                PrivilegeDisplayUtils.assignDisplayStemPrivilege((Stem) updateStemPrivilege, cells, currentStem,
                        origins);

                boolean areError = false;
                for (Sortable aSortable : this.errorData) {
                    if (updateStemPrivilege.getValueFormCol("uuid").equals(aSortable.getValueFormCol("uuid"))) {
                        areError = true;
                        break;
                    }
                }

                // Are the stem privileges in error ?
                if (areError) {
                    typeData.add(TypeDataSmmary.ERROR.name());
                } else
                    // Have the stem privileges already been saved successfully
                    if (updateStemPrivilege.isSaved()) {
                        typeData.add(TypeDataSmmary.SAVED.name());
                    } else {
                        typeData.add(TypeDataSmmary.UPDATED.name());
                    }

                datas.add(cells);
                originals.add(origins);
            }
        }

        // Iterate on the added privileges.
        for (Sortable aStem : this.addedData) {
            sortable = aStem;

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            indexs.add(((Stem) sortable).getUuid());

            cells.add(sortable.getValueFormCol("displayExtension"));
            origins.add("");
            cells.add(sortable.getValueFormCol("displayName"));
            origins.add("");

            cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(((Stem) sortable).getHasStem()));
            origins.add("");
            cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(((Stem) sortable).getHasCreate()));
            origins.add("");

            // Are the stem privileges in error ?

            boolean areError = false;
            for (Sortable aSortable : this.errorData) {
                if (sortable.getValueFormCol("uuid").equals(aSortable.getValueFormCol("uuid"))) {
                    areError = true;
                    break;
                }
            }

            if (areError) {
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

        // Iterate on the delete privileges.
        for (Sortable aStem : this.deletedData) {
            sortable = aStem;

            cells = new ArrayList < String >();
            origins = new ArrayList < String >();

            indexs.add(((Stem) sortable).getUuid());

            cells.add(sortable.getValueFormCol("displayExtension"));
            origins.add("");
            cells.add(sortable.getValueFormCol("displayName"));
            origins.add("");

            cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(((Stem) sortable).getHasStem()));
            origins.add("");
            cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(((Stem) sortable).getHasCreate()));
            origins.add("");

            boolean areError = false;
            for (Sortable aSortable : this.errorData) {
                if (sortable.getValueFormCol("uuid").equals(aSortable.getValueFormCol("uuid"))) {
                    areError = true;
                    break;
                }
            }
            // Are the stem privileges in error ?
            if (areError) {
                typeData.add(TypeDataSmmary.ERROR.name());
            } else
                // Have the stem privileges already been saved successfully
                if (sortable.isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.DELETED.name());
                }

            datas.add(cells);
            originals.add(origins);
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
     * {@inheritDoc}
     */
    public Status save() {
        return null;
    }

    /**
     * Setter of the subjectToSortable property.
     * 
     * @param theSubjectToSortable
     *            the subjetToSortable to set
     */
    public void setSubjectToSortable(final IWrapper < Subject, Sortable > theSubjectToSortable) {
        this.subjectToSortable = theSubjectToSortable;
    }
}
