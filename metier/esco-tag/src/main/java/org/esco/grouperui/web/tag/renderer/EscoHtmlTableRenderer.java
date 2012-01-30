package org.esco.grouperui.web.tag.renderer;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.faces.component.UIComponent;
import javax.faces.component.UIData;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import javax.faces.el.ValueBinding;

import org.apache.commons.lang.Validate;
import org.apache.myfaces.renderkit.html.HtmlTableRenderer;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.web.tag.EscoTag;

import com.google.common.collect.MapDifference;
import com.google.common.collect.Maps;

/**
 * Class EscoHtmlTableRenderer. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class EscoHtmlTableRenderer extends HtmlTableRenderer {

    /** Logger. */
    private static final IESCOLogger LOGGER    = ESCOLoggerFactory.getLogger(EscoHtmlTableRenderer.class);

    /** Parameters context key. */
    private static final String      PARAMETER = "org.esco.grouperui.web.tag.renderer.parameter";

    /**
     * Default constructor.
     */
    public EscoHtmlTableRenderer() {
        super();
    }

    /**
     * {@inheritDoc}
     */
    protected void renderFace(final FacesContext theFacesContext, final ResponseWriter theWriter,
            final UIComponent theComponent, final boolean theHeader) throws IOException {

        if (theHeader) {
            super.renderFacet(theFacesContext, theWriter, theComponent, theHeader);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void renderRowStart(final FacesContext theFacesContext, final ResponseWriter theWriter,
            final UIData theUiData, final Styles theStyles, final int theRowStyleIndex) throws IOException {

        String group = (String) theFacesContext.getExternalContext().getRequestMap().get(EscoTag.GROUP);
        String key = (String) theFacesContext.getExternalContext().getRequestMap().get(EscoTag.KEY);
        String var = (String) theFacesContext.getExternalContext().getRequestMap().get(EscoTag.VAR);

        if (group == null | key == null | var == null) {
            super.beforeRow(theFacesContext, theUiData);
            return;
        }

        String attributeKey = (String) theFacesContext.getApplication().createValueBinding(key).getValue(
                theFacesContext);

        ParameterGroup groupDb = (ParameterGroup) theFacesContext.getExternalContext().getRequestMap().get(
                EscoTag.GROUPDB);
        if (groupDb == null) {
            IParameterService parameterService = (IParameterService) theFacesContext.getApplication()
                    .createValueBinding("#{parameterService}").getValue(theFacesContext);

            groupDb = parameterService.findParametersByGroup(group);
            theFacesContext.getExternalContext().getRequestMap().put(EscoTag.GROUPDB, groupDb);
        }

        Parameter parameter = this.findParameterByKey(groupDb, attributeKey);
        if (parameter != null) {
            super.renderRowStart(theFacesContext, theWriter, theUiData, theStyles, theRowStyleIndex);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void beforeRow(final FacesContext theFacesContext, final UIData theUiData) throws IOException {

        String group = (String) theFacesContext.getExternalContext().getRequestMap().get(EscoTag.GROUP);
        String key = (String) theFacesContext.getExternalContext().getRequestMap().get(EscoTag.KEY);
        String var = (String) theFacesContext.getExternalContext().getRequestMap().get(EscoTag.VAR);

        if (group == null | key == null | var == null) {
            super.beforeRow(theFacesContext, theUiData);
            return;
        }

        String attributeKey = (String) theFacesContext.getApplication().createValueBinding(key).getValue(
                theFacesContext);

        ParameterGroup groupDb = (ParameterGroup) theFacesContext.getExternalContext().getRequestMap().get(
                EscoTag.GROUPDB);
        if (groupDb == null) {
            IParameterService parameterService = (IParameterService) theFacesContext.getApplication()
                    .createValueBinding("#{parameterService}").getValue(theFacesContext);

            groupDb = parameterService.findParametersByGroup(group);
            theFacesContext.getExternalContext().getRequestMap().put(EscoTag.GROUPDB, groupDb);
        }

        Parameter parameter = this.findParameterByKey(groupDb, attributeKey);
        if (parameter == null) {
            Iterator < UIComponent > componentIt = theUiData.getChildren().iterator();
            while (componentIt.hasNext()) {
                UIComponent uiComponent = componentIt.next();
                uiComponent.setRendered(false);
            }
        } else {
            Iterator < UIComponent > componentIt = theUiData.getChildren().iterator();
            while (componentIt.hasNext()) {
                UIComponent uiComponent = componentIt.next();
                uiComponent.setRendered(true);
            }

            // parameter label
            ValueBinding valueBinding = theFacesContext.getApplication().createValueBinding("#{" + var + "}");
            valueBinding.setValue(theFacesContext, new Param(parameter.getValue()));
        }

        // if the current row is the last one, we check if any required
        // parameters is missing.
        if (theUiData.getRowCount() - 1 == theUiData.getRowIndex()) {
            this.verifyAndLogParameter(groupDb);
        }

        super.beforeRow(theFacesContext, theUiData);
    }

    /**
     * @param thegroupDb
     *            the parameter source.
     * @param theKey
     *            the key corresponding to the parameter in the parameter
     *            source.
     * @return the parameter from the parameter source corresponding to the key,
     *         null if not found.
     */
    private Parameter findParameterByKey(final ParameterGroup thegroupDb, final String theKey) {
        Validate.notEmpty(theKey);
        List < Parameter > parameters = thegroupDb.getParameters();

        // Retrieve the parameter corresponding in the parameters source
        for (Parameter parameter : parameters) {
            if (theKey.equals(parameter.getKey())) {
                this.saveParameterExist(parameter);
                return parameter;
            }
        }
        return null;
    }

    /**
     * Allow to output a log at the end of the process. It will compare the
     * requested parameters and the obtained parameters.
     * 
     * @param theGroupDb
     *            the parameter source.
     */
    private void verifyAndLogParameter(final ParameterGroup theGroupDb) {
        // The obtained parameters
        Map < String, Parameter > reqParameter = (Map < String, Parameter >) FacesContext.getCurrentInstance()
                .getExternalContext().getRequestMap().get(EscoHtmlTableRenderer.PARAMETER);

        // The requested parameters.
        Map < String, Parameter > groupParam = new HashMap < String, Parameter >();
        for (Parameter param : theGroupDb.getParameters()) {
            groupParam.put(param.getKey(), param);
        }

        if (reqParameter != null) {
            // The difference between the two map.
            MapDifference < String, Parameter > mapDiffs = Maps.difference(reqParameter, groupParam);

            this.logDifferences(mapDiffs.entriesOnlyOnLeft(), mapDiffs.entriesOnlyOnRight());
        }
    }

    /**
     * Allow to save the parameter that have been found.
     * 
     * @param parameter
     *            the parameter to add to the found parameters.
     */
    private void saveParameterExist(final Parameter parameter) {
        // Retrieve the requested parameters from the context.
        Map < String, Parameter > reqParameter = (Map < String, Parameter >) FacesContext.getCurrentInstance()
                .getExternalContext().getRequestMap().get(EscoHtmlTableRenderer.PARAMETER);
        // If parameters can't be found in the context the map is created
        if (reqParameter == null) {
            reqParameter = new HashMap < String, Parameter >();
            FacesContext.getCurrentInstance().getExternalContext().getRequestMap().put(
                    EscoHtmlTableRenderer.PARAMETER, reqParameter);
        }

        // The current parameter is added to the parameters list.
        reqParameter.put(parameter.getKey(), parameter);
    }

    /**
     * Allow to output a log at the end of the process. It will compare the
     * requested parameters and the obtained parameters.
     * 
     * @param leftEntry
     *            the left entry set.
     * @param rightEntry
     *            the right entry set.
     */
    private void logDifferences(final Map < String, Parameter > leftEntry,
            final Map < String, Parameter > rightEntry) {

        Map < String, Parameter > differences = new HashMap < String, Parameter >();

        // Merge the two entry set.
        differences.putAll(leftEntry);
        differences.putAll(rightEntry);

        // Log for each entry set found.
        for (Entry < String, Parameter > diffEntry : differences.entrySet()) {
            EscoHtmlTableRenderer.LOGGER.info("No present element in the parameters base or in grouper : "
                    + diffEntry.getKey());
        }
    }

    /**
     * @author ctrimoreau
     */
    public class Param {

        /** Parameter label. */
        private final String label;

        /**
         * Default Constructor.
         * 
         * @param theLabel
         *            label of the parameter.
         */
        public Param(final String theLabel) {
            this.label = theLabel;
        }

        /**
         * Getter for label.
         * 
         * @return the label to get.
         */
        public final String getLabel() {
            return this.label;
        }
    }

}
