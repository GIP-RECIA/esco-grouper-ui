package org.esco.grouperui.web.beans.table;

import javax.xml.bind.annotation.XmlElement;

/**
 * The TableRow class.A jGrid row.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
public class TableRow {

    /**
     * The rowData property.
     */
    private RowData rowData;

    /**
     * Default constructor.
     */
    public TableRow() {
    }

    /**
     * Constructor of the class.
     * 
     * @param theRowData
     *            The data of the row
     */
    public TableRow(final RowData theRowData) {
        this.rowData = theRowData;
    }

    /**
     * Get the dataResult property.
     * 
     * @return the dataResult
     */
    @XmlElement(name = "row", type = RowData.class)
    public RowData getRowData() {
        return this.rowData;
    }

    /**
     * Setter of the dataResult property.
     * 
     * @param theRowData
     *            the theRowData to set
     */
    public void setRowData(final RowData theRowData) {
        this.rowData = theRowData;
    }

}
