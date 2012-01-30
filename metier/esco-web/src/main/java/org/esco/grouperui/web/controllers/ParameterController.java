package org.esco.grouperui.web.controllers;

import java.util.List;

import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;

/**
 * Class ParameterController. This class control the parameter. Requirement(s) :
 * [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class ParameterController extends AbstractContextAwareController {

    /**
     *
     */
    private static final long serialVersionUID = -7620919020379364433L;

    /** Parameter service. */
    private IParameterService parameterService;

    /**
     * Default constructor.
     */
    public ParameterController() {
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

    /**
     * Get the parameter.
     * 
     * @param theGroup
     *            The group
     * @param theKey
     *            The key of the parameter.
     * @return the list of parameters.
     */
    public List < Parameter > getParameter(final String theGroup, final String theKey) {
        return this.parameterService.findParametersById(theGroup, theKey);
    }
}
