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

import java.util.ArrayList;
import java.util.List;

import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.utils.XmlProducer;
import org.esco.grouperui.web.validators.RegExp;
import org.esco.grouperui.web.validators.RegExpAttr;

/**
 * @author oFages
 */
public class RegExpController extends AbstractContextAwareController {

    /**
     * The default generated uid of the class.
     */
    private static final long                serialVersionUID = -8499446948860085047L;

    /** The regexp attributes. */
    private static final String              KEY_REGEXP       = ".regexp";

    /** wrapper for generate json from obejct. */
    private IWrapper < XmlProducer, String > jsonWrapper;

    /** Parameter service. */
    private IParameterService                parameterService;

    /**
     * Default constructor.
     */
    public RegExpController() {

    }

    /**
     * Get all the validation regexps for the attributes of group/stem.
     * 
     * @return the xml result.
     */
    public String getValidationRegExps() {

        List < RegExp > regexps = new ArrayList < RegExp >();

        List < ParameterGroup > listParametersGroup = this.parameterService
                .findParametersByGroupSuffix(RegExpController.KEY_REGEXP);

        // Iterate on the regexps read from database
        for (ParameterGroup parameterGroup : listParametersGroup) {
            String attributeName = parameterGroup.getName() + ESCOConstantes.GROUP_NAME_SEPARATOR;
            // Add the validation rules for all the attributes
            for (Parameter parameter : parameterGroup.getParameters()) {
                regexps.add(new RegExp(attributeName + parameter.getPkey(), new RegExpAttr(parameter.getKey(),
                        this.getString(parameter.getValue()))));
            }
        }
        XmlProducer producer = new XmlProducer();
        producer.setTarget(regexps);
        return this.jsonWrapper.wrap(producer);
    }

    /**
     * setter for property jsonWrapper.
     * 
     * @param theJsonWrapper
     *            the jsonWrapper to set
     */
    public void setJsonWrapper(final IWrapper < XmlProducer, String > theJsonWrapper) {
        this.jsonWrapper = theJsonWrapper;
    }

    /**
     * setter for property parameterService.
     * 
     * @param theParameterService
     *            the parameterService to set
     */
    public void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

}
