package org.esco.grouperui.web.beans.group;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.web.beans.table.Listable;

/**
 * Class StoredMemberships. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class StoredMemberships extends Listable {

    /**
     * Default constructor.
     */
    public StoredMemberships() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void addRowDataResult(final Sortable theSortable) {
        if (!this.listOfSortable.contains(theSortable)) {
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
        if (this.listOfSortable.contains(theSortable)) {
            this.listOfSortable.remove(theSortable);
        }
    }

}
