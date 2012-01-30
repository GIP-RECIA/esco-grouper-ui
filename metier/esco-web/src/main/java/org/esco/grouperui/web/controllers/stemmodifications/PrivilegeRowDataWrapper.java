package org.esco.grouperui.web.controllers.stemmodifications;

import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.web.beans.table.RowData;

/**
 * Class PrivilegeRowDataWrapper. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004] <br/>
 * [RECIA-ESCO-L1-005]
 * 
 * @author ctrimoreau
 */
public class PrivilegeRowDataWrapper implements IWrapper < Privilege, RowData > {

    /**
     *
     */
    private static final long serialVersionUID = 1499857545361539655L;

    /**
     * Default constructor.
     */
    public PrivilegeRowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public RowData wrap(final Privilege theObjectSource) throws ESCOWrapperException {
        RowData rowData = new RowData();

        // wrapper for group
        if (theObjectSource.getGroup() != null) {

            // Group Uuid
            rowData.addCellData(theObjectSource.getGroup().getIdGroup());

            // Group name (display)
            rowData.addCellData(theObjectSource.getGroup().getDisplayExtension());

            // Group path (real path)
            rowData.addCellData(theObjectSource.getGroup().getName());

            // Group Privileges
            theObjectSource.getGroup().getUserRight();

        } else
            if (theObjectSource.getSubject() != null) {

                // Person Uuid
                rowData.addCellData(theObjectSource.getSubject().getId());

                // Person Name
                rowData.addCellData(theObjectSource.getSubject().getName());

            }

        return rowData;
    }
}
