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

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.tools.parameter.IParameterFinder;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;

/**
 * Standard implementation for search parameter into db. <br/>
 * Requirement(s): [RECIA-ESCO-L1-012], [RECIA-ESCO-L2-001], [RECIA-ESCO-L2-002]
 * 
 * @author dMoulron
 */
public class ParameterFinder implements IParameterFinder {

    /**
     * the serial uid.
     */
    private static final long serialVersionUID = 7602866192214069675L;
    /**
     * The jdbcTemplate for executing method.
     */
    private JdbcTemplate      jdbcTemplate;

    /**
     * Default constructor.
     */
    public ParameterFinder() {
    }

    /**
     * {@inheritDoc}
     */
    public final ParameterGroup findParametersByGroup(final String theGroup) {
        ParameterGroup group = new ParameterGroup();
        group.setName(theGroup);

        List < Parameter > parameters = this.jdbcTemplate.query(new PreparedStatementCreator() {

            public PreparedStatement createPreparedStatement(final Connection theCon) throws SQLException {
                PreparedStatement preparedStatement = theCon.prepareStatement(
                        "SELECT pkey, param_key, param_value FROM DBPARAMETER.PARAM where pgroup = ?",
                        new String[] {"pgroup" });
                preparedStatement.setString(1, theGroup);
                return preparedStatement;
            }

        }, new RowMapper() {

            public Object mapRow(final ResultSet theRs, final int theRowNum) throws SQLException {
                Parameter parameter = new Parameter();

                parameter.setPkey(theRs.getString("pkey"));
                parameter.setKey(theRs.getString("param_key"));
                parameter.setValue(theRs.getString("param_value"));

                return parameter;
            }
        });

        group.setParameters(parameters);

        return group;
    }

    /**
     * {@inheritDoc}
     */
    public final List < ParameterGroup > findParametersByGroupSuffix(final String theGroupSuffix) {

        List < ParameterGroup > parametersGroup = this.jdbcTemplate.query(new PreparedStatementCreator() {

            public PreparedStatement createPreparedStatement(final Connection theCon) throws SQLException {
                PreparedStatement preparedStatement = theCon.prepareStatement(
                        "SELECT distinct pgroup FROM DBPARAMETER.PARAM where pgroup LIKE ?",
                        new String[] {"pgroup" });
                preparedStatement.setString(1, "%" + theGroupSuffix);
                return preparedStatement;
            }

        }, new RowMapper() {

            public Object mapRow(final ResultSet theRs, final int theRowNum) throws SQLException {

                ParameterGroup group = new ParameterGroup();
                group.setName(theRs.getString("pgroup"));

                return group;
            }
        });

        ParameterGroup group;

        Iterator < ParameterGroup > itParameterGroup = parametersGroup.iterator();
        while (itParameterGroup.hasNext()) {

            group = itParameterGroup.next();
            final String groupName = group.getName();

            List < Parameter > parameters = this.jdbcTemplate.query(new PreparedStatementCreator() {

                public PreparedStatement createPreparedStatement(final Connection theCon) throws SQLException {
                    PreparedStatement preparedStatement = theCon.prepareStatement(
                            "SELECT pkey, param_key, param_value FROM DBPARAMETER.PARAM where pgroup = ?",
                            new String[] {"pgroup" });
                    preparedStatement.setString(1, groupName);
                    return preparedStatement;
                }

            }, new RowMapper() {

                public Object mapRow(final ResultSet theRs, final int theRowNum) throws SQLException {
                    Parameter parameter = new Parameter();

                    parameter.setPkey(theRs.getString("pkey"));
                    parameter.setKey(theRs.getString("param_key"));
                    parameter.setValue(theRs.getString("param_value"));

                    return parameter;
                }
            });

            group.setParameters(parameters);
        }

        return parametersGroup;
    }

    /**
     * {@inheritDoc}
     */
    public final List < Parameter > findParametersById(final String theGroup, final String theKey) {
        List < Parameter > parameters = this.jdbcTemplate.query(new PreparedStatementCreator() {

            public PreparedStatement createPreparedStatement(final Connection theCon) throws SQLException {
                PreparedStatement preparedStatement = theCon.prepareStatement(
                        "SELECT param_key, param_value FROM DBPARAMETER.PARAM where pgroup = ? and pkey = ?",
                        new String[] {"pgroup", "pkey" });
                preparedStatement.setString(1, theGroup);
                preparedStatement.setString(2, theKey);
                return preparedStatement;
            }

        }, new RowMapper() {

            public Object mapRow(final ResultSet theRs, final int theRowNum) throws SQLException {
                Parameter parameter = new Parameter();

                parameter.setKey(theRs.getString("param_key"));
                parameter.setValue(theRs.getString("param_value"));

                return parameter;
            }
        });

        return parameters;
    }

    /**
     * {@inheritDoc}
     */
    public final List < ParameterGroup > getRegisteredGroup() {
        List < ParameterGroup > groups = this.jdbcTemplate.query(new PreparedStatementCreator() {

            public PreparedStatement createPreparedStatement(final Connection theCon) throws SQLException {
                return theCon.prepareStatement("SELECT pgroup FROM DBPARAMETER.PARAM");
            }

        }, new RowMapper() {

            public Object mapRow(final ResultSet theRs, final int theRowNum) throws SQLException {
                ParameterGroup group = new ParameterGroup();

                group.setName(null);
                group.setParameters(null);

                return group;
            }
        });

        return groups;
    }

    /**
     * {@inheritDoc}
     */
    public final void setJdbcTemplate(final JdbcTemplate theJdbcTemplate) {
        this.jdbcTemplate = theJdbcTemplate;
    }

}
