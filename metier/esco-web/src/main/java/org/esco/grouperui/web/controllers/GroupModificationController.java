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
package org.esco.grouperui.web.controllers;

import java.util.Iterator;

import javax.faces.context.FacesContext;

import org.apache.commons.lang.StringUtils;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOStemNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.XMLResultString;
import org.esco.grouperui.web.plugins.ITabController;
import org.esco.grouperui.web.utils.FaceContextUtils;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class GroupController. Requirement(s): <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class GroupModificationController extends AbstractGroupController {

    /**
     * serialVersionUID.
     */
    private static final long   serialVersionUID   = 8214422254105871316L;

    /**
     * the id of spring declaration.
     */
    private static final String TABS_CONTROLLER_ID = "groupModificationsController";

    /** Get Parameter : stemUuid. */
    private static final String PARAM_STEM_UUID    = "stemUuid";

    /**
     * Default constructor.
     */
    public GroupModificationController() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getTabsControllerId() {
        return GroupModificationController.TABS_CONTROLLER_ID;
    }

    /**
     * method can be ovverided by parent class to add variable in face context
     * that can be used in evaluation of tabs.
     * 
     * @param theFacesContext
     *            The face context.
     */
    public void doAddVariableToContext(final FacesContext theFacesContext) {
        FaceContextUtils.addVariableToContext(theFacesContext, "group", this.getGroup());
    }

    /**
     * Initialize the parameters.
     * 
     * @return the result of query.
     * @throws ESCOGroupNotFoundException
     *             if the current group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the current group is not unique.
     * @throws ESCOStemNotFoundException
     *             if the parent stem is not found.
     * @throws ESCOStemNotUniqueException
     *             if the parent stem is not unique.
     */
    public boolean getInitParameters() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            ESCOStemNotFoundException, ESCOStemNotUniqueException {
        this.initGroupAttributes();
        return true;
    }

    /**
     * Initialization of the group.
     * 
     * @throws ESCOGroupNotFoundException
     *             if the current group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the current group is not unique.
     * @throws ESCOStemNotFoundException
     *             if the parent stem is not found.
     * @throws ESCOStemNotUniqueException
     *             if the parent stem is not unique.
     */
    @Override
    public void initGroupAttributes() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            ESCOStemNotFoundException, ESCOStemNotUniqueException {
        boolean needCacheSession = ESCOConstantes.TREE_FROM_CALL.equals(this.fromCall());
        if (needCacheSession) {
            this.clearModification();
        }
        if (this.group == null || needCacheSession) {

            Person person = null;
            try {
                person = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e1) {
            } catch (ESCOSubjectNotUniqueException e1) {
            }

            this.parentStem = null;

            if (ESCOConstantes.TRUE.equals(this.getParam(ESCOConstantes.PARAM_CREATION_CALL))) {
                this.creation = Boolean.TRUE;
                this.group = new Group();
                this.group.init();

            } else {
                this.creation = Boolean.FALSE;
                if (!StringUtils.isEmpty(this.getGroupUuid())) {
                    this.setGroup(this.getGrouperService().findGroupByUid(person, this.getGroupUuid()));
                }
            }

            if (this.creation) {
                String stemUuid = this.getParam(GroupModificationController.PARAM_STEM_UUID);
                if (!StringUtils.isEmpty(stemUuid)) {
                    this.parentStem = this.getGrouperService().findStemByUuid(person, stemUuid);
                }
            } else {
                String parentName = "";
                if (this.group.getName().indexOf(":") != -1) {
                    parentName = this.group.getName().substring(0,
                            this.group.getName().indexOf(":" + this.group.getExtension()));
                } else {
                    parentName = ESCOConstantes.STEM_NAME_SEPARATOR;
                }

                if (!StringUtils.isEmpty(parentName)) {
                    this.parentStem = this.getGrouperService().findStemByName(person, parentName);
                }
            }
        }
    }

    /**
     * Check if we are in creation.
     * 
     * @return true if one is being created, false else.
     */
    public boolean getIsCreation() {
        return this.creation;
    }

    /**
     * Allow to save the modification on a group.
     * 
     * @return the xml status (true / false).
     */
    @Override
    public String saveGroup() {
        Iterator < ITabController > controller = this.tabControllers.iterator();
        Status status = null;
        String result = null;
        String groupId = null;

        // Reinitialize the previous errors
        this.errors.clear();

        while (controller.hasNext()) {
            ITabController iGroupController = controller.next();

            status = iGroupController.save();
            if (null != status.getStatus() && !status.getStatus()) {
                this.errors = iGroupController.getErrorClassesNames();
                break;
            }
        }

        this.saveCall = Boolean.TRUE;

        groupId = this.group.getIdGroup();

        // Clear modifications for all the controllers if no error happened
        if (this.errors.isEmpty()) {
            // Set the result
            result = groupId;
            // Clear the modifications
            this.clearModification();
            // Unset the current parentStem
            this.parentStem = null;
            // Unset the current group
            this.group = null;

            this.creation = Boolean.FALSE;
        } else {
            // Set the result to false
            result = "false";
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new XMLResultString(result));
        producer.setTypesOfTarget(XMLResultString.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Retrieve the stemUuid from the parentStem.
     * 
     * @return the stemUuid.
     */
    public String getStemUuid() {
        String uuid = "";

        if (null != this.parentStem) {
            uuid = this.parentStem.getUuid();
        }

        return uuid;
    }

    /**
     * Get the parent stem.
     * 
     * @return the parent stem.
     */
    public Stem getParentStem() {
        return this.parentStem;
    }
}
