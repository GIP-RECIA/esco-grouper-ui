package org.esco.grouperui.tools.property;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 *
 */
public class PropertyFinder {

    /**
     * Logger de class.
     */
    private static final IESCOLogger                LOGGER = ESCOLoggerFactory.getLogger(PropertyFinder.class);

    /**
     * cle � trouver.
     */
    private String                                  keyToFind;

    /**
     * map de properties.
     */
    private Map < String, PropertiesConfiguration > mapProperties;

    /**
     * fichier recherche.
     */
    private String                                  fileIntoSearch;

    /**
     * valeur par d�faut.
     */
    private String                                  defaultValue;

    /**
     * Constructeur par defaut visibile uniquement par les classe du package.
     * 
     * @param theKey
     *            la cle de recherhce de la valeur dans les properties
     * @param thePropertiesConfiguration
     *            la liste des properties ou rechercher
     */
    protected PropertyFinder(final String theKey,
            final Map < String, PropertiesConfiguration > thePropertiesConfiguration) {
        this.keyToFind = theKey;
        this.mapProperties = thePropertiesConfiguration;
    }

    /**
     * @param theFile
     *            la cle du nom du fichier � scanner pour rechercher la valeur
     *            du property
     * @return la class courante valoris�e avec le nom du fichier � scanner
     */
    public final PropertyFinder in(final String theFile) {
        Validate.notEmpty(theFile, "Le nom du fichier de recherche ne peut pas �tre vide");

        // PropertyFinder.LOGGER.debug("Appel de in avec le parametre " +
        // theFile);
        this.fileIntoSearch = theFile;
        return this;
    }

    /**
     * @param <T>
     *            le type du retour
     * @param theType
     *            le type de retour de la valeur. La liste des types se trouve
     *            dans la classe : TypeFinder
     * @return la valeur trouv�e dans un property
     */
    @SuppressWarnings("unchecked")
    public final <T> T deType(final Class < T > theType) {
        Validate.notEmpty(new Object[] {theType }, "Le type de retour ne peut pas être vide");

        // PropertyFinder.LOGGER.debug("Appel de deType avec le parametre "
        // + theType.getClass().getCanonicalName());

        T resulat = null;
        PropertiesConfiguration configIntoSearch = this.findPropertiesFile();

        if (configIntoSearch == null && this.defaultValue == null) {
            throw new ESCOTechnicalException("Aucun fichier n'a �t� trouv� pour la cl� " + this.keyToFind);
        } else {
            // /Conversion dans le type voulu du resultat de recherche
            if ("java.lang.String".equals(theType.getName())) {
                resulat = (T) configIntoSearch.getString(this.keyToFind, this.defaultValue);
            } else
                if ("java.math.BigInteger".equals(theType.getName())) {
                    resulat = (T) configIntoSearch
                            .getBigInteger(this.keyToFind, new BigInteger(this.defaultValue));
                } else
                    if ("java.math.BigDecimal".equals(theType.getName())) {
                        resulat = (T) configIntoSearch.getBigDecimal(this.keyToFind, new BigDecimal(
                                this.defaultValue));
                    } else
                        if ("java.lang.Boolean".equals(theType.getName())) {
                            resulat = (T) configIntoSearch.getBoolean(this.keyToFind, Boolean
                                    .valueOf(this.defaultValue));
                        } else
                            if ("java.lang.Byte".equals(theType.getName())) {
                                resulat = (T) configIntoSearch.getByte(this.keyToFind, Byte
                                        .valueOf(this.defaultValue));
                            } else
                                if ("java.lang.Double".equals(theType.getName())) {
                                    resulat = (T) new Double(configIntoSearch.getDouble(this.keyToFind, Double
                                            .valueOf(this.defaultValue)));
                                } else
                                    if ("java.lang.Float".equals(theType.getName())) {
                                        resulat = (T) new Float(configIntoSearch.getFloat(this.keyToFind, Float
                                                .valueOf(this.defaultValue)));
                                    } else
                                        if ("java.lang.Integer".equals(theType.getName())) {
                                            resulat = (T) Integer.valueOf(configIntoSearch.getInt(this.keyToFind,
                                                    Integer.valueOf(this.defaultValue)));
                                        } else
                                            if ("java.util.List".equals(theType.getName())) {
                                                resulat = (T) configIntoSearch.getList(this.keyToFind, Arrays
                                                        .asList(this.defaultValue.split("|")));
                                            } else
                                                if ("java.lang.Long".equals(theType.getName())) {
                                                    resulat = (T) configIntoSearch.getLong(this.keyToFind, Long
                                                            .valueOf(this.defaultValue));
                                                } else
                                                    if ("java.lang.Short".equals(theType.getName())) {
                                                        resulat = (T) configIntoSearch.getShort(this.keyToFind,
                                                                Short.valueOf(this.defaultValue));
                                                    } else
                                                        if ("java.lang.String[]".equals(theType.getName())) {
                                                            resulat = (T) configIntoSearch
                                                                    .getStringArray(this.keyToFind);
                                                        } else {
                                                            resulat = (T) configIntoSearch.getString(
                                                                    this.keyToFind, this.defaultValue);
                                                        }
        }

        return resulat;
    }

    /**
     * @return
     */
    private PropertiesConfiguration findPropertiesFile() {
        PropertiesConfiguration configIntoSearch = null;
        // recherche du fichier de properties correspondant à la clé de
        // recherche
        if (this.fileIntoSearch == null) {
            for (final Entry < String, PropertiesConfiguration > propertyEntry : this.mapProperties.entrySet()) {
                if (propertyEntry.getValue().getString(this.keyToFind, this.defaultValue) != null) {
                    configIntoSearch = propertyEntry.getValue();
                    break;
                }
            }
        } else {
            configIntoSearch = this.mapProperties.get(this.fileIntoSearch);
        }
        return configIntoSearch;
    }

    /**
     * @param theDefaultValue
     *            valeur par default si aucune correspondance et trouvee dans
     *            les fichiers
     * @return la class courante valoris�e avec une valeur par defaut
     */
    public final PropertyFinder avecDefaut(final String theDefaultValue) {
        this.defaultValue = theDefaultValue;
        return this;
    }

    /**
     * Mutateur de fileIntoSearch.
     * 
     * @param theFileIntoSearch
     *            fileIntoSearch � affecter.
     */
    public final void setFileIntoSearch(final String theFileIntoSearch) {
        this.fileIntoSearch = theFileIntoSearch;
    }

    /**
     * Mutateur de defaultValue.
     * 
     * @param theDefaultValue
     *            defaultValue � affecter.
     */
    public final void setDefaultValue(final String theDefaultValue) {
        this.defaultValue = theDefaultValue;
    }

    /**
     * Accesseur de mapProperties.
     * 
     * @return obtention du mapProperties.
     */
    public final Map < String, PropertiesConfiguration > getMapProperties() {
        return this.mapProperties;
    }

    /**
     * Mutateur de keyToFind.
     * 
     * @param theKeyToFind
     *            keyToFind � affecter.
     */
    public final void setKeyToFind(final String theKeyToFind) {
        this.keyToFind = theKeyToFind;
    }

    /**
     * Mutateur de mapProperties.
     * 
     * @param theMapProperties
     *            mapProperties � affecter.
     */
    public final void setMapProperties(final Map < String, PropertiesConfiguration > theMapProperties) {
        this.mapProperties = theMapProperties;
    }

}
