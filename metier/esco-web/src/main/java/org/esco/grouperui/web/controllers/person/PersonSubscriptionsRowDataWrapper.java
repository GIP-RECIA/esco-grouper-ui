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
package org.esco.grouperui.web.controllers.person;

import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterUtils;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.ISortableWrapper;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
public class PersonSubscriptionsRowDataWrapper extends ISortableWrapper {

    /**
     * The default generated serial id.
     */
    private static final long serialVersionUID = 2850289398004664278L;

    /** Parameter service. */
    private IParameterService parameterService;

    /**
     * Default constructor.
     */
    public PersonSubscriptionsRowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public RowData wrap(final Sortable theObjectSource) throws ESCOWrapperException {

        FacesContext theFacesContext = FacesContext.getCurrentInstance();

        FaceContextUtils.addVariableToContext(theFacesContext, "attr", theObjectSource.getMappingFieldCol());
        FaceContextUtils.addVariableToContext(theFacesContext, "msgs", this.getI18nService().getStrings());

        List < Parameter > parameters = null;
        Parameter parameter = null;
        String value = null;
        RowData rowData = new RowData();
        rowData.addCellData(theObjectSource.getValueFormCol("id"));

        parameters = this.parameterService.findParametersById("org.esco.grouperui.person.subscriptions.cols",
                "cols");

        Iterator < Parameter > itParams = parameters.iterator();
        while (itParams.hasNext()) {
            parameter = itParams.next();

            value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
            if (value.equals("??????????")) {
                value = "---";
            }
            rowData.addCellData(value);
        }
        // Subscriptions
        String isMember = theObjectSource.getValueFormCol(ESCOConstantes.IS_MEMBER);
        String canOptin = theObjectSource.getValueFormCol(ESCOConstantes.CAN_OPTIN);
        String canOptout = theObjectSource.getValueFormCol(ESCOConstantes.CAN_OPTOUT);

        if (ESCOConstantes.TRUE.equals(isMember)) {
            rowData.addCellData("1");
            if (ESCOConstantes.TRUE.equals(canOptout)) {
                rowData.addCellData(ESCOConstantes.TRUE);
            } else {
                rowData.addCellData(ESCOConstantes.FALSE);
            }
        } else {
            rowData.addCellData("0");
            if (ESCOConstantes.TRUE.equals(canOptin)) {
                rowData.addCellData(ESCOConstantes.TRUE);
            } else {
                // Never case.
                rowData.addCellData(ESCOConstantes.FALSE);
            }
        }
        // Path of the group
        rowData.addCellData(theObjectSource.getValueFormCol(ESCOConstantes.DISPLAY_NAME));

        return rowData;
    }

    /**
     * Setter of the parameterService property.
     * 
     * @param theParameterService
     *            the parameterService to set
     */
    public void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

}
