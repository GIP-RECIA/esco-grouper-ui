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
/**
 * ESUP-Portail Commons - Copyright (c) 2006-2009 ESUP-Portail consortium.
 */
package org.esupportail.commons.web.beans; 

import org.apache.myfaces.custom.tree2.TreeNode;

/** 
 * The model of a tree able to set the node identifiers.
 */ 
public class TreeModelBase extends org.apache.myfaces.custom.tree2.TreeModelBase {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 6839340913523565161L;

	/**
	 * The root node.
	 */
	private TreeNode rootNode;

	/**
	 * Bean constructor.
	 * @param root
	 */
	public TreeModelBase(final TreeNode root) {
		super(root);
		rootNode = root;
		setNodeIdentifiers();
	}
	
	/**
	 * Set the identifiers of the nodes of a hierarchy.
	 * @param node
	 * @param id
	 */
	private void setChildrenIdentifiers(final TreeNode node, final String id) {
		for (int i = 0; i < node.getChildCount(); i++) {
			TreeNode child = (TreeNode) (node.getChildren().get(i));
			String childId = id + SEPARATOR + i;
			child.setIdentifier(childId);
			setChildrenIdentifiers(child, childId);
		}
	}
	
	/**
	 * Set the identifiers of all the nodes of the tree.
	 */
	protected void setNodeIdentifiers() {
		rootNode.setIdentifier("0");
		setChildrenIdentifiers(rootNode, "0");
	}
	
}

