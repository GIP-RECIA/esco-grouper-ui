package org.esco.grouperui.web.beans.search;

import org.esco.grouperui.web.beans.table.Listable;

/**
 * The search class. Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */

public class SimpleSearch extends Listable implements ISearch {

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
     * The search type.
     */
    private SearchTypeEnum      searchTypeEnum;

    /**
     * Default constructor.
     */
    public SimpleSearch() {
        super();
        this.searchTerm = "";
        this.searchSubjectEnum = SearchSubjectEnum.SEARCH_PERSON;
        this.searchFieldEnum = SearchFieldEnum.NAME;
        this.searchPath = SimpleSearch.ROOT_PATH;
        this.displaySearchPath = SimpleSearch.ROOT_PATH;
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
    public SimpleSearch(final String theSearchTerm, final SearchSubjectEnum theSearchSubjectEnum,
            final SearchFieldEnum theSearchFieldEnum, final String theSearchPath) {
        super();
        this.searchTerm = theSearchTerm;
        this.searchSubjectEnum = theSearchSubjectEnum;
        this.searchFieldEnum = theSearchFieldEnum;
        this.searchPath = theSearchPath;
    }

    /**
     * {@inheritDoc}
     */
    public String getSearchTerm() {
        return this.searchTerm;
    }

    /**
     * {@inheritDoc}
     */
    public void setSearchTerm(final String theSearchTerm) {
        this.searchTerm = theSearchTerm;
    }

    /**
     * {@inheritDoc}
     */
    public SearchSubjectEnum getSearchSubjectEnum() {
        return this.searchSubjectEnum;
    }

    /**
     * {@inheritDoc}
     */
    public void setSearchSubjectEnum(final SearchSubjectEnum theSearchSubjectEnum) {
        this.searchSubjectEnum = theSearchSubjectEnum;
    }

    /**
     * {@inheritDoc}
     */
    public String getSearchPath() {
        return this.searchPath;
    }

    /**
     * {@inheritDoc}
     */
    public void setSearchPath(final String theSearchPath) {
        this.searchPath = theSearchPath;
    }

    /**
     * {@inheritDoc}
     */
    public SearchFieldEnum getSearchFieldEnum() {
        return this.searchFieldEnum;
    }

    /**
     * {@inheritDoc}
     */
    public void setSearchFieldEnum(final SearchFieldEnum theSearchFieldEnum) {
        this.searchFieldEnum = theSearchFieldEnum;
    }

    /**
     * {@inheritDoc}
     */
    public SearchTypeEnum getSearchTypeEnum() {
        return this.searchTypeEnum;
    }

    /**
     * {@inheritDoc}
     */
    public void setSearchTypeEnum(final SearchTypeEnum theSearchTypeEnum) {
        this.searchTypeEnum = theSearchTypeEnum;
    }

    /**
     * {@inheritDoc}
     */
    public String getDisplaySearchPath() {
        return this.displaySearchPath;
    }

    /**
     * {@inheritDoc}
     */
    public void setDisplaySearchPath(final String theDisplaySearchPath) {
        this.displaySearchPath = theDisplaySearchPath;
    }

    /**
     * {@inheritDoc}
     */
    public void cleanSearchContext() {
        this.searchTerm = "";
        this.searchSubjectEnum = SearchSubjectEnum.SEARCH_PERSON;
        this.searchFieldEnum = SearchFieldEnum.NAME;
        this.searchPath = SimpleSearch.ROOT_PATH;
        this.resetContextListable();
    }
}
