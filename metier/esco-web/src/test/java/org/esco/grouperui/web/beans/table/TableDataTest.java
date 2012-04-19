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

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.AnnotationIntrospector;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.xc.JaxbAnnotationIntrospector;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.utils.JaxbStringWrapper;
import org.esco.grouperui.web.utils.XmlProducer;
import org.junit.Test;
import org.junit.internal.runners.JUnit4ClassRunner;
import org.junit.runner.RunWith;

/**
 * @author sopragroup
 */
@RunWith(JUnit4ClassRunner.class)
public class TableDataTest {

    @Test
    public void testTableData() throws IOException {
        TableData data = new TableData();
        TableRow tableRow = null;

        List < TableRow > rows = new ArrayList < TableRow >();

        for (int i = 0; i < 3; i++) {

            for (int z = 0; z < 5; z++) {
                tableRow = new TableRow();

                RowData rowData = new RowData();
                rowData.addCellData("1-" + z);
                rowData.addCellData("2-" + z);
                rowData.addCellData("3-" + z);

                tableRow.setRowData(rowData);
            }
            rows.add(tableRow);
        }
        data.setListOfRows(rows);

        XmlProducer producer = new XmlProducer();
        producer.setTarget(data);
        producer.setTypesOfTarget(TableData.class, RowData.class);

        ObjectMapper mapper = new ObjectMapper();
        AnnotationIntrospector introspector = new JaxbAnnotationIntrospector();
        mapper.getSerializationConfig().setAnnotationIntrospector(introspector);

        mapper.writeValue(System.out, data);
    }

    @Test
    public void testStatus() {
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        JaxbStringWrapper wrapper = new JaxbStringWrapper();
        System.out.println(wrapper.wrap(producer));
    }
}
