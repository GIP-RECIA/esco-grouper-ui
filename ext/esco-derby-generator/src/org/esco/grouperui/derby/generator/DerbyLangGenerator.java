package org.esco.grouperui.derby.generator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.esco.grouperui.derby.constantes.ESCOConstantes;
import org.esco.grouperui.derby.log.ESCOLoggerFactory;
import org.esco.grouperui.derby.log.IESCOLogger;

/**
 * Robot for the generation of Lang property files.
 * 
 * @author sDupuis
 */
public class DerbyLangGenerator {

    /**
     * LOGGER : Logger sources.
     */
    private static final IESCOLogger         LOGGER                = ESCOLoggerFactory
                                                                           .getLogger(DerbyLangGenerator.class);
    /**
     * langOfApplications : Langs of properties.
     */
    private final ArrayList < String >       langOfApplications    = new ArrayList < String >();

    /**
     * writeFileMessagesLang : Language files output.
     */
    private final Map < String, Properties > writeFileMessagesLang = new HashMap < String, Properties >();

    /**
     * destFolder : dest of output files.
     */
    private String                           destFolder            = new String();

    /**
     * error : boolean for verify error.
     */
    private boolean                          error                 = false;

    /**
     * valuesOfLang : value of propertie "global.lang".
     */
    private String                           valuesOfLang          = new String();

    /**
     * Get the langOfApplications property.
     * 
     * @return the langOfApplications
     */
    public ArrayList < String > getLangOfApplications() {
        return this.langOfApplications;
    }

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
    public DerbyLangGenerator(final String destinationFolder, final String theLangs) {

        DerbyLangGenerator.LOGGER.info("Start - DerbyLangGenerator");

        try {
            this.destFolder = destinationFolder;
            this.valuesOfLang = theLangs;

            // Initialisation of parameters
            DerbyLangGenerator.LOGGER.info("   DerbyLangGenerator - Initialisation of parameters");
            this.initialisationOfParameters();
        } catch (Exception e) {
            DerbyLangGenerator.LOGGER.error("DerbyLangGenerator - It must define the properties file to load - "
                    + e);
            this.error = true;
        }

        DerbyLangGenerator.LOGGER.info("End - DerbyLangGenerator");

    }

    /**
     * This function adds a property line Message language file.
     * 
     * @param lang
     *            : Associate to the language file.
     * @param key
     *            : Associate to the key.
     * @param value
     *            : Associate to the value.
     */
    public void addMessageProperties(final String lang, final String key, final String value) {

        DerbyLangGenerator.LOGGER.debug("Start - addMessageProperties(String lang, String key, String value)");

        if (this.writeFileMessagesLang.get(lang).getProperty(key.trim()) != null) {
            // This message is in debug instead of warn because too much logs
            // are displayed in ant task
            DerbyLangGenerator.LOGGER.debug("         AddMessageProperties - This key is duplicated : " + key,
                    null);
        }

        this.writeFileMessagesLang.get(lang).setProperty(key.trim(), value.trim());

        DerbyLangGenerator.LOGGER.debug("End - addMessageProperties(String lang, String key, String value)");

    }

    /**
     * Initialisation of parameters.
     */
    public void initialisationOfParameters() {

        DerbyLangGenerator.LOGGER.debug("Start - initialisationOfParameters()");

        // Management language files
        DerbyLangGenerator.LOGGER.debug("   InitialisationOfParameters - Management language files");

        String[] valuesOfAttributes = this.valuesOfLang.split(ESCOConstantes.ATTRIBUT_LIST_SEPARATOR);

        for (String attribut : valuesOfAttributes) {
            String keyOfLang = attribut.trim();
            this.langOfApplications.add(keyOfLang);
            this.writeFileMessagesLang.put(keyOfLang, new Properties());
        }

        DerbyLangGenerator.LOGGER.debug("End - initialisationOfParameters()");

    }

    /**
     * Close files.
     */
    public void closeAllFiles() {

        DerbyLangGenerator.LOGGER.debug("Start - closeAllFiles()");

        // Closings and savings language files
        DerbyLangGenerator.LOGGER.debug("   CloseAllFiles - Closings and savings language files");
        for (String keyOfLang : this.langOfApplications) {

            StringBuffer nameOfFile = new StringBuffer();
            nameOfFile.append(this.destFolder);
            nameOfFile.append(ESCOConstantes.NAME_OF_MESSAGE_PORPERTIES_FILE);
            nameOfFile.append(keyOfLang);
            nameOfFile.append(ESCOConstantes.EXT_OF_MESSAGE_PORPERTIES_FILE);

            try {
                PrintStream file = new PrintStream(new File(nameOfFile.toString()));
                file.print("");
                file.close();

                this.writeFileMessagesLang.get(keyOfLang).store(new FileOutputStream(nameOfFile.toString()),
                        ESCOConstantes.HEADER_FILE_PROPERTIES);
            } catch (FileNotFoundException e) {
                DerbyLangGenerator.LOGGER
                        .error("Error - closeAllFiles() - Destination file for lang is not found - " + e);
                this.error = true;
            } catch (IOException e) {
                DerbyLangGenerator.LOGGER.error("Error - closeAllFiles() - IOException in Propertie file lang - "
                        + e);
                this.error = true;
            }

        }

        DerbyLangGenerator.LOGGER.debug("End - closeAllFiles()");

    }

    /**
     * generated the param error.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public String getNameOfPropertieParamError(final String key, final String attribut, final String lang) {

        StringBuffer nameOfPropertieParamError = new StringBuffer();
        nameOfPropertieParamError.append(key.trim());
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(attribut.trim());
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_ERROR);
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(lang.trim());

        return nameOfPropertieParamError.toString();

    }

    /**
     * generated the param label.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public String getNameOfPropertieParamLabel(final String key, final String attribut, final String lang) {

        StringBuffer nameOfPropertieParamError = new StringBuffer();
        nameOfPropertieParamError.append(key.trim());
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(attribut.trim());
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_LABEL);
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(lang.trim());

        return nameOfPropertieParamError.toString();

    }

    /**
     * generated the key label.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public String getKeyOfPropertieParamLabel(final String attribut) {

        StringBuffer keyOfPropertieParamLabel = new StringBuffer();
        keyOfPropertieParamLabel.append(attribut.trim());
        keyOfPropertieParamLabel.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        keyOfPropertieParamLabel.append(ESCOConstantes.ATTRIBUT_LABEL);

        return keyOfPropertieParamLabel.toString();

    }

    /**
     * generated the param title.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public String getNameOfPropertieParamTitle(final String key, final String attribut, final String lang) {

        StringBuffer nameOfPropertieParamError = new StringBuffer();
        nameOfPropertieParamError.append(key.trim());
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(attribut.trim());
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_TITLE);
        nameOfPropertieParamError.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamError.append(lang.trim());

        return nameOfPropertieParamError.toString();

    }

    /**
     * generated the key title.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public String getKeyOfPropertieParamTitle(final String key, final String attribut) {

        StringBuffer valueOfPropertieParamTitle = new StringBuffer();
        valueOfPropertieParamTitle.append(key.trim().toUpperCase().replace(ESCOConstantes.ATTRIBUT_SEPARATOR,
                ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR));
        valueOfPropertieParamTitle.append(ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR);
        valueOfPropertieParamTitle.append(attribut.trim().toUpperCase());
        valueOfPropertieParamTitle.append(ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR);
        valueOfPropertieParamTitle.append(ESCOConstantes.ATTRIBUT_TITLE.toUpperCase());

        return valueOfPropertieParamTitle.toString();

    }

}
