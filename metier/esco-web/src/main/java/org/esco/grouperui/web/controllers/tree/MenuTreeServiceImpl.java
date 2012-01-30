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
