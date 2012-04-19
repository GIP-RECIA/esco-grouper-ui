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
package org.esco.grouperui.web.beans;

import java.util.Set;

/**
 * Class Attribute. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class Attribute {

    /** The key corresponding to the values. */
    private final String         key;

    /** The values corresponding to the key. */
    private final Set < String > values;

    /**
     * Default constructor.
     * 
     * @param theKey
     *            the key.
     * @param theValues
     *            the values.
     */
    public Attribute(final String theKey, final Set < String > theValues) {
        this.key = theKey;
        this.values = theValues;
    }

    /**
     * Getter for key.
     * 
     * @return the key to get.
     */
    public final String getKey() {
        return this.key;
    }

    /**
     * Getter for value.
     * 
     * @return the value to get.
     */
    public final String getValues() {
        StringBuffer buffer = new StringBuffer();
        final int nbValues = this.values.size();

        int cpt = 1;
        for (String str : this.values) {
            buffer.append(str);
            if (cpt < nbValues) {
                buffer.append(", ");
            }
            cpt++;
        }

        return buffer.toString();
    }
}
