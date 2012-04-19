/**
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
