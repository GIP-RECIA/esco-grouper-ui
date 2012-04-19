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
package org.esco.grouperui.web.beans.table;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * The DataGrid class. Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "row")
public class RowData {

    /**
     * The ArrayList of cells.
     */
    private List < String > cell;

    /**
     * The default constructor.
     */
    public RowData() {
    }

    /**
     * Get the cell property.
     * 
     * @return the cells
     */
    public List < String > getCell() {
        return this.cell;
    }

    /**
     * Setter of the cells.
     * 
     * @param theCells
     *            the cells to set
     */
    public void setCell(final List < String > theCells) {
        this.cell = theCells;
    }

    /**
     * Add a cell data to the list.
     * 
     * @param theData
     *            The data to add.
     */
    public void addCellData(final String theData) {
        if (this.cell == null) {
            this.cell = new ArrayList < String >();
        }
        this.cell.add(theData);
    }

}
