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

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.business.ESCOAddMemberException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotDeleteException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.web.utils.I18nExceptionAdapter;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Manage the delete group option and the copy of members.
 * 
 * @author aChesneau
 */
public class GroupDeleteOrCopyMembersController extends AbstractContextAwareController {

    /**
     * The default generated uid.
     */
    private static final long                serialVersionUID          = -7232918608239009404L;

    /** Get Parameter : groupUuid. */
    private static final String              PARAM_GROUP_UUID          = "groupUuid";

    /** Get Parameter : groupDestName */
    private static final String              PARAM_GROUP_DEST          = "groupDestName";

    /** Get Parameter : groupOriginName */
    private static final String              PARAM_GROUP_ORIGIN        = "groupOriginName";

    /** The group. */
    private Group                            group;

    /** The GrouperService that provide services from grouper. */
    private IGrouperService                  grouperService;

    /** The xmlProducer wrapper. */
    private IWrapper < XmlProducer, String > xmlProducerWrapper;

    /**
     * The default message exception/
     */
    private static final String              DEFAULT_MESSAGE_EXCEPTION = "DEFAULT_MESSAGE_EXCEPTION";

    /**
     * @return always true. this getter is only for jsf call.
     * @throws ESCOGroupNotFoundException
     *             if the current group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the current group is not unique.
     * @throws CloneNotSupportedException
     *             If the clone of the group failed.
     */
    public boolean getInitParameters() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            CloneNotSupportedException {
        this.initGroupAttributes();
        return true;
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOGroupNotUniqueException
     * @throws ESCOGroupNotFoundException
     * @throws CloneNotSupportedException
     */
    public void initGroupAttributes() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            CloneNotSupportedException {
        this.group = null;

        Person person = null;
        try {
            person = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e1) {
        } catch (ESCOSubjectNotUniqueException e1) {
        }

        if (!StringUtils.isEmpty(this.getGroupUuid())) {
            this.group = this.grouperService.findGroupByUid(person, this.getGroupUuid());
        }

    }

    /**
     * Delete the group.
     * 
     * @return the result of the delete operation.
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     * @throws ESCOGroupNotUniqueException
     * @throws ESCOGroupNotFoundException
     * @throws CloneNotSupportedException
     */
    public String deleteGroup() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException,
            ESCOGroupNotFoundException, ESCOGroupNotUniqueException, CloneNotSupportedException {
        String theGroupId = this.group.getIdGroup();
        Validate.notNull(theGroupId);

        String theError = "";
        Person userConnected = PersonController.getConnectedPerson();
        try {
            this.grouperService.groupDelete(userConnected, theGroupId);
        } catch (ESCOInsufficientPrivilegesException e) {
            theError = e.getClass().getSimpleName();
        } catch (ESCOGroupNotFoundException e) {
            theError = e.getClass().getSimpleName();
        } catch (ESCOGroupNotDeleteException e) {
            theError = e.getClass().getSimpleName();
        }

        XmlProducer producer = new XmlProducer();
        if ("".equals(theError)) {
            producer.setTarget(new org.esco.grouperui.web.beans.Error(true, ""));
        } else {
            // Get the internationalized message and if not exist the default
            // value.
            theError = I18nExceptionAdapter.getExceptionString(this.getI18nService(), theError,
                    GroupDeleteOrCopyMembersController.DEFAULT_MESSAGE_EXCEPTION);
            producer.setTarget(new org.esco.grouperui.web.beans.Error(false, theError));
        }
        producer.setTypesOfTarget(org.esco.grouperui.web.beans.Error.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Copy the member of a group to another group.
     * 
     * @return the result of the copy operation.
     * @throws ESCOSubjectNotUniqueException
     *             if the subject is not unique.
     * @throws ESCOSubjectNotFoundException
     *             if the subject is not found.
     * @throws ESCOGroupNotUniqueException
     * @throws ESCOGroupNotFoundException
     */
    public String copyGroupMembers() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException,
            ESCOGroupNotFoundException, ESCOGroupNotUniqueException {
        String theGroupOrigin = this.getParam(GroupDeleteOrCopyMembersController.PARAM_GROUP_ORIGIN);
        String theGroupDest = this.getParam(GroupDeleteOrCopyMembersController.PARAM_GROUP_DEST);
        Validate.notNull(theGroupOrigin);
        Validate.notNull(theGroupDest);
        String theError = "";
        Person userConnected = PersonController.getConnectedPerson();

        try {
            this.grouperService.copyMembers(userConnected, theGroupOrigin, theGroupDest);
        } catch (ESCOAddMemberException e) {
            theError = e.getClass().getSimpleName();
        } catch (ESCOInsufficientPrivilegesException e) {
            theError = e.getClass().getSimpleName();
        }

        XmlProducer producer = new XmlProducer();
        if ("".equals(theError)) {
            producer.setTarget(new org.esco.grouperui.web.beans.Error(true, ""));
        } else {
            // Get the internationalized message and if not exist the default
            // value.
            theError = I18nExceptionAdapter.getExceptionString(this.getI18nService(), theError,
                    GroupDeleteOrCopyMembersController.DEFAULT_MESSAGE_EXCEPTION);
            producer.setTarget(new org.esco.grouperui.web.beans.Error(false, theError));
        }
        producer.setTypesOfTarget(org.esco.grouperui.web.beans.Error.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Allow to retrieve the display name of the group.
     * 
     * @return the display name of the group.
     */
    public String getDisplayName() {
        String result = null;

        if (this.group != null) {
            result = this.group.getDisplayName();
        } else
            if (this.getParam("displayName") != null) {
                result = this.getParam("displayName");
            }
        return result;
    }

    /**
     * Retrieve the groupUuid from the request.
     * 
     * @return the groupUuid.
     */
    public String getGroupUuid() {
        return this.getParam(GroupDeleteOrCopyMembersController.PARAM_GROUP_UUID);
    }

    /**
     * Check if need to redirect to parent.
     * 
     * @return true if need redirection to parent, false otherwise.
     */
    public String getNeedToRedirectToParent() {
        return this.getParam("needToRedirect");
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
     * Setter of the xmlProducerWrapper property.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set
     */
    public void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
    }

}
