package org.esco.grouperui.web.controllers;

import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.Sortable;
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
public abstract class AbstractSubjectRowDataWrapper extends ISortableWrapper {

    /**
     * the serial uid.
     */
    private static final long        serialVersionUID = -3067419902810899039L;

    /**
     * Logger for this class.
     */
    @SuppressWarnings("unused")
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(AbstractSubjectRowDataWrapper.class);

    /** Parameter service. */
    private IParameterService        parameterService;

    /**
     * Default constructor.
     */
    public AbstractSubjectRowDataWrapper() {
    }

    /**
     * Allow to retrieve the parameters value depending on the object source.
     * 
     * @param theObjectSource
     *            the object source on which we based to get the parameters.
     * @return the parameter corresponding to the object source.
     */
    public abstract String getGroupParameters(final Sortable theObjectSource);

    /**
     * Allow to add more rows.
     * 
     * @param theRowData
     *            the row data for adding new cells.
     * @param theObjectSource
     *            the object source to based on.
     */
    public void doAddCellData(final RowData theRowData, final Sortable theObjectSource) {
    }

    /**
     * {@inheritDoc}
     */
    public RowData wrap(final Sortable theObjectSource) {

        Subject subject = (Subject) theObjectSource;

        // el de l'exp EL
        FacesContext theFacesContext = FacesContext.getCurrentInstance();

        // parameter label
        FaceContextUtils.addVariableToContext(theFacesContext, "attr", subject.getMappingFieldCol());
        FaceContextUtils.addVariableToContext(theFacesContext, "msgs", this.getI18nService().getStrings());

        List < Parameter > parameters = null;
        Parameter parameter = null;
        String value = null;
        RowData rowData = new RowData();
        rowData.addCellData(subject.getId());

        parameters = this.parameterService.findParametersById(this.getGroupParameters(theObjectSource), "cols");

        Iterator < Parameter > itParams = parameters.iterator();
        while (itParams.hasNext()) {
            parameter = itParams.next();

            value = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
            if (value.equals(ESCOConstantes.NO_INTERNATIONALIZATION_MSG)) {
                value = ESCOConstantes.EMPTY_DATA;
            }
            rowData.addCellData(value);
        }

        this.doAddCellData(rowData, theObjectSource);

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
