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
import java.util.List;

import org.springframework.beans.factory.support.MethodReplacer;

/**
 * Class that permit to redefine the setBundleBasenames of the
 * AbstractI18nService class.
 * 
 * @author aChesneau
 */
public class I18nFilesAggregator implements MethodReplacer {

    /**
     * {@inheritDoc}
     */
    public Object reimplement(final Object theObj, final Method theMethod, final Object[] theArgs)
            throws Throwable {
        List < String > bundleBasenames = (List < String >) theArgs[0];
        I18nBaseNamesContainer.addBundleBasenames(bundleBasenames);
        return true;
    }

}
