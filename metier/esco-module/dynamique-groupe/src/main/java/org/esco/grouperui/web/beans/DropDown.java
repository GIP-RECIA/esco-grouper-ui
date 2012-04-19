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

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Class DropDown. Requirement(s) : [RECIA-ESCO-L2-001], [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
@XmlRootElement(name = "dropDown")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class DropDown {

    /**
     * The list of values in the dropDown object.
     */
    private List < DropDownAttribute > dropDownAttributes;

    /**
     * Default constructor.
     */
    public DropDown() {
        super();
    }

    /**
     * Constructor.
     * 
     * @param theDropDownAttributes
     *            the attributes of the dropDownList
     */
    public DropDown(final List < DropDownAttribute > theDropDownAttributes) {
        super();
        this.dropDownAttributes = theDropDownAttributes;
    }

    /**
     * Getter for dropDownAttributes.
     * 
     * @return the dropDownAttributes to get.
     */
    @XmlElement(name = "dropDownAttribute", type = DropDownAttribute.class)
    public final List < DropDownAttribute > getDropDownAttributes() {
        return this.dropDownAttributes;
    }

    /**
     * Setter for dropDownAttributes.
     * 
     * @param theDropDownAttributes
     *            the dropDownAttributes to set.
     */
    public final void setDropDownAttributes(final List < DropDownAttribute > theDropDownAttributes) {
        this.dropDownAttributes = theDropDownAttributes;
    }

}
