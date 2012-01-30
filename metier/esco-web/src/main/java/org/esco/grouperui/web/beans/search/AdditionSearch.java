package org.esco.grouperui.web.beans.search;

import org.esco.grouperui.web.beans.table.Listable;

/**
 * The search class. Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
public class AdditionSearch extends Listable implements ISearch {

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
     * The step of the person in group.
     */
    private String              step      = "1";

    /**
     * Default constructor.
     */
    public AdditionSearch() {
        super();
        this.searchTerm = "";
        this.searchSubjectEnum = SearchSubjectEnum.SEARCH_PERSON;
        this.step = "1";
        this.searchFieldEnum = SearchFieldEnum.DISPLAY_EXTENSION;
        this.searchPath = AdditionSearch.ROOT_PATH;
        this.displaySearchPath = AdditionSearch.ROOT_PATH;
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
    public AdditionSearch(final String theSearchTerm, final SearchSubjectEnum theSearchSubjectEnum,
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
        this.searchFieldEnum = SearchFieldEnum.DISPLAY_EXTENSION;
        this.searchPath = AdditionSearch.ROOT_PATH;
        this.step = "1";
        this.resetContextListable();
    }

    /**
     * Get if all item are selected.
     * 
     * @return true if all are selected.
     */
    @Override
    public Boolean getIsSelectedAll() {
        Boolean result = Boolean.TRUE;

        if (this.listOfSortable.size() == 0) {
            result = Boolean.FALSE;
        } else {
            for (int i = 0; i < this.listOfSortable.size(); i++) {
                if (!this.listOfSortable.get(i).getSelected()) {
                    result = Boolean.FALSE;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * Get if one item are selected.
     * 
     * @return true if all are selected.
     */
    public Boolean getIsOneItemSelected() {
        Boolean result = Boolean.FALSE;

        if (this.listOfSortable.size() == 0) {
            result = Boolean.FALSE;
        } else {
            for (int i = 0; i < this.listOfSortable.size(); i++) {
                if (this.listOfSortable.get(i).getSelected()) {
                    result = Boolean.TRUE;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * Get the step property.
     * 
     * @return the step
     */
    public String getStep() {
        return this.step;
    }

    /**
     * Setter of the step property.
     * 
     * @param theStep
     *            the step to set
     */
    public void setStep(final String theStep) {
        this.step = theStep;
    }

}
