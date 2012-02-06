package org.esco.grouperui.web.controllers.search;

import java.util.ArrayList;
import java.util.List;

import javax.faces.model.SelectItem;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.SearchStemEnum;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.search.SearchFieldEnum;
import org.esco.grouperui.web.beans.search.StemSearch;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.controllers.AbstractContextAwareController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * The SearchController class. Requirement(s):[RECIA-ESCO-L2-003]
 * 
 * @author aChesneau
 */
public class StemSearchController extends AbstractContextAwareController {
    /**
     * Logger for this class.
     */
    private static final IESCOLogger         LOGGER           = ESCOLoggerFactory
                                                                      .getLogger(SearchController.class);
    /**
     * The serialVersionUID of the class.
     */
    private static final long                serialVersionUID = 4844681626796203405L;

    /** The GrouperService that provide services from grouper. */
    private IGrouperService                  grouperService;

    /**
     * The stem search property.
     */
    private final transient StemSearch       stemSearch;

    /** The RowData wrapper. */
    private IWrapper < Object, RowData >     rowDataWrapper;

    /** The xmlProducer wrapper. */
    private IWrapper < XmlProducer, String > xmlProducerWrapper;

    /**
     * Default constructor.
     */
    public StemSearchController() {
        this.stemSearch = new StemSearch();
    }

    /**
     * {@inheritDoc}
     */
    public String stemSearch() {

        String theTerm = this.getParam(ESCOConstantes.THE_TERM);
        String theSearchPath = this.getParam(ESCOConstantes.THE_SEARCH_PATH).replace("%3A", ":");
        String theDisplayTerm = this.getParam(ESCOConstantes.THE_DISPLAY_TERM);

        // remove the first ":" which correspond to the root element
        // except if the search is based on the root element
        if (theSearchPath.startsWith(ESCOConstantes.STEM_NAME_SEPARATOR) && theSearchPath.length() > 1) {
            theSearchPath = theSearchPath.substring(1, theSearchPath.length());
        }

        this.stemSearch.cleanSearchContext();

        this.stemSearch.setSearchTerm(theTerm);
        this.stemSearch.setSearchPath(theSearchPath);

        List < Stem > result = null;

        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
            StemSearchController.LOGGER.error(e, "Person not found.");
        } catch (ESCOSubjectNotUniqueException e) {
            StemSearchController.LOGGER.error(e, "Person not unique.");
        }

        SearchStemEnum searchStemEnum = null;

        if (SearchFieldEnum.valueOf(theDisplayTerm).eq(SearchFieldEnum.NAME)) {
            searchStemEnum = SearchStemEnum.NAME;
        } else
            if (SearchFieldEnum.valueOf(theDisplayTerm).eq(SearchFieldEnum.DISPLAY_EXTENSION)) {
                searchStemEnum = SearchStemEnum.EXTENSION;
            } else {
                searchStemEnum = SearchStemEnum.DISPLAY_NAME;
            }
        try {
            result = this.grouperService.searchStems(userConnected, searchStemEnum, theTerm, theSearchPath);
        } catch (ESCOStemNotFoundException e) {
            // an empty table must be displayed instead of the exception
            result = new ArrayList < Stem >();
        }

        this.stemSearch.setSearchFieldEnum(org.esco.grouperui.web.beans.search.SearchFieldEnum
                .fromValue(theDisplayTerm));

        if (result != null) {
            for (int i = 0; i < result.size(); i++) {
                this.stemSearch.addRowDataResult(result.get(i));
            }
        }
        return this.getXMLResultOfSearch(result);

    }

    /**
     * {@inheritDoc}
     */
    public String getDataResultStemSearch() {
        final String theRows = this.getParam("rows");
        final String thePage = this.getParam("page");
        final String theSortBy = this.getParam("sidx");
        final String theSortType = this.getParam("sord");

        this.stemSearch.setNbResultDisplay(theRows);
        this.stemSearch.setCurrentPage(thePage);

        TableData tableData = TableDataFactory.populate(this.stemSearch, this.rowDataWrapper, theSortBy,
                theSortType);

        return this.xmlProducerWrapper.wrap(TableDataFactory.getProducer(tableData));
    }

    /**
     * Get if all item are selected.
     * 
     * @return true if all item are selected.
     */
    public String getIsSelectedAll() {
        return this.stemSearch.getIsSelectedAll().toString();
    }

    /**
     * Get if one row is selected in stem Search.
     * 
     * @return the xml result;
     */
    public String getIsOneRowSelectedStemSearch() {
        Boolean result = Boolean.FALSE;

        result = this.stemSearch.getIsOneItemSelected();

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(result));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * {@inheritDoc}
     */
    public String selectedRows() {
        final String theRows = this.getParam("rows");
        final String theTypeOfSelect = this.getParam("typeOfSelect");
        Boolean result = null;

        if (theTypeOfSelect.equals("all")) {
            result = this.stemSearch.setSelectAll();
        } else
            if (theTypeOfSelect.equals("unselectall")) {
                result = this.stemSearch.setUnSelectAll();
            } else {

                if (theRows == null || theRows.equals("")) {
                    result = this.stemSearch.setSelected(new String[0]);
                } else {
                    result = this.stemSearch.setSelected(theRows.split(","));
                }
            }
        // Create and return the XML status.
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(result));
        producer.setTypesOfTarget(Status.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Get the selected group of an stem search.
     * 
     * @return The group selected.
     */
    public List < Stem > getSelectedStem() {

        List < Stem > result = new ArrayList < Stem >();
        List < Sortable > selected = this.stemSearch.getSelected();
        for (Sortable sortable : selected) {
            result.add((Stem) sortable);
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
     * Get the stem search property.
     * 
     * @return the stem search
     */
    public StemSearch getStemSearch() {
        return this.stemSearch;
    }
}
