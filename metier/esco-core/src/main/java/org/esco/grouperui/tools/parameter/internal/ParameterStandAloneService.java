package org.esco.grouperui.tools.parameter.internal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.esco.grouperui.tools.parameter.IParameterFinder;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.IServiceEntriesFactory;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.tools.parameter.internal.module.ParameterModuleDescription;
import org.esco.grouperui.tools.parameter.internal.module.RegisteredServiceFinder;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * this class implement {@link IParameterService} and register as service in
 * standalone env. <br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author dMoulron
 */
public class ParameterStandAloneService implements IParameterService, IServiceEntriesFactory {

    /**
     * the serial uid.
     */
    private static final long                          serialVersionUID        = 4376194056829041930L;

    /**
     * The jdbcTemplate for executing method.
     */
    private JdbcTemplate                               jdbcTemplate;

    /**
     * List of parameter module for search if there are an other identique key.
     */
    private Map < String, ParameterModuleDescription > modules;

    /**
     * injection of service ParameterServiceLocator.
     */
    private final RegisteredServiceFinder              parameterServiceLocator = new RegisteredServiceFinder();

    /**
     * Default constructor.
     */
    public ParameterStandAloneService() {
    }

    /**
     * {@inheritDoc}
     */
    public final void setJdbcTemplate(final JdbcTemplate theJdbcTemplate) {
        this.jdbcTemplate = theJdbcTemplate;
    }

    /**
     * {@inheritDoc}
     */
    public void setModules(final Map < String, ParameterModuleDescription > theModules) {
        boolean addService = true;

        if (this.modules == null) {
            this.modules = new HashMap < String, ParameterModuleDescription >();
        }

        for (Entry < String, ParameterModuleDescription > module : theModules.entrySet()) {
            if (this.modules.containsKey(module.getKey())) {

                ParameterModuleDescription moduleRS = this.modules.get(module.getKey());

                module.getValue().setJdbcTemplate(moduleRS.getJdbcTemplate());
                module.getValue().setService(moduleRS.getService());
                module.getValue().setDataIntegration(moduleRS.getDataIntegration());

                addService = false;
            } else {
                this.modules.put(module.getKey(), module.getValue());
                addService = true;
            }
            // integrate data into DB.
            module.getValue().integrateData(this.jdbcTemplate);

            // verify if service exist in module
            if (module.getValue().getService() == null) {
                addService = false;
            }

            if (addService) {
                this.parameterServiceLocator.addService(module.getKey(), module.getValue().getService());
            }
        }
    }

    // ---------------------------------------------------------------------------------------------------------
    // Service list
    // ---------------------------------------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    public ParameterGroup findParametersByGroup(final String theGroup) {
        IParameterFinder parameterServiceExt = this.parameterServiceLocator
                .getRegisteredServiceByRegexp(theGroup);
        return parameterServiceExt.findParametersByGroup(theGroup);
    }

    /**
     * {@inheritDoc}
     */
    public List < ParameterGroup > findParametersByGroupSuffix(final String theGroupSuffix) {
        IParameterFinder parameterServiceExt = this.parameterServiceLocator
                .getRegisteredServiceByRegexp(theGroupSuffix);
        return parameterServiceExt.findParametersByGroupSuffix(theGroupSuffix);
    }

    /**
     * {@inheritDoc}
     */
    public List < Parameter > findParametersById(final String theGroup, final String theKey) {
        IParameterFinder parameterServiceExt = this.parameterServiceLocator
                .getRegisteredServiceByRegexp(theGroup);
        return parameterServiceExt.findParametersById(theGroup, theKey);
    }

    /**
     * {@inheritDoc}
     */
    public List < ParameterGroup > getRegisteredGroup() {
        return this.parameterServiceLocator.getRegisteredGroup();
    }
}
