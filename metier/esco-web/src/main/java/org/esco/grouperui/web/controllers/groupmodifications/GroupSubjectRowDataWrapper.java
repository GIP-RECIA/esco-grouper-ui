package org.esco.grouperui.web.controllers.groupmodifications;

import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.controllers.AbstractSubjectRowDataWrapper;

/**
 * Class GroupSubjectRowDataWrapper. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-009] <br/>
 * [RECIA-ESCO-L1-010]
 * 
 * @author ctrimoreau
 */
public class GroupSubjectRowDataWrapper extends AbstractSubjectRowDataWrapper {

    /**
     *
     */
    private static final long serialVersionUID = -8137059446242354716L;

    /**
     * Default constructor.
     */
    public GroupSubjectRowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getGroupParameters(final Sortable theObjectSource) {
        Subject subject = (Subject) theObjectSource;
        if (subject.getTypeEnum() == SourceTypeEnum.PERSON) {
            return "org.esco.grouperui.group.privileges.person.col";
        } else {
            return "org.esco.grouperui.group.privileges.group.col";
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void doAddCellData(final RowData rowData, final Sortable theObjectSource) {

        Subject subject = (Subject) theObjectSource;

        // Subscription (optin)
        if (subject.getOptin()) {
            rowData.addCellData("1");
        } else {
            rowData.addCellData("0");
        }

        // Unsubscription (optout)
        if (subject.getOptout()) {
            rowData.addCellData("1");
        } else {
            rowData.addCellData("0");
        }

        // Privileges
        GroupPrivilegeEnum privilege = subject.getSubjectRight();

        if (GroupPrivilegeEnum.ADMIN.equals(privilege)) {
            rowData.addCellData("1");
            rowData.addCellData("1");
            rowData.addCellData("1");
            rowData.addCellData("1");
        } else
            if (GroupPrivilegeEnum.UPDATE.equals(privilege)) {
                rowData.addCellData("1");
                rowData.addCellData("1");
                rowData.addCellData("1");
                rowData.addCellData("0");
            } else
                if (GroupPrivilegeEnum.READ.equals(privilege)) {
                    rowData.addCellData("1");
                    rowData.addCellData("1");
                    rowData.addCellData("0");
                    rowData.addCellData("0");
                } else
                    if (GroupPrivilegeEnum.VIEW.equals(privilege)) {
                        rowData.addCellData("1");
                        rowData.addCellData("0");
                        rowData.addCellData("0");
                        rowData.addCellData("0");
                    } else
                        if (GroupPrivilegeEnum.NONE.equals(privilege) || privilege == null) {
                            rowData.addCellData("0");
                            rowData.addCellData("0");
                            rowData.addCellData("0");
                            rowData.addCellData("0");
                        } else {
                            rowData.addCellData("0");
                            rowData.addCellData("0");
                            rowData.addCellData("0");
                            rowData.addCellData("0");
                        }

    }
}
