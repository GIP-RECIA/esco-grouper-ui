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
package org.esco.grouperui.tools.property;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Map.Entry;

import org.apache.commons.configuration.AbstractConfiguration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.configuration.reloading.FileChangedReloadingStrategy;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.services.ESCOConstantes;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;

/**
 * The property manager factory of the ESCOGrouper application.
 * 
 * @author aChesneau
 */
public class PropertyManagerFactory implements InitializingBean, FactoryBean {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER     = ESCOLoggerFactory.getLogger(PropertyManagerFactory.class);

    /** la map intermediaire de reception des elements de configuration. */
    private Map < String, String >   properties = new HashMap < String, String >();

    /**
     * Default constructor.
     */
    public PropertyManagerFactory() {
        AbstractConfiguration.setDefaultListDelimiter(ESCOConstantes.ARRAY_DELIMITER);
    }

    /**
     * @param theProperties
     *            the properties to set
     */
    public final void setProperties(final Map < String, String > theProperties) {
        if (this.properties == null) {
            this.properties = theProperties;
        } else {
            this.properties.putAll(theProperties);
        }
    }

    /**
     * setter for property propertyManagerFactoryParent.
     * 
     * @param thePropertyManagerFactoryParent
     *            the propertyManagerFactoryParent to set
     */
    public void setPropertyManagerFactoryParent(final PropertyManagerFactory thePropertyManagerFactoryParent) {
    }

    /**
     * Accesseur de properties.
     * 
     * @return obtention du properties.
     */
    public final Map < String, String > getProperties() {
        return this.properties;
    }

    /**
     * {@inheritDoc}
     */
    public final void afterPropertiesSet() throws ConfigurationException {

        final PropertyManager manager = PropertyManager.getInstance();

        // added phase.
        if (PropertyManager.baseDirs() != null && PropertyManager.baseDirs().length > 0) {
            // nothing to do.
        } else {
            String path = this.getClass().getResource("/spring/esco-core.xml").getPath();
            path = path.replace("file:/", "");
            path = path.substring(0, path.indexOf("WEB-INF"));
            path += "WEB-INF/classes/properties";
            if (!System.getProperty("os.name").equals("window")) {
                path = "/" + path;
            }
            final String foldersConf = path;
            Validate.notEmpty(foldersConf);
            String[] repertoireDeConfiguration = null;
            if (foldersConf.indexOf("|") > 0) {
                repertoireDeConfiguration = foldersConf.split("\\|");
            } else {
                repertoireDeConfiguration = new String[] {foldersConf };
            }

            manager.setBaseDirs(repertoireDeConfiguration);
        }
        this.addPropertiesToManager();
    }

    /**
     * iterate on each property file and add all property in manager.
     */
    private void addPropertiesToManager() {

        String[] repertoireDeConfiguration = PropertyManager.baseDirs();
        String folderWork = null;
        final Map < String, PropertiesConfiguration > map = new HashMap < String, PropertiesConfiguration >();

        for (final Entry < String, String > property : this.properties.entrySet()) {
            PropertiesConfiguration config = null;

            for (String folderConf : repertoireDeConfiguration) {
                try {

                    if (!folderConf.endsWith("/") && !folderConf.endsWith("\\")) {
                        folderWork = folderConf + File.separator + "/";
                    } else {
                        folderWork = folderConf;
                    }

                    final File fichierACharger = new File(folderWork + property.getValue());
                    if (fichierACharger.exists()) {
                        // Chargement du fichier de properties dans un
                        // PropertiesConfiguration
                        config = new PropertiesConfiguration(fichierACharger);
                        PropertyManagerFactory.LOGGER.debug("Chargement de " + folderWork + property.getValue()
                                + " effectué");

                        // Rechargement � chaud du fichier en cas de
                        // modification de celui-ci
                        config.setReloadingStrategy(new FileChangedReloadingStrategy());
                        map.put(property.getKey(), config);
                    } else {
                        PropertyManagerFactory.LOGGER.debug("Impossible de charger le fichier " + folderWork
                                + property.getValue());
                    }
                } catch (final ConfigurationException e) {
                    PropertyManagerFactory.LOGGER.error(e, "Le fichier de properties " + folderWork
							        + property.getValue() + " n'a pas pu se charger correctement");
                }
            }
        }

        final PropertyManager manager = PropertyManager.getInstance();
        manager.setPropertiesConfiguration(map);
    }

    /**
     * {@inheritDoc}
     */
    public Object getObject() throws Exception {
        Properties lProperties = new Properties();
        final Map < String, PropertiesConfiguration > propsMap = PropertyManager.getInstance()
                .getPropertiesConfiguration();

        for (final Entry < String, PropertiesConfiguration > propertyEntry : propsMap.entrySet()) {
            Iterator < String > itProp = propertyEntry.getValue().getKeys();
            while (itProp.hasNext()) {
                String key = itProp.next();
                lProperties.setProperty(key, propertyEntry.getValue().getString(key));
            }
        }

        return lProperties;
    }

    /**
     * {@inheritDoc}
     */
    public Class getObjectType() {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public boolean isSingleton() {
        return true;
    }
}
