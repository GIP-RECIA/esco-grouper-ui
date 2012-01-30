package org.esco.grouperui.tools.parameter;

import javax.sql.DataSource;

import org.springframework.core.io.Resource;

/**
 * definition for service which integrate data parameter in db.<br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author dMoulron
 */
public interface IParameterIntegration {

    /**
     * @param theLocation
     *            the script to be executed in database
     */
    void setLocation(final Resource theLocation);

    /**
     * getter for property location.
     * 
     * @return the location
     */
    Resource getLocation();

    /**
     * @param theDataSource
     *            the datasource to acces Database
     */
    void integrateParameter(final DataSource theDataSource);

}
