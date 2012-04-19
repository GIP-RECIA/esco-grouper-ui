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
package org.esco.grouperui.web.controllers.tree;

import java.util.Map;
import java.util.Map.Entry;

import org.esco.grouperui.web.beans.tree.ContextMenu;
import org.esco.grouperui.web.beans.tree.ContextMenuItem;

/**
 * MenuTreeServiceImpl class implements IMenuTreeService interface.
 * Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
public class MenuTreeServiceImpl implements IMenuTreeService, IMenuTreeServiceInitialize {

    /**
     * The map of the menu entry.
     */
    private Map < String, ContextMenuItem > menuEntry;

    /**
     * Default constructor.
     */
    public MenuTreeServiceImpl() {
    }

    /**
     * {@inheritDoc}
     */
    public ContextMenu getMenuContext() {

        ContextMenu contextMenu = new ContextMenu();

        for (Entry < String, ContextMenuItem > entry : this.menuEntry.entrySet()) {
            contextMenu.addContextMenuItem(entry.getValue());
        }

        return contextMenu;
    }

    /**
     * {@inheritDoc}
     */
    public void setMenuEntry(final Map < String, ContextMenuItem > theMenuEntry) {
        if (this.menuEntry == null) {
            this.menuEntry = theMenuEntry;
        } else {
            this.menuEntry.putAll(theMenuEntry);
        }
    }

}
