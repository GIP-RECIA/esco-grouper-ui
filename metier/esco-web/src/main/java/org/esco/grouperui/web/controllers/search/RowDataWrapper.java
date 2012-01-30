package org.esco.grouperui.web.controllers.search;

import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterUtils;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.table.RowData;
import org.esco.grouperui.web.utils.FaceContextUtils;
import org.esupportail.commons.beans.AbstractI18nAwareBean;

/**
 * The RowDataWrapper class. Wrap a Person or a Group into a RowData.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021], [RECIA-ESCO-L2-003]
 * 
 * @author aChesneau
 */
public class RowDataWrapper extends AbstractI18nAwareBean implements IWrapper < Object, RowData > {

    /**
     * The serial UUID of the class.
     */
    private static final long serialVersionUID = -2978792393552820919L;

    /** Parameter service. */
    private IParameterService parameterService;

    /**
     * Default constructor.
     */
    public RowDataWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public RowData wrap(final Object theObjectSource) throws ESCOWrapperException {
        RowData rowData = new RowData();
        FacesContext theFacesContext = FacesContext.getCurrentInstance();

        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.ATTR_EL_ATTRIBUT,
                ((Sortable) theObjectSource).getMappingFieldCol());
        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.MSGS_EL_ATTRIBUT, this
                .getI18nService().getStrings());

        if (theObjectSource instanceof Person) {

            rowData.addCellData(((Person) theObjectSource).getId());

            // get type of person
            List < Parameter > parameters = null;
            Parameter parameter = null;
            String value = null;
            parameters = this.parameterService.findParametersById("org.esco.grouperui.search.person.col",
                    "cols");

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

        } else
            if (theObjectSource instanceof Group) {

                rowData.addCellData(((Group) theObjectSource).getIdGroup());

                // get type of group
                List < Parameter > parameters = null;
                Parameter parameter = null;
                String value = null;
                parameters = this.parameterService.findParametersById("org.esco.grouperui.search.group.col",
                        "cols");

                Iterator < Parameter > itParams = parameters.iterator();
                while (itParams.hasNext()) {
                    parameter = itParams.next();

                    value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
                    if (ESCOConstantes.NO_INTERNATIONALIZATION_MSG.equals(value)) {
                        value = ESCOConstantes.EMPTY_DATA;
                    }
                    rowData.addCellData(value);
                }

                rowData.addCellData(SourceTypeEnum.GROUP.name());
                rowData.addCellData(((Group) theObjectSource).getSelected().toString());
            } else
                if (theObjectSource instanceof Stem) {
                    rowData.addCellData(((Stem) theObjectSource).getUuid());

                    // get type of stem
                    List < Parameter > parameters = null;
                    Parameter parameter = null;
                    String value = null;
                    parameters = this.parameterService.findParametersById(
                            "org.esco.grouperui.search.stem.col", "cols");

                    Iterator < Parameter > itParams = parameters.iterator();
                    while (itParams.hasNext()) {
                        parameter = itParams.next();

                        value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
                        if (ESCOConstantes.NO_INTERNATIONALIZATION_MSG.equals(value)) {
                            value = ESCOConstantes.EMPTY_DATA;
                        }
                        rowData.addCellData(value);
                    }
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
