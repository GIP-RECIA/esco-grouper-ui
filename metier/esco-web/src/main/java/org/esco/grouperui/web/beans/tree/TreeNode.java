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
package org.esco.grouperui.web.beans.tree;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * TreeNode class. Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "elements")
public class TreeNode {

    /** The attributes property. */
    private Attributes attributes;

    /** The data property. */
    private ViewData   data;

    /** The state property. */
    private String     state;

    /**
     * Default constructor.
     */
    public TreeNode() {

    }

    /**
     * Get the attributes property.
     * 
     * @return the attributes
     */
    @XmlElement(name = "attributes")
    public Attributes getAttributes() {
        return this.attributes;
    }

    /**
     * Setter of the attributes property.
     * 
     * @param theAttributes
     *            the attributes to set
     */
    public void setAttributes(final Attributes theAttributes) {
        this.attributes = theAttributes;
    }

    /**
     * Get the data property.
     * 
     * @return the data
     */
    @XmlElement(name = "data")
    public ViewData getData() {
        return this.data;
    }

    /**
     * Setter of the data property.
     * 
     * @param theData
     *            the data to set
     */
    public void setData(final ViewData theData) {
        this.data = theData;
    }

    /**
     * Get the state property.
     * 
     * @return the state
     */
    public String getState() {
        return this.state;
    }

    /**
     * Set the state property.
     * 
     * @param theState
     *            the state to set
     */
    public void setState(final String theState) {
        this.state = theState;
    }

}
