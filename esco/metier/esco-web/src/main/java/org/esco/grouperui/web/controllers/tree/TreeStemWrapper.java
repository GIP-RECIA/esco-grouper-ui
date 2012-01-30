package org.esco.grouperui.web.controllers.tree;

import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.property.PropertyManager;
import org.esco.grouperui.web.beans.tree.Attributes;
import org.esco.grouperui.web.beans.tree.TreeNode;
import org.esco.grouperui.web.beans.tree.ViewData;

/**
 * The TreeStemWrapper class. Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
public class TreeStemWrapper implements IWrapper < Stem, TreeNode > {

    /**
     * Default generated uid.
     */
    private static final long   serialVersionUID = -3455662171996086494L;

    /** Type folder. */
    private static final String FOLDER           = "FOLDER";

    /** If an user have no right on folder. */
    private static final String FOLDER_NONE      = "NONE";

    /** If an user can create group on folder. */
    private static final String FOLDER_GROUP     = "GROUP";

    /** If an user can create group or folder on folder. */
    private static final String FOLDER_ALL       = "ALL";

    /** State closed of the folder in the tree. */
    private static final String CLOSED           = "closed";

    /** If an user can create folder on folder. */
    private static final String FOLDER_RIGHT     = "FOLDER";

    /**
     * Default constructor.
     */
    public TreeStemWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public TreeNode wrap(final Stem theObjectSource) throws ESCOWrapperException {

        TreeNode treeFolder = new TreeNode();

        Attributes attributes = new Attributes();
        attributes.setId(theObjectSource.getUuid());
        attributes.setName(theObjectSource.getName());
        attributes.setDisplayName(theObjectSource.getDisplayName());
        attributes.setIsEmpty(theObjectSource.getIsEmpty().toString());

        if (theObjectSource.getHasStem()) {
            if (theObjectSource.getHasCreate()) {
                attributes.setRight(TreeStemWrapper.FOLDER_ALL);
            } else {
                attributes.setRight(TreeStemWrapper.FOLDER_RIGHT);
            }
        } else {
            if (theObjectSource.getHasCreate()) {
                attributes.setRight(TreeStemWrapper.FOLDER_GROUP);
            } else {
                attributes.setRight(TreeStemWrapper.FOLDER_NONE);
            }
        }
        attributes.setType(TreeStemWrapper.FOLDER);

        treeFolder.setAttributes(attributes);
        treeFolder.setData(this.getViewDataFormatted(theObjectSource));
        treeFolder.setState(TreeStemWrapper.CLOSED);

        return treeFolder;
    }

    /**
     * Return the ViewData formatted from theFolder.
     * 
     * @param theFolder
     *            The folder.
     * @return the ViewData
     */
    private ViewData getViewDataFormatted(final Stem theFolder) {

        ViewData viewData = new ViewData();
        viewData.setTitle(theFolder.getDisplayExtension());

        if (theFolder.getHasStem()) {
            if (theFolder.getHasCreate()) {
                viewData.setIcon(PropertyManager.find("folderAll").deType(String.class));
            } else {
                viewData.setIcon(PropertyManager.find("folderCreateFolder").deType(String.class));
            }

        } else {
            if (theFolder.getHasCreate()) {
                viewData.setIcon(PropertyManager.find("folderCreateGroup").deType(String.class));
            } else {
                // Icon if no right
                viewData.setIcon(PropertyManager.find("folderNone").deType(String.class));
            }
        }

        return viewData;
    }
}
