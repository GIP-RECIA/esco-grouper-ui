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
package org.esco.grouperui.web.beans.dynamicgrouptree;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Member class. Requirement(s) : [RECIA-ESCO-L2-001], [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
@XmlRootElement(name = "member")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class Member {

    /** The type property. */
    private String type;

    /** The value property. */
    private String value;

    /**
     * Default constructor.
     */
    public Member() {

    }

    /**
     * Constructor.
     * 
     * @param theType
     *            the type of the member
     * @param theValue
     *            the value of the member
     */
    public Member(final String theType, final String theValue) {
        super();
        this.type = theType;
        this.value = theValue;
    }

    /**
     * Getter for type.
     * 
     * @return the type to get.
     */
    @XmlAttribute(name = "type")
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

}
