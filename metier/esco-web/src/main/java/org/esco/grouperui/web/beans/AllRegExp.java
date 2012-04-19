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

import org.esco.grouperui.web.validators.RegExp;

/**
 * @author oFages
 */
@XmlRootElement(name = "allRegExp")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class AllRegExp {

    /**
     * The list of validation regExps.
     */
    private List < RegExp > allRegExp;

    /**
     * Default constructor.
     */
    public AllRegExp() {
    }

    /**
     * minimal constructor.
     * 
     * @param theAllRegExp
     *            the list of RegExp to be set
     */
    public AllRegExp(final List < RegExp > theAllRegExp) {
        super();
        this.allRegExp = theAllRegExp;
    }

    /**
     * Getter for allRegExp.
     * 
     * @return the allRegExp to get.
     */
    @XmlElement(name = "elements", type = RegExp.class)
    public final List < RegExp > getAllRegExp() {
        return this.allRegExp;
    }

}
