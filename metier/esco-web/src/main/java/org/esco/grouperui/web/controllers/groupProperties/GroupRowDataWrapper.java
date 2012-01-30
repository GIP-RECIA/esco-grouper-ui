package org.esco.grouperui.web.controllers.groupProperties;

import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterUtils;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.ISortableWrapper;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * Class GroupRowDataWrapper. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class GroupRowDataWrapper extends ISortableWrapper {

    /**
     *
     */
    private static final long serialVersionUID = 5162336620632264408L;

    /** Parameter service. */
    private IParameterService parameterService;

    /**
     * Default constructor.
     */
    public GroupRowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public RowData wrap(final Sortable theObjectSource) {
        Subject theGroup = (Subject) theObjectSource;
        RowData rowData = new RowData();

        // Group Uuid
        rowData.addCellData(theGroup.getId());

        // el de l'exp EL
        FacesContext theFacesContext = FacesContext.getCurrentInstance();

        // parameter label
        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.ATTR_EL_ATTRIBUT, theObjectSource
                .getMappingFieldCol());
        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.MSGS_EL_ATTRIBUT, this
                .getI18nService().getStrings());

        List < Parameter > parameters = null;
        Parameter parameter = null;
        String value = null;

        parameters = this.parameterService.findParametersById("org.esco.grouperui.all.memberships.col", "cols");

        Iterator < Parameter > itParams = parameters.iterator();
        while (itParams.hasNext()) {
            parameter = itParams.next();

            value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
            if (value.equals("??????????")) {
                value = org.esco.grouperui.web.ESCOConstantes.EMPTY_DATA;
            }
            rowData.addCellData(value);
        }

        // Group path (real path)
        rowData.addCellData(theGroup.getValueFormCol("name"));

        // Is selected
        rowData.addCellData(theGroup.getSelected().toString());

        // Is Added
        rowData.addCellData(Boolean.toString(theGroup.isAdded()));

        return rowData;
    }

    /**
     * @param theParameterService
     */
    public void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

}
