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

import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.web.beans.ISortableWrapper;
import org.esco.grouperui.web.beans.group.StoredData;
import org.esco.grouperui.web.beans.search.AdditionSearch;
import org.esco.grouperui.web.beans.search.SimpleSearch;
import org.esco.grouperui.web.beans.search.StemSearch;
import org.esco.grouperui.web.beans.stem.StoredPrivileges;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * The TableData factory class.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1
 * -021],[RECIA-ESCO-L1-008],[RECIA-ESCO-L2-001], [RECIA-ESCO-L2-002],
 * [RECIA-ESCO-L2-003]
 * 
 * @author aChesneau
 */
public class TableDataFactory {

    /**
     * Default constructor.
     */
    private TableDataFactory() {
    }

    /**
     * Get the xml producer for return a table table in xml format.
     * 
     * @param theTableData
     *            the table data of the grid.
     * @return The xml producer wich permits to create the xml of table data.
     */
    public static XmlProducer getProducer(final TableData theTableData) {

        XmlProducer producer = new XmlProducer();
        producer.setTarget(theTableData);
        producer.setTypesOfTarget(TableData.class, RowData.class, TableRow.class);

        return producer;
    }

    /**
     * Populate the class from a simple search.
     * 
     * @param theSearch
     *            The search.
     * @param theRowDataWrapper
     *            The wrapper.
     * @param theSortBy
     *            The sort column.
     * @param theSortType
     *            The sort type.
     * @return The TableData populate.
     */
    public static TableData populate(final SimpleSearch theSearch,
            final IWrapper < Object, RowData > theRowDataWrapper, final String theSortBy, final String theSortType) {
        TableData tableData = new TableData();

        List < Sortable > partOfResult = theSearch.getRowsSorted(theSortBy, theSortType);

        for (int i = 0; i < partOfResult.size(); i++) {
            RowData rowData = theRowDataWrapper.wrap(partOfResult.get(i));
            tableData.addARow(new TableRow(rowData));
        }

        tableData.setNbResult(theSearch.getListOfSortableSize());
        tableData.setNbResultPage(theSearch.getNumberOfPages());
        tableData.setCurrentPage(theSearch.getCurrentPage());
        return tableData;
    }

    /**
     * Populate the class from an addition search.
     * 
     * @param theSearch
     *            The search.
     * @param theRowDataWrapper
     *            The wrapper.
     * @param theSortBy
     *            The sort column.
     * @param theSortType
     *            The sort type.
     * @return The TableData populate.
     */
    public static TableData populate(final AdditionSearch theSearch,
            final IWrapper < Object, RowData > theRowDataWrapper, final String theSortBy, final String theSortType) {
        TableData tableData = new TableData();

        List < Sortable > partOfResult = theSearch.getRowsSorted(theSortBy, theSortType);

        for (int i = 0; i < partOfResult.size(); i++) {
            RowData rowData = theRowDataWrapper.wrap(partOfResult.get(i));
            tableData.addARow(new TableRow(rowData));
        }

        tableData.setIsAllSelected(theSearch.getIsSelectedAll().toString());
        tableData.setNbResult(theSearch.getListOfSortableSize());
        tableData.setNbResultPage(theSearch.getNumberOfPages());
        tableData.setCurrentPage(theSearch.getCurrentPage());
        return tableData;
    }

    /**
     * Populate the class from an stem search.
     * 
     * @param theSearch
     *            The search.
     * @param theRowDataWrapper
     *            The wrapper.
     * @param theSortBy
     *            The sort column.
     * @param theSortType
     *            The sort type.
     * @return The TableData populate.
     */
    public static TableData populate(final StemSearch theSearch,
            final IWrapper < Object, RowData > theRowDataWrapper, final String theSortBy, final String theSortType) {
        TableData tableData = new TableData();

        List < Sortable > partOfResult = theSearch.getRowsSorted(theSortBy, theSortType);

        for (int i = 0; i < partOfResult.size(); i++) {
            RowData rowData = theRowDataWrapper.wrap(partOfResult.get(i));
            tableData.addARow(new TableRow(rowData));
        }

        tableData.setIsAllSelected(theSearch.getIsSelectedAll().toString());
        tableData.setNbResult(theSearch.getListOfSortableSize());
        tableData.setNbResultPage(theSearch.getNumberOfPages());
        tableData.setCurrentPage(theSearch.getCurrentPage());
        return tableData;
    }

    /**
     * Populate the REST class for the find privileges.
     * 
     * @param theItems
     *            The list of items.
     * @param theRowDataWrapper
     *            The wrapper.
     * @param theSortBy
     *            The sort column.
     * @param theSortType
     *            The sort type.
     * @return the TableData populated.
     */
    public static TableData populate(final StoredData theItems, final ISortableWrapper theRowDataWrapper,
            final String theSortBy, final String theSortType) {

        TableData tableData = new TableData();
        if (!"0".equals(theItems.getListOfSortableSize())) {
            List < Sortable > partOfResult = theItems.getRowsSorted(theSortBy, theSortType);
            for (Sortable sortable : partOfResult) {
                RowData rowData = theRowDataWrapper.wrap(sortable);
                tableData.addARow(new TableRow(rowData));
            }
        }
        // Exist or not added item in the list
        tableData.setIsExistingAddedItem(theItems.getIsExistingAddedItem());
        // Is all selected
        tableData.setIsAllSelected(theItems.getIsAllItemsSelected());
        tableData.setNbResult(theItems.getListOfSortableSize());
        tableData.setNbResultPage(theItems.getNumberOfPages());
        tableData.setCurrentPage(theItems.getCurrentPage());
        return tableData;
    }

    /**
     * Populate the REST class for the find privileges.
     * 
     * @param thePrivileges
     *            the Membership.
     * @param thePrivilegeRowDataWrapper
     *            the wrapper.
     * @param theSortBy
     *            The sort column.
     * @param theSortType
     *            The sort type.
     * @return the TableData populated.
     */
    public static TableData populate(final StoredPrivileges thePrivileges,
            final IWrapper < Sortable, RowData > thePrivilegeRowDataWrapper, final String theSortBy,
            final String theSortType) {

        TableData tableData = new TableData();

        List < Sortable > partOfResult = thePrivileges.getRowsSorted(theSortBy, theSortType);

        Iterator < Sortable > partOfResultIt = partOfResult.iterator();

        while (partOfResultIt.hasNext()) {
            RowData rowData = thePrivilegeRowDataWrapper.wrap(partOfResultIt.next());
            tableData.addARow(new TableRow(rowData));
        }

        tableData.setIsAllSelected(thePrivileges.getIsSelectedAll().toString());
        tableData.setNbResult(thePrivileges.getListOfSortableSize());
        tableData.setNbResultPage(thePrivileges.getNumberOfPages());
        tableData.setCurrentPage(thePrivileges.getCurrentPage());
        return tableData;
    }
}
