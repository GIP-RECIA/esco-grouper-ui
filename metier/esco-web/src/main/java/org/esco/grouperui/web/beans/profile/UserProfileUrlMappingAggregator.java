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
package org.esco.grouperui.web.beans.profile;

import java.util.Map;
import java.util.Map.Entry;

import org.esco.grouperui.tools.property.PropertyManager;
import org.springframework.beans.factory.InitializingBean;

/**
 * @author aChesneau
 */
public class UserProfileUrlMappingAggregator implements InitializingBean {

    /**
     * The profiles to add to the UsersProfileContainer
     */
    private Map < String, String > listMappings;

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {

        if (this.listMappings == null) {
            throw new IllegalArgumentException("the property listMappings can not be null.");
        }
        if (this.listMappings.isEmpty()) {
            throw new IllegalArgumentException("the property listMappings can not be empty.");
        }
        for (Entry < String, String > urlMapping : this.listMappings.entrySet()) {
            String prefix = "/";
            if (urlMapping.getKey().substring(0, 1).equals("/")) {
                prefix += PropertyManager.find("applicationContext").deType(String.class);
            } else {
                prefix += PropertyManager.find("applicationContext").deType(String.class) + "/";
            }
            UsersProfileContainer.addUrlMapping(prefix + urlMapping.getKey(), urlMapping.getValue());
        }
    }

    /**
     * Setter of the listMappings property.
     * 
     * @param theListMappings
     *            the listMappings to set
     */
    public void setListMappings(final Map < String, String > theListMappings) {
        this.listMappings = theListMappings;
    }

}
