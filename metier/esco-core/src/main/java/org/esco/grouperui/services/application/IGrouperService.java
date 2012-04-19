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
package org.esco.grouperui.services.application;

import com.google.common.collect.ArrayListMultimap;
import java.io.Serializable;
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
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchStemEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;

/**
 * <b>Interface of grouper service exposed.</b>
 * 
 * @author SopraGroup
 */
public interface IGrouperService extends Serializable {

    /**
     * <b>This method retrieves a person by its id or identifier.</b>
     * 
     * @param theIdentifier
     *            the id or identifier of the subject looking for.
     * @return a person matching with the identifier
     * @throws ESCOSubjectNotFoundException
     *             if the person with this identifier is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person with this identifier is not unique.
     */
    Person findSubjectById(final String theIdentifier) throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException;

    /**
     * <b>This method searches for persons from a term.</b>
     * 
     * @param thePerson
     *            the person performing the search.
     * @param thePath
     *            the path from which the search is launched.
     * @param theTerm
     *            the full or partial term of search entered by the person.
     * @return the list of person matching with the parameters.
     */
    List < Person > searchSubjects(final Person thePerson, final String thePath, final String theTerm);

    /**
     * <b>This method finds the members (groups and/or persons) of a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupName
     *            the name of the group which we want members.
     * @param theAttributes
     *            the collection of attributes of the members which we want to
     *            retrieve.
     * @param theSources
     *            the collection of sources. These sources determine the type of
     *            members (group or person).
     * @param theMembersScope
     *            the scope of members to return (immediate, effective or both).
     * @return the members
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to see members.
     */
    Members findMembers(final Person thePerson, final String theGroupName, final List < String > theAttributes,
            final Map < String, SourceTypeEnum > theSources, final ScopeEnum theMembersScope)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException;

    /**
     * <b>This method counts the persons of a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupsName
     *            the name of the groups which we want members.
     * @param theSources
     *            the collection of sources. These sources determine the type of
     *            members (group or person).
     * @param theMembersScope
     *            the scope of members to return (immediate, effective or both).
     * @return the number of persons
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to see members.
     */
    Integer countPersons(final Person thePerson, final List < String > theGroupsName,
            final Map < String, SourceTypeEnum > theSources, final ScopeEnum theMembersScope)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException;

    /**
     * <b>Adds members to a group.</b> If the list of members is empty, nothing
     * is done and no exceptions are thrown.
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupName
     *            the name of the group on which we want to add members.
     * @param theMembersToAdd
     *            the collection of id of the members to add.
     * @throws ESCOGroupNotFoundException
     *             if the group matching the name is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to add members.
     * @throws ESCOAddMemberException
     *             if a member cannot be added. If this exception occurs no
     *             member is added.
     */
    void addMembers(final Person thePerson, final String theGroupName, final List < String > theMembersToAdd)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCOAddMemberException;

    /**
     * <b>Removes members to a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupName
     *            the name of the group on which we want to remove members.
     * @param theMembersToRemove
     *            the collection of id of the members to remove.
     * @throws ESCOGroupNotFoundException
     *             if the group matching the name is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to delete members.
     * @throws ESCODeleteMemberException
     *             if a member cannot be deleted.If this exception occurs no
     *             member is deleted.
     */
    void removeMembers(final Person thePerson, final String theGroupName, final List < String > theMembersToRemove)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCODeleteMemberException;

    /**
     * <b>Removes members to a group with the possibility to indicate the actor
     * or not.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupName
     *            the name of the group on which we want to remove members.
     * @param theMembersToRemove
     *            the collection of id of the members to remove.
     * @param isActAsSubject
     *            true if ActAsSubject is assigned, false otherwise
     * @throws ESCOGroupNotFoundException
     *             if the group matching the name is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to delete members.
     * @throws ESCODeleteMemberException
     *             if a member cannot be deleted.If this exception occurs no
     *             member is deleted.
     */
    void removeMembers(final Person thePerson, final String theGroupName,
            final List < String > theMembersToRemove, final boolean isActAsSubject)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCODeleteMemberException;

    /**
     * <b>Copies members from a group to another.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSourceName
     *            the name of the source group.
     * @param theTargetName
     *            the name of the target group.
     * @throws ESCOGroupNotFoundException
     *             if the group matching the name is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to copy members.
     * @throws ESCOAddMemberException
     *             if a member cannot be added. If this exception occurs no
     *             member is added.
     */
    void copyMembers(final Person thePerson, final String theSourceName, final String theTargetName)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCOAddMemberException;

    /**
     * <b>This method finds the memberships (groups) of a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSubjectId
     *            the id of the group or person which we want memberships.
     * @param theMembershipsScope
     *            the scope of memberships to return (immediate, effective or
     *            both).
     * @return a collection of groups.
     * @throws ESCOGroupNotFoundException
     *             if the group matching the uuid is not found.
     */
    List < Group > findMemberships(final Person thePerson, final String theSubjectId,
            final ScopeEnum theMembershipsScope) throws ESCOGroupNotFoundException;

    /**
     * <b>This method finds the custom type with names.</b>
     * 
     * @param theNames
     *            the given names based on which we want to find the custom
     *            type.
     * @return list of custom types.
     */
    List < GroupType > findListTypes(final String[] theNames);

    /**
     * <b>This method finds the custom type with names.</b>
     * 
     * @param theNames
     *            the given names based on which we want to find the custom
     *            type.
     * @return map of custom types.
     */
    Map < String, GroupType > findGroupTypes(final String[] theNames);

    /**
     * <b>This method gets all the stems from a parent stem with their
     * privileges.</b>
     * 
     * @param theParentName
     *            the name of the parent stem.
     * @param thePersonId
     *            the id of the person performing the action (the connected
     *            user).
     * @param searchIfEmpty
     *            Get the empty information or not.
     * @param searchMode
     *            The search mode, WITH_STEM_PRIVILEGE_AND_GROUP or ALL_STEM
     * @return a list of all child folders.
     * @throws ESCOStemNotFoundException
     */
    ArrayListMultimap < Integer, Stem > getAllStemsFrom(final String theParentName, final String thePersonId,
            final Boolean searchIfEmpty, final String searchMode) throws ESCOStemNotFoundException;

    /**
     * <b>This method retrieves a stem by its UUID.</b>
     * 
     * @param thePerson
     *            the person performing the action(the connected user).
     * @param theUuid
     *            the UUID of the stem to find.
     * @return the stem matching with the UUID.
     * @throws ESCOStemNotFoundException
     *             if the stem is not found.
     * @throws ESCOStemNotUniqueException
     *             if the stem is found but is not unique i.e. several stems are
     *             found.
     */
    Stem findStemByUuid(final Person thePerson, final String theUuid) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException;

    /**
     * <b>This method retrieves a stem by its name.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theName
     *            the name matching with the stem to find.
     * @return the stem matching with the name.
     * @throws ESCOStemNotFoundException
     *             if the stem cannot be found.
     * @throws ESCOStemNotUniqueException
     *             if the stem is not unique.
     */
    Stem findStemByName(final Person thePerson, final String theName) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException;

    /**
     * <b>This method searches for stems from a search criteria (display
     * extension, name or display name), a term and a path.</b>
     * 
     * @param thePerson
     *            the person performing the search
     * @param theField
     *            the search criteria (i.e. display extension, name or display
     *            name)
     * @param theTerm
     *            the full or partial term of search entered by the person.
     * @param thePath
     *            the entry point of the search (i.e. the name of a folder)
     * @return the list of stems matching with the parameters.
     * @throws ESCOStemNotFoundException
     *             exception thrown if no stem is found
     */
    List < Stem > searchStems(final Person thePerson, final SearchStemEnum theField, final String theTerm,
            final String thePath) throws ESCOStemNotFoundException;

    /**
     * <b>Creates a stem.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theStemToCreate
     *            the stem to create
     * @return the id of the stem created
     * @throws ESCOStemNotSaveException
     *             if the stem cannot be saved.
     * @throws ESCOStemNotFoundException
     *             if the stem cannot be found.
     * @throws ESCOAttributeException
     *             if the stem cannot be created due to the attribute nested in
     *             this exception.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to create the stem.
     */
    String stemCreate(final Person thePerson, final Stem theStemToCreate) throws ESCOStemNotSaveException,
            ESCOStemNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException,
            ESCOStemNotUniqueException;

    /**
     * <b>Updates a stem.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theStemToUpdate
     *            the stem to update
     * @throws ESCOStemNotSaveException
     *             if the stem cannot be saved.
     * @throws ESCOStemNotFoundException
     *             if the stem cannot be found.
     * @throws ESCOAttributeException
     *             if the stem cannot be updated due to the attribute nested in
     *             this exception.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to update the stem.
     */
    void stemUpdate(final Person thePerson, final Stem theStemToUpdate) throws ESCOStemNotSaveException,
            ESCOStemNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException;

    /**
     * <b>Deletes a stem from its UUID.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theStemId
     *            the id of the stem to delete.
     * @throws ESCOStemNotFoundException
     *             if the stem matching the uuid is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to delete the stem.
     * @throws ESCOStemNotDeleteException
     *             if an error occur during the delete operation.
     */
    void stemDelete(final Person thePerson, final String theStemId) throws ESCOStemNotFoundException,
            ESCOInsufficientPrivilegesException, ESCOStemNotDeleteException;

    /**
     * <b>This method retrieves all the groups from a parent folder with their
     * privileges.</b>
     * 
     * @param theParentName
     *            the name of the parent stem.
     * @param thePersonId
     *            the id of the person performing the action (the connected
     *            user).
     * @return a list of all child groups.
     * @throws ESCOStemNotFoundException
     */
    ArrayListMultimap < Integer, Group > getAllGroupsFrom(final String theParentName, final String thePersonId)
            throws ESCOStemNotFoundException;

    /**
     * <b>This method retrieves a group by its Uid.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theUid
     *            the uid matching with the group to find.
     * @return the group matching with the uid.
     * @throws ESCOGroupNotFoundException
     *             if the group matching uuid is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group matching uuid is not unique.
     */
    Group findGroupByUid(final Person thePerson, final String theUid) throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException;

    /**
     * <b>This method retrieves a group by its name.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theName
     *            the name matching with the group to find.
     * @return the group matching with the name.
     * @throws ESCOGroupNotFoundException
     *             if the group cannot be found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     */
    Group findGroupByName(final Person thePerson, final String theName) throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException;

    /**
     * <b>This method finds groups where the person is a member and has the
     * privilege optin and optout on this group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @return the list of groups.
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     */
    List < Group > findGroupsMemberOptinOptout(final Person thePerson) throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException;

    /**
     * <b>This method searches for groups from a search criteria (display
     * extension, name or display name), a term and an entry point.</b>
     * 
     * @param thePerson
     *            the person performing the search
     * @param theField
     *            the search criteria (i.e. display extension, name or display
     *            name)
     * @param theSearchType
     *            the type of search (i.e. simple search or search for addition)
     * @param thePath
     *            the entry point of the search (i.e. the name of a folder)
     * @param theTerm
     *            the full or partial term of search entered by the person.
     * @return the list of groups matching with the parameters.
     * @throws ESCOGroupNotFoundException
     *             exception thrown if no group is found
     */
    List < Group > searchGroups(final Person thePerson, final SearchGroupEnum theField,
            final SearchTypeEnum theSearchType, final String thePath, final String theTerm)
            throws ESCOGroupNotFoundException;

    /**
     * <b>Creates a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupToCreate
     *            the group to create
     * @return the uid of the group created
     * @throws ESCOGroupNotUniqueException
     *             if the group cannot be save.
     * @throws ESCOGroupNotFoundException
     *             if the group to save is not found.
     * @throws ESCOGroupNotSaveException
     *             if the group cannot be created due to the attribute nested in
     *             this exception.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to create the
     *             group.
     */
    String groupCreate(final Person thePerson, final Group theGroupToCreate) throws ESCOGroupNotSaveException,
            ESCOGroupNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException,
            ESCOGroupNotUniqueException;

    /**
     * <b>Updates a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupToUpdate
     *            the group to update
     * @throws ESCOGroupNotSaveException
     *             if the group cannot be save.
     * @throws ESCOGroupNotFoundException
     *             if the group to save is not found.
     * @throws ESCOAttributeException
     *             if the group cannot be updated due to the attribute nested in
     *             this exception.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to update the
     *             group.
     */
    void groupUpdate(final Person thePerson, final Group theGroupToUpdate) throws ESCOGroupNotSaveException,
            ESCOGroupNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException;

    /**
     * <b>Deletes the group from its UUID.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupId
     *            the id of the group to delete.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to delete the
     *             group.
     * @throws ESCOGroupNotFoundException
     *             if the group matching the uuid is not found.
     * @throws ESCOGroupNotDeleteException
     *             if the group matching the uuid is not deleted.
     */
    void groupDelete(final Person thePerson, final String theGroupId) throws ESCOInsufficientPrivilegesException,
            ESCOGroupNotFoundException, ESCOGroupNotDeleteException;

    /**
     * <b>This method retrieves the privileges of a person on a stem.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theStemName
     *            the name of the stem from which we want privileges.
     * @return the privileges on the stem for the person.
     */
    List < Privilege > findStemPrivileges(final Person thePerson, final String theStemName);

    /**
     * <b>This method retrieves the privileges granted on a stem.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theAttributes
     *            the collection of attributes of the subjects which we want to
     *            retrieve.
     * @param theSources
     *            the collection of sources. These sources determine the type of
     *            object associated with the privilege (group or person).
     * @param theStemName
     *            the name of the stem.
     * @param thePrivilegesScope
     *            the scope of privileges to return (immediate, effective or
     *            both).
     * @return a collection of privileges.
     */
    List < Privilege > findStemPrivileges(final Person thePerson, final List < String > theAttributes,
            final Map < String, SourceTypeEnum > theSources, final String theStemName,
            final ScopeEnum thePrivilegesScope);

    /**
     * <b>Grants/Assigns a privilege on a stem to a subject (group or
     * person).</b> For example, on the folder administration, the subject X has
     * the privilege to create a group on the stem Y. In this case, the
     * parameter stemUuidOn is Y.getUuid() and subjectIdTo is X.getId().
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSubjectIdTo
     *            the id of the subject (group or person) who the privileges are
     *            granted to.
     * @param theStemIdOn
     *            the id of the stem on which the privileges are granted.
     * @param thePrivilege
     *            the privilege to assign.
     * @throws ESCOStemNotFoundException
     *             if the stem is not found.
     * @throws ESCOStemNotUniqueException
     *             if the stem is not unique
     * @throws ESCOSubjectNotFoundException
     *             if the subejct matches with theSubjectIdTo is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to assign
     *             privileges.
     */
    void assignStemPrivileges(final Person thePerson, final String theSubjectIdTo, final String theStemIdOn,
            final Privilege thePrivilege) throws ESCOStemNotFoundException, ESCOStemNotUniqueException,
            ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException;

    /**
     * <b>Revokes/Removes a privilege on a folder to a subject (group or
     * person).</b> For example, on the folder administration, the subject X has
     * no more the privilege to create a group on the stem Y. In this case, the
     * parameter stemId is Y.getUuid() and subjectId is X.getId().
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSubjectIdTo
     *            the id of the subject (group or person) who the privileges are
     *            revoked on.
     * @param theStemIdOn
     *            the id of the stem on which the privileges are revoked to.
     * @param thePrivilege
     *            the privilege to revoke.
     * @throws ESCOStemNotFoundException
     *             if the stem is not found.
     * @throws ESCOStemNotUniqueException
     *             if the stem is not unique.
     * @throws ESCOSubjectNotFoundException
     *             if the subejct matches with theSubjectIdTo is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to revoke
     *             privileges.
     */
    void removeStemPrivileges(final Person thePerson, final String theSubjectIdTo, final String theStemIdOn,
            final Privilege thePrivilege) throws ESCOStemNotFoundException, ESCOStemNotUniqueException,
            ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException;

    /**
     * <b>This method returns the default privileges of a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroupName
     *            the name of the group on which we want the default privileges.
     * @return the collection of default privileges.
     */
    List < Privilege > findDefaultGroupPrivileges(final Person thePerson, final String theGroupName);

    /**
     * <b>This method finds the privileges granted on a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theAttributes
     *            the collection of attributes of the subjects which we want to
     *            retrieve.
     * @param theSources
     *            the collection of sources. These sources determine the type of
     *            object associated with the privilege (group or person).
     * @param theGroupName
     *            the name of the group.
     * @param thePrivilesScope
     *            the scope of privileges to return (immediate, effective or
     *            both).
     * @return a collection of privileges.
     */
    List < Privilege > findGroupPrivileges(final Person thePerson, final List < String > theAttributes,
            final Map < String, SourceTypeEnum > theSources, final String theGroupName,
            final ScopeEnum thePrivilesScope);

    /**
     * <b>Grants/Assigns a privilege on a group to a subject (group or
     * person).</b><br>
     * For example, the group X has the privilege Admin on the group Y. <br>
     * On the administration page of the group Y, the group X is displayed in
     * the table. So the method is called with groupIdTo = X.getId() and
     * groupIdOn = Y.getId(). <br>
     * On the properties page of the group X, the group Y is displayed in the
     * table. So the method is called with groupIdTo = X.getId() and groupIdOn =
     * Y.getId().
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSubjectIdTo
     *            the id of the subject (group or person) who the privileges are
     *            granted to.
     * @param theGroupIdOn
     *            the id of the group on which the privileges are granted.
     * @param thePrivilege
     *            the privilege to assign.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     * @throws ESCOGroupNotFoundException
     *             if a group is not found.
     * @throws ESCOSubjectNotFoundException
     *             if the subejct matches with theSubjectIdTo is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to grant privilege.
     */
    void assignGroupPrivileges(final Person thePerson, final String theSubjectIdTo, final String theGroupIdOn,
            final Privilege thePrivilege) throws ESCOGroupNotUniqueException, ESCOGroupNotFoundException,
            ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException;

    /**
     * <b>Revokes/Removes a privilege on a group to subject (group or
     * person).</b> For example, the group X has the privilege Admin on the
     * group Y. So the method is called with groupIdTo = X.getId() and groupIdOn
     * = Y.getId(). <br>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSubjectIdTo
     *            the id of the subject (group or person) who the privileges are
     *            revoked to.
     * @param theGroupIdOn
     *            the id of the group on which the privileges are revoked.
     * @param thePrivilege
     *            the privilege to revoke.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     * @throws ESCOGroupNotFoundException
     *             if a group is not found.
     * @throws ESCOSubjectNotFoundException
     *             if the subejct matches with theSubjectIdTo is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to revoke
     *             privilege.
     */
    void removeGroupPrivileges(final Person thePerson, final String theSubjectIdTo, final String theGroupIdOn,
            final Privilege thePrivilege) throws ESCOGroupNotUniqueException, ESCOGroupNotFoundException,
            ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException;

    /**
     * <b>This method returns a list of groups whose subject passed as a
     * parameter has privileges granted on.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSubjectId
     *            the id of the subject (group or person) which we want
     *            privileges.
     * @param thePrivilegesScope
     *            the scope of privileges to return (immediate, effective or
     *            both).
     * @return a list of groups whose subject passed as a parameter has
     *         privileges granted on.
     */
    List < Group > findSubjectPrivilegesGroup(final Person thePerson, final String theSubjectId,
            final ScopeEnum thePrivilegesScope);

    /**
     * <b>This method returns a list of stems whose subject passed as a
     * parameter has privileges granted on.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSubjectId
     *            the id of the subject (group or person) which we want
     *            privileges.
     * @param thePrivilegesScope
     *            the scope of privileges to return (immediate, effective or
     *            both).
     * @return a list of stems whose group passed as a parameter has privileges
     *         granted on.
     */
    List < Stem > findSubjectPrivilegesStem(final Person thePerson, final String theSubjectId,
            final ScopeEnum thePrivilegesScope);

    /**
     * Move a group to a new stem. Grouper does not allow moving directly. So it
     * is by creating a group, identical to the original (attributes, default
     * privileges, members, memberships, privileges) in the target folder and
     * then delete the original group. If any error occurs performing the moving
     * of the group, the new group is deleted before throwing the exception.
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theOriginalGroupId
     *            the id of the original group.
     * @param theTargetStem
     *            the target folder.
     * @return the id of the new group in the target folder.
     * @throws ESCOGroupNotMoveException
     *             if any error occurs performing the moving of the group.
     * @throws ESCOGroupNotFoundException
     *             if the group is not founded.
     * @throws ESCOStemNotFoundException
     *             if the stem is not founded
     */
    Boolean moveGroup(final Person thePerson, final String theOriginalGroupId, final Stem theTargetStem)
            throws ESCOGroupNotMoveException, ESCOGroupNotFoundException, ESCOStemNotFoundException;

    /**
     * Get the privilege on the group of the person.
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroup
     *            the group to get rights.
     * @return the privilege of the person on the group.
     * @throws ESCOGroupNotFoundException
     *             If the group does not exists.
     * @throws ESCOGroupNotUniqueException
     *             If the group is not unique.
     * @throws CloneNotSupportedException
     *             if an error occurs during the clone of the group
     */
    GroupPrivilegeEnum getPrivilegeOnGroup(final Person thePerson, final Group theGroup)
            throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException, CloneNotSupportedException;

    /**
     * Move a stem to a new stem.
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theOriginalStemName
     *            the name of the original stem.
     * @param theTargetStem
     *            the target folder.
     * @return true if no error.
     * @throws ESCOStemNotMoveException
     *             if any error occurs performing the moving of the stem.
     * @throws ESCOStemNotFoundException
     *             if the stem is not founded
     */
    Boolean moveStem(final Person thePerson, final String theOriginalStemName, final Stem theTargetStem)
            throws ESCOStemNotMoveException, ESCOStemNotFoundException;
}
