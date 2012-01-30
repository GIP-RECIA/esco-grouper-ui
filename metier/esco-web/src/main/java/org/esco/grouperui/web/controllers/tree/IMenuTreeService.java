package org.esco.grouperui.web.controllers.tree;

import org.esco.grouperui.web.beans.tree.ContextMenu;

/**
 * IMenuTreeService interface. Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
public interface IMenuTreeService {

    /**
     * Get the context menu.
     * 
     * @return The TreeNode request
     */
    ContextMenu getMenuContext();
}
