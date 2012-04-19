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
package org.esco.grouperui.tools.parameter.internal;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;

/**
 * this class integrate plugin data parameter .<br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author dMoulron
 */
@ManagedResource(objectName = "org.esco.grouperui:type=tools,application=Parameter,name=PluginDataIntegration", description = "Data table for parameter data intergration version", currencyTimeLimit = 15, persistPolicy = "OnUpdate", persistPeriod = 200)
public class PluginDataIntegration {

    /**
     * information for check if table are present.
     */
    private static Boolean presentTableCheck = Boolean.FALSE;

    /**
     * the jdbc template for executing request in db.
     */
    private JdbcTemplate   jdbcTemplate;

    /**
     *
     */
    public PluginDataIntegration() {
    }

    /**
     * @param thePluginId
     *            the id of set of plugin data
     * @param theVersion
     *            the version of set of plugin data
     * @param theResource
     *            the name of file which contain data
     * @return true if the data is up to data, false otherwise
     */
    public boolean isIntegrate(final String thePluginId, final String theVersion, final String theResource) {
        Boolean isIntergrated = Boolean.FALSE;

        if (!this.isSchemaPresent()) {
            isIntergrated = Boolean.FALSE;
        } else {

            isIntergrated = (Boolean) this.getJdbcTemplate()
                    .query(
                            "SELECT version FROM ADMPARAM.VERSION WHERE " + "plugin_id = '" + thePluginId
                                    + "'" + " AND resource = '" + theResource + "'" + " AND version = '"
                                    + theVersion + "'", new ResultSetExtractor() {

                                public Object extractData(final ResultSet theRs) throws SQLException,
                                        DataAccessException {
                                    if (theRs.next()) {
                                        return Boolean.TRUE;
                                    } else {
                                        return Boolean.FALSE;
                                    }
                                }
                            });
        }

        return isIntergrated;
    }

    /**
     * create schema and tables if they don't exist.
     * 
     * @param thePluginId
     *            the id of set of plugin data
     * @param theVersion
     *            the version of set of plugin data
     * @param theResource
     *            the name of file which contain data
     */
    public void integratePlugin(final String thePluginId, final String theVersion, final String theResource) {

        if (!this.isSchemaPresent()) {
            this.getJdbcTemplate().execute("CREATE SCHEMA ADMPARAM");
            this.getJdbcTemplate().execute(
                    "CREATE TABLE ADMPARAM.VERSION (plugin_id VARCHAR(255) NOT NULL, "
                            + "resource VARCHAR(512) NOT NULL, "
                            + "version VARCHAR(512) NOT NULL, PRIMARY KEY (plugin_id, resource, version))");
        }

        this.getJdbcTemplate().update(
                "insert into ADMPARAM.VERSION  (plugin_id, resource, version) values (?, ?, ?)",
                new PreparedStatementSetter() {

                    public void setValues(final PreparedStatement thePs) throws SQLException {
                        thePs.setString(1, thePluginId);
                        thePs.setString(2, theResource);
                        thePs.setString(3, theVersion);
                    }

                });
    }

    /**
     * @return true if ADMPARAM.VERSION is present in derby, false otherwise.
     */
    private Boolean isSchemaPresent() {
        Boolean isPresent = Boolean.FALSE;
        if (!PluginDataIntegration.presentTableCheck) {
            isPresent = (Boolean) this.getJdbcTemplate().query(
                    "SELECT TABLEID FROM SYS.SYSTABLES WHERE TABLENAME = 'VERSION'",
                    new ResultSetExtractor() {

                        public Object extractData(final ResultSet theRs) throws SQLException,
                                DataAccessException {
                            if (theRs.next()) {
                                return Boolean.TRUE;
                            } else {
                                return Boolean.FALSE;
                            }
                        }
                    });

            if (isPresent) {
                synchronized (PluginDataIntegration.presentTableCheck) {
                    PluginDataIntegration.presentTableCheck = Boolean.TRUE;
                }
            }
        } else {
            isPresent = Boolean.TRUE;
        }

        return isPresent;
    }

    /**
     * reset all data in database.
     */
    @ManagedOperation(description = "reset all data in table")
    public void reset() {

    }

    /**
     * use derby proc CALL SYSCS_UTIL.SYSCS_EXPORT_TABLE.
     * (null,'STAFF','myfile.del',null,null,null);
     * 
     * @return the dump of derby database.
     */
    @ManagedOperation(description = "dump all data in sql format")
    public String dump() {
        StringBuilder contents = new StringBuilder();

        this.getJdbcTemplate().call(new CallableStatementCreator() {
            public CallableStatement createCallableStatement(final Connection theCon) throws SQLException {
                String tempDir = System.getProperty("java.io.tmpdir");

                CallableStatement callstatement = theCon
                        .prepareCall("CALL SYSCS_UTIL.SYSCS_EXPORT_TABLE('DBPARAMETER', 'PARAM', '" + tempDir
                                + File.separator + "dump.sql', ';', '%', null)");
                return callstatement;
            }
        }, new ArrayList < SqlParameter >());

        BufferedReader input = null;
        try {
            input = new BufferedReader(new FileReader(new File("dump.sql")));

            String line = null;
            while ((line = input.readLine()) != null) {
                contents.append(line);
                contents.append(System.getProperty("line.separator"));
            }
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                }
            }
        }

        return contents.toString();
    }

    /**
     * reset schema present information.
     */
    @ManagedOperation(description = "reset schema present cache")
    public void resetSchemaPresent() {
        PluginDataIntegration.presentTableCheck = Boolean.FALSE;
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

}
