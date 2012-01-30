package org.esco.grouperui.tools.parameter.internal.db;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;

/**
 * Description of class who want insert data in database.
 * 
 * @author dMoulron
 */
public interface ISqlScriptExecutor {

    /**
     * execute sql script into database.
     * 
     * @param theConnection
     *            the connexion to the database
     * @param theResource
     *            the file to populate database
     * @param theEncoding
     *            the encoding of file
     * @param theIgnoreError
     *            true for ignore error, false otherwise
     * @throws SQLException
     *             if there are error when execute sql
     * @throws DataAccessException
     *             if there are error when acces to database
     * @throws IOException
     *             if there are error when read file
     */
    void executeScript(Connection theConnection, Resource theResource, String theEncoding,
            boolean theIgnoreError) throws SQLException, DataAccessException, IOException;
}
