package org.esco.grouperui.web.beans.summary;

import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.exceptions.ESCOTechnicalException;

/**
 * Class Resume. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004] <br/>
 * [RECIA-ESCO-L1-005] <br/>
 * [RECIA-ESCO-L1-008] <br/>
 * 
 * @author dMoulron
 */
public class Resume {

    /** the title of group information. */
    private String                  title;
    /** the jsp for display information. if null use the predefined area. */
    private String                  jsp;
    /** the list of index that are added, deleted, modified, ... */
    private List < String >         index;
    /** controller class corresponding to the changed data. */
    private String                  controllerClass;
    /** all data. */
    private List < List < String >> data;
    /** all original data. */
    private List < List < String >> originals;
    /** list of column. */
    private List < ColInfo >        colInfos;
    /** type of row data (added, deleted, update, error). */
    private List < String >         typeData;
    /** indicator of status of data. */
    private boolean                 saved  = Boolean.FALSE;

    /** current index. */
    private int                     idNum  = 0;
    /** index of row. */
    private int                     rowNum = 0;

    /** index of column. */
    private int                     colNum = 0;

    /**
     * Default constructor.
     */
    public Resume() {
    }

    /**
     * Getter for index.
     * 
     * @return the index to get.
     */
    public final List < String > getIndex() {
        return this.index;
    }

    /**
     * Setter for index.
     * 
     * @param theIndex
     *            the index to set.
     */
    public final void setIndex(final List < String > theIndex) {
        this.index = theIndex;
    }

    /**
     * Getter for controllerClass.
     * 
     * @return the controllerClass to get.
     */
    public final String getControllerClass() {
        return this.controllerClass;
    }

    /**
     * Setter for controllerClass.
     * 
     * @param theControllerClass
     *            the controllerClass to set.
     */
    public final void setControllerClass(final String theControllerClass) {
        this.controllerClass = theControllerClass;
    }

    /**
     * getter for property saved.
     * 
     * @return the saved
     */
    public boolean getSaved() {
        return this.saved;
    }

    /**
     * setter for property saved.
     * 
     * @param theSaved
     *            the saved to set
     */
    public void setSaved(final boolean theSaved) {
        this.saved = theSaved;
    }

    /**
     * getter for property saved.
     * 
     * @return the saved
     */
    public boolean getError() {
        if (this.typeData == null) {
            return Boolean.FALSE;
        }

        Iterator < String > itTypeData = this.typeData.iterator();

        while (itTypeData.hasNext()) {
            String type = itTypeData.next();
            if (TypeDataSmmary.ERROR.equals(TypeDataSmmary.valueOf(type))) {
                return Boolean.TRUE;
            }
        }

        return Boolean.FALSE;
    }

    /**
     * getter for property title.
     * 
     * @return the title
     */
    public String getTitle() {
        return this.title;
    }

    /**
     * setter for property title.
     * 
     * @param theTitle
     *            the title to set
     */
    public void setTitle(final String theTitle) {
        this.title = theTitle;
    }

    /**
     * getter for property data.
     * 
     * @return the data
     */
    public List < List < String >> getData() {
        return this.data;
    }

    /**
     * getter for property originals.
     * 
     * @return the originals
     */
    public List < List < String >> getOriginals() {
        return this.originals;
    }

    /**
     * setter for property originals.
     * 
     * @param theOriginals
     *            the originals to set
     */
    public void setOriginals(final List < List < String >> theOriginals) {
        this.originals = theOriginals;
    }

    /**
     * setter for property data.
     * 
     * @param theData
     *            the data to set
     */
    public void setData(final List < List < String >> theData) {
        this.data = theData;
    }

    /**
     * getter for property colInfos.
     * 
     * @return the colInfos
     */
    public List < ColInfo > getColInfos() {
        return this.colInfos;
    }

    /**
     * setter for property colInfos.
     * 
     * @param theColInfos
     *            the colInfos to set
     */
    public void setColInfos(final List < ColInfo > theColInfos) {
        this.colInfos = theColInfos;
    }

    /**
     * setter for property typeData.
     * 
     * @param theTypeData
     *            the typeData to set
     */
    public void setTypeData(final List < String > theTypeData) {
        this.typeData = theTypeData;
    }

    /**
     * getter for property typeData.
     * 
     * @return the typeData
     */
    public List < String > getTypeData() {
        return this.typeData;
    }

    /**
     * getter for property jsp.
     * 
     * @return the jsp
     */
    public String getJsp() {
        return this.jsp;
    }

    /**
     * setter for property jsp.
     * 
     * @param theJsp
     *            the jsp to set
     */
    public void setJsp(final String theJsp) {
        this.jsp = theJsp;
    }

    /**
     * For JSF tableData. get value for column.
     * 
     * @return the value of cell with Row rowNum and Column colNum
     */
    public String getColumnValue() {
        if (this.colNum >= this.data.get(0).size()) {
            this.colNum = 0;
            this.rowNum++;
            if (this.rowNum >= this.data.size()) {
                this.rowNum = 0;
            }
        }
        return this.data.get(this.rowNum).get(this.colNum++);
    }

    /**
     * return the original value.<br/>
     * the size of originals list must be the same as list data. the value
     * return take from the same column and the same line as data.
     * 
     * @return the original value.
     */
    public String getOriginalValue() {
        if (this.originals == null) {
            return null;
        }

        if (this.originals.isEmpty()) {
            return null;
        }

        if (this.originals.size() != this.data.size()) {
            throw new ESCOTechnicalException();
        }

        if (this.originals.get(0).size() != this.data.get(0).size()) {
            throw new ESCOTechnicalException();
        }

        String originalValue = "";

        if (this.colNum == 0 && this.rowNum == 0) {
            originalValue = this.originals.get(this.rowNum).get(this.colNum);
        } else {
            if (this.colNum == 0) {
                originalValue = this.originals.get(this.rowNum - 1).get(this.colNum);
            } else {
                originalValue = this.originals.get(this.rowNum).get(this.colNum - 1);
            }
        }
        return originalValue;

    }

    /**
     * @return the type of cell data (added, deleted)
     */
    public String getTypeDataValue() {
        String typeDate = "";

        if (this.colNum == 0 && this.rowNum == 0) {
            typeDate = this.typeData.get(this.rowNum);
        } else {
            if (this.colNum == 0) {
                typeDate = this.typeData.get(this.rowNum - 1);
            } else {
                typeDate = this.typeData.get(this.rowNum);
            }
        }
        return typeDate;
    }

    /**
     * For JSF tableData. get type of the data for the row (added, deleted,
     * error, ...).
     * 
     * @return the type of data for the row
     */
    public String getTypeDataValueForRow() {

        if (this.idNum >= this.typeData.size()) {
            this.idNum = 0;
        }

        return this.typeData.get(this.idNum);
    }

    /**
     * For JSF tableData. get value for the class and the index.
     * 
     * @return the value of the class and the index with idNum
     */
    public String getClassIndexValue() {

        StringBuffer classIndex = new StringBuffer();
        if (this.idNum >= this.index.size()) {
            this.idNum = 0;
        }

        // Construction of the class and index string to return
        classIndex.append(this.controllerClass);
        classIndex.append(":");
        classIndex.append(this.index.get(this.idNum));

        this.idNum++;

        return classIndex.toString();
    }

    /**
     * Getter for rowNum.
     * 
     * @return the rowNum to get.
     */
    public final int getRowNum() {
        return this.rowNum;
    }

}
