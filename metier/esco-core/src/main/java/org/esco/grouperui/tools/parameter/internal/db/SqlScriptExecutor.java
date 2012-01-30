/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by
 * applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */
package org.esco.grouperui.tools.parameter.internal.db;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;

import org.apache.derby.tools.ij;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;

/**
 * SQL Script executor based on {@link ij}. Note that this executor requires
 * version 10.2.1.6 or later of <tt>derbytools.jar</tt> since it depends on the
 * {@link ij#runScript(Connection, InputStream, String, java.io.OutputStream, String)}
 * method, which doesn't exist in prior versions.
 * 
 * @author Andreas Veithen
 * @version $Id: IjSqlScriptExecutor.java 59 2008-03-11 21:37:29Z veithen $
 */
public class SqlScriptExecutor implements ISqlScriptExecutor {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(SqlScriptExecutor.class);

    /**
     * Default constructor.
     */
    public SqlScriptExecutor() {
    }

    /**
     * {@inheritDoc}
     */
    public void executeScript(final Connection connection, final Resource theResource, final String encoding,
            final boolean theIgnoreError) throws SQLException, DataAccessException, IOException {
        InputStream input = theResource.getInputStream();
        try {
            OutputStream out = new WriterOutputStream(new LoggerWriter(SqlScriptExecutor.LOGGER.getLogger()),
                    "UTF-8");
            try {
                // runScript returns the number of SQLExceptions thrown during
                // the execution
                if (ij.runScript(connection, input, encoding, out, "UTF-8") > 0 && !theIgnoreError) {
                    // TODO: this exception is no longer appropriate
                    throw new ESCOTechnicalException("Script " + theResource.getFilename()
                            + " executed with errors");
                }
            } finally {
                out.close();
            }
        } finally {
            input.close();
        }
    }
}
