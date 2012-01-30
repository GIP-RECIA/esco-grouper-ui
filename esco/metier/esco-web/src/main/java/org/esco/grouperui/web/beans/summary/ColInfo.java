package org.esco.grouperui.web.beans.summary;

import java.io.Serializable;

/**
 * class for store column informations.
 * 
 * @author Diogene
 */
public class ColInfo implements Serializable {

    /**
     * the serial uid.
     */
    private static final long serialVersionUID = -936418861889603437L;

    /** the name of column. */
    private final String      colName;
    /** the type of column (LABEL, SELECT, INPUT ... ) */
    private DataTypeEnum      dataType;
    /** hidden information. */
    private Boolean           hidden           = Boolean.FALSE;

    /**
     * @param theColName
     *            the name of column.
     * @param theHiddenInfo
     *            hidden information.
     * @param theDataType
     *            the type of column (LABEL, SELECT, INPUT ... )
     */
    public ColInfo(final String theColName, final Boolean theHiddenInfo, final DataTypeEnum theDataType) {
        this.colName = theColName;
        this.hidden = theHiddenInfo;
        this.dataType = theDataType;
    }

    /**
     * @param theColName
     *            the name of column.
     * @param theHiddenInfo
     *            hidden information.
     */
    public ColInfo(final String theColName, final Boolean theHiddenInfo) {
        this.colName = theColName;
        this.hidden = theHiddenInfo;
    }

    /**
     * @param theColName
     *            the name of column.
     */
    public ColInfo(final String theColName) {
        this.colName = theColName;
    }

    /**
     * getter for property colName.
     * 
     * @return the colName
     */
    public String getColName() {
        return this.colName;
    }

    /**
     * getter for property hidden.
     * 
     * @return the hidden
     */
    public Boolean getHidden() {
        return this.hidden;
    }

    /**
     * getter for property dataType.
     * 
     * @return the dataType
     */
    public String getDataType() {
        if (this.dataType == null) {
            return DataTypeEnum.LABEL.name();
        }
        return this.dataType.name();
    }

}
