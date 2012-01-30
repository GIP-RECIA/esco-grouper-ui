package org.esco.grouperui.tools.parameter;

import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Definition of service for extendsion.<br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author dMoulron
 */
public interface IParameterFinder extends IParameterService {

    /**
     * setter for jdbctemplate.
     * 
     * @param theJdbcTemplate
     *            the jdbcTemplate for executing methode
     */
    void setJdbcTemplate(JdbcTemplate theJdbcTemplate);
}
