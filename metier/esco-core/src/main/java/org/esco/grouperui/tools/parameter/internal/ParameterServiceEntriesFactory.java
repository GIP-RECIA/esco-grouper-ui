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
/**
 *
 */
package org.esco.grouperui.tools.parameter.internal;

import java.util.Map;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IServiceEntriesFactory;
import org.esco.grouperui.tools.parameter.internal.module.ParameterModuleDescription;
import org.springframework.beans.factory.InitializingBean;

/**
 * @author dMoulron
 */
public class ParameterServiceEntriesFactory implements InitializingBean {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger                   LOGGER = ESCOLoggerFactory
                                                                      .getLogger(ParameterServiceEntriesFactory.class);

    /**
     * Parameter service. <br/>
     * this property can not be null.
     */
    private IServiceEntriesFactory                     parameterService;

    /**
     * module to be add in parameter service. <br/>
     * this property can not be null.
     */
    private Map < String, ParameterModuleDescription > modules;

    /**
     * Default constructor.
     */
    public ParameterServiceEntriesFactory() {
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (this.parameterService == null) {
            throw new IllegalArgumentException("the property parameterService can not be null.");
        }
        if (this.modules == null) {
            throw new IllegalArgumentException("the property modules can not be null.");
        }

        ParameterServiceEntriesFactory.LOGGER.info("Add " + this.modules.size()
                + " new module(s) to service.");
        this.parameterService.setModules(this.modules);
    }

    /**
     * setter for property parameterService.
     * 
     * @param theParameterService
     *            the parameterService to set
     */
    public void setParameterService(final IServiceEntriesFactory theParameterService) {
        this.parameterService = theParameterService;
    }

    /**
     * setter for property modules.
     * 
     * @param theModules
     *            the modules to set
     */
    public void setModules(final Map < String, ParameterModuleDescription > theModules) {
        this.modules = theModules;
    }
}
