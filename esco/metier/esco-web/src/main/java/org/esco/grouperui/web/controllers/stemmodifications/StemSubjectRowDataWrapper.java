package org.esco.grouperui.web.controllers.stemmodifications;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.controllers.AbstractSubjectRowDataWrapper;

/**
 * @author aChesneau
 */
public class StemSubjectRowDataWrapper extends AbstractSubjectRowDataWrapper {

    /**
     * The uid of the class.
     */
    private static final long serialVersionUID = -8137059446242354716L;

    /**
     * Default constructor.
     */
    public StemSubjectRowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getGroupParameters(final Sortable theObjectSource) {
        Subject subject = (Subject) theObjectSource;
        if (subject.getTypeEnum() == SourceTypeEnum.PERSON) {
            return "org.esco.grouperui.stem.privileges.person.col";
        } else {
            return "org.esco.grouperui.stem.privileges.group.col";
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void doAddCellData(final RowData rowData, final Sortable theObjectSource) {
        // HasStem
        String hasStem = theObjectSource.getValueFormCol("hasStem");
        if (Boolean.TRUE.toString().equals(hasStem)) {
            rowData.addCellData("1");
        } else {
            rowData.addCellData("0");
        }

        // HasStem
        String hasCreate = theObjectSource.getValueFormCol("hasCreate");
        if (Boolean.TRUE.toString().equals(hasCreate)) {
            rowData.addCellData("1");
        } else {
            rowData.addCellData("0");
        }
    }
}
