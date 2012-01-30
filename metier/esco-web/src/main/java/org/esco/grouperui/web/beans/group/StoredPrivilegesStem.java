package org.esco.grouperui.web.beans.group;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.web.beans.table.Listable;

/**
 * Class StoredPrivilegesStem. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class StoredPrivilegesStem extends Listable {

    /**
     * Default constructor.
     */
    public StoredPrivilegesStem() {
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
