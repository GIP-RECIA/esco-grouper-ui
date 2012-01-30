package org.esco.grouperui.web.beans.search;

/**
 * Interface of search.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021],[RECIA-ESCO-L2-003]
 * 
 * @author aChesneau
 */
public interface ISearch {

    /**
     * Get the searchTerm property.
     * 
     * @return the searchTerm
     */
    String getSearchTerm();

    /**
     * Setter of the searchTerm property.
     * 
     * @param theSearchTerm
     *            the searchTerm to set
     */
    void setSearchTerm(final String theSearchTerm);

    /**
     * Get the searchSubjectEnum property.
     * 
     * @return the searchSubjectEnum
     */
    SearchSubjectEnum getSearchSubjectEnum();

    /**
     * Setter of the searchSubjectEnum property.
     * 
     * @param theSearchSubjectEnum
     *            the searchSubjectEnum to set
     */
    void setSearchSubjectEnum(final SearchSubjectEnum theSearchSubjectEnum);

    /**
     * Get the searchPath property.
     * 
     * @return the searchPath
     */
    String getSearchPath();

    /**
     * Setter of the searchPath property.
     * 
     * @param theSearchPath
     *            the searchPath to set
     */
    void setSearchPath(final String theSearchPath);

    /**
     * Get the searchFieldEnum property.
     * 
     * @return the searchFieldEnum
     */
    SearchFieldEnum getSearchFieldEnum();

    /**
     * Setter of the searchFieldEnum property.
     * 
     * @param theSearchFieldEnum
     *            the searchFieldEnum to set
     */
    void setSearchFieldEnum(final SearchFieldEnum theSearchFieldEnum);

    /**
     * Get the searchTypeEnum property.
     * 
     * @return the searchTypeEnum
     */
    SearchTypeEnum getSearchTypeEnum();

    /**
     * Setter of the searchTypeEnum property.
     * 
     * @param theSearchTypeEnum
     *            the searchTypeEnum to set
     */
    void setSearchTypeEnum(final SearchTypeEnum theSearchTypeEnum);

    /**
     * Get the displaySearchPath property.
     * 
     * @return the displaySearchPath
     */
    String getDisplaySearchPath();

    /**
     * Setter of the displaySearchPath property.
     * 
     * @param theDisplaySearchPath
     *            the displaySearchPath to set
     */
    void setDisplaySearchPath(final String theDisplaySearchPath);

    /**
     * Clean the context and content of the searchResult.
     */
    void cleanSearchContext();

}
