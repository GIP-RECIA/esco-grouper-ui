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
package org.esco.grouperui.web.validators;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author oFages
 */
@XmlRootElement(name = "elements")
public class RegExp {

    /**
     * The name of the attribute.
     */
    private String     name;

    /**
     * The regExp associated to the attribute.
     */
    private RegExpAttr regExpAttr;

    /**
     * Constructor.
     * 
     * @param theName
     *            The name of the attribute.
     * @param theRegExpAttr
     *            The regExp associated to the attribute.
     */
    public RegExp(final String theName, final RegExpAttr theRegExpAttr) {
        super();
        this.name = theName;
        this.regExpAttr = theRegExpAttr;
    }

    /**
     * Getter for name.
     * 
     * @return the name to get.
     */
    public final String getName() {
        return this.name;
    }

    /**
     * Setter for name.
     * 
     * @param theName
     *            the name to set.
     */
    public final void setName(final String theName) {
        this.name = theName;
    }

    /**
     * Getter for regExpAttr.
     * 
     * @return the regExpAttr to get.
     */
    @XmlElement(name = "regexattr")
    public final RegExpAttr getRegExpAttr() {
        return this.regExpAttr;
    }

    /**
     * Setter for regExpAttr.
     * 
     * @param theRegExpAttr
     *            the regExpAttr to set.
     */
    public final void setRegExpAttr(final RegExpAttr theRegExpAttr) {
        this.regExpAttr = theRegExpAttr;
    }

}
