package org.esco.grouperui.web.controllers.dynamicgroup;

import java.util.ArrayList;
import java.util.List;

import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.DataTypeEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.controllers.groupmodifications.GroupModificationsPrivilegesController;

/**
 * @author dMoulron
 */
public class DynamicGroupPrivilegesController extends GroupModificationsPrivilegesController {

    /**
     * Default serial uid.
     */
    private static final long serialVersionUID = 5191876522977109093L;

    /**
     * Default constructor.
     */
    public DynamicGroupPrivilegesController() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Resume getResume() {

        Resume resume = super.getResume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_1"));

        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_4", Boolean.FALSE,
                DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_5", Boolean.FALSE,
                DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_6", Boolean.FALSE,
                DataTypeEnum.CHECKBOX));
        colNames.add(new ColInfo("MODIFICATION.PRIVILEGE_GROUP_COLUMN_7", Boolean.FALSE,
                DataTypeEnum.CHECKBOX));

        resume.setColInfos(colNames);
        List < List < String >> datas = null;

        datas = resume.getData();
        for (List < String > row : datas) {
            row.remove(1);
            row.remove(1);
        }
        resume.setData(datas);

        datas = resume.getOriginals();
        for (List < String > row : datas) {
            row.remove(1);
            row.remove(1);
        }
        resume.setOriginals(datas);

        return resume;
    }
}
