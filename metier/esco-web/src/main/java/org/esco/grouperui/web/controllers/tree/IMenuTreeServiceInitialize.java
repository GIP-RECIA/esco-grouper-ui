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

import org.esco.grouperui.web.beans.tree.ContextMenuItem;

/**
 * defini setter for new entry in tree context menu.
 * 
 * @author dMoulron
 */
public interface IMenuTreeServiceInitialize {

    /**
     * Setter of the menuEntry property.
     * 
     * @param theMenuEntry
     *            the menuEntry to set
     */
    void setMenuEntry(final Map < String, ContextMenuItem > theMenuEntry);

}
