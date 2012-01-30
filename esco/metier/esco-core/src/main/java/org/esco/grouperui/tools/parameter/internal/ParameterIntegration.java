package org.esco.grouperui.tools.parameter.internal;

import java.io.IOException;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterIntegration;
import org.esco.grouperui.tools.parameter.internal.db.ISqlScriptExecutor;
import org.esco.grouperui.tools.parameter.internal.db.SqlScriptExecutor;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;

/**
 * this class implement {@link IParameterIntegration}. <br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author dMoulron
 */
public class ParameterIntegration implements IParameterIntegration {

    /**
     * LOgger for this class.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(ParameterIntegration.class);

    /**
     * Location of script which is integrated.
     */
    private Resource                 location;

    /**
     *
     */
    public ParameterIntegration() {
    }

    /**
     * {@inheritDoc}
     */
    public final void integrateParameter(final DataSource theDataSource) {

        Validate.notNull(this.location);

        ISqlScriptExecutor ijSqlScriptExecutor = new SqlScriptExecutor();
        try {
            ijSqlScriptExecutor.executeScript(theDataSource.getConnection(), this.location, "UTF8", true);
        } catch (DataAccessException e) {
            ParameterIntegration.LOGGER.error(e);
        } catch (SQLException e) {
            ParameterIntegration.LOGGER.error(e);
        } catch (IOException e) {
            ParameterIntegration.LOGGER.error(e);
        }
    }

    /**
     * setter for property location.
     * 
     * @param theLocation
     *            the location to set
     */
    public void setLocation(final Resource theLocation) {
        this.location = theLocation;
    }

    /**
     * getter for property location.
     * 
     * @return the location
     */
    public Resource getLocation() {
        return this.location;
    }

}
