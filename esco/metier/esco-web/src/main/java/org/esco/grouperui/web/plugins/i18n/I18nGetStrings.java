package org.esco.grouperui.web.plugins.i18n;

import java.lang.reflect.Method;
import java.util.Enumeration;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import org.esupportail.commons.services.i18n.BundleMap;
import org.springframework.beans.factory.support.MethodReplacer;

/**
 * Class that permit to redefine the getStrings of the AbstractI18nService
 * class.
 * 
 * @author aChesneau
 */
public class I18nGetStrings implements MethodReplacer {

    /**
     * The default serial uid of the class.
     */
    private static final long serialVersionUID = 1L;

    /**
     * {@inheritDoc}
     */
    public Object reimplement(final Object theObj, final Method theMethod, final Object[] theArgs)
            throws Throwable {
        Locale locale = (Locale) theArgs[0];
        Map < String, String > result = new BundleMap(locale);
        for (String bundleBasename : I18nBaseNamesContainer.getBundleBasenames()) {
            ResourceBundle bundle = I18nBaseNamesContainer.getOneResourceBundle(bundleBasename, locale);
            if (bundle != null) {
                Enumeration < String > keys = bundle.getKeys();
                while (keys.hasMoreElements()) {
                    String key = keys.nextElement();
                    result.put(key, bundle.getString(key));
                }
            }
        }
        return result;
    }

}
