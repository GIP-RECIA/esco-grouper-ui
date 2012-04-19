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
package org.esco.grouperui.services.grouper.internal.wrapper;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupDetail;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;

/**
 * <b>Wrapper for group details. Convert a WsGroupDetail into GroupDetail.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001] [RECIA-ESCO-L1-007]
 * 
 * @author SopraGroup
 */
public class GroupWrapper implements IWrapper < WsGroup, Group > {

    /** UID. */
    private static final long        serialVersionUID = -3895059575901783909L;

    /** Logger for this class. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(GroupWrapper.class);

    /** Wrapper : WSGroupDetail to GroupDetail. */
    private GroupDetailWrapper       groupDetailWrapper;

    /**
     * Default constructor.
     */
    public GroupWrapper() {
    }

    /**
     * Getter for attribute <b>groupDetailWrapper</b>.
     * 
     * @return the groupDetailWrapper
     */
    public GroupDetailWrapper getGroupDetailWrapper() {
        return this.groupDetailWrapper;
    }

    /**
     * Setter for attribute <b>groupDetailWrapper</b>.
     * 
     * @param theGroupDetailWrapper
     *            : the groupDetailWrapper to set
     */
    public void setGroupDetailWrapper(final GroupDetailWrapper theGroupDetailWrapper) {
        this.groupDetailWrapper = theGroupDetailWrapper;
    }

    /**
     * {@inheritDoc}
     */
    public Group wrap(final WsGroup theObjectSource) throws ESCOWrapperException {

        Validate.notNull(theObjectSource, "the source object is undefined");

        GroupWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - start");

        Group newGroup = new Group();

        newGroup.setDescription(theObjectSource.getDescription());

        GroupDetail groupDetail = null;
        if (theObjectSource.getDetail() != null) {
            groupDetail = this.groupDetailWrapper.wrap(theObjectSource.getDetail());
        }

        newGroup.setDescription(theObjectSource.getDescription());
        newGroup.setDetail(groupDetail);
        newGroup.setDisplayExtension(theObjectSource.getDisplayExtension());
        newGroup.setDisplayName(theObjectSource.getDisplayName());
        newGroup.setExtension(theObjectSource.getExtension());
        newGroup.setName(theObjectSource.getName());
        newGroup.setIdGroup(theObjectSource.getUuid());

        GroupWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - end");

        return newGroup;
    }

}
