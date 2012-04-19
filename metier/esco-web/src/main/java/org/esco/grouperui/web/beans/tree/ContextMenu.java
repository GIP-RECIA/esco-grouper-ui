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

import java.util.ArrayList;
import java.util.Collection;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * ContextMenu class. Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "ContextMenu")
public class ContextMenu {

    /** The list of context menu items. */
    private Collection < ContextMenuItem > contextMenuItems;

    /**
     * Default constructor.
     */
    public ContextMenu() {
        this.contextMenuItems = new ArrayList < ContextMenuItem >();
    }

    /**
     * Get the contextMenuItems property.
     * 
     * @return the contextMenuItems
     */
    @XmlElement(name = "elements", type = ContextMenuItem.class)
    public Collection < ContextMenuItem > getContextMenuItems() {
        return this.contextMenuItems;
    }

    /**
     * Setter of the contextMenuItems property.
     * 
     * @param theContextMenuItems
     *            the contextMenuItems to set
     */
    public void setContextMenuItems(final Collection < ContextMenuItem > theContextMenuItems) {
        this.contextMenuItems = theContextMenuItems;
    }

    /**
     * Add a ContextMenuItem to the collection.
     * 
     * @param theContextMenuItem
     *            The contextMenuItem to add.
     */
    public void addContextMenuItem(final ContextMenuItem theContextMenuItem) {
        this.contextMenuItems.add(theContextMenuItem);
    }

}
