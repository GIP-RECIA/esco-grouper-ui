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
