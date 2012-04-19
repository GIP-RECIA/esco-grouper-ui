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

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Class DropDownAttribute. Requirement(s) : [RECIA-ESCO-L2-001],
 * [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
@XmlRootElement(name = "dropDownAttribute")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class DropDownAttribute {

    /**
     * The key of the attribute.
     */
    private String         key;

    /**
     * The value of the attribute.
     */
    private String         value;

    /**
     * Right to use the wildcard character.
     */
    private Boolean        wildcard;

    /**
     * Right to edit the value in the dropDown.
     */
    private Boolean        editable;

    /**
     * The type of the dropDown.
     */
    private String         type;

    /**
     * The values listed in the dropDown.
     */
    private DropDownValues values;

    /**
     * Default constructor.
     */
    public DropDownAttribute() {
        super();
    }

    /**
     * Constructor.
     * 
     * @param theKey
     *            the key of the attribute
     * @param theValue
     *            the value of the attribute
     */
    public DropDownAttribute(final String theKey, final String theValue) {
        super();
        this.key = theKey;
        this.value = theValue;
    }

    /**
     * Constructor.
     * 
     * @param theKey
     *            the key of the attribute
     * @param theValue
     *            the value of the attribute
     * @param theWildcard
     *            right to use the wildcard character
     * @param theEditable
     *            right to edit the value in the dropDown
     * @param theType
     *            the type of the dropDown
     * @param theValues
     *            the values of the dropDown
     */
    public DropDownAttribute(final String theKey, final String theValue, final Boolean theWildcard,
            final Boolean theEditable, final String theType, final DropDownValues theValues) {
        super();
        this.key = theKey;
        this.value = theValue;
        this.wildcard = theWildcard;
        this.editable = theEditable;
        this.type = theType;
        this.values = theValues;
    }

    /**
     * Getter for key.
     * 
     * @return the key to get.
     */
    @XmlAttribute(name = "key")
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
     * Getter for value.
     * 
     * @return the value to get.
     */
    @XmlAttribute(name = "value")
    public final String getValue() {
        return this.value;
    }

    /**
     * Setter for value.
     * 
     * @param theValue
     *            the value to set.
     */
    public final void setValue(final String theValue) {
        this.value = theValue;
    }

    /**
     * Getter for wildCard.
     * 
     * @return the wildCard to get.
     */
    @XmlElement
    public final Boolean getWildcard() {
        return this.wildcard;
    }

    /**
     * Setter for wildcard.
     * 
     * @param theWildcard
     *            the wildcard to set.
     */
    public final void setWildcard(final Boolean theWildcard) {
        this.wildcard = theWildcard;
    }

    /**
     * Getter for editable.
     * 
     * @return the editable to get.
     */
    public final Boolean getEditable() {
        return this.editable;
    }

    /**
     * Setter for editable.
     * 
     * @param theEditable
     *            the editable to set.
     */
    public final void setEditable(final Boolean theEditable) {
        this.editable = theEditable;
    }

    /**
     * Getter for type.
     * 
     * @return the type to get.
     */
    @XmlElement
    public final String getType() {
        return this.type;
    }

    /**
     * Setter for type.
     * 
     * @param theType
     *            the type to set.
     */
    public final void setType(final String theType) {
        this.type = theType;
    }

    /**
     * Getter for values.
     * 
     * @return the values to get.
     */
    @XmlElement(name = "dropDownValues", type = DropDownValues.class)
    public final DropDownValues getValues() {
        return this.values;
    }

    /**
     * Setter for values.
     * 
     * @param theValues
     *            the values to set.
     */
    public final void setValues(final DropDownValues theValues) {
        this.values = theValues;
    }

}
