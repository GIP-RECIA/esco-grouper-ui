package org.esco.grouperui.web.controllers.groupProperties;

import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterUtils;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.ISortableWrapper;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * Class PrivilegeRowDataWrapper. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class PrivilegeRowDataWrapper extends ISortableWrapper {

    /**
     * The private serial UID.
     */
    private static final long serialVersionUID = 1499857545361539655L;

    /** Parameter service. */
    private IParameterService parameterService;

    /**
     * Default constructor.
     */
    public PrivilegeRowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public RowData wrap(final Sortable theObjectSource) {
        RowData rowData = new RowData();

        // Group
        if (theObjectSource instanceof Subject) {
            Subject theGroup = (Subject) theObjectSource;
            // Uuid
            rowData.addCellData(theGroup.getId());

            // el de l'exp EL
            FacesContext theFacesContext = FacesContext.getCurrentInstance();

            // parameter label
            FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.ATTR_EL_ATTRIBUT,
                    theObjectSource.getMappingFieldCol());
            FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.MSGS_EL_ATTRIBUT, this
                    .getI18nService().getStrings());

            List < Parameter > parameters = null;
            Parameter parameter = null;
            String value = null;

            parameters = this.parameterService.findParametersById("org.esco.grouperui.all.privilege.group.col",
                    "cols");

            Iterator < Parameter > itParams = parameters.iterator();
            while (itParams.hasNext()) {
                parameter = itParams.next();

                value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
                if (value.equals("??????????")) {
                    value = org.esco.grouperui.web.ESCOConstantes.EMPTY_DATA;
                }
                rowData.addCellData(value);
            }

            // Subscription
            if (theGroup.getOptin()) {
                rowData.addCellData("1");
            } else {
                rowData.addCellData("0");
            }

            // Unsubscription
            if (theGroup.getOptout()) {
                rowData.addCellData("1");
            } else {
                rowData.addCellData("0");
            }

            // Privileges
            GroupPrivilegeEnum privilege = GroupPrivilegeEnum.fromValue(theGroup.getValueFormCol("userRight"));

            if (GroupPrivilegeEnum.ADMIN.equals(privilege)) {
                rowData.addCellData("1");
                rowData.addCellData("1");
                rowData.addCellData("1");
                rowData.addCellData("1");
            } else
                if (GroupPrivilegeEnum.UPDATE.equals(privilege)) {
                    rowData.addCellData("1");
                    rowData.addCellData("1");
                    rowData.addCellData("1");
                    rowData.addCellData("0");
                } else
                    if (GroupPrivilegeEnum.READ.equals(privilege)) {
                        rowData.addCellData("1");
                        rowData.addCellData("1");
                        rowData.addCellData("0");
                        rowData.addCellData("0");
                    } else
                        if (GroupPrivilegeEnum.VIEW.equals(privilege)) {
                            rowData.addCellData("1");
                            rowData.addCellData("0");
                            rowData.addCellData("0");
                            rowData.addCellData("0");
                        } else
                            if (GroupPrivilegeEnum.NONE.equals(privilege) || privilege == null) {
                                rowData.addCellData("0");
                                rowData.addCellData("0");
                                rowData.addCellData("0");
                                rowData.addCellData("0");
                            } else {
                                rowData.addCellData("0");
                                rowData.addCellData("0");
                                rowData.addCellData("0");
                                rowData.addCellData("0");
                            }

            // Group path (real path)
            rowData.addCellData(theGroup.getValueFormCol("name"));
            rowData.addCellData(theObjectSource.getSelected().toString());
            rowData.addCellData(theObjectSource.isAdded().toString());

        } else {
            // Stem
            // Uuid
            rowData.addCellData(((Stem) theObjectSource).getUuid());

            // el de l'exp EL
            FacesContext theFacesContext = FacesContext.getCurrentInstance();

            // parameter label
            FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.ATTR_EL_ATTRIBUT,
                    theObjectSource.getMappingFieldCol());
            FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.MSGS_EL_ATTRIBUT, this
                    .getI18nService().getStrings());

            List < Parameter > parameters = null;
            Parameter parameter = null;
            String value = null;

            parameters = this.parameterService.findParametersById("org.esco.grouperui.all.privilege.stem.col",
                    "cols");

            Iterator < Parameter > itParams = parameters.iterator();
            while (itParams.hasNext()) {
                parameter = itParams.next();

                value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
                if (value.equals("??????????")) {
                    value = org.esco.grouperui.web.ESCOConstantes.EMPTY_DATA;
                }
                rowData.addCellData(value);
            }

            // Create Stem
            if (((Stem) theObjectSource).getHasStem()) {
                rowData.addCellData("1");
            } else {
                rowData.addCellData("0");
            }

            // Create Group
            if (((Stem) theObjectSource).getHasCreate()) {
                rowData.addCellData("1");
            } else {
                rowData.addCellData("0");
            }

            rowData.addCellData(((Stem) theObjectSource).getName());
            rowData.addCellData(((Stem) theObjectSource).isAdded().toString());
            rowData.addCellData(((Stem) theObjectSource).getSelected().toString());
        }

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
