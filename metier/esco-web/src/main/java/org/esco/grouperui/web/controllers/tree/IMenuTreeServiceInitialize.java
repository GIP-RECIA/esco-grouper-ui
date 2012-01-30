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
