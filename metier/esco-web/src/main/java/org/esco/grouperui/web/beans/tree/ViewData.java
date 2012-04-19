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

import javax.xml.bind.annotation.XmlRootElement;

import org.esco.grouperui.tools.property.PropertyManager;

/**
 * The ViewData class. The visible data of the tree.
 * Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "data")
public class ViewData {

    /** The title property. */
    private String title;

    /** The icon property. */
    private String icon;

    /**
     * Default constructor.
     */
    public ViewData() {
    }

    /**
     * Constructor of the class.
     * 
     * @param theTitle
     *            The title of the DataJson
     * @param theIcon
     *            The icon of the DataJson
     */
    public ViewData(final String theTitle, final String theIcon) {
        super();
        this.title = theTitle;
        this.icon = theIcon;
    }

    /**
     * Get the title property.
     * 
     * @return the title
     */
    public String getTitle() {
        return this.title;
    }

    /**
     * Setter of the title property.
     * 
     * @param theTitle
     *            the title to set
     */
    public void setTitle(final String theTitle) {
        this.title = theTitle;
    }

    /**
     * Get the icon property.
     * 
     * @return the icon
     */
    public String getIcon() {
        // Get the path of the icon width the context application.
        String result = this.icon;
        try {
            if (result.substring(0, 1).equals("/")) {
                result = "/" + PropertyManager.find("applicationContext").deType(String.class) + result;
            } else {
                result = "/" + PropertyManager.find("applicationContext").deType(String.class) + "/" + result;
            }
        } catch (IndexOutOfBoundsException e) {
        }
        return result;
    }

    /**
     * Setter of the icon property.
     * 
     * @param theIcon
     *            the icon to set
     */
    public void setIcon(final String theIcon) {
        this.icon = theIcon;
    }

}
