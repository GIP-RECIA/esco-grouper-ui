package org.esco.grouperui.web.beans.table;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * The DataGrid class. Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "row")
public class RowData {

    /**
     * The ArrayList of cells.
     */
    private List < String > cell;

    /**
     * The default constructor.
     */
    public RowData() {
    }

    /**
     * Get the cell property.
     * 
     * @return the cells
     */
    public List < String > getCell() {
        return this.cell;
    }

    /**
     * Setter of the cells.
     * 
     * @param theCells
     *            the cells to set
     */
    public void setCell(final List < String > theCells) {
        this.cell = theCells;
    }

    /**
     * Add a cell data to the list.
     * 
     * @param theData
     *            The data to add.
     */
    public void addCellData(final String theData) {
        if (this.cell == null) {
            this.cell = new ArrayList < String >();
        }
        this.cell.add(theData);
    }

}
