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
