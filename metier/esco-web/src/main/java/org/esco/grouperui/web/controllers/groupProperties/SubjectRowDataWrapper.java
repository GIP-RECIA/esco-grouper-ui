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
package org.esco.grouperui.web.controllers.groupProperties;

import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterUtils;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.ISortableWrapper;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * @author dMoulron
 */
public class SubjectRowDataWrapper extends ISortableWrapper {

    /**
     * the serial uid.
     */
    private static final long        serialVersionUID = -3067419902810899039L;

    /**
     * Logger for this class.
     */
    @SuppressWarnings("unused")
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(SubjectRowDataWrapper.class);

    /** Parameter service. */
    private IParameterService        parameterService;

    /**
     * Default constructor.
     */
    public SubjectRowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public RowData wrap(final Sortable theObjectSource) {

        Subject subject = (Subject) theObjectSource;

        // el de l'exp EL
        FacesContext theFacesContext = FacesContext.getCurrentInstance();

        // parameter label
        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.ATTR_EL_ATTRIBUT, subject
                .getMappingFieldCol());
        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.MSGS_EL_ATTRIBUT, this
                .getI18nService().getStrings());

        List < Parameter > parameters = null;
        Parameter parameter = null;
        String value = null;
        RowData rowData = new RowData();
        rowData.addCellData(subject.getId());

        if (subject.getTypeEnum() == SourceTypeEnum.PERSON) {
            parameters = this.parameterService.findParametersById("org.esco.grouperui.group.members.person.col",
                    "cols");
        } else {
            parameters = this.parameterService.findParametersById("org.esco.grouperui.group.members.group.col",
                    "cols");
        }

        Iterator < Parameter > itParams = parameters.iterator();
        while (itParams.hasNext()) {
            parameter = itParams.next();

            value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
            if (value.equals("??????????")) {
                value = org.esco.grouperui.web.ESCOConstantes.EMPTY_DATA;
            }
            rowData.addCellData(value);
        }

        rowData.addCellData(theObjectSource.getValueFormCol("typeSubject"));
        rowData.addCellData(theObjectSource.getSelected().toString());
        rowData.addCellData(theObjectSource.getTypeEnum().getType().toUpperCase());
        rowData.addCellData(theObjectSource.isAdded().toString());

        return rowData;
    }

    /**
     * Setter for parameterService.
     * 
     * @param theParameterService
     *            the parameterService to set.
     */
    public final void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

}
