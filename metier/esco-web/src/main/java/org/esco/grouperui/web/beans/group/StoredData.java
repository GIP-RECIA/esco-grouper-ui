package org.esco.grouperui.web.beans.group;

import java.util.HashMap;
import java.util.Map;

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
     * Variable to define if existed added item in the list.
     */
    private String isExistingAddedItem;
    
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
    	listOfSortable.add(theSortable);
        
    }

    /**
     * remove theSortable information in the list listOfSortable.
     * 
     * @param theSortable
     *            the sortable information to be remove
     */
    public void delRowDataResult(final Sortable theSortable) {
    	
    	listOfSortable.remove(theSortable);
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
