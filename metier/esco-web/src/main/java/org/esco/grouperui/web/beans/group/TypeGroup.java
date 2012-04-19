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
package org.esco.grouperui.web.beans.group;

import java.util.ArrayList;
import java.util.List;

import org.esco.grouperui.domaine.beans.SimpleValue;

/**
 * Class DynamicGroup. Requirement(s) : [RECIA-ESCO-L1-007]
 * 
 * @author ctrimoreau
 */
public class TypeGroup {

    /** The key. */
    private String               key;

    /** The list of values. */
    private List < SimpleValue > values;

    /**
     * Default constructor.
     */
    public TypeGroup() {
        this.values = new ArrayList < SimpleValue >();
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
     * Setter for key.
     * 
     * @param theKey
     *            the key to set.
     */
    public final void setKey(final String theKey) {
        this.key = theKey;
    }

    /**
     * Getter for values.
     * 
     * @return the values to get.
     */
    public final List < SimpleValue > getValues() {
        return this.values;
    }

    /**
     * Setter for values.
     * 
     * @param theValues
     *            the values to set.
     */
    public final void setValues(final List < SimpleValue > theValues) {
        this.values = theValues;
    }

}
