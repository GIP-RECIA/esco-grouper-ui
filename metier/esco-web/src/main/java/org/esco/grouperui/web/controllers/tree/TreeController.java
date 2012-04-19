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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.extension.ServiceConstants;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.property.PropertyManager;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.tree.ContextMenu;
import org.esco.grouperui.web.beans.tree.Tree;
import org.esco.grouperui.web.beans.tree.TreeNode;
import org.esco.grouperui.web.controllers.EscoSecurityContext;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.XmlProducer;

import com.google.common.collect.ArrayListMultimap;

/**
 * TreeController class is the controller of the tree service.
 * Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
public class TreeController extends AbstractControllerAware {

    /**
     * The default serial generated.
     */
    private static final long                serialVersionUID       = -7915746294276163057L;
    /**
     * The id of node request parameter.
     */
    private static final String              THE_ID_OF_NODE_REQUEST = "theIdOfNodeRequest";
    /**
     * The grouper service instance.
     */
    private IGrouperService                  grouperService;
    /**
     * The wrapper of stems.
     */
    private IWrapper < Stem, TreeNode >      wrapperStem;
    /**
     * The wrapper of group.
     */
    private IWrapper < Group, TreeNode >     wrapperGroup;

    /** wrapper for generate json from obejct. */
    private IWrapper < XmlProducer, String > jsonWrapper;

    /**
     * The menu tree service.
     */
    private IMenuTreeService                 menuTreeService;

    /**
     * Get the context menu.
     * 
     * @return The json of the context menu
     */
    public String getContextMenu() {
        ContextMenu menu = this.menuTreeService.getMenuContext();
        XmlProducer producer = new XmlProducer();
        producer.setTarget(menu);
        return this.jsonWrapper.wrap(producer);
    }

    /**
     * Get the elements of the requested node.
     * 
     * @return The child of the node.
     */
    public String getNodeElementsForm() {

        String idOfNodeRequest = this.getParam(TreeController.THE_ID_OF_NODE_REQUEST);
        if ("0".equals(idOfNodeRequest)) {
            idOfNodeRequest = ESCOConstantes.ROOT_VALUE;
        }

        String personId = EscoSecurityContext.getUserSecurity().getId();

        Tree tree = new Tree();
        /** Recovery the different result from esco-core. */

        String mode = ServiceConstants.ALL_STEM;

        /*
         * if
         * (PropertyManager.find("mode_get_stem_in_tree").deType(Boolean.class
         * )) { mode = ServiceConstants.WITH_STEM_PRIVILEGE_AND_GROUP; }
         * Activate mode with stem privilege and group or with all stem in tree
         * true for "With Stem privilege and group" false for "All stem"
         * #mode_get_stem_in_tree=false
         */
        ArrayListMultimap < Integer, Stem > stems = ArrayListMultimap.create();
        try {
            stems = this.grouperService.getAllStemsFrom(idOfNodeRequest, personId, true, mode);
        } catch (ESCOStemNotFoundException e) {
        }

        ArrayListMultimap < Integer, Group > groups = ArrayListMultimap.create();
        try {
            groups = this.grouperService.getAllGroupsFrom(idOfNodeRequest, personId);
        } catch (ESCOStemNotFoundException e) {
        }

        List < TreeNode > nodesStem = new ArrayList < TreeNode >();
        for (int i = 0; i < stems.size(); i++) {

            Stem aux = stems.get(i).get(0);
            nodesStem.add(this.wrapperStem.wrap(aux));

        }
        Collections.sort(nodesStem, new Comparator < TreeNode >() {
            public int compare(final TreeNode theO1, final TreeNode theO2) {
                return theO1.getData().getTitle().compareToIgnoreCase(theO2.getData().getTitle());
            }
        });

        List < TreeNode > nodesGroup = new ArrayList < TreeNode >();
        for (int i = 0; i < groups.size(); i++) {

            Group aux = groups.get(i).get(0);
            if (aux.getUserRight() != null) {
                nodesGroup.add(this.wrapperGroup.wrap(aux));
            }

        }
        Collections.sort(nodesGroup, new Comparator < TreeNode >() {
            public int compare(final TreeNode theO1, final TreeNode theO2) {
                return theO1.getData().getTitle().compareToIgnoreCase(theO2.getData().getTitle());
            }
        });

        Collection < TreeNode > nodes = nodesStem;
        nodes.addAll(nodesGroup);

        tree.setListOfFolderNode(nodes);

        XmlProducer producer = new XmlProducer();
        producer.setTarget(tree);
        return this.jsonWrapper.wrap(producer);

    }

    /**
     * Setter of the grouperService property.
     * 
     * @param theGrouperService
     *            the grouperService to set
     */
    public void setGrouperService(final IGrouperService theGrouperService) {
        this.grouperService = theGrouperService;
    }

    /**
     * Setter of the wrapperStem property.
     * 
     * @param theWrapperStem
     *            the wrapperStem to set
     */
    public void setWrapperStem(final IWrapper < Stem, TreeNode > theWrapperStem) {
        this.wrapperStem = theWrapperStem;
    }

    /**
     * Setter of the wrapperGroup property.
     * 
     * @param theWrapperGroup
     *            the wrapperGroup to set
     */
    public void setWrapperGroup(final IWrapper < Group, TreeNode > theWrapperGroup) {
        this.wrapperGroup = theWrapperGroup;
    }

    /**
     * Setter of the jsonWrapper property.
     * 
     * @param theJsonWrapper
     *            the jsonWrapper to set
     */
    public void setJsonWrapper(final IWrapper < XmlProducer, String > theJsonWrapper) {
        this.jsonWrapper = theJsonWrapper;
    }

    /**
     * Setter of the menuTreeService property.
     * 
     * @param theMenuTreeService
     *            the menuTreeService to set
     */
    public void setMenuTreeService(final IMenuTreeService theMenuTreeService) {
        this.menuTreeService = theMenuTreeService;
    }

    public void applyModification(final String theIndex, final String theNewValue) {
    }

    public void discardModification(final String theIndex) {
    }

    public String getAttributeKey(final String theIndex) {
        return null;
    }

    public List < String > getErrorClassesNames() {
        return null;
    }

    public List < Resume > getListResume() {
        return null;
    }

    public Status save() {
        return null;
    }

}
