package org.esco.grouperui.web.controllers.groupProperties;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.faces.context.FacesContext;
import javax.faces.model.SelectItem;

import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Response;
import org.esco.grouperui.domaine.beans.Responses;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOAddMemberException;
import org.esco.grouperui.exceptions.business.ESCOAttributeException;
import org.esco.grouperui.exceptions.business.ESCODeleteMemberException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.tools.parameter.ParameterUtils;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.MembersRadioEnum;
import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.summary.TypeDataSmmary;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.beans.table.TableRow;
import org.esco.grouperui.web.controllers.GroupController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.FaceContextUtils;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class GroupMembersController. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
public class GroupMembersController extends AbstractControllerAware {

    /** The default serial id generated. */
    private static final long serialVersionUID       = -6272860754225988942L;

    /**
     * The column of the type.
     */
    private static final int  COLUMN_OF_TYPE         = 2;

    /**
     * The column of type in the summary.
     */
    private static final int  COLUMN_OF_TYPE_SUMMARY = 1;

    /**
     * The current tab type.
     */
    private ScopeEnum         memberTypeEnum;

    /**
     * Default constructor.
     */
    public GroupMembersController() {
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
     * get init parameter.
     * 
     * @return boolean after initialization.
     * @throws ESCOGroupNotFoundException
     *             if the current group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the current group is not unique.
     * @throws CloneNotSupportedException
     */
    public boolean getInitParameter() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            CloneNotSupportedException {
        this.getGroupController().initGroupAttributes();
        return true;
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        List < Resume > listResume = new ArrayList < Resume >();
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> attributes = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();
        ParameterGroup parameterForGroup = this.getGroupController().getParameterService().findParametersByGroup(
                "org.esco.grouperui.group.members.group.col");

        ParameterGroup parameterForPerson = this.getGroupController().getParameterService().findParametersByGroup(
                "org.esco.grouperui.group.members.person.col");

        Parameter parameter = null;
        Iterator < Parameter > itParam = null;
        List < String > cells = null;
        String value = null;

        FacesContext theFacesContext = FacesContext.getCurrentInstance();
        FaceContextUtils.addVariableToContext(theFacesContext, "msgs", this.getI18nService().getStrings());

        colNames.add(new ColInfo("subjects"));
        colNames.add(new ColInfo("profil"));
        colNames.add(new ColInfo("school"));

        // Iterate on the added members.
        for (Sortable sortable : this.addedData) {
            cells = new ArrayList < String >();

            // parameter label
            FaceContextUtils.addVariableToContext(theFacesContext, "attr", sortable.getMappingFieldCol());

            indexs.add(sortable.getValueFormCol("id"));
            if (SourceTypeEnum.GROUP.equals(sortable.getTypeEnum())) {
                itParam = parameterForGroup.getParameters().iterator();
            } else {
                itParam = parameterForPerson.getParameters().iterator();
            }
            while (itParam.hasNext()) {
                parameter = itParam.next();
                value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
                cells.add(value);
            }

            if (SourceTypeEnum.GROUP.equals(sortable.getTypeEnum())) {
                cells.set(GroupMembersController.COLUMN_OF_TYPE_SUMMARY, this
                        .getString("SEARCH_PROFIL_DEFAULT_GROUP"));
            }

            // Is the member in error ?
            if (this.errorData.contains(sortable)) {
                typeData.add(TypeDataSmmary.ERROR.name());
            } else
                // Has the member already been added successfully ?
                if (sortable.isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.ADDED.name());
                }
            attributes.add(cells);

        }

        // Iterate on the deleted members.
        for (Sortable sortable : this.deletedData) {
            cells = new ArrayList < String >();
            // parameter label
            FaceContextUtils.addVariableToContext(theFacesContext, "attr", sortable.getMappingFieldCol());

            indexs.add(sortable.getValueFormCol("id"));

            if (SourceTypeEnum.GROUP.equals(sortable.getTypeEnum())) {
                itParam = parameterForGroup.getParameters().iterator();
            } else {
                itParam = parameterForPerson.getParameters().iterator();
            }

            while (itParam.hasNext()) {
                parameter = itParam.next();
                value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
                cells.add(value);
            }

            // Is the member in error ?
            if (this.errorData.contains(sortable)) {
                typeData.add(TypeDataSmmary.ERROR.name());
            } else
                // Has the member already been deleted successfully ?
                if (sortable.isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.DELETED.name());
                }
            attributes.add(cells);
        }

        resume.setTitle("members_view.label");
        resume.setColInfos(colNames);
        resume.setIndex(indexs);
        resume.setControllerClass(GroupMembersController.class.getName());
        resume.setData(attributes);
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
        IGrouperService grouperService = this.getGroupController().getGrouperService();

        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e1) {
        } catch (ESCOSubjectNotUniqueException e1) {
        }
        String groupName = this.getGroupController().getGroup().getName();
        Boolean status = null;

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorData.clear();

        // Add members to the group.
        List < String > membersToAdd = new ArrayList < String >();
        for (Sortable added : this.addedData) {
            // If the member has not already been added
            if (!added.isSaved()) {
                membersToAdd.add(added.getValueFormCol("id"));
            }
        }

        if (membersToAdd != null && !membersToAdd.isEmpty()) {
            try {
                // Call the service that will add the new members
                grouperService.addMembers(userConnected, groupName, membersToAdd);
            } catch (ESCOBusinessException ebe) {
                this.handleException(ebe, groupName);
            } finally {
                // If no error, all elements are defined as saved
                if (this.errorClassesNames.isEmpty()) {
                    for (Sortable added : this.addedData) {
                        added.setSaved(Boolean.TRUE);
                    }
                }
            }
        }

        // Remove members from the group.
        List < String > membersToRemove = new ArrayList < String >();
        for (Sortable deleted : this.deletedData) {
            // If the member has not already been deleted
            if (!deleted.isSaved()) {
                membersToRemove.add(deleted.getValueFormCol("id"));
            }
        }

        if (null != membersToRemove && membersToRemove.size() > 0) {
            try {
                // Call the service that will remove the members
                grouperService.removeMembers(userConnected, groupName, membersToRemove);
            } catch (ESCOBusinessException ebe) {
                this.handleException(ebe, groupName);
            } finally {
                // If no error, all elements are defined as saved
                if (this.errorClassesNames.isEmpty()) {
                    for (Sortable deleted : this.deletedData) {
                        deleted.setSaved(Boolean.TRUE);
                    }
                }
            }
        }

        // Errors ?
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
            }
    }

    /**
     * Find members to get data for the members tab.
     * 
     * @return the XML data for the grid.
     * @throws ESCOGroupNotUniqueException
     *             if the current group is not unique.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to see members.
     * @throws ESCOAttributeException
     *             if some attribute are missing
     * @throws CloneNotSupportedException
     *             if the clone operation failed.
     */
    public String findMembers() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            ESCOInsufficientPrivilegesException, ESCOAttributeException, CloneNotSupportedException {

        String theMemberType = this.getParam("theMemberType");
        if (theMemberType == null) {
            this.memberTypeEnum = ScopeEnum.IMMEDIATE;
        } else {
            this.memberTypeEnum = ScopeEnum.valueOf(MembersRadioEnum.formLabel(theMemberType).name());
        }

        // this.clearContext();
        this.data.clear();

        Members member = null;
        ParameterGroup parameterGroup = null;
        Parameter parameter = null;
        Iterator < Parameter > itParam = null;

        this.getGroupController().initGroupAttributes();

        List < Subject > subjects = null;

        if (this.getGroupController().getGroup() != null) {
            List < String > attributes = new ArrayList < String >();
            IParameterService parameterService = this.getGroupController().getParameterService();

            parameterGroup = parameterService.findParametersByGroup("org.esco.grouperui.group.members.attribut");

            itParam = parameterGroup.getParameters().iterator();
            while (itParam.hasNext()) {
                parameter = itParam.next();
                attributes.add(parameter.getKey());
            }

            Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
            parameterGroup = parameterService.findParametersByGroup("org.esco.grouperui.group.members.map");

            if (parameterGroup.getParameters().isEmpty()) {
                throw new ESCOAttributeException("org.esco.grouperui.group.members.map.missing");
            }

            itParam = parameterGroup.getParameters().iterator();
            while (itParam.hasNext()) {
                parameter = itParam.next();
                sources.put(parameter.getValue(), SourceTypeEnum.valueOf(parameter.getKey().toUpperCase()));
            }

            Person person = null;
            try {
                person = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e1) {
            } catch (ESCOSubjectNotUniqueException e1) {
            }
            String groupName = this.getGroupController().getGroup().getName();
            member = this.getGroupController().getGrouperService().findMembers(person, groupName, attributes,
                    sources, this.memberTypeEnum);
            subjects = member.getSubjects();

            Iterator < Subject > itSubject = subjects.iterator();
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
     * @return the XML of the row to display.
     */
    public String dataResult() {
        final String theRows = this.getParam("rows");
        final String thePage = this.getParam("page");
        final String theSortBy = this.getParam("sidx");
        final String theSortType = this.getParam("sord");

        this.extractItems();

        this.storedData.setIsExistingAddedItem(this.getIsExistAddedItems());
        this.storedData.setNbResultDisplay(theRows);
        this.storedData.setCurrentPage(thePage);

        TableData tableData = TableDataFactory.populate(this.storedData, this.sortableRowDataWrapper, theSortBy,
                theSortType);

        Collection < TableRow > aux = tableData.getListOfRows();
        for (TableRow tableRow : aux) {
            List < String > cells = tableRow.getRowData().getCell();
            if ("group".equals(cells.get(GroupMembersController.COLUMN_OF_TYPE))) {
                cells.set(GroupMembersController.COLUMN_OF_TYPE, this.getString("SEARCH_PROFIL_DEFAULT_GROUP"));
                RowData rowData = new RowData();
                rowData.setCell(cells);
                tableRow.setRowData(rowData);
            }

        }

        return this.xmlProducerWrapper.wrap(TableDataFactory.getProducer(tableData));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean addAdded() {
        return !this.memberTypeEnum.equals(ScopeEnum.EFFECTIVE);
    }

    /**
     * Get the list of the members radio.
     * 
     * @return a list of SelectIem for the radio button.
     */
    public List < SelectItem > getListMembersRadio() {
        MembersRadioEnum[] enums = MembersRadioEnum.values();

        List < SelectItem > selectItems = new ArrayList < SelectItem >();

        for (MembersRadioEnum membersRadio : enums) {
            selectItems.add(new SelectItem(membersRadio.getLabel(), this.getString(membersRadio.getLabel())));
        }

        return selectItems;
    }

    /**
     * The default radio for members.
     * 
     * @return the default label for members radio.
     */
    public MembersRadioEnum getDefaultMembersRadio() {
        return MembersRadioEnum.IMMEDIATE;
    }

    /**
     * {@inheritDoc}
     */
    public void discardModification(final String index) {

        Sortable sortable;

        // Discard the modifications on added members.
        List < Sortable > addedMembersToRemove = new ArrayList < Sortable >();
        Iterator < Sortable > itAddMemb = this.addedData.iterator();
        while (itAddMemb.hasNext()) {
            sortable = itAddMemb.next();
            if (index.equals(sortable.getValueFormCol("id"))) {
                addedMembersToRemove.add(sortable);
            }
        }
        Iterator < Sortable > itRemAddedMember = addedMembersToRemove.iterator();
        while (itRemAddedMember.hasNext()) {
            sortable = itRemAddedMember.next();
            this.addedData.remove(sortable);
            this.errorData.remove(sortable);
        }

        // Discard the modifications on deleted members.
        List < Sortable > deletedMembersToRemove = new ArrayList < Sortable >();
        Iterator < Sortable > itDelMemb = this.deletedData.iterator();
        while (itDelMemb.hasNext()) {
            sortable = itDelMemb.next();
            if (index.equals(sortable.getValueFormCol("id"))) {
                deletedMembersToRemove.add(sortable);
            }
        }
        Iterator < Sortable > itRemDeletedMember = deletedMembersToRemove.iterator();
        while (itRemDeletedMember.hasNext()) {
            sortable = itRemDeletedMember.next();
            this.deletedData.remove(sortable);
            this.errorData.remove(sortable);
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
