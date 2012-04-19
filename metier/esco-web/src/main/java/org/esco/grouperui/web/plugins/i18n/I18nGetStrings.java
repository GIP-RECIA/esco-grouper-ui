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
