package org.esco.grouperui.web.beans.tree;

import java.util.Collection;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * TreeNode Class. Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */

@XmlRootElement
public class Tree {

    /** The list of nodes from the node request. */
    private Collection < TreeNode > listOfFolderNode;

    /**
     * Default Constructor.
     */
    public Tree() {
    }

    /**
     * Setter of the listOfNode property.
     * 
     * @param theListOfFolderNode
     *            the list of folder node to set
     */
    public void setListOfFolderNode(final Collection < TreeNode > theListOfFolderNode) {
        this.listOfFolderNode = theListOfFolderNode;
    }

    /**
     * @return the list of node.
     */
    @XmlElement(name = "elements", type = TreeNode.class)
    public Collection < TreeNode > getListOfFolderNode() {
        return this.listOfFolderNode;
    }

}
