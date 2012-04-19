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

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.esco.grouperui.domaine.beans.SimpleValue;

/**
 * Class DropDownValues. Requirement(s) : [RECIA-ESCO-L2-001],
 * [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
@XmlRootElement(name = "dropDownValues")
public class DropDownValues {

    /**
     * The list of values in the dropDown object.
     */
    private List < SimpleValue > dynamicAttributes;

    /**
     * Default constructor.
     */
    public DropDownValues() {
        super();
    }

    /**
     * Constructor.
     * 
     * @param theDynamicAttributes
     *            the list of values in the dropDown object.
     */
    public DropDownValues(final List < SimpleValue > theDynamicAttributes) {
        super();
        this.dynamicAttributes = theDynamicAttributes;
    }

    /**
     * Getter for dynamicAttributes.
     * 
     * @return the dynamicAttributes to get.
     */
    @XmlElement(name = "dynamicAttribute", type = SimpleValue.class)
    public final List < SimpleValue > getDynamicAttributes() {
        return this.dynamicAttributes;
    }

    /**
     * Setter for dynamicAttributes.
     * 
     * @param theDynamicAttributes
     *            the dynamicAttributes to set.
     */
    public final void setDynamicAttributes(final List < SimpleValue > theDynamicAttributes) {
        this.dynamicAttributes = theDynamicAttributes;
    }

}
