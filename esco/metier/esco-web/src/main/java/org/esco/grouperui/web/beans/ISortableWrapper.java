package org.esco.grouperui.web.beans;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.web.beans.table.RowData;
import org.esupportail.commons.beans.AbstractI18nAwareBean;

/**
 * <b>Wrapper interface.</b> <br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
public abstract class ISortableWrapper extends AbstractI18nAwareBean implements IWrapper < Sortable, RowData > {

    /**
     * The serial UID of the class.
     */
    private static final long serialVersionUID = -451806919575422179L;

    /**
     * Default constructor.
     */
    protected ISortableWrapper() {

    }
}
