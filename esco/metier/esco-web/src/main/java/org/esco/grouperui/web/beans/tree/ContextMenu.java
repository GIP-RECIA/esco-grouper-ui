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
