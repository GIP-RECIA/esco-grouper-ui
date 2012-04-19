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
package org.esco.grouperui.services.internal;

import java.util.List;
import java.util.Map;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.GroupType;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.business.ESCOAddMemberException;
import org.esco.grouperui.exceptions.business.ESCOAttributeException;
import org.esco.grouperui.exceptions.business.ESCODeleteMemberException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotDeleteException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotMoveException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotSaveException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOStemNotDeleteException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOStemNotMoveException;
import org.esco.grouperui.exceptions.business.ESCOStemNotSaveException;
import org.esco.grouperui.exceptions.business.ESCOStemNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchStemEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import com.google.common.collect.ArrayListMultimap;

/**
 * Grouper proxy.
 * 
 * @author SopraGroup
 */
public class GrouperProxyService implements IGrouperService {
    /**
     * the serial uid.
     */
    private static final long        serialVersionUID = -7920750106970207506L;

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(GrouperProxyService.class);

    /** Service locator. */
    private IGrouperServiceLocator   serviceLocator;

    /**
     * Default constructor.
     */
    public GrouperProxyService() {
    }

    /**
     * Setter for attribute <b>serviceLocator</b>.
     * 
     * @param theServiceLocator
     *            the serviceLocator to set
     */
    public void setServiceLocator(final IGrouperServiceLocator theServiceLocator) {
        this.serviceLocator = theServiceLocator;
    }

    /**
     * Getter for attribute <b>serviceLocator</b>.
     * 
     * @return the serviceLocator
     */
    public IGrouperServiceLocator getServiceLocator() {
        return this.serviceLocator;
    }

    /**
     * {@inheritDoc}
     */
    public Person findSubjectById(final String theIdentifier) throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        GrouperProxyService.LOGGER.debug("findSubjectById(final String theIdentifier='" + theIdentifier
                + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findSubjectById").findSubjectById(theIdentifier);
    }

    /**
     * {@inheritDoc}
     */
    public List < Person > searchSubjects(final Person thePerson, final String thePath, final String theTerm) {
        GrouperProxyService.LOGGER.debug("searchSubjects(Person thePerson='" + thePerson + "', String thePath='"
                + thePath + "', String theTerm='" + theTerm + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("searchSubjects").searchSubjects(thePerson, thePath,
                theTerm);
    }

    /**
     * {@inheritDoc}
     */
    public Members findMembers(final Person thePerson, final String theGroupName,
            final List < String > theAttributes, final Map < String, SourceTypeEnum > theSources,
            final ScopeEnum theMembersScope) throws ESCOGroupNotFoundException,
            ESCOInsufficientPrivilegesException {
        GrouperProxyService.LOGGER.debug("findMembers(final Person thePerson='" + thePerson
                + "', final String theGroupName='" + theGroupName + "', final List < String > theAttributes='"
                + theAttributes + "', final Map < String, SourceTypeEnum > theSource='" + theSources
                + "', final MemberScopeEnum theMembersScope='" + theMembersScope + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findMembers").findMembers(thePerson, theGroupName,
                theAttributes, theSources, theMembersScope);
    }

    /**
     * {@inheritDoc}
     */
    public Integer countPersons(final Person thePerson, final List < String > theGroupsName,
            final Map < String, SourceTypeEnum > theSources, final ScopeEnum theMembersScope)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException {
        GrouperProxyService.LOGGER.debug("countPersons(final Person thePerson='" + thePerson
                + "', final String theGroupName='" + theGroupsName
                + "', final Map < String, SourceTypeEnum > theSource='" + theSources
                + "', final MemberScopeEnum theMembersScope='" + theMembersScope + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("countPersons").countPersons(thePerson,
                theGroupsName, theSources, theMembersScope);
    }

    /**
     * {@inheritDoc}
     */
    public void addMembers(final Person thePerson, final String theGroupName, final List < String > theMembersToAdd)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCOAddMemberException {
        GrouperProxyService.LOGGER.debug("addMembers(final Person thePerson='" + thePerson
                + "', final String theGroupName='" + theGroupName + "', final List < String > theMembersToAdd='"
                + theMembersToAdd + "') - start/end");
        this.getServiceLocator().findServiceForMethod("addMembers").addMembers(thePerson, theGroupName,
                theMembersToAdd);
    }

    /**
     * {@inheritDoc}
     */
    public void removeMembers(final Person thePerson, final String theGroupName,
            final List < String > theMembersToRemove) throws ESCOGroupNotFoundException,
            ESCOInsufficientPrivilegesException, ESCODeleteMemberException {
        GrouperProxyService.LOGGER.debug("removeMembers(final Person thePerson='" + thePerson
                + "', final String theGroupName='" + theGroupName
                + "', final List < String > theMembersToRemove='" + theMembersToRemove + "') - start/end");
        this.getServiceLocator().findServiceForMethod("removeMembers").removeMembers(thePerson, theGroupName,
                theMembersToRemove);
    }

    /**
     * {@inheritDoc}
     */
    public void removeMembers(final Person thePerson, final String theGroupName,
            final List < String > theMembersToRemove, final boolean isActAsSubject)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCODeleteMemberException {
        GrouperProxyService.LOGGER.debug("removeMembers(final Person thePerson='" + thePerson
                + "', final String theGroupName='" + theGroupName
                + "', final List < String > theMembersToRemove='" + theMembersToRemove
                + "', final boolean isActAsSubject='" + isActAsSubject + "') - start/end");
        this.getServiceLocator().findServiceForMethod("removeMembers").removeMembers(thePerson, theGroupName,
                theMembersToRemove, isActAsSubject);
    }

    /**
     * {@inheritDoc}
     */
    public void copyMembers(final Person thePerson, final String theSourceName, final String theTargetName)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCOAddMemberException {
        GrouperProxyService.LOGGER.debug("copyMembers(final Person thePerson='" + thePerson
                + "', final String theSourceName='" + theSourceName + "', final String theTargetName='"
                + theTargetName + "') - start/end");
        this.getServiceLocator().findServiceForMethod("copyMembers").copyMembers(thePerson, theSourceName,
                theTargetName);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findMemberships(final Person thePerson, final String theSubjectId,
            final ScopeEnum theMembershipsScope) throws ESCOGroupNotFoundException {
        GrouperProxyService.LOGGER.debug("findMemberships(final Person thePerson='" + thePerson
                + "', final String theSubjectId='" + theSubjectId
                + "', final MembershipScopeEnum theMembershipsScope='" + theMembershipsScope + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findMemberships").findMemberships(thePerson,
                theSubjectId, theMembershipsScope);
    }

    /**
     * {@inheritDoc}
     */
    public List < GroupType > findListTypes(final String[] theNames) {
        GrouperProxyService.LOGGER.debug("findListTypes(final String[] theNames='" + theNames + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findListTypes").findListTypes(theNames);
    }

    /**
     * {@inheritDoc}
     */
    public Map < String, GroupType > findGroupTypes(final String[] theNames) {
        GrouperProxyService.LOGGER.debug("findGroupTypes(final String[] theNames='" + theNames + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findGroupTypes").findGroupTypes(theNames);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotFoundException
     */
    public ArrayListMultimap < Integer, Stem > getAllStemsFrom(final String theParentName,
            final String thePersonId, final Boolean searchIfEmpty, final String searchMode)
            throws ESCOStemNotFoundException {
        GrouperProxyService.LOGGER.debug("getAllStemsFrom(String theParentName='" + theParentName
                + "', String thePersonId='" + thePersonId + "', String searchMode='" + searchMode
                + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("getAllStemsFrom").getAllStemsFrom(theParentName,
                thePersonId, searchIfEmpty, searchMode);
    }

    /**
     * {@inheritDoc}
     */
    public Stem findStemByUuid(final Person thePerson, final String theUuid) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException {
        GrouperProxyService.LOGGER.debug("findStemByUUID(Person thePerson='" + thePerson + "', String theUuid='"
                + theUuid + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findStemByUuid").findStemByUuid(thePerson, theUuid);
    }

    /**
     * {@inheritDoc}
     */
    public Stem findStemByName(final Person thePerson, final String theName) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException {
        GrouperProxyService.LOGGER.debug("findStemByName(final Person thePerson='" + thePerson
                + "', final String theName='" + theName + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findStemByName").findStemByName(thePerson, theName);
    }

    /**
     * {@inheritDoc}
     */
    public List < Stem > searchStems(final Person thePerson, final SearchStemEnum theField, final String theTerm,
            final String thePath) throws ESCOStemNotFoundException {
        GrouperProxyService.LOGGER.debug("searchStems(final Person thePerson='" + thePerson
                + "', final SearchStemEnum theField='" + theField + "', final String theTerm='" + theTerm
                + "', final String thePath='" + thePath + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("searchStems").searchStems(thePerson, theField,
                theTerm, thePath);
    }

    /**
     * {@inheritDoc}
     */
    public String stemCreate(final Person thePerson, final Stem theStemToCreate) throws ESCOStemNotSaveException,
            ESCOStemNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException,
            ESCOStemNotUniqueException {
        GrouperProxyService.LOGGER.debug("stemCreate(Person thePerson='" + thePerson + "', Stem theStemToCreate='"
                + theStemToCreate + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("stemCreate").stemCreate(thePerson, theStemToCreate);
    }

    /**
     * {@inheritDoc}
     */
    public void stemUpdate(final Person thePerson, final Stem theStemToUpdate) throws ESCOStemNotSaveException,
            ESCOStemNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException {
        GrouperProxyService.LOGGER.debug("stemUpdate(Person thePerson='" + thePerson + "', Stem theStemToUpdate='"
                + theStemToUpdate + "') - start/end");
        this.getServiceLocator().findServiceForMethod("stemUpdate").stemUpdate(thePerson, theStemToUpdate);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotDeleteException
     */
    public void stemDelete(final Person thePerson, final String theStemId) throws ESCOStemNotFoundException,
            ESCOInsufficientPrivilegesException, ESCOStemNotDeleteException {
        GrouperProxyService.LOGGER.debug("stemDelete(final Person thePerson='" + thePerson
                + "', final String theStemId='" + theStemId + "') - start/end");
        this.getServiceLocator().findServiceForMethod("stemDelete").stemDelete(thePerson, theStemId);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotFoundException
     */
    public ArrayListMultimap < Integer, Group > getAllGroupsFrom(final String theParentName,
            final String thePersonId) throws ESCOStemNotFoundException {
        GrouperProxyService.LOGGER.debug("getAllGroupsFrom(String theParentName='" + theParentName
                + "', String thePersonId='" + thePersonId + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("getAllGroupsFrom").getAllGroupsFrom(theParentName,
                thePersonId);
    }

    /**
     * {@inheritDoc}
     */
    public Group findGroupByUid(final Person thePerson, final String theUid) throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException {
        GrouperProxyService.LOGGER.debug("findGroupByUid(final Person thePerson='" + thePerson
                + "', final String theUid='" + theUid + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findGroupByUid").findGroupByUid(thePerson, theUid);
    }

    /**
     * {@inheritDoc}
     */
    public Group findGroupByName(final Person thePerson, final String theName) throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException {
        GrouperProxyService.LOGGER.debug("findGroupByName(final Person thePerson='" + thePerson
                + "', final String theName='" + theName + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findGroupByName")
                .findGroupByName(thePerson, theName);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findGroupsMemberOptinOptout(final Person thePerson) throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        GrouperProxyService.LOGGER.debug("findGroupsMemberOptinOptout(final Person thePerson='" + thePerson
                + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findGroupsMemberOptinOptout")
                .findGroupsMemberOptinOptout(thePerson);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > searchGroups(final Person thePerson, final SearchGroupEnum theField,
            final SearchTypeEnum theSearchType, final String thePath, final String theTerm)
            throws ESCOGroupNotFoundException {
        GrouperProxyService.LOGGER.debug("searchGroups(Person thePerson='" + thePerson
                + "', SearchGroupEnum theField='" + theField + "', SearchTypeEnum theSearchType='" + theSearchType
                + "', String thePath='" + thePath + "', String theTerm='" + theTerm + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("searchGroups").searchGroups(thePerson, theField,
                theSearchType, thePath, theTerm);
    }

    /**
     * {@inheritDoc}
     */
    public String groupCreate(final Person thePerson, final Group theGroupToCreate)
            throws ESCOGroupNotSaveException, ESCOGroupNotFoundException, ESCOAttributeException,
            ESCOInsufficientPrivilegesException, ESCOGroupNotUniqueException {
        GrouperProxyService.LOGGER.debug("groupCreate(final Person thePerson='" + thePerson
                + "', final Group theGroupToCreate='" + theGroupToCreate + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("groupCreate").groupCreate(thePerson,
                theGroupToCreate);
    }

    /**
     * {@inheritDoc}
     */
    public void groupUpdate(final Person thePerson, final Group theGroupToUpdate)
            throws ESCOGroupNotSaveException, ESCOGroupNotFoundException, ESCOAttributeException,
            ESCOInsufficientPrivilegesException {
        GrouperProxyService.LOGGER.debug("groupUpdate(final Person thePerson='" + thePerson
                + "', final Group theGroupToUpdate='" + theGroupToUpdate + "') - start/end");
        this.getServiceLocator().findServiceForMethod("groupUpdate").groupUpdate(thePerson, theGroupToUpdate);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOGroupNotDeleteException
     */
    public void groupDelete(final Person thePerson, final String theGroupId)
            throws ESCOInsufficientPrivilegesException, ESCOGroupNotFoundException, ESCOGroupNotDeleteException {
        GrouperProxyService.LOGGER.debug("groupDelete(final Person thePerson='" + thePerson
                + "', final String theGroupId='" + theGroupId + "') - start/end");
        this.getServiceLocator().findServiceForMethod("groupDelete").groupDelete(thePerson, theGroupId);
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findStemPrivileges(final Person thePerson, final String theStemName) {
        GrouperProxyService.LOGGER.debug("findStemPrivileges(Person thePerson='" + thePerson
                + "', String theStemName='" + theStemName + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findStemPrivilegesPerson").findStemPrivileges(
                thePerson, theStemName);
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findStemPrivileges(final Person thePerson, final List < String > theAttributes,
            final Map < String, SourceTypeEnum > theSources, final String theStemName,
            final ScopeEnum thePrivilegesScope) {
        GrouperProxyService.LOGGER.debug("findStemPrivileges(Person thePerson='" + thePerson
                + "', List < String > theAttributes='" + theAttributes
                + "', Map < String, SourceTypeEnum > theSources='" + theSources + "', String theStemName='"
                + theStemName + "', PrivilegeScopeEnum thePrivilegesScope='" + thePrivilegesScope
                + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findStemPrivileges").findStemPrivileges(thePerson,
                theAttributes, theSources, theStemName, thePrivilegesScope);
    }

    /**
     * {@inheritDoc}
     */
    public void assignStemPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theStemIdOn, final Privilege thePrivilege) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException, ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        GrouperProxyService.LOGGER.debug("assignStemPrivileges(final Person thePerson='" + thePerson
                + "', final String theSubjectIdTo='" + theSubjectIdTo + "', final String theStemIdOn='"
                + theStemIdOn + "', final Privilege thePrivilege='" + thePrivilege + "') start/end");
        this.getServiceLocator().findServiceForMethod("assignStemPrivileges").assignStemPrivileges(thePerson,
                theSubjectIdTo, theStemIdOn, thePrivilege);
    }

    /**
     * {@inheritDoc}
     */
    public void removeStemPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theStemIdOn, final Privilege thePrivilege) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException, ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        GrouperProxyService.LOGGER.debug("removeStemPrivileges(final Person thePerson='" + thePerson
                + "', final String theSubjectIdTo='" + theSubjectIdTo + "', final String theStemIdOn='"
                + theStemIdOn + "', final Privilege thePrivilege='" + thePrivilege + "') start/end");
        this.getServiceLocator().findServiceForMethod("removeStemPrivileges").removeStemPrivileges(thePerson,
                theSubjectIdTo, theStemIdOn, thePrivilege);
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findDefaultGroupPrivileges(final Person thePerson, final String theGroupName) {
        GrouperProxyService.LOGGER.debug("findDefaultGroupPrivileges(final Person thePerson='" + thePerson
                + "', final String theGroupName='" + theGroupName + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findDefaultGroupPrivileges")
                .findDefaultGroupPrivileges(thePerson, theGroupName);
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findGroupPrivileges(final Person thePerson, final List < String > theAttributes,
            final Map < String, SourceTypeEnum > theSources, final String theGroupName,
            final ScopeEnum thePrivilesScope) {
        GrouperProxyService.LOGGER.debug("findGroupPrivileges(final Person thePerson='" + thePerson
                + "', final List < String > theAttributes='" + theAttributes
                + "',final Map < String, SourceTypeEnum > theSources='" + theSources
                + "', final String theGroupName, final PrivilegeScopeEnum thePrivilesScope='" + thePrivilesScope
                + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findGroupPrivileges").findGroupPrivileges(thePerson,
                theAttributes, theSources, theGroupName, thePrivilesScope);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findSubjectPrivilegesGroup(final Person thePerson, final String theSubjectId,
            final ScopeEnum thePrivilegesScope) {
        GrouperProxyService.LOGGER.debug("findSubjectPrivilegesGroup(final String thePerson='" + thePerson
                + "', final String theSubjectId='" + theSubjectId
                + "', final PrivilegeScopeEnum thePrivilegesScope='" + thePrivilegesScope + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findSubjectPrivilegesGroup")
                .findSubjectPrivilegesGroup(thePerson, theSubjectId, thePrivilegesScope);
    }

    /**
     * {@inheritDoc}
     */
    public List < Stem > findSubjectPrivilegesStem(final Person thePerson, final String theSubjectId,
            final ScopeEnum thePrivilegesScope) {
        GrouperProxyService.LOGGER.debug("findSubjectPrivilegesStem(final String thePerson='" + thePerson
                + "', final String theSubjectId='" + theSubjectId
                + "', final PrivilegeScopeEnum thePrivilegesScope='" + thePrivilegesScope + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("findSubjectPrivilegesStem")
                .findSubjectPrivilegesStem(thePerson, theSubjectId, thePrivilegesScope);
    }

    /**
     * {@inheritDoc}
     */
    public void assignGroupPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theGroupIdOn, final Privilege thePrivilege) throws ESCOGroupNotUniqueException,
            ESCOGroupNotFoundException, ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        GrouperProxyService.LOGGER.debug("assignGroupPrivileges(final Person thePerson='" + thePerson
                + "', final String theSubjectIdTo='" + theSubjectIdTo + "', final String theGroupIdOn='"
                + theGroupIdOn + "', final Privilege thePrivilege='" + thePrivilege + "') - start/end");
        this.getServiceLocator().findServiceForMethod("assignGroupPrivileges").assignGroupPrivileges(thePerson,
                theSubjectIdTo, theGroupIdOn, thePrivilege);
    }

    /**
     * {@inheritDoc}
     */
    public void removeGroupPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theGroupIdOn, final Privilege thePrivilege) throws ESCOGroupNotUniqueException,
            ESCOGroupNotFoundException, ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        GrouperProxyService.LOGGER.debug("removeGroupPrivileges(final Person thePerson='" + thePerson
                + "', final String theSubjectIdTo='" + theSubjectIdTo + "', final String theGroupIdOn='"
                + theGroupIdOn + "', final Privilege thePrivilege='" + thePrivilege + "') - start/end");
        this.getServiceLocator().findServiceForMethod("removeGroupPrivileges").removeGroupPrivileges(thePerson,
                theSubjectIdTo, theGroupIdOn, thePrivilege);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotFoundException
     * @throws ESCOGroupNotFoundException
     */
    public Boolean moveGroup(final Person thePerson, final String theOriginalGroupId, final Stem theTargetStem)
            throws ESCOGroupNotMoveException, ESCOGroupNotFoundException, ESCOStemNotFoundException {
        GrouperProxyService.LOGGER.debug("moveGroup(final Person thePerson='" + thePerson
                + "', final String theOriginalGroupId='" + theOriginalGroupId + "', final Stem theTargetStem='"
                + theTargetStem + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("moveGroup").moveGroup(thePerson, theOriginalGroupId,
                theTargetStem);
    }

    /**
     * {@inheritDoc}
     */
    public GroupPrivilegeEnum getPrivilegeOnGroup(final Person thePerson, final Group theGroup)
            throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException, CloneNotSupportedException {
        GrouperProxyService.LOGGER.debug("getPrivilegeOnGroup(final Person thePerson='" + thePerson
                + "', final String theGroup='" + theGroup + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("getPrivilegeOnGroup").getPrivilegeOnGroup(thePerson,
                theGroup);
    }

    /**
     * {@inheritDoc}
     */
    public Boolean moveStem(final Person thePerson, final String theOriginalStemName, final Stem theTargetStem)
            throws ESCOStemNotMoveException, ESCOStemNotFoundException {
        GrouperProxyService.LOGGER.debug("moveStem(final Person thePerson='" + thePerson
                + "', final String theOriginalStemName='" + theOriginalStemName + "', final Stem theTargetStem='"
                + theTargetStem + "') - start/end");
        return this.getServiceLocator().findServiceForMethod("moveStem").moveStem(thePerson, theOriginalStemName,
                theTargetStem);
    }

}
