package org.esco.grouperui.web.beans.table;

import java.util.ArrayList;
import java.util.Collection;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * The TableData class. Construct the JSON result to the jgGrid.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "invoices")
public class TableData {

    /**
     * The number of results items.
     */
    private String                  nbResult;

    /**
     * The number of page.
     */
    private String                  nbResultPage;

    /**
     * The current page.
     */
    private String                  currentPage;

    /**
     * The number of results items display.
     */
    private String                  nbDisplayItem;

    /**
     * If is all items are selected.
     */
    private String                  isAllSelected;

    /**
     * If exist any added items.
     */
    private String                  isExistingAddedItem;

    /**
     * The list of row of the search result.
     */
    private Collection < TableRow > listOfRows = new ArrayList < TableRow >();

    /**
     * Default constructor.
     */
    public TableData() {
    }

    /**
     * Get the listOfRows property.
     * 
     * @return the listOfRows
     */
    @XmlElement(name = "result")
    public Collection < TableRow > getListOfRows() {
        return this.listOfRows;
    }

    /**
     * Setter of the listOfRows property.
     * 
     * @param theListOfRows
     *            the listOfRows to set
     */
    public void setListOfRows(final Collection < TableRow > theListOfRows) {
        this.listOfRows = theListOfRows;
    }

    /**
     * Add a row to the collection of result.
     * 
     * @param theRow
     *            The row to add to the collection.
     */
    public void addARow(final TableRow theRow) {
        this.listOfRows.add(theRow);
    }

    /**
     * Get the nbResult property.
     * 
     * @return the nbResult
     */
    public String getNbResult() {
        return this.nbResult;
    }

    /**
     * Setter of the nbResult property.
     * 
     * @param theNbResult
     *            the nbResult to set
     */
    public void setNbResult(final String theNbResult) {
        this.nbResult = theNbResult;
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
        this.currentPage = theCurrentPage;
    }

    /**
     * Get the nbResultPage property.
     * 
     * @return the nbResultPage
     */
    public String getNbResultPage() {
        return this.nbResultPage;
    }

    /**
     * Setter of the nbResultPage property.
     * 
     * @param theNbResultPage
     *            the nbResultPage to set
     */
    public void setNbResultPage(final String theNbResultPage) {
        this.nbResultPage = theNbResultPage;
    }

    /**
     * Get the nbDisplayItem property.
     * 
     * @return the nbDisplayItem
     */
    public String getNbDisplayItem() {
        return this.nbDisplayItem;
    }

    /**
     * Setter of the nbDisplayItem property.
     * 
     * @param theNbDisplayItem
     *            the nbDisplayItem to set
     */
    public void setNbDisplayItem(final String theNbDisplayItem) {
        this.nbDisplayItem = theNbDisplayItem;
    }

    /**
     * Get the isAllSelected property.
     * 
     * @return the isAllSelected
     */
    public String getIsAllSelected() {
        return this.isAllSelected;
    }

    /**
     * Setter of the isAllSelected property.
     * 
     * @param theIsAllSelected
     *            the isAllSelected to set
     */
    public void setIsAllSelected(final String theIsAllSelected) {
        this.isAllSelected = theIsAllSelected;
    }

    /**
     * Get the isExistingAddedItem property.
     * 
     * @return the isExistingAddedItem
     */
    public String getIsExistingAddedItem() {
        return this.isExistingAddedItem;
    }

    /**
     * Setter of the isExistingAddedItem property.
     * 
     * @param theIsExistingAddedItem
     *            the isExistingAddedItem to set
     */
    public void setIsExistingAddedItem(final String theIsExistingAddedItem) {
        this.isExistingAddedItem = theIsExistingAddedItem;
    }

}
