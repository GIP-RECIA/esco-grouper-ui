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
