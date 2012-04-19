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
 * 
 * @author Benjamin
 *
 */
public class TransientTreeModelBase extends TreeModelBase {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = -7342900258702215016L;

    /**
     * Bean constructor.
     * @param root
     */
    public TransientTreeModelBase(final TreeNode root) {
        super(root);
        setTreeState(new TransientTreeStateBase());
    }
    
    /**
     * @return the active node of the tree
     */
    public TreeNode getActiveNode() {
    	TransientTreeStateBase myTreeState = (TransientTreeStateBase) getTreeState();
    	String nodeId = myTreeState.getActiveNodeId();
    	return getNodeById(nodeId);
    }

    /**
     * Set the active node.
     * @param nodeId
     */
    public void setActiveNode(final String nodeId) {
    	TransientTreeStateBase myTreeState = (TransientTreeStateBase) getTreeState();
    	String[] nodePath = getPathInformation(nodeId);
    	String id = "";
    	for (String string : nodePath) {
			id += " " + string;
		}
    	myTreeState.expandPath(nodePath);
    }

}
