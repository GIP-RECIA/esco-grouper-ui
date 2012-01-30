package org.esco.grouperui.web.controllers.dynamicgroup;

import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterUtils;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * Class PrivilegeRowDataWrapper. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L2-001], [RECIA-ESCO-L2-002]
 * 
 * @author ofages
 */
public class DynamicGroupRowDataWrapper extends org.esco.grouperui.web.beans.ISortableWrapper {

    /**
     * serialVersionUID.
     */
    private static final long serialVersionUID = -1680133179036455118L;

    /** Parameter service. */
    private IParameterService parameterService;

    /**
     * Default constructor.
     */
    public DynamicGroupRowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public RowData wrap(final Sortable theObjectSource) {

        RowData rowData = new RowData();
        FacesContext theFacesContext = FacesContext.getCurrentInstance();

        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.ATTR_EL_ATTRIBUT, theObjectSource
                .getMappingFieldCol());
        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.MSGS_EL_ATTRIBUT, this
                .getI18nService().getStrings());

        rowData.addCellData(((Person) theObjectSource).getId());

        // get type of person
        List < Parameter > parameters = null;
        Parameter parameter = null;
        String value = null;
        parameters = this.parameterService.findParametersById("org.esco.grouperui.search.person.col", "cols");

        Iterator < Parameter > itParams = parameters.iterator();
        while (itParams.hasNext()) {
            parameter = itParams.next();

            value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
            if (ESCOConstantes.NO_INTERNATIONALIZATION_MSG.equals(value)) {
                value = ESCOConstantes.EMPTY_DATA;
            }
            rowData.addCellData(value);
        }

        rowData.addCellData(SourceTypeEnum.PERSON.name());

        rowData.addCellData(((Person) theObjectSource).getSelected().toString());

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
