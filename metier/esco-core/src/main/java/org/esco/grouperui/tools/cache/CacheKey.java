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
package org.esco.grouperui.tools.cache;

/**
 * @author X457335
 */
public class CacheKey implements ICacheKey < String > {

    /**
     * a unique key form cache object.
     */
    private String key;

    /**
     * default ocnstructor.
     */
    public CacheKey() {
    }

    /**
     * {@inheritDoc}
     */
    public String getKey() {
        return this.key;
    }

    /**
     * {@inheritDoc}
     */
    public void setKey(final String theKey) {
        this.key = theKey;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ICacheKey < String > clone() throws CloneNotSupportedException {
        ICacheKey < String > cloneKey = null;
        try {
            // On récupére l'instance à renvoyer par l'appel de la
            // méthode super.clone()
            cloneKey = (ICacheKey < String >) super.clone();
        } catch (CloneNotSupportedException cnse) {
            // Ne devrait jamais arriver car nous implémentons
            // l'interface Cloneable
        }
        // on renvoie le clone
        return cloneKey;
    }
}
