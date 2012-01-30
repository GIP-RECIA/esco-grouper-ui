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
