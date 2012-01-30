package org.esco.grouperui.web.utils;

import org.esco.grouperui.web.ESCOConstantes;
import org.esupportail.commons.services.i18n.I18nService;

public class I18nExceptionAdapter {

    /**
     * Get the exception string and if not exist, get the default value.
     * 
     * @param theI18nService
     *            The i18nService
     * @param theKey
     *            The key to get.
     * @param theDefaultValue
     *            The default value to use.
     * @return The string converted.
     */
    public static String getExceptionString(final I18nService theI18nService, final String theKey,
            final String theDefaultValue) {

        String result = "";
        String converted = theI18nService.getString(theKey);
        if (converted.contains(ESCOConstantes.NO_INTERNATIONALIZATION_EXCEPTION)) {
            result = theI18nService.getString(theDefaultValue);
        } else {
            result = converted;
        }
        return result;
    }

}
