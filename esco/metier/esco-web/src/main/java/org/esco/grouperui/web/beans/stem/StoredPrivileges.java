package org.esco.grouperui.web.beans.stem;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.web.beans.table.Listable;

/**
 * Class StoredPrivileges. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004] <br/>
 * [RECIA-ESCO-L1-005]
 * 
 * @author ctrimoreau
 */
public class StoredPrivileges extends Listable {

    /**
     * Default constructor.
     */
    public StoredPrivileges() {
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

    /**
     * Get if all items are selected.
     * 
     * @return True if all selected else false
     */
    public Boolean getIsSelectedAll() {
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

}
