package org.esco.grouperui.web.controllers.search;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.faces.model.SelectItem;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.exceptions.business.ESCOAttributeException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.tools.property.PropertyFinder;
import org.esco.grouperui.tools.property.PropertyManager;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.XMLResultString;
import org.esco.grouperui.web.beans.search.AdditionSearch;
import org.esco.grouperui.web.beans.search.SearchFieldEnum;
import org.esco.grouperui.web.beans.search.SearchSubjectEnum;
import org.esco.grouperui.web.beans.search.SimpleSearch;
import org.esco.grouperui.web.beans.table.Listable;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.beans.table.TableRow;
import org.esco.grouperui.web.controllers.AbstractContextAwareController;
import org.esco.grouperui.web.controllers.GroupDeleteOrCopyMembersController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.utils.I18nExceptionAdapter;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * The SearchController class.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
public class SearchController extends AbstractContextAwareController {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger         LOGGER           = ESCOLoggerFactory
                                                                      .getLogger(SearchController.class);

    /**
     * The value of the column of the column type in the grid.
     */
    private static final int                 COLUMN_OF_TYPE   = 2;

    /**
     * The serialVersionUID of the class.
     */
    private static final long                serialVersionUID = 4844681626796203405L;

    /** The GrouperService that provide services from grouper. */
    private IGrouperService                  grouperService;

    /**
     * The simple search property.
     */
    private final transient SimpleSearch     simpleSearch;

    /**
     * The addition search property.
     */
    private final transient AdditionSearch   additionSearch;

    /** The RowData wrapper. */
    private IWrapper < Object, RowData >     rowDataWrapper;

    /** The xmlProducer wrapper. */
    private IWrapper < XmlProducer, String > xmlProducerWrapper;

    /** The parameter service. */
    private IParameterService                parameterService;

    /**
     * Default constructor.
     */
    public SearchController() {
        this.simpleSearch = new SimpleSearch();
        this.additionSearch = new AdditionSearch();
    }

    /**
     * @return true if the simple search is a group search, false otherwise
     */
    public boolean isSimpleSearchGroupSearch() {
        return this.simpleSearch.getSearchSubjectEnum().eq(SearchSubjectEnum.SEARCH_GROUP);
    }

    /**
     * @return true if the addition search is a group search, false otherwise
     */
    public boolean isAdditionSearchGroupSearch() {
        return this.additionSearch.getSearchSubjectEnum().eq(SearchSubjectEnum.SEARCH_GROUP);
    }

    /**
     * {@inheritDoc}
     */
    public String simpleSearch() {

        String theTerm = this.getParam(ESCOConstantes.THE_TERM);
        String theSearchSource = this.getParam(ESCOConstantes.THE_SEARCH_SOURCE);
        String theSearchPath = this.getParam(ESCOConstantes.THE_SEARCH_PATH).replace("%3A", ":");
        String theDisplayTerm = this.getParam(ESCOConstantes.THE_DISPLAY_TERM);
        String theDisplaySearchPath = this.getParam(ESCOConstantes.THE_DISPLAY_SEARCH_PATH);

        // remove the first ":" which correspond to the root element
        // except if the search is based on the root element
        if (theSearchPath.startsWith(ESCOConstantes.STEM_NAME_SEPARATOR) && theSearchPath.length() > 1) {
            theSearchPath = theSearchPath.substring(1, theSearchPath.length());
        }
        this.simpleSearch.cleanSearchContext();

        this.simpleSearch.setDisplaySearchPath(theDisplaySearchPath);
        this.simpleSearch.setSearchTerm(theTerm);
        this.simpleSearch.setSearchPath(theSearchPath);
        this.simpleSearch.setSearchTypeEnum(org.esco.grouperui.web.beans.search.SearchTypeEnum.SEARCH_SIMPLE);
        this.simpleSearch.setSearchSubjectEnum(SearchSubjectEnum.fromValue(theSearchSource));

        List < ? > result = null;

        if (this.simpleSearch.getSearchSubjectEnum().eq(SearchSubjectEnum.SEARCH_PERSON)) {

            try {
                Person userConnected = PersonController.getConnectedPerson();
                result = this.grouperService.searchSubjects(userConnected, theSearchPath, theTerm);
            } catch (ESCOSubjectNotFoundException e) {
                SearchController.LOGGER.error("Person not found.", e);
                // nothing to do, because this jsf cannot be called if person
                // does not exist.
            } catch (ESCOSubjectNotUniqueException e) {
                SearchController.LOGGER.error("Person not unique.", e);
                // nothing to do, because this jsf cannot be called if several
                // persons with the same id.
            }

        } else
            if (SearchSubjectEnum.fromValue(theSearchSource).eq(SearchSubjectEnum.SEARCH_GROUP)) {

                Person userConnected = null;
                try {
                    userConnected = PersonController.getConnectedPerson();
                } catch (ESCOSubjectNotFoundException e) {
                    SearchController.LOGGER.error("Person not found.", e);
                    // nothing to do, because this jsf cannot be called if
                    // person
                    // does not exist.
                } catch (ESCOSubjectNotUniqueException e) {
                    SearchController.LOGGER.error("Person not unique.", e);
                    // nothing to do, because this jsf cannot be called if
                    // several
                    // persons with the same id.
                }

                SearchGroupEnum searchGroupEnum = null;

                if (SearchFieldEnum.valueOf(theDisplayTerm).eq(SearchFieldEnum.NAME)) {
                    searchGroupEnum = SearchGroupEnum.NAME;
                } else
                    if (SearchFieldEnum.valueOf(theDisplayTerm).eq(SearchFieldEnum.DISPLAY_EXTENSION)) {
                        searchGroupEnum = SearchGroupEnum.EXTENSION;
                    } else {
                        searchGroupEnum = SearchGroupEnum.DISPLAY_NAME;
                    }
                try {
                    result = this.grouperService.searchGroups(userConnected, searchGroupEnum,
                            SearchTypeEnum.SIMPLE, theSearchPath, theTerm);
                } catch (ESCOGroupNotFoundException e) {
                    // an empty table must be displayed instead of the exception
                    result = new ArrayList < Group >();
                }

                this.simpleSearch.setSearchFieldEnum(org.esco.grouperui.web.beans.search.SearchFieldEnum
                        .fromValue(theDisplayTerm));

            }

        if (result != null) {
            for (int i = 0; i < result.size(); i++) {
                this.simpleSearch.addRowDataResult((Sortable) result.get(i));
            }
        }
        return this.getXMLResultOfSearch(result);

    }

    /**
     * {@inheritDoc}
     */
    public String getDataResultSimpleSearch() {
        final String theRows = this.getParam("rows");
        final String thePage = this.getParam("page");
        final String theSortBy = this.getParam("sidx");
        final String theSortType = this.getParam("sord");

        this.simpleSearch.setNbResultDisplay(theRows);
        this.simpleSearch.setCurrentPage(thePage);

        TableData tableData = TableDataFactory.populate(this.simpleSearch, this.rowDataWrapper, theSortBy,
                theSortType);

        if (this.simpleSearch.getSearchSubjectEnum().eq(SearchSubjectEnum.SEARCH_GROUP)) {
            Collection < TableRow > aux = tableData.getListOfRows();
            for (TableRow tableRow : aux) {
                List < String > cells = tableRow.getRowData().getCell();
                cells.set(SearchController.COLUMN_OF_TYPE, this.getString("SEARCH_PROFIL_DEFAULT_GROUP"));
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
    public String additionSearch() {

        String theTerm = this.getParam(ESCOConstantes.THE_TERM);
        String theSearchSource = this.getParam(ESCOConstantes.THE_SEARCH_SOURCE);
        String theSearchPath = this.getParam(ESCOConstantes.THE_SEARCH_PATH).replace("%3A", ":");
        String theDisplayTerm = this.getParam(ESCOConstantes.THE_DISPLAY_TERM);
        String theDisplaySearchPath = this.getParam(ESCOConstantes.THE_DISPLAY_SEARCH_PATH);
        String theSearchStep = this.getParam(ESCOConstantes.THE_SEARCH_STEP);

        // remove the first ":" which correspond to the root element
        // except if the search is based on the root element
        if (theSearchPath.startsWith(ESCOConstantes.STEM_NAME_SEPARATOR) && theSearchPath.length() > 1) {
            theSearchPath = theSearchPath.substring(1, theSearchPath.length());
        }

        List < Sortable > saveGroupSelected = null;
        if (theSearchStep.equals("2")) {
            saveGroupSelected = this.additionSearch.getSelected();
        }

        this.additionSearch.cleanSearchContext();

        this.additionSearch.setDisplaySearchPath(theDisplaySearchPath);
        this.additionSearch.setSearchTerm(theTerm);
        this.additionSearch.setSearchPath(theSearchPath);
        this.additionSearch.setSearchTypeEnum(org.esco.grouperui.web.beans.search.SearchTypeEnum.SEARCH_SIMPLE);
        this.additionSearch.setSearchSubjectEnum(SearchSubjectEnum.fromValue(theSearchSource));

        List < ? > result = null;

        if (this.additionSearch.getSearchSubjectEnum().eq(SearchSubjectEnum.SEARCH_PERSON)) {

            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
                result = this.grouperService.searchSubjects(userConnected, theSearchPath, theTerm);
            } catch (ESCOSubjectNotFoundException e) {
                SearchController.LOGGER.error("Person not found.", e);
                // nothing to do, because this jsf cannot be called if person
                // does not exist.
            } catch (ESCOSubjectNotUniqueException e) {
                SearchController.LOGGER.error("Person not unique.", e);
                // nothing to do, because this jsf cannot be called if several
                // persons with the same id.
            }

        } else
            if (SearchSubjectEnum.fromValue(theSearchSource).eq(SearchSubjectEnum.SEARCH_GROUP)) {

                Person userConnected = null;
                try {
                    userConnected = PersonController.getConnectedPerson();
                } catch (ESCOSubjectNotFoundException e) {
                    SearchController.LOGGER.error("Person not found.", e);
                    // nothing to do, because this jsf cannot be called if
                    // person does not exist.
                } catch (ESCOSubjectNotUniqueException e) {
                    SearchController.LOGGER.error("Person not unique.", e);
                    // nothing to do, because this jsf cannot be called if
                    // several persons with the same id.
                }

                SearchGroupEnum searchGroupEnum = null;

                if (SearchFieldEnum.valueOf(theDisplayTerm).eq(SearchFieldEnum.NAME)) {
                    searchGroupEnum = SearchGroupEnum.NAME;
                } else
                    if (SearchFieldEnum.valueOf(theDisplayTerm).eq(SearchFieldEnum.DISPLAY_EXTENSION)) {
                        searchGroupEnum = SearchGroupEnum.EXTENSION;
                    } else {
                        searchGroupEnum = SearchGroupEnum.DISPLAY_NAME;
                    }
                try {
                    result = this.grouperService.searchGroups(userConnected, searchGroupEnum,
                            SearchTypeEnum.SIMPLE, theSearchPath, theTerm);
                } catch (ESCOGroupNotFoundException e) {
                    // an empty table must be displayed instead of the exception
                    result = new ArrayList < Group >();
                }

                this.additionSearch.setSearchFieldEnum(org.esco.grouperui.web.beans.search.SearchFieldEnum
                        .fromValue(theDisplayTerm));

            } else
                if (SearchSubjectEnum.fromValue(theSearchSource).eq(SearchSubjectEnum.SEARCH_PERSON_IN_A_GROUP)) {
                    this.additionSearch.setStep(theSearchStep);
                    Person userConnected = null;
                    try {
                        userConnected = PersonController.getConnectedPerson();
                    } catch (ESCOSubjectNotFoundException e) {
                        SearchController.LOGGER.error("Person not found.", e);
                        // nothing to do, because this jsf cannot be called if
                        // person does not exist.
                    } catch (ESCOSubjectNotUniqueException e) {
                        SearchController.LOGGER.error("Person not unique.", e);
                        // nothing to do, because this jsf cannot be called if
                        // several persons with the same id.
                    }

                    if (saveGroupSelected != null) {

                        Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
                        ParameterGroup parameterGroup = null;
                        Parameter parameter = null;
                        Iterator < Parameter > itParam = null;
                        Integer cptPersons = null;
                        List < String > myGroups = new ArrayList < String >();
                        List < String > attributes = new ArrayList < String >();

                        parameterGroup = this.parameterService
                                .findParametersByGroup("org.esco.grouperui.group.members.map");

                        itParam = parameterGroup.getParameters().iterator();
                        while (itParam.hasNext()) {
                            parameter = itParam.next();
                            if (SourceTypeEnum.PERSON == SourceTypeEnum.valueOf(parameter.getKey().toUpperCase())) {
                                sources.put(parameter.getValue(), SourceTypeEnum.valueOf(parameter.getKey()
                                        .toUpperCase()));
                            }
                        }

                        if (saveGroupSelected.size() == 1) {
                            cptPersons = 0;
                        } else {
                            for (Sortable group : saveGroupSelected) {
                                myGroups.add(group.getValueFormCol(ESCOConstantes.NAME));
                            }

                            try {
                                cptPersons = this.grouperService.countPersons(userConnected, myGroups, sources,
                                        ScopeEnum.IMMEDIATE);
                            } catch (ESCOGroupNotFoundException e1) {
                                SearchController.LOGGER.error("Group is not found.", e1);
                            } catch (ESCOInsufficientPrivilegesException e1) {
                                SearchController.LOGGER.error("Insufficient Privileges.", e1);
                            }
                        }

                        ArrayList < Parameter > myParameters = (ArrayList < Parameter >) this.parameterService
                                .findParametersById("org.esco.grouperui.search.max",
                                        "search_person_in_group_max_result");

                        Integer searchPersonInGroupMaxResult = 0;

                        for (Parameter p : myParameters) {
                            searchPersonInGroupMaxResult = Integer.decode(p.getValue());
                        }

                        if (cptPersons != null && cptPersons <= searchPersonInGroupMaxResult) {
                            List < Person > thePersons = new ArrayList < Person >();

                            parameterGroup = this.parameterService
                                    .findParametersByGroup("org.esco.grouperui.group.members.attribut");
                            itParam = parameterGroup.getParameters().iterator();
                            while (itParam.hasNext()) {
                                parameter = itParam.next();
                                attributes.add(parameter.getKey());
                            }

                            for (Sortable group : saveGroupSelected) {
                                try {
                                    List < Person > theTmpPersons = this.grouperService.findMembers(userConnected,
                                            group.getValueFormCol(ESCOConstantes.NAME), attributes, sources,
                                            ScopeEnum.IMMEDIATE).getPersons();
                                    for (Person person : theTmpPersons) {
                                        if (!thePersons.contains(person)) {
                                            thePersons.add(person);
                                        }
                                    }
                                } catch (ESCOGroupNotFoundException e) {
                                    SearchController.LOGGER.error("Group is not found.", e);
                                } catch (ESCOInsufficientPrivilegesException e) {
                                    SearchController.LOGGER.error("Insufficient Privileges.", e);
                                }
                            }

                            result = thePersons;
                        } else {
                            org.esco.grouperui.web.beans.Error error = new org.esco.grouperui.web.beans.Error();
                            error.setStatus(true);
                            error.setMessage(I18nExceptionAdapter.getExceptionString(this.getI18nService(),
                                    "SEARCH_ERROR_MAX_RESULT", "DEFAULT_MESSAGE_EXCEPTION"));
                            XmlProducer producer = new XmlProducer();
                            producer.setTarget(error);
                            producer.setTypesOfTarget(org.esco.grouperui.web.beans.Error.class);
                            return this.xmlProducerWrapper.wrap(producer);
                        }

                    } else {
                        SearchGroupEnum searchGroupEnum = null;

                        if (SearchFieldEnum.valueOf(theDisplayTerm).eq(SearchFieldEnum.NAME)) {
                            searchGroupEnum = SearchGroupEnum.NAME;
                        } else
                            if (SearchFieldEnum.valueOf(theDisplayTerm).eq(SearchFieldEnum.DISPLAY_EXTENSION)) {
                                searchGroupEnum = SearchGroupEnum.EXTENSION;
                            } else {
                                searchGroupEnum = SearchGroupEnum.DISPLAY_NAME;
                            }
                        try {
                            result = this.grouperService.searchGroups(userConnected, searchGroupEnum,
                                    SearchTypeEnum.SIMPLE, theSearchPath, theTerm);
                        } catch (ESCOGroupNotFoundException e) {
                            // an empty table must be displayed instead of the
                            // exception
                            result = new ArrayList < Group >();
                        }

                        this.additionSearch.setSearchFieldEnum(org.esco.grouperui.web.beans.search.SearchFieldEnum
                                .fromValue(theDisplayTerm));
                    }
                }
        if (result != null) {
            for (int i = 0; i < result.size(); i++) {
                this.additionSearch.addRowDataResult((Sortable) result.get(i));
            }
        }
        return this.getXMLResultOfSearch(result);

    }

    /**
     * {@inheritDoc}
     */
    public String numberOfMember() {

        List < Sortable > saveGroupSelected = null;
        Integer cptPersons = 0;
        saveGroupSelected = this.additionSearch.getSelected();

        if (saveGroupSelected != null && saveGroupSelected.size() > 1) {

            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e) {
                SearchController.LOGGER.error("Person not found.", e);
                // nothing to do, because this jsf cannot be called if
                // person does not exist.
            } catch (ESCOSubjectNotUniqueException e) {
                SearchController.LOGGER.error("Person not unique.", e);
                // nothing to do, because this jsf cannot be called if
                // several persons with the same id.
            }

            Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
            ParameterGroup parameterGroup = null;
            Parameter parameter = null;
            Iterator < Parameter > itParam = null;
            List < String > myGroups = new ArrayList < String >();

            parameterGroup = this.parameterService.findParametersByGroup("org.esco.grouperui.group.members.map");

            itParam = parameterGroup.getParameters().iterator();
            while (itParam.hasNext()) {
                parameter = itParam.next();
                if (SourceTypeEnum.PERSON == SourceTypeEnum.valueOf(parameter.getKey().toUpperCase())) {
                    sources.put(parameter.getValue(), SourceTypeEnum.valueOf(parameter.getKey().toUpperCase()));
                }
            }

            for (Sortable group : saveGroupSelected) {
                myGroups.add(group.getValueFormCol(ESCOConstantes.NAME));
            }

            try {
                cptPersons = this.grouperService.countPersons(userConnected, myGroups, sources,
                        ScopeEnum.IMMEDIATE);
            } catch (ESCOGroupNotFoundException e1) {
                SearchController.LOGGER.error("Group is not found.", e1);
            } catch (ESCOInsufficientPrivilegesException e1) {
                SearchController.LOGGER.error("Insufficient Privileges.", e1);
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new XMLResultString(cptPersons.toString()));
        producer.setTypesOfTarget(XMLResultString.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * {@inheritDoc}
     */
    public String limitOfNumberOfMember() {

        List < Sortable > saveGroupSelected = null;
        Integer cptPersons = 0;
        saveGroupSelected = this.additionSearch.getSelected();

        if (saveGroupSelected != null && saveGroupSelected.size() > 1) {

            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e) {
                SearchController.LOGGER.error("Person not found.", e);
                // nothing to do, because this jsf cannot be called if
                // person does not exist.
            } catch (ESCOSubjectNotUniqueException e) {
                SearchController.LOGGER.error("Person not unique.", e);
                // nothing to do, because this jsf cannot be called if
                // several persons with the same id.
            }

            Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
            ParameterGroup parameterGroup = null;
            Parameter parameter = null;
            Iterator < Parameter > itParam = null;
            List < String > myGroups = new ArrayList < String >();

            parameterGroup = this.parameterService.findParametersByGroup("org.esco.grouperui.group.members.map");

            itParam = parameterGroup.getParameters().iterator();
            while (itParam.hasNext()) {
                parameter = itParam.next();
                if (SourceTypeEnum.PERSON == SourceTypeEnum.valueOf(parameter.getKey().toUpperCase())) {
                    sources.put(parameter.getValue(), SourceTypeEnum.valueOf(parameter.getKey().toUpperCase()));
                }
            }

            for (Sortable group : saveGroupSelected) {
                myGroups.add(group.getValueFormCol(ESCOConstantes.NAME));
            }

            try {
                cptPersons = this.grouperService.countPersons(userConnected, myGroups, sources,
                        ScopeEnum.IMMEDIATE);
            } catch (ESCOGroupNotFoundException e1) {
                SearchController.LOGGER.error("Group is not found.", e1);
            } catch (ESCOInsufficientPrivilegesException e1) {
                SearchController.LOGGER.error("Insufficient Privileges.", e1);
            }
        }

        ArrayList < Parameter > myParameters = (ArrayList < Parameter >) this.parameterService.findParametersById(
                "org.esco.grouperui.search.max", "search_person_in_group_max_result");

        Integer searchPersonInGroupMaxResult = 0;

        for (Parameter p : myParameters) {
            searchPersonInGroupMaxResult = Integer.decode(p.getValue());
        }

        if (cptPersons != null && cptPersons <= searchPersonInGroupMaxResult) {
            Status status = new Status(false);
            XmlProducer producer = new XmlProducer();
            producer.setTarget(status);
            producer.setTypesOfTarget(Status.class);
            return this.xmlProducerWrapper.wrap(producer);
        } else {
            org.esco.grouperui.web.beans.Error error = new org.esco.grouperui.web.beans.Error();
            error.setStatus(true);
            error.setMessage(I18nExceptionAdapter.getExceptionString(this.getI18nService(),
                    "SEARCH_ERROR_MAX_RESULT", "DEFAULT_MESSAGE_EXCEPTION"));
            XmlProducer producer = new XmlProducer();
            producer.setTarget(error);
            producer.setTypesOfTarget(org.esco.grouperui.web.beans.Error.class);
            return this.xmlProducerWrapper.wrap(producer);
        }

    }

    /**
     * {@inheritDoc}
     */
    public String getDataResultAdditionSearch() {
        final String theRows = this.getParam("rows");
        final String thePage = this.getParam("page");
        final String theSortBy = this.getParam("sidx");
        final String theSortType = this.getParam("sord");

        this.additionSearch.setNbResultDisplay(theRows);
        this.additionSearch.setCurrentPage(thePage);

        TableData tableData = TableDataFactory.populate(this.additionSearch, this.rowDataWrapper, theSortBy,
                theSortType);

        if (this.additionSearch.getSearchSubjectEnum().eq(SearchSubjectEnum.SEARCH_GROUP)
                || this.additionSearch.getSearchSubjectEnum().eq(SearchSubjectEnum.SEARCH_PERSON_IN_A_GROUP)
                && this.additionSearch.getStep().equals("1")) {
            Collection < TableRow > aux = tableData.getListOfRows();
            for (TableRow tableRow : aux) {
                List < String > cells = tableRow.getRowData().getCell();
                cells.set(SearchController.COLUMN_OF_TYPE, this.getString("SEARCH_PROFIL_DEFAULT_GROUP"));
                RowData rowData = new RowData();
                rowData.setCell(cells);
                tableRow.setRowData(rowData);
            }
        }

        return this.xmlProducerWrapper.wrap(TableDataFactory.getProducer(tableData));
    }

    /**
     * Get if all item are selected.
     * 
     * @return true if all item are selected.
     */
    public String getIsSelectedAll() {
        return this.additionSearch.getIsSelectedAll().toString();
    }

    /**
     * Get if one row is selected in addition Search.
     * 
     * @return the xml result;
     */
    public String getIsOneRowSelectedAdditionSearch() {
        Boolean result = Boolean.FALSE;

        result = this.additionSearch.getIsOneItemSelected();

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(result));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Delete simple search data.
     */
    public void clearSimpleSearchContext() {
        this.simpleSearch.cleanSearchContext();
    }

    /**
     * {@inheritDoc}
     */
    public String selectedRows() {
        final String theRows = this.getParam("rows");
        final String theTypeOfSelect = this.getParam("typeOfSelect");
        Boolean result = null;

        if (theTypeOfSelect.equals("all")) {
            result = this.additionSearch.setSelectAll();
        } else
            if (theTypeOfSelect.equals("unselectall")) {
                result = this.additionSearch.setUnSelectAll();
            } else {

                if (theRows == null || theRows.equals("")) {
                    result = this.additionSearch.setSelected(new String[0]);
                } else {
                    result = this.additionSearch.setSelected(theRows.split(","));
                }
            }
        // Create and return the XML status.
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(result));
        producer.setTypesOfTarget(Status.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Get the selected person of an addition search.
     * 
     * @return The person selected.
     */
    public List < Person > getSelectedPerson() {

        List < Person > result = new ArrayList < Person >();
        List < Sortable > selected = this.additionSearch.getSelected();
        for (Sortable sortable : selected) {
            result.add((Person) sortable);
        }
        return result;
    }

    /**
     * Get the selected group of an addition search.
     * 
     * @return The group selected.
     */
    public List < Group > getSelectedGroup() {

        List < Group > result = new ArrayList < Group >();
        List < Sortable > selected = this.additionSearch.getSelected();
        for (Sortable sortable : selected) {
            result.add((Group) sortable);
        }
        return result;
    }

    /**
     * Get the status of the search.
     * 
     * @param theList
     *            The list of result.
     * @return The XML result.
     */
    private String getXMLResultOfSearch(final List < ? > theList) {
        Boolean resultSearch = null;
        if (theList != null && theList.size() > 0) {
            resultSearch = Boolean.TRUE;
        } else {
            resultSearch = Boolean.FALSE;
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(resultSearch));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Get the list of the subject search.
     * 
     * @return a list of SelectIem for the combo box.
     */
    public List < SelectItem > getListSearchSubjectLocale() {
        SearchSubjectEnum[] enums = SearchSubjectEnum.values();

        List < SelectItem > selectItems = new ArrayList < SelectItem >();
        for (SearchSubjectEnum searchSubjectEnum : enums) {
            selectItems.add(new SelectItem(searchSubjectEnum.getLabel(), this.getString(searchSubjectEnum
                    .getLabel())));
        }

        return selectItems;
    }

    /**
     * Get the list of the display type for a group search.
     * 
     * @return a list of SelectIem for the combo-box.
     */
    public List < SelectItem > getListSearchFieldLocale() {
        SearchFieldEnum[] enums = SearchFieldEnum.values();

        List < SelectItem > selectItems = new ArrayList < SelectItem >();

        for (SearchFieldEnum searchFieldEnum : enums) {
            selectItems
                    .add(new SelectItem(searchFieldEnum.getLabel(), this.getString(searchFieldEnum.getLabel())));
        }

        return selectItems;
    }

    /**
     * Get the parameter search idNode.
     * 
     * @return the label of the idNode search.
     */
    public String getIdNode() {
        String idNode = null;
        idNode = this.getParam(ESCOConstantes.ID_NODE);
        // Add the root element if not present
        if (null != idNode && !idNode.startsWith(ESCOConstantes.STEM_NAME_SEPARATOR)) {
            idNode = ESCOConstantes.STEM_NAME_SEPARATOR + idNode;
        }

        return idNode;
    }

    /**
     * Get the parameter search nameIdNode.
     * 
     * @return the label of the nameIdNode search.
     */
    public String getNameIdNode() {
        String nameIdNode = null;
        nameIdNode = this.getParam(ESCOConstantes.NAMEID_NODE);
        // Add the root element if not present
        if (null != nameIdNode && !nameIdNode.startsWith(ESCOConstantes.STEM_NAME_SEPARATOR)) {
            nameIdNode = ESCOConstantes.STEM_NAME_SEPARATOR + nameIdNode;
        }

        return nameIdNode;
    }

    /**
     * Get the default search subject enumeration.
     * 
     * @return the label of the subject search.
     */
    public String getDefaultSearchSubjectEnum() {
        return SearchSubjectEnum.SEARCH_PERSON.getLabel();
    }

    /**
     * Get the default simple search subject enumeration.
     * 
     * @return the label of the subject search.
     */
    public String getDefaultSimpleSearchSubjectEnum() {
        return SearchSubjectEnum.SEARCH_PERSON.getLabel();
    }

    /**
     * Get the default search field enumeration.
     * 
     * @return the label of the search field
     */
    public String getDefaultSearchFieldEnum() {
        return SearchFieldEnum.DISPLAY_EXTENSION.getLabel();
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
     * Setter of the rowDataWrapper property.
     * 
     * @param theRowDataWrapper
     *            the rowDataWrapper to set
     */
    public void setRowDataWrapper(final IWrapper < Object, RowData > theRowDataWrapper) {
        this.rowDataWrapper = theRowDataWrapper;
    }

    /**
     * Setter for grouperServiceExt.
     * 
     * @param theGrouperService
     *            the grouperService to set.
     */
    public final void setGrouperService(final IGrouperService theGrouperService) {
        this.grouperService = theGrouperService;
    }

    /**
     * Get the simple search property.
     * 
     * @return the simple search
     */
    public SimpleSearch getSimpleSearch() {
        return this.simpleSearch;
    }

    /**
     * Get the addition search property.
     * 
     * @return the addition search
     */
    public AdditionSearch getAdditionSearch() {
        return this.additionSearch;
    }

    /**
     * Setter of the parameterService property.
     * 
     * @param theParameterService
     *            the parameterService to set
     */
    public void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

}
