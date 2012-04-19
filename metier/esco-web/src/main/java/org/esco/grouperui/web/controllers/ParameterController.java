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
