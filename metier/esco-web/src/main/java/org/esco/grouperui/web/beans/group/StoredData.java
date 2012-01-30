package org.esco.grouperui.web.beans.group;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.web.beans.table.Listable;

/**
 * Class to store the data about a table (jQgrid). <br/>
 * Requirements: [RECIA-ESCO-L1-007] [RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
public class StoredData extends Listable {

    /**
     * The value of the key of the column id in the mapping data list.
     */
    private static final String VALUE_OF_MAPPING_COLUMN_ID      = "id";
    /**
     * The value of the key of stem of the column id in the mapping data list.
     */
    private static final String VALUE_OF_MAPPING_COLUMN_ID_STEM = "uuid";

    /**
     * Variable to define if existed added item in the list.
     */
    private String              isExistingAddedItem;

    /**
     * Default constructor.
     */
    public StoredData() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void addRowDataResult(final Sortable theSortable) {
        Boolean found = false;
        for (int i = 0; i < this.listOfSortable.size(); i++) {
            if (this.listOfSortable.get(i).getTypeEnum() == theSortable.getTypeEnum()) {
                try {
                    if (this.listOfSortable.get(i).getValueFormCol(StoredData.VALUE_OF_MAPPING_COLUMN_ID).equals(
                            theSortable.getValueFormCol(StoredData.VALUE_OF_MAPPING_COLUMN_ID))) {
                        found = true;
                        break;
                    }
                } catch (NullPointerException e) {
                    if (this.listOfSortable.get(i).getValueFormCol(StoredData.VALUE_OF_MAPPING_COLUMN_ID_STEM)
                            .equals(theSortable.getValueFormCol(StoredData.VALUE_OF_MAPPING_COLUMN_ID_STEM))) {
                        found = true;
                        break;
                    }
                }
            }
        }
        if (!found) {
            super.addRowDataResult(theSortable);
        } else {
            this.delRowDataResult(theSortable);
            super.addRowDataResult(theSortable);
        }
    }

    /**
     * remove theSortable information in the list listOfSortable.
     * 
     * @param theSortable
     *            the sortable information to be remove
     */
    public void delRowDataResult(final Sortable theSortable) {
        for (int i = 0; i < this.listOfSortable.size(); i++) {
            try {
                if (this.listOfSortable.get(i).getTypeEnum() == theSortable.getTypeEnum()) {
                    if (this.listOfSortable.get(i).getValueFormCol(StoredData.VALUE_OF_MAPPING_COLUMN_ID).equals(
                            theSortable.getValueFormCol(StoredData.VALUE_OF_MAPPING_COLUMN_ID))) {
                        this.listOfSortable.remove(i);
                        break;
                    }
                }
            } catch (NullPointerException e) {
                if (this.listOfSortable.get(i).getValueFormCol(StoredData.VALUE_OF_MAPPING_COLUMN_ID_STEM).equals(
                        theSortable.getValueFormCol(StoredData.VALUE_OF_MAPPING_COLUMN_ID_STEM))) {
                    this.listOfSortable.remove(i);
                    break;
                }
            }
        }
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

    /**
     * Get the isAllItemsSelected property.
     * 
     * @return the isAllItemsSelected
     */
    public String getIsAllItemsSelected() {
        return this.getIsSelectedAll().toString();
    }

}
