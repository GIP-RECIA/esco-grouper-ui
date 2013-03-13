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
package org.esco.grouperui.web.beans.table;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.esco.grouperui.domaine.beans.SortByEnum;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.tools.DistinctSortableList;

/**
 * Listable abstract class. Implements all methods for the rest service of
 * jqGrid. Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
public abstract class Listable {

    /**
     * The default current page display.
     */
    protected static final String DEFAULT_CURRENT_PAGE      = "1";

    /**
     * The default number result display.
     */
    protected static final String DEFAULT_NB_RESULT_DISPLAY = "10";

    /**
     * The Search Result (Object can be a Person or a Group).
     */
    protected DistinctSortableList<Sortable> listOfSortable;

    /**
     * The number of result item displayed.
     */
    private String                nbRowsDisplayed;

    /**
     * The currentPage of the search.
     */
    private String                currentPage;

    /**
     * Default constructor.
     */
    public Listable() {
        this.nbRowsDisplayed = Listable.DEFAULT_NB_RESULT_DISPLAY;
        this.currentPage = Listable.DEFAULT_CURRENT_PAGE;
        this.listOfSortable = new DistinctSortableList<Sortable>();
    }

    /**
     * Construct a default instance with specific parameters.
     * 
     * @param theNbRowsDisplayed
     *            The number of rows displayed.
     * @param theCurrentPage
     *            The current page of result.
     */
    public Listable(final String theNbRowsDisplayed, final String theCurrentPage) {
        this.nbRowsDisplayed = theNbRowsDisplayed;
        this.currentPage = theCurrentPage;
        this.listOfSortable = new DistinctSortableList<Sortable>();
    }

    /**
     * Reset the context of the instance with default parameters.
     */
    public void resetContextListable() {
        this.nbRowsDisplayed = Listable.DEFAULT_NB_RESULT_DISPLAY;
        this.currentPage = Listable.DEFAULT_CURRENT_PAGE;
        this.listOfSortable = new DistinctSortableList<Sortable>();
    }

    /**
     * Reset the context of the instance with parameters.
     * 
     * @param theNbRowsDisplayed
     *            The number of rows displayed.
     * @param theCurrentPage
     *            The current page of result.
     */
    public void resetContextListable(final String theNbRowsDisplayed, final String theCurrentPage) {
        this.nbRowsDisplayed = Listable.DEFAULT_NB_RESULT_DISPLAY;
        this.currentPage = Listable.DEFAULT_CURRENT_PAGE;
        this.listOfSortable = new DistinctSortableList<Sortable>();
    }

    /**
     * Get the defaultNbResultDisplay property.
     * 
     * @return the defaultNbResultDisplay
     */
    public static int getDefaultNbRowsDisplayed() {
        return Integer.parseInt(Listable.DEFAULT_NB_RESULT_DISPLAY);
    }

    /**
     * Get the number of pages.
     * 
     * @return The number of pages.
     */
    public String getNumberOfPages() {
        int nbPage = this.listOfSortable.size() / Integer.parseInt(this.nbRowsDisplayed);
        if (this.listOfSortable.size() % Integer.parseInt(this.nbRowsDisplayed) != 0) {
            nbPage += 1;
        }

        if (nbPage < Integer.parseInt(this.currentPage)) {
            this.currentPage = String.valueOf(nbPage);
        }

        return String.valueOf(nbPage);
    }

    /**
     * Get the number rows for the current page.
     * 
     * @return The number result.
     */
    public int getNbRowsDisplayedForTheCurrentPage() {
        int result;

        if (!this.currentPage.equals(this.getNumberOfPages())) {
            result = Integer.parseInt(this.nbRowsDisplayed);
        } else {
            result = this.listOfSortable.size() % Integer.parseInt(this.nbRowsDisplayed);
        }
        return result;
    }

    /**
     * Get the listOfSortable property.
     * 
     * @return the listOfSortable
     */
    public List < Sortable > getListOfSortable() {
        return this.listOfSortable;
    }

    /**
     * Setter of the listOfSortable property.
     * 
     * @param theListOfSortable
     *            the listOfSortable to set
     */
    public void setListOfSortable(final DistinctSortableList<Sortable> theListOfSortable) {
        this.listOfSortable = theListOfSortable;
    }

    /**
     * Add a row item.
     * 
     * @param theSortable
     *            The sortable item. .
     */
    public void addRowDataResult(final Sortable theSortable) {
        this.listOfSortable.add(theSortable);
    }

    /**
     * Get the number of rows.
     * 
     * @return The number of rows.
     */
    public String getListOfSortableSize() {
        return String.valueOf(this.listOfSortable.size());
    }

    /**
     * Get the nbResultDisplay property.
     * 
     * @return the nbResultDisplay
     */
    public String getNbResultDisplay() {
        return this.nbRowsDisplayed;
    }

    /**
     * Setter of the nbResultDisplay property.
     * 
     * @param theNbResultDisplay
     *            the nbResultDisplay to set
     */
    public void setNbResultDisplay(final String theNbResultDisplay) {
        this.nbRowsDisplayed = theNbResultDisplay;
    }

    /**
     * Get the currentPage property.
     * 
     * @return the currentPage
     */
    public String getCurrentPage() {
        return this.currentPage;
    }

    /**
     * Setter of the currentPage property.
     * 
     * @param theCurrentPage
     *            the currentPage to set
     */
    public void setCurrentPage(final String theCurrentPage) {
        if (this.listOfSortable.size() == 0) {
            this.currentPage = Listable.DEFAULT_CURRENT_PAGE;
        } else
            if (this.listOfSortable.size() < Integer.parseInt(this.getNbResultDisplay())
                    || !(Integer.parseInt(theCurrentPage) > 0)) {
                this.currentPage = Listable.DEFAULT_CURRENT_PAGE;
            } else {

                // We retrieve the number of pages.
                int nbPage = this.listOfSortable.size() / Integer.parseInt(this.nbRowsDisplayed);
                if (this.listOfSortable.size() % Integer.parseInt(this.nbRowsDisplayed) != 0) {
                    nbPage += 1;
                }

                // We check if theCurrentPage is in range of the possible page
                // to
                // display.
                if (nbPage < Integer.parseInt(theCurrentPage)) {
                    this.currentPage = String.valueOf(nbPage);
                } else {
                    this.currentPage = theCurrentPage;
                }
            }
    }

    /**
     * Get the part of the list request sorted.
     * 
     * @param theSortBy
     *            The column to sort.
     * @param theSortType
     *            The sort type.
     * @return the Part of results.
     */
    public List < Sortable > getRowsSorted(final String theSortBy, final String theSortType) {
        List < Sortable > result = new ArrayList < Sortable >();

        if (theSortType != null) {
            Collections.sort(this.listOfSortable, new Comparator < Sortable >() {
                public int compare(final Sortable theO1, final Sortable theO2) {
                    String valueO1 = theO1.getValueFormCol(theSortBy);
                    String valueO2 = theO2.getValueFormCol(theSortBy);
                    if (valueO1 == null) {
                        valueO1 = "";
                    }
                    if (valueO2 == null) {
                        valueO2 = "";
                    }
                    if (SortByEnum.ASC == SortByEnum.fromValue(theSortType)) {
                        return valueO1.compareToIgnoreCase(valueO2);
                    } else {
                        return valueO2.compareToIgnoreCase(valueO1);
                    }
                }
            });
        }

        int startingIndex = (Integer.parseInt(this.currentPage) - 1) * Integer.parseInt(this.nbRowsDisplayed);
        for (int i = startingIndex; i < this.listOfSortable.size()
                && i - startingIndex < Integer.parseInt(this.nbRowsDisplayed); i++) {
            result.add(this.listOfSortable.get(i));
        }
        return result;
    }

    /**
     * Clean the list of items.
     */
    public void cleanListOfSortable() {
        this.listOfSortable.clear();
    }

    /**
     * Set selected the rows items.
     * 
     * @param theSelected
     *            The selected items id.
     * @return the result status
     */
    public boolean setSelected(final String... theSelected) {
        int startingIndex = (Integer.parseInt(this.currentPage) - 1) * Integer.parseInt(this.nbRowsDisplayed);

        try {
            for (int i = 0; i < Integer.parseInt(this.nbRowsDisplayed); i++) {

                this.listOfSortable.get(startingIndex + i).setSelected(false);
            }
        } catch (IndexOutOfBoundsException e) {
            // FIXME
        }

        for (String element : theSelected) {
            this.listOfSortable.get(startingIndex + Integer.parseInt(element) - 1).setSelected(true);
        }
        return true;
    }

    /**
     * Select all elements in the sortable list.
     * 
     * @return the result of operation.
     */
    public boolean setSelectAll() {
        for (int i = 0; i < this.listOfSortable.size(); i++) {
            this.listOfSortable.get(i).setSelected(true);
        }
        return true;
    }

    /**
     * Unselect all elements in the sortable list.
     * 
     * @return the result of the operation.
     */
    public boolean setUnSelectAll() {
        if (this.listOfSortable != null) {
            for (int i = 0; i < this.listOfSortable.size(); i++) {
                this.listOfSortable.get(i).setSelected(false);
            }
        }
        return true;
    }

    /**
     * Get if all item are selected.
     * 
     * @return true if all are selected.
     */
    protected Boolean getIsSelectedAll() {
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
     * Get all data selected.
     * 
     * @return The list of data selected
     */
    public List < Sortable > getSelected() {
        List < Sortable > result = new ArrayList < Sortable >();
        for (Sortable sortable : this.listOfSortable) {
            if (sortable.getSelected()) {
                result.add(sortable);
            }
        }
        return result;
    }

}
