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
package org.esco.grouperui.tools.parameter.internal.module;

import java.util.List;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterFinder;
import org.esco.grouperui.tools.parameter.IParameterIntegration;
import org.esco.grouperui.tools.parameter.internal.PluginDataIntegration;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * .<br/>
 * Requirement(s): [RECIA-ESCO-L1-012] <br/>
 * Default implementation of parameter module description. Describe one module
 * for one key in :
 * 
 * <pre>
 * &lt;bean id=&quot;parameterService&quot; class=&quot;org.esco.grouperui.tools.parameter.internal.ParameterStandAloneService&quot; &gt;
 *                 &lt;property name=&quot;modules&quot; &gt;
 *                         &lt;map&gt;
 *                                 &lt;entry key=&quot;*&quot; value-ref=&quot;coreParameter&quot; /&gt;
 *                         &lt;/map&gt;
 *                 &lt;/property&gt;
 *         &lt;/bean&gt;
 * </pre>
 * 
 * configure spring with :
 * 
 * <pre>
 *         &lt;bean id=&quot;coreParameter&quot; class=&quot;org.esco.grouperui.tools.parameter.internal.module.ParameterModuleDescription&quot;&gt;
 *                 &lt;property name=&quot;jdbcTemplate&quot; ref=&quot;jdbcTemplate&quot;/&gt;
 *                 &lt;property name=&quot;service&quot;&gt;
 *                         &lt;bean class=&quot;org.esco.grouperui.tools.parameter.internal.ParameterFinder&quot; /&gt;
 *                 &lt;/property&gt;
 *                 &lt;property name=&quot;parameters&quot;&gt;
 *                         &lt;list&gt;
 *                                 &lt;bean class=&quot;org.esco.grouperui.tools.parameter.internal.ParameterIntegration&quot;&gt;
 *                                         &lt;property name=&quot;location&quot; value=&quot;classpath:sql/dropSchema.sql&quot; /&gt;
 *                                 &lt;/bean&gt;
 *                                 &lt;bean class=&quot;org.esco.grouperui.tools.parameter.internal.ParameterIntegration&quot;&gt;
 *                                         &lt;property name=&quot;location&quot; value=&quot;classpath:sql/createSchema.sql&quot; /&gt;
 *                                 &lt;/bean&gt;
 *                                 &lt;bean class=&quot;org.esco.grouperui.tools.parameter.internal.ParameterIntegration&quot;&gt;
 *                                         &lt;property name=&quot;location&quot; value=&quot;classpath:sql/populateSchema.sql&quot; /&gt;
 *                                 &lt;/bean&gt;
 *                         &lt;/list&gt;
 *                 &lt;/property&gt;
 *         &lt;/bean&gt;
 * </pre>
 * 
 * @author dMoulron
 */
public class ParameterModuleDescription {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger       LOGGER = ESCOLoggerFactory.getLogger(ParameterModuleDescription.class);

    /**
     * The jdbcTemplate for executing method.
     */
    private JdbcTemplate                   jdbcTemplate;

    /**
     * service who call when group corresponding to pattern.
     */
    private IParameterFinder               service;

    /**
     * List of data which are integrate into db.
     */
    private List < IParameterIntegration > parameters;

    /**
     * Service for integrate data into db if not exist.
     */
    private PluginDataIntegration          dataIntegration;

    /**
     * Default constructor.
     */
    public ParameterModuleDescription() {
    }

    /**
     * getter for property jdbcTemplate.
     * 
     * @return the jdbcTemplate
     */
    public JdbcTemplate getJdbcTemplate() {
        return this.jdbcTemplate;
    }

    /**
     * setter for property jdbcTemplate.
     * 
     * @param theJdbcTemplate
     *            the jdbcTemplate to set
     */
    public void setJdbcTemplate(final JdbcTemplate theJdbcTemplate) {
        this.jdbcTemplate = theJdbcTemplate;
    }

    /**
     * getter for property parameters.
     * 
     * @return the parameters
     */
    public List < IParameterIntegration > getParameters() {
        return this.parameters;
    }

    /**
     * setter for property parameters.
     * 
     * @param theParameters
     *            the parameters to set
     */
    public void setParameters(final List < IParameterIntegration > theParameters) {
        this.parameters = theParameters;
    }

    /**
     * getter for property dataIntegration.
     * 
     * @return the dataIntegration
     */
    public PluginDataIntegration getDataIntegration() {
        return this.dataIntegration;
    }

    /**
     * setter for property dataIntegration.
     * 
     * @param theDataIntegration
     *            the dataIntegration to set
     */
    public void setDataIntegration(final PluginDataIntegration theDataIntegration) {
        this.dataIntegration = theDataIntegration;
    }

    /**
     * setter for property service.
     * 
     * @param theService
     *            the service to set
     */
    public void setService(final IParameterFinder theService) {
        this.service = theService;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Service list
    // ---------------------------------------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    public IParameterFinder getService() {
        this.service.setJdbcTemplate(this.jdbcTemplate);

        return this.service;
    }

    /**
     * {@inheritDoc}
     */
    public void integrateData(final JdbcTemplate theJdbcTemplate) {
        this.dataIntegration.setJdbcTemplate(this.jdbcTemplate);

        for (IParameterIntegration iParameterIntegration : this.parameters) {
            try {
                if (!this.dataIntegration.isIntegrate("coreStandAlone", "1.0", iParameterIntegration.getLocation()
                        .getURL().getFile())) {

                    iParameterIntegration.integrateParameter(this.jdbcTemplate.getDataSource());
                    this.dataIntegration.integratePlugin("coreStandAlone", "1.0", iParameterIntegration
                            .getLocation().getURL().getFile());
                }
            } catch (Exception e) {
                ParameterModuleDescription.LOGGER.error(e);
            }
        }
    }
}
