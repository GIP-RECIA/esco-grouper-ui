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

import org.esco.grouperui.web.beans.table.Listable;

/**
 * The search class. Requirement(s):[RECIA-ESCO-L2-003]
 * 
 * @author aChesneau
 */
public class StemSearch extends Listable implements ISearch {

    /**
     * The root path for default search.
     */
    private static final String ROOT_PATH = ":";

    /**
     * The search term property.
     */
    private String              searchTerm;

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
     * Default constructor.
     */
    public StemSearch() {
        super();
        this.searchTerm = "";
        this.searchFieldEnum = SearchFieldEnum.DISPLAY_EXTENSION;
        this.searchPath = StemSearch.ROOT_PATH;
        this.displaySearchPath = StemSearch.ROOT_PATH;
    }

    /**
     * @param theSearchTerm
     *            The search term.
     * @param theSearchFieldEnum
     *            The field display for group search.
     * @param theSearchPath
     *            The search path.
     */
    public StemSearch(final String theSearchTerm, final SearchFieldEnum theSearchFieldEnum,
            final String theSearchPath) {
        super();
        this.searchTerm = theSearchTerm;
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
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public void setSearchTypeEnum(final SearchTypeEnum theSearchTypeEnum) {
        // Nothing to do because never call in stem search.
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
        this.searchFieldEnum = SearchFieldEnum.DISPLAY_EXTENSION;
        this.searchPath = StemSearch.ROOT_PATH;
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
     * {@inheritDoc}
     */
    public SearchSubjectEnum getSearchSubjectEnum() {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public void setSearchSubjectEnum(final SearchSubjectEnum theSearchSubjectEnum) {
        // Nothing to do. Never call for stem search.
    }
}
