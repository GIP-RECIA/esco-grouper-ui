package org.esco.grouperui.tools.property;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * La manager de properties. Cette class est concu sur une notation DSL. Les
 * deux notations possible pour rechercher des libelles dans des properties :
 * PropertyManager
 * .find("asv.baseGteDisponible").in("disponibiliteBase").deType(TypeFinder
 * .BOOLEAN); <br />
 * PropertyManager.find("asv.baseGteDisponible").deType(String.class);
 */
public final class PropertyManager {

    /**
     * Logger de class.
     */
    private static final IESCOLogger                LOGGER                  = ESCOLoggerFactory
                                                                                    .getLogger(PropertyManager.class);

    /**
     * instance du singleton.
     */
    private static final PropertyManager            INSTANCE                = new PropertyManager();

    /**
     * la map de reception des elements de configuration.
     */
    private Map < String, PropertiesConfiguration > propertiesConfiguration = new HashMap < String, PropertiesConfiguration >();

    /**
     * Chemin d'install des configurations.
     */
    private String[]                                baseDirs;

    /**
     * constructeur invisible.
     */
    private PropertyManager() {
    }

    /**
     * @return l'instance du singleton
     */
    public static PropertyManager getInstance() {
        return PropertyManager.INSTANCE;
    }

    /**
     * Mutateur de baseDirs.
     * 
     * @param theBaseDirs
     *            baseDirs � affecter.
     */
    public void setBaseDirs(final String[] theBaseDirs) {
        this.baseDirs = theBaseDirs;
    }

    /**
     * @param thePropertiesConfiguration
     *            the propertiesConfiguration to set
     */
    public void setPropertiesConfiguration(
            final Map < String, PropertiesConfiguration > thePropertiesConfiguration) {
        if (this.propertiesConfiguration == null) {
            this.propertiesConfiguration = thePropertiesConfiguration;
        } else {
            this.propertiesConfiguration.putAll(thePropertiesConfiguration);
        }
    }

    /**
     * @return the propertiesConfiguration
     */
    protected Map < String, PropertiesConfiguration > getPropertiesConfiguration() {
        return this.propertiesConfiguration;
    }

    /**
     * @param theKey
     *            la cle de recherche d'une valeur dans les properties
     * @return l'objet PropertyFinder qui permet d'effectuer d'autre ajout de
     *         propriete de recherche
     */
    public static PropertyFinder find(final String theKey) {
        Validate.notEmpty(theKey, "La cle de recherche ne peut pas etre vide");

        PropertyManager.LOGGER.debug("Appel de find avec le parametre " + theKey);
        return new PropertyFinder(theKey, PropertyManager.INSTANCE.getPropertiesConfiguration());
    }

    /**
     * @return property installs folder.
     */
    public static String[] baseDirs() {
        return PropertyManager.INSTANCE.baseDirs;
    }

}
