package org.esco.grouperui.web.beans.search;

import org.esco.grouperui.web.beans.table.Listable;

/**
 * The search class. Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
public class Search extends Listable {

    /**
     * The root path for default search.
     */
    private static final String ROOT_PATH = ":";

    /**
     * The search term property.
     */
    private String              searchTerm;

    /**
     * The type of search property.
     */
    private SearchSubjectEnum   searchSubjectEnum;

    /**
     * The displaying mode if group search.
     */
    private SearchFieldEnum     searchFieldEnum;

    /**
     * The path of node to search.
     */
    private String              searchPath;

    /**
     * The display path of node to search.
     */
    private String              displaySearchPath;

    /**
     * Property to determine if it is a simple or addition search.
     */
    private SearchTypeEnum      searchTypeEnum;

    /**
     * Default constructor.
     */
    public Search() {
        super();
        this.searchTerm = "";
        this.searchSubjectEnum = SearchSubjectEnum.SEARCH_PERSON;
        this.searchFieldEnum = SearchFieldEnum.NAME;
        this.searchPath = Search.ROOT_PATH;
        this.displaySearchPath = Search.ROOT_PATH;
    }

    /**
     * @param theSearchTerm
     *            The search term.
     * @param theSearchSubjectEnum
     *            The subject search.
     * @param theSearchFieldEnum
     *            The field display for group search.
     * @param theSearchPath
     *            The search path.
     */
    public Search(final String theSearchTerm, final SearchSubjectEnum theSearchSubjectEnum,
            final SearchFieldEnum theSearchFieldEnum, final String theSearchPath) {
        super();
        this.searchTerm = theSearchTerm;
        this.searchSubjectEnum = theSearchSubjectEnum;
        this.searchFieldEnum = theSearchFieldEnum;
        this.searchPath = theSearchPath;
    }

    /**
     * Get the searchTerm property.
     * 
     * @return the searchTerm
     */
    public String getSearchTerm() {
        return this.searchTerm;
    }

    /**
     * Setter of the searchTerm property.
     * 
     * @param theSearchTerm
     *            the searchTerm to set
     */
    public void setSearchTerm(final String theSearchTerm) {
        this.searchTerm = theSearchTerm;
    }

    /**
     * Get the searchSubjectEnum property.
     * 
     * @return the searchSubjectEnum
     */
    public SearchSubjectEnum getSearchSubjectEnum() {
        return this.searchSubjectEnum;
    }

    /**
     * Setter of the searchSubjectEnum property.
     * 
     * @param theSearchSubjectEnum
     *            the searchSubjectEnum to set
     */
    public void setSearchSubjectEnum(final SearchSubjectEnum theSearchSubjectEnum) {
        this.searchSubjectEnum = theSearchSubjectEnum;
    }

    /**
     * Get the searchPath property.
     * 
     * @return the searchPath
     */
    public String getSearchPath() {
        return this.searchPath;
    }

    /**
     * Setter of the searchPath property.
     * 
     * @param theSearchPath
     *            the searchPath to set
     */
    public void setSearchPath(final String theSearchPath) {
        this.searchPath = theSearchPath;
    }

    /**
     * Get the searchFieldEnum property.
     * 
     * @return the searchFieldEnum
     */
    public SearchFieldEnum getSearchFieldEnum() {
        return this.searchFieldEnum;
    }

    /**
     * Setter of the searchFieldEnum property.
     * 
     * @param theSearchFieldEnum
     *            the searchFieldEnum to set
     */
    public void setSearchFieldEnum(final SearchFieldEnum theSearchFieldEnum) {
        this.searchFieldEnum = theSearchFieldEnum;
    }

    /**
     * Get the searchTypeEnum property.
     * 
     * @return the searchTypeEnum
     */
    public SearchTypeEnum getSearchTypeEnum() {
        return this.searchTypeEnum;
    }

    /**
     * Setter of the searchTypeEnum property.
     * 
     * @param theSearchTypeEnum
     *            the searchTypeEnum to set
     */
    public void setSearchTypeEnum(final SearchTypeEnum theSearchTypeEnum) {
        this.searchTypeEnum = theSearchTypeEnum;
    }

    /**
     * Get the displaySearchPath property.
     * 
     * @return the displaySearchPath
     */
    public String getDisplaySearchPath() {
        return this.displaySearchPath;
    }

    /**
     * Setter of the displaySearchPath property.
     * 
     * @param theDisplaySearchPath
     *            the displaySearchPath to set
     */
    public void setDisplaySearchPath(final String theDisplaySearchPath) {
        this.displaySearchPath = theDisplaySearchPath;
    }

    /**
     * Clean the context and content of the searchResult.
     */
    public void cleanSearchContext() {
        this.searchTerm = "";
        this.searchSubjectEnum = SearchSubjectEnum.SEARCH_PERSON;
        this.searchFieldEnum = SearchFieldEnum.NAME;
        this.searchPath = Search.ROOT_PATH;
        this.resetContextListable();
    }
}
