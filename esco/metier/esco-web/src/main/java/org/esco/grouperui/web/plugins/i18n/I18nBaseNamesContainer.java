package org.esco.grouperui.web.plugins.i18n;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import org.esupportail.commons.services.i18n.AbstractI18nService;
import org.esupportail.commons.services.i18n.I18nUtils;

/**
 * @author aChesneau
 */
public class I18nBaseNamesContainer extends AbstractI18nService {

    /**
     * The default serial uid.
     */
    private static final long      serialVersionUID = -5251678113725123559L;

    /**
     * The new list of language file to use for the application.
     */
    private static List < String > bundleBasenames;

    /**
     * {@inheritDoc}
     */
    public Map < String, String > getStrings(final Locale theLocale) {
        return null;
    }

    /**
     * Get the bundleBasenames property.
     * 
     * @return the bundleBasenames
     */
    public static List < String > getBundleBasenames() {
        return I18nBaseNamesContainer.bundleBasenames;
    }

    /**
     * Add bundleBasenames to the bundleBasenames property.
     * 
     * @param theBundleBasenames
     *            the bundleBasenames to add
     */
    public static void addBundleBasenames(final List < String > theBundleBasenames) {
        if (I18nBaseNamesContainer.bundleBasenames == null) {
            I18nBaseNamesContainer.bundleBasenames = new ArrayList < String >();
        }
        for (String theFile : theBundleBasenames) {
            if (!I18nBaseNamesContainer.bundleBasenames.contains(theFile)) {
                I18nBaseNamesContainer.bundleBasenames.add(theFile);
            }
        }
    }

    /**
     * Setter of the bundleBasenames property.
     * 
     * @param theBundleBasenames
     *            the bundleBasenames to set
     */
    public void setBundleBasenames(final List < String > theBundleBasenames) {
        I18nBaseNamesContainer.addBundleBasenames(theBundleBasenames);
    }

    /**
     * @param bundleBasename
     * @param locale
     * @return The resource bundle corresponding to a Locale.
     */
    public static ResourceBundle getOneResourceBundle(final String bundleBasename, final Locale locale) {
        return I18nUtils.getResourceBundle(bundleBasename, locale);
    }
}
