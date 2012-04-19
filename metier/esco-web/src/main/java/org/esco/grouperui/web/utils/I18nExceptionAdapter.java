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
package org.esco.grouperui.web.utils;

import org.esco.grouperui.web.ESCOConstantes;
import org.esupportail.commons.services.i18n.I18nService;

/**
 * @author sopragroup
 */
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
