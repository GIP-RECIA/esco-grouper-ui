package org.esco.grouperui.derby.generator;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Properties;

import org.esco.grouperui.derby.constantes.ESCOConstantes;
import org.esco.grouperui.derby.log.ESCOLoggerFactory;
import org.esco.grouperui.derby.log.IESCOLogger;
import org.esco.grouperui.derby.utils.DerbyGlobalTypeUtils;
import org.esco.grouperui.derby.utils.DerbyNoGlobalTypeUtils;
import org.esco.grouperui.derby.utils.DerbyPluginTypeUtils;
import org.esco.grouperui.derby.utils.DerbyUtils;

/**
 * Robot for the generation of SQL property files.
 * 
 * @author sDupuis
 */
public class DerbyGenerator {

    /**
     * LOGGER : Logger sources.
     */
    private static final IESCOLogger   LOGGER                     = ESCOLoggerFactory
                                                                          .getLogger(DerbyGenerator.class);
    /**
     * properties : Properties files as input.
     */
    private final Properties           properties                 = new Properties();

    /**
     * properties : Properties files as input.
     */
    private final Properties           keysOfTypesRequired        = new Properties();

    /**
     * properties : Properties files as input.
     */
    private final Properties           keysOfTypesNoRequired      = new Properties();

    /**
     * nameOfFileProperties : Names of properties files as input.
     */
    public ArrayList < String >        nameOfFileProperties       = new ArrayList < String >();

    /**
     * keysOfTypesGlobalForPlugin : Keys of types global for plugin.
     */
    private final ArrayList < String > keysOfTypesGlobalForPlugin = new ArrayList < String >();

    /**
     * error : boolean for verify error.
     */
    private boolean                    error                      = false;

    /**
     * derbyLangGenerator : Manage lang files.
     */
    private DerbyLangGenerator         derbyLangGenerator         = null;

    /**
     * derbySqlGenerator : Manage sql files.
     */
    private DerbySqlGenerator          derbySqlGenerator          = null;

    /**
     * destFolder : dest of output files.
     */
    private String                     destFolder                 = new String();

    /**
     * Default constructor.
     * 
     * @param args
     *            : parameters of application.
     */
    public DerbyGenerator(final String[] args) {

        DerbyGenerator.LOGGER.info("Start - DerbyGenerator");

        if (args.length == 0) {
            DerbyGenerator.LOGGER
                    .error("   DerbyGenerator - The arguments are a list of properties files to manage, you must spend at least one file name argument.");
        } else {
            try {
                // Loading properties in parameter
                DerbyGenerator.LOGGER.info("   DerbyGenerator - Loading properties in parameters");

                this.destFolder = args[0];
                for (int i = 1; i < args.length; i++) {
                    this.nameOfFileProperties.add(args[i]);
                }

                // Initialisation of parameters
                DerbyGenerator.LOGGER.info("   DerbyGenerator - Initialisation of parameters");
                this.initialisationOfParameters();

                // Creation of SQL Properties
                DerbyGenerator.LOGGER.info("   DerbyGenerator - Creation of SQL Properties");
                this.createSqlByProperties();

                // Close files
                DerbyGenerator.LOGGER.info("   DerbyGenerator - Close files");
                this.closeAllFiles();

            } catch (Exception e) {
                DerbyGenerator.LOGGER.error("DerbyGenerator - It must define the properties file to load - " + e);
                this.error = true;
            }

        }

        this.error = this.error || this.derbyLangGenerator.isError() || this.derbySqlGenerator.isError();

        if (!this.error) {
            DerbyGenerator.LOGGER.info("### The generation of files has been completed successfully. ###");
        } else {
            DerbyGenerator.LOGGER.info("### The generation of files failed. ###");
            System.exit(1);
        }

        DerbyGenerator.LOGGER.info("End - DerbyGenerator");

    }

    /**
     * Initialisation of parameters.
     */
    public void initialisationOfParameters() {

        DerbyGenerator.LOGGER.debug("Start - initialisationOfParameters()");

        try {
            // Initialisation of required global keys
            DerbyGenerator.LOGGER.debug("   InitialisationOfParameters - Initialisation of required global keys");
            this.keysOfTypesRequired.load(ClassLoader.getSystemClassLoader().getResourceAsStream(
                    "requiredKeyAndMappingTable.properties"));

            this.keysOfTypesNoRequired.load(ClassLoader.getSystemClassLoader().getResourceAsStream(
                    "optionalKeyAndMappingTable.properties"));

        } catch (FileNotFoundException e) {
            DerbyGenerator.LOGGER.error("Error - initialisationOfParameters() - Propertie file is not found - "
                    + e);
            this.error = true;
        } catch (IOException e) {
            DerbyGenerator.LOGGER.error("Error - initialisationOfParameters() - IOException in Propertie file - "
                    + e);
            this.error = true;
        }

        try {
            // Load properties
            DerbyGenerator.LOGGER.debug("   InitialisationOfParameters - Load properties");
            for (String arg : this.nameOfFileProperties) {
                this.properties.load(new FileInputStream(arg));
            }
        } catch (FileNotFoundException e) {
            DerbyGenerator.LOGGER.error("Error - initialisationOfParameters() - Propertie file is not found - "
                    + e);
            this.error = true;
        } catch (IOException e) {
            DerbyGenerator.LOGGER.error("Error - initialisationOfParameters() - IOException in Propertie file - "
                    + e);
            this.error = true;
        }

        // Management SQL files
        this.derbySqlGenerator = new DerbySqlGenerator(this.destFolder);

        // Management language files
        this.derbyLangGenerator = new DerbyLangGenerator(this.destFolder, this.properties
                .getProperty("global.lang"));

        DerbyGenerator.LOGGER.debug("End - initialisationOfParameters()");

    }

    /**
     * Close files.
     */
    public void closeAllFiles() {

        DerbyGenerator.LOGGER.debug("Start - closeAllFiles()");

        // Closings SQL script file
        this.derbySqlGenerator.closeAllFiles();

        // Closings and savings language files
        this.derbyLangGenerator.closeAllFiles();

        DerbyGenerator.LOGGER.debug("End - closeAllFiles()");

    }

    /**
     * Get a mapped key.
     * 
     * @param key
     *            : The key.
     * @return : The mapped key.
     */
    public String getMappedKey(final String key) {
        String res = this.keysOfTypesRequired.getProperty(key);

        if (res == null || res.equals("")) {
            res = this.keysOfTypesNoRequired.getProperty(key);
        }

        return res;
    }

    /**
     * default Manage Of Attribut Type.
     * 
     * @param key
     *            : The key.
     * @param valueOfKey
     *            : The valueOfKey.
     */
    public void defaultManageOfAttributType(String key, final String valueOfKey) {
        String[] valuesOfAttributes = valueOfKey.split(ESCOConstantes.ATTRIBUT_LIST_SEPARATOR);
        key = key.substring(0, key.indexOf(ESCOConstantes.GLOBAL));

        for (String attribut : valuesOfAttributes) {

            String attributTrim = attribut.trim();

            if (attributTrim.indexOf("-") != -1) {

                // Attribute Type list
                this.derbySqlGenerator.addSqlLine(DerbyGlobalTypeUtils.gestionOfAttributListType(this.properties,
                        key, attributTrim, this.getMappedKey(key + ESCOConstantes.GLOBAL)));

            } else
                if (this.properties.containsKey(key + ESCOConstantes.ATTRIBUT_SEPARATOR + attributTrim
                        + ESCOConstantes.ATTRIBUT_SEPARATOR + ESCOConstantes.ATTRIBUT_REGEXP)) {

                    // Type attribute regexp
                    this.derbySqlGenerator.addSqlLine(DerbyGlobalTypeUtils.gestionOfAttributRegexpType(
                            this.properties, key, attributTrim, this.getMappedKey(key + ESCOConstantes.GLOBAL)));

                    for (String lang : this.derbyLangGenerator.getLangOfApplications()) {
                        // Error
                        String errorValue = this.properties.getProperty(this.derbyLangGenerator
                                .getNameOfPropertieParamError(key, attribut, lang), attribut);

                        // Added message properties
                        this.derbyLangGenerator.addMessageProperties(lang, DerbyUtils
                                .getParamValueKeyOfPropertieError(key, attribut), errorValue);
                    }

                } else
                    if (this.properties.containsKey(key + ESCOConstantes.ATTRIBUT_SEPARATOR + attributTrim
                            + ESCOConstantes.ATTRIBUT_SEPARATOR + ESCOConstantes.ATTRIBUT_KEY)) {

                        // Type attribute key / value
                        this.derbySqlGenerator.addSqlLine(DerbyGlobalTypeUtils
                                .gestionOfAttributKeyValueType(this.properties, key, attributTrim, this
                                        .getMappedKey(key + ESCOConstantes.GLOBAL)));

                    } else {

                        String langDefined = null;
                        StringBuffer containsKeyOfLang = new StringBuffer();
                        containsKeyOfLang.append(key);
                        containsKeyOfLang.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        containsKeyOfLang.append(attributTrim);
                        containsKeyOfLang.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        containsKeyOfLang.append(ESCOConstantes.ATTRIBUT_LABEL);
                        containsKeyOfLang.append(ESCOConstantes.ATTRIBUT_SEPARATOR);

                        for (String lang : this.derbyLangGenerator.getLangOfApplications()) {
                            if (this.properties.containsKey(containsKeyOfLang.toString() + lang)) {
                                langDefined = lang;
                                break;
                            }
                        }

                        if (langDefined != null) {
                            // Attribute label type
                            this.derbySqlGenerator.addSqlLine(DerbyGlobalTypeUtils.gestionOfAttributLabelType(
                                    this.properties, key, attributTrim, this.getMappedKey(key
                                            + ESCOConstantes.GLOBAL)));

                            for (String lang : this.derbyLangGenerator.getLangOfApplications()) {

                                // Label
                                String labelKey = this.derbyLangGenerator
                                        .getKeyOfPropertieParamLabel(attributTrim);
                                String labelValue = this.properties.getProperty(this.derbyLangGenerator
                                        .getNameOfPropertieParamLabel(key, attributTrim, lang), attributTrim);

                                // Title
                                String titleKey = this.derbyLangGenerator.getKeyOfPropertieParamTitle(key,
                                        attributTrim);
                                String titleValue = this.properties.getProperty(this.derbyLangGenerator
                                        .getNameOfPropertieParamTitle(key, attributTrim, lang),
                                        ESCOConstantes.VIDE);

                                // Added message properties
                                this.derbyLangGenerator.addMessageProperties(lang, labelKey, labelValue);
                                this.derbyLangGenerator.addMessageProperties(lang, titleKey, titleValue);

                            }

                        } else {
                            DerbyGenerator.LOGGER.error("Error for key : " + key + " and attribute : "
                                    + attributTrim);
                        }

                    }

        }

        // Skipping a line for a better visibility of the generated file
        this.derbySqlGenerator.addSqlBlankLine();
    }

    /**
     * This function generates the files for the "application" for one key.
     * 
     * @param key
     *            : The key.
     * @param required
     *            : True if the key is required.
     */
    public void createSqlByPropertiesGlobalKey(final String key, final Boolean required) {

        String valueOfKey = this.properties.getProperty(key, null);

        if (valueOfKey != null) {

            if (key.indexOf(ESCOConstantes.TYPES_OF_VARIABLES_GLOBAL) != -1) {

                this.defaultManageOfAttributType(key, valueOfKey);

            } else
                if (key.indexOf(ESCOConstantes.TYPES_OF_VARIABLES_ATTRIBUTES) != -1) {
                    this.derbySqlGenerator.addSqlLine(DerbyNoGlobalTypeUtils.manageOfAttributTypeAttributes(
                            this.properties, key, valueOfKey, true, this.getMappedKey(key),
                            this.derbyLangGenerator));

                } else
                    if (key.indexOf(ESCOConstantes.TYPES_OF_VARIABLES_COLS) != -1) {

                        String[] valuesOfAttributes = valueOfKey.split(ESCOConstantes.COLS_LIST_SEPARATOR);

                        for (String attribut : valuesOfAttributes) {

                            String attributTrim = attribut.trim();

                            if (attributTrim.indexOf(ESCOConstantes.COLS_ATTRIBUT_SEPARATOR) != -1) {
                                // Attribute Type column with 2 attributes
                                this.derbySqlGenerator
                                        .addSqlLine(DerbyNoGlobalTypeUtils.gestionOfAttributColumnType(key,
                                                attributTrim, 2, this.getMappedKey(key)));
                            } else {
                                // Attribute Type column with 1 attribute
                                this.derbySqlGenerator
                                        .addSqlLine(DerbyNoGlobalTypeUtils.gestionOfAttributColumnType(key,
                                                attributTrim, 1, this.getMappedKey(key)));
                            }

                        }

                    } else
                        if (key.indexOf(ESCOConstantes.TYPES_OF_VARIABLES_MAPS) != -1) {
                            this.derbySqlGenerator.addSqlLine(DerbyNoGlobalTypeUtils.manageOfAttributTypeMaps(
                                    this.properties, key, valueOfKey, true, this.getMappedKey(key),
                                    this.derbyLangGenerator));
                        } else
                            if (key.indexOf(ESCOConstantes.TYPES_OF_VARIABLES_RIGHTS) != -1) {
                                this.derbySqlGenerator.addSqlLine(DerbyNoGlobalTypeUtils
                                        .manageOfAttributTypeRights(this.properties, key, valueOfKey, true, this
                                                .getMappedKey(key), this.derbyLangGenerator));
                            } else
                                if (key.indexOf(ESCOConstantes.TYPES_OF_VARIABLES_CUSTOMTYPES) != -1) {
                                    this.derbySqlGenerator.addSqlLine(DerbyNoGlobalTypeUtils
                                            .manageOfAttributTypeCusomtypes(this.properties, key, valueOfKey,
                                                    true, this.getMappedKey(key), this.derbyLangGenerator));
                                } else
                                    if (key.indexOf(ESCOConstantes.TYPES_OF_VARIABLES_CONTEXTS) != -1) {
                                        this.derbySqlGenerator.addSqlLine(DerbyNoGlobalTypeUtils
                                                .manageOfAttributTypeContexts(this.properties, key, valueOfKey,
                                                        true, this.getMappedKey(key), this.derbyLangGenerator));
                                    } else {
                                        DerbyGenerator.LOGGER
                                                .error("CreateSqlByPropertiesGlobal() - This key/type is in error : "
                                                        + key);
                                        this.error = true;
                                    }

        } else {
            if (required) {
                DerbyGenerator.LOGGER.error("CreateSqlByPropertiesGlobal() - This key is required : " + key);
                this.error = true;
            }
        }

        // Skipping a line for a better visibility of the generated file
        this.derbySqlGenerator.addSqlBlankLine();

    }

    /**
     * This function generates the files for the "application".
     */
    public void createSqlByPropertiesGlobal() {
        for (Enumeration keys = this.keysOfTypesRequired.keys(); keys.hasMoreElements();) {
            this.createSqlByPropertiesGlobalKey((String) keys.nextElement(), true);
        }
        for (Enumeration keys = this.keysOfTypesNoRequired.keys(); keys.hasMoreElements();) {
            this.createSqlByPropertiesGlobalKey((String) keys.nextElement(), false);
        }
    }

    /**
     * This function generates the files for the "plugin".
     */
    public void createSqlByPropertiesGlobalPlugin() {

        DerbyGenerator.LOGGER.debug("Start - createSqlByPropertiesGlobalPlugin()");

        this.keysOfTypesGlobalForPlugin.add("plugin.group.dynamic");

        for (String key : this.keysOfTypesGlobalForPlugin) {

            String valueOfKey = this.properties.getProperty(key + ESCOConstantes.ATTRIBUT_SEPARATOR
                    + ESCOConstantes.TYPES_OF_VARIABLES_ATTRIBUTES);
            String[] valuesOfAttributes = valueOfKey.split(ESCOConstantes.ATTRIBUT_LIST_SEPARATOR);

            for (String attribut : valuesOfAttributes) {
                this.derbySqlGenerator.addSqlLine(DerbyPluginTypeUtils.gestionOfAttributPluginType(
                        this.properties, key, attribut.trim(), this.derbyLangGenerator));
            }

            // Skipping a line for a better visibility of the generated file
            this.derbySqlGenerator.addSqlBlankLine();

        }

        DerbyGenerator.LOGGER.debug("End - createSqlByPropertiesGlobalPlugin()");

    }

    /**
     * This function is the call to the two functions for generating files, one
     * for the application and the other for management of plugins.
     */
    public void createSqlByProperties() {

        DerbyGenerator.LOGGER.debug("Start - createSqlByProperties()");

        // Generation with Application Settings
        DerbyGenerator.LOGGER.info("      CreateSqlByProperties - Generation with Application Settings");
        this.createSqlByPropertiesGlobal();

        // Generations with the parameters of the application plugins
        DerbyGenerator.LOGGER
                .info("      CreateSqlByProperties - Generations with the parameters of the application plugins");
        this.createSqlByPropertiesGlobalPlugin();

        DerbyGenerator.LOGGER.debug("End - createSqlByProperties()");

    }

}
