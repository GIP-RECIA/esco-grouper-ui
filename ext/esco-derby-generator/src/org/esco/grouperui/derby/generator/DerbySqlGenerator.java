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
package org.esco.grouperui.derby.generator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.util.ArrayList;

import org.esco.grouperui.derby.constantes.ESCOConstantes;
import org.esco.grouperui.derby.log.ESCOLoggerFactory;
import org.esco.grouperui.derby.log.IESCOLogger;
import org.esco.grouperui.derby.utils.SqlAdd;

/**
 * Robot for the generation of SQL property files.
 * 
 * @author sDupuis
 */
public class DerbySqlGenerator {

    /**
     * LOGGER : Logger sources.
     */
    private static final IESCOLogger LOGGER       = ESCOLoggerFactory.getLogger(DerbySqlGenerator.class);
    /**
     * writeFileSql : SQL file output.
     */
    private PrintStream              writeFileSql = null;

    /**
     * error : boolean for verify error.
     */
    private boolean                  error        = false;

    /**
     * destFolder : dest of output files.
     */
    private String                   destFolder   = new String();

    /**
     * Get the error property.
     * 
     * @return the error
     */
    public boolean isError() {
        return this.error;
    }

    /**
     * Default constructor.
     * 
     * @param args
     *            : parameters of application.
     */
    public DerbySqlGenerator(final String destinationFolder) {

        DerbySqlGenerator.LOGGER.info("Start - DerbyGenerator");

        try {
            this.destFolder = destinationFolder;

            // Initialisation of parameters
            DerbySqlGenerator.LOGGER.info("   DerbyGenerator - Initialisation of parameters");
            this.initialisationOfParameters();
        } catch (Exception e) {
            DerbySqlGenerator.LOGGER.error("DerbyGenerator - It must define the properties file to load - " + e);
            this.error = true;
        }

        DerbySqlGenerator.LOGGER.info("End - DerbyGenerator");

    }

    /**
     * This function adds a property line SQL file.
     * 
     * @param pkey
     *            : Associate to the pkey in the SQL request.
     * @param pgroup
     *            : Associate to the pgroup in the SQL request.
     * @param paramKey
     *            : Associate to the paramKey in the SQL request.
     * @param paramValue
     *            : Associate to the paramValue in the SQL request.
     * @param paramComment
     *            : Associate to the paramComment in the SQL request.
     */
    public void addSqlLine(final String pkey, final String pgroup, final String paramKey, final String paramValue,
            final String paramComment) {

        DerbySqlGenerator.LOGGER
                .debug("Start - addSqlLine(final String pkey, final String pgroup, final String paramKey, final String paramValue, final String paramComment)");

        this.writeFileSql.println(this.formatageSql(pkey, pgroup, paramKey, paramValue, paramComment));

        DerbySqlGenerator.LOGGER
                .debug("End - addSqlLine(final String pkey, final String pgroup, final String paramKey, final String paramValue, final String paramComment)");

    }

    /**
     * This function adds a property line SQL file.
     * 
     * @param sqlAdd
     *            : Associate to all element of the SQL request.
     */
    public void addSqlLine(final SqlAdd sqlAdd) {

        DerbySqlGenerator.LOGGER
                .debug("Start - addSqlLine(final String pkey, final String pgroup, final String paramKey, final String paramValue, final String paramComment)");

        this.addSqlLine(sqlAdd.getPkey(), sqlAdd.getPgroup(), sqlAdd.getParamKey(), sqlAdd.getParamValue(), sqlAdd
                .getParamComment());

        DerbySqlGenerator.LOGGER
                .debug("End - addSqlLine(final String pkey, final String pgroup, final String paramKey, final String paramValue, final String paramComment)");

    }

    /**
     * This function adds a property line SQL file.
     * 
     * @param thesqlAdds
     *            : Associate to all element of the SQL request.
     */
    public void addSqlLine(final ArrayList < SqlAdd > thesqlAdds) {
        for (SqlAdd sqlAdd : thesqlAdds) {
            this.addSqlLine(sqlAdd);
        }
    }

    /**
     * This function add a blanck line in the SQL file.
     */
    public void addSqlBlankLine() {

        DerbySqlGenerator.LOGGER.debug("Start - addSqlBlankLine()");

        this.writeFileSql.println();

        DerbySqlGenerator.LOGGER.debug("End - addSqlBlankLine()");

    }

    /**
     * This function format the values of a property line SQL file.
     * 
     * @param pkey
     *            : Associate to the pkey in the SQL request.
     * @param pgroup
     *            : Associate to the pgroup in the SQL request.
     * @param paramKey
     *            : Associate to the paramKey in the SQL request.
     * @param paramValue
     *            : Associate to the paramValue in the SQL request.
     * @param paramComment
     *            : Associate to the paramComment in the SQL request.
     */
    public String formatageSql(final String pkey, final String pgroup, final String paramKey,
            final String paramValue, final String paramComment) {

        DerbySqlGenerator.LOGGER
                .debug("Start - formatageSql(final String pkey, final String pgroup, final String paramKey, final String paramValue, final String paramComment)");

        StringBuffer requete = new StringBuffer(ESCOConstantes.INSERT_AVANT_VALUES);
        requete.append("'");
        requete.append(pkey);
        requete.append("', '");
        requete.append(pgroup);
        requete.append("', '");
        requete.append(paramKey);
        requete.append("', '");
        requete.append(paramValue);
        requete.append("', '");
        requete.append(paramComment);
        requete.append("'");
        requete.append(ESCOConstantes.INSERT_APRES_VALUES);

        DerbySqlGenerator.LOGGER
                .debug("End - formatageSql(final String pkey, final String pgroup, final String paramKey, final String paramValue, final String paramComment)");

        return requete.toString();

    }

    /**
     * Initialisation of parameters.
     */
    public void initialisationOfParameters() {

        DerbySqlGenerator.LOGGER.debug("Start - initialisationOfParameters()");

        try {
            // Openings SQL script file
            DerbySqlGenerator.LOGGER.debug("   InitialisationOfParameters - Openings SQL script file");
            this.writeFileSql = new PrintStream(new File(this.destFolder + ESCOConstantes.NAME_OF_SQL_FILE));
            this.writeFileSql.println(ESCOConstantes.HEADER_FILE_SQL);
            this.writeFileSql.println();
            this.writeFileSql.println("DELETE FROM \"DBPARAMETER\".\"PARAM\";");
            this.writeFileSql.println();
        } catch (FileNotFoundException e) {
            DerbySqlGenerator.LOGGER
                    .error("Error - initialisationOfParameters() - Destination file is not found - " + e);
            this.error = true;
        }

        DerbySqlGenerator.LOGGER.debug("End - initialisationOfParameters()");

    }

    /**
     * Close files.
     */
    public void closeAllFiles() {

        DerbySqlGenerator.LOGGER.debug("Start - closeAllFiles()");

        // Closings SQL script file
        DerbySqlGenerator.LOGGER.debug("   CloseAllFiles - Closings SQL script file");
        this.writeFileSql.close();

        DerbySqlGenerator.LOGGER.debug("End - closeAllFiles()");

    }

}
