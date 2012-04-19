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
package org.esco.grouperui.services.grouper.internal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupDetail;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.GroupType;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.StemPrivilegeEnum;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.exceptions.business.ESCOAddMemberException;
import org.esco.grouperui.exceptions.business.ESCOAttributeException;
import org.esco.grouperui.exceptions.business.ESCODeleteMemberException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotMoveException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotSaveException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOStemNotMoveException;
import org.esco.grouperui.exceptions.business.ESCOStemNotSaveException;
import org.esco.grouperui.exceptions.business.ESCOStemNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.ESCOConstantes;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.PrivilegeSearchEnum;
import org.esco.grouperui.services.application.filters.PrivilegeTypeEnum;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchStemEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.esco.grouperui.services.extension.ServiceConstants;
import org.esco.grouperui.services.grouper.internal.utils.EscoGrouperHelper;
import org.esco.grouperui.services.grouper.strategy.search.IStrategyGroupSearch;
import org.esco.grouperui.services.grouper.strategy.search.IStrategySubjectSearch;
import org.esco.grouperui.services.grouper.strategy.search.locator.IStrategyGroupSearchLocator;
import org.esco.grouperui.services.grouper.strategy.search.locator.IStrategySubjectSearchLocator;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.property.PropertyManager;

import com.google.common.collect.ArrayListMultimap;

import edu.emory.mathcs.backport.java.util.Arrays;
import edu.internet2.middleware.grouper.GroupFinder;
import edu.internet2.middleware.grouper.GroupMove;
import edu.internet2.middleware.grouper.GroupSave;
import edu.internet2.middleware.grouper.GroupTypeFinder;
import edu.internet2.middleware.grouper.GrouperSession;
import edu.internet2.middleware.grouper.Member;
import edu.internet2.middleware.grouper.MemberFinder;
import edu.internet2.middleware.grouper.Membership;
import edu.internet2.middleware.grouper.StemFinder;
import edu.internet2.middleware.grouper.StemMove;
import edu.internet2.middleware.grouper.StemSave;
import edu.internet2.middleware.grouper.SubjectFinder;
import edu.internet2.middleware.grouper.Stem.Scope;
import edu.internet2.middleware.grouper.exception.GrantPrivilegeException;
import edu.internet2.middleware.grouper.exception.GroupDeleteException;
import edu.internet2.middleware.grouper.exception.GroupModifyException;
import edu.internet2.middleware.grouper.exception.GroupNotFoundException;
import edu.internet2.middleware.grouper.exception.InsufficientPrivilegeException;
import edu.internet2.middleware.grouper.exception.MemberAddException;
import edu.internet2.middleware.grouper.exception.MemberDeleteException;
import edu.internet2.middleware.grouper.exception.QueryException;
import edu.internet2.middleware.grouper.exception.SchemaException;
import edu.internet2.middleware.grouper.exception.SessionException;
import edu.internet2.middleware.grouper.exception.StemAddException;
import edu.internet2.middleware.grouper.exception.StemDeleteException;
import edu.internet2.middleware.grouper.exception.StemModifyException;
import edu.internet2.middleware.grouper.exception.StemNotFoundException;
import edu.internet2.middleware.grouper.hibernate.GrouperTransaction;
import edu.internet2.middleware.grouper.hibernate.GrouperTransactionHandler;
import edu.internet2.middleware.grouper.internal.dao.GroupDAO;
import edu.internet2.middleware.grouper.internal.dao.GrouperDAOException;
import edu.internet2.middleware.grouper.misc.GrouperDAOFactory;
import edu.internet2.middleware.grouper.misc.SaveMode;
import edu.internet2.middleware.grouper.privs.AccessPrivilege;
import edu.internet2.middleware.grouper.privs.NamingPrivilege;
import edu.internet2.middleware.grouper.privs.PrivilegeHelper;
import edu.internet2.middleware.grouper.subj.LazySubject;
import edu.internet2.middleware.subject.Subject;
import edu.internet2.middleware.subject.SubjectNotFoundException;
import edu.internet2.middleware.subject.SubjectNotUniqueException;

/**
 * <b>Service API implementation.</b>
 * 
 * @author SopraGroup Une modification de grouperServiceApi d'origine v2.6.06
 *         pour tester une acceleration possible de l'affichage de l'arbre des
 *         groupes seulement la methode getAllStemsFrom(final String
 *         theParentName sera modifiée. Les modifications sont marquées par //
 *         pl P.Legay
 */
public class GrouperServiceApi implements IGrouperService {

    /** UID. */
    private static final long                                                  serialVersionUID = 7867717609418726754L;

    /** Wrapper : Subject to Person. */
    private IWrapper < edu.internet2.middleware.subject.Subject, Person >      personWrapper;

    /** Strategy locator. **/
    private IStrategySubjectSearchLocator                                      strategyLocator;

    /** Strategy locator. **/
    private IStrategyGroupSearchLocator                                        strategyGroupLocator;

    /** Wrapper: GroupType API to GroupType. */
    private IWrapper < edu.internet2.middleware.grouper.GroupType, GroupType > groupTypeWrapper;

    /** Wrapper: group API to group. */
    private IWrapper < edu.internet2.middleware.grouper.Group, Group >         groupAPIWrapper;

    /** Wrapper: stem API to stem. */
    private IWrapper < edu.internet2.middleware.grouper.Stem, Stem >           stemAPIWrapper;

    private final IESCOLogger                                                  LOGGER           = ESCOLoggerFactory
                                                                                                        .getLogger(GrouperServiceApi.class);

    /**
     * Default constructor.
     */
    public GrouperServiceApi() {
    }

    /**
     * {@inheritDoc}
     */
    public Person findSubjectById(final String theIdentifier) throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        Validate.notNull(theIdentifier, "The identifier must be defined");
        // long timeTotal = 0;
        edu.internet2.middleware.subject.Subject subject = null;
        try {
            // long deb = System.currentTimeMillis();
            subject = SubjectFinder.findByIdOrIdentifier(theIdentifier, true);
            // timeTotal = System.currentTimeMillis() - deb;
            // Log to calculate time of service
            // this.LOGGER.error("findSubjectById;" + timeTotal);
        } catch (SubjectNotFoundException e) {
            throw new ESCOSubjectNotFoundException(ServiceConstants.SUBJECT_NOT_FOUND, e);
        } catch (SubjectNotUniqueException e) {
            throw new ESCOSubjectNotUniqueException(ServiceConstants.SUBJECT_NOT_UNIQUE, e);
        }

        return this.getPersonWrapper().wrap(subject);
    }

    /**
     * {@inheritDoc}
     */
    public List < Person > searchSubjects(final Person thePerson, final String thePath, final String theTerm) {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(thePath, ServiceConstants.THE_PATH_MUST_BE_DEFINED);
        Validate.notNull(theTerm, ServiceConstants.THE_TERM_MUST_BE_DEFINED);

        IStrategySubjectSearch strategy = this.getStrategyLocator().locate(thePerson, thePath, theTerm);
        if (strategy == null) {
            throw new ESCOTechnicalException(ServiceConstants.STRATEGY_NOT_FOUND);
        }
        return strategy.searchSubjects(thePerson, thePath, theTerm);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findMemberships(final Person thePerson, final String theSubjectId,
            final ScopeEnum theMembershipsScope) throws ESCOGroupNotFoundException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theSubjectId, ServiceConstants.THE_SUBJECT_MUST_BE_DEFINED);
        Validate.notNull(theMembershipsScope, ServiceConstants.THE_SCOPE_MUST_BE_DEFINED);
        // long timeTotal = 0;
        // this list is the result and it is modified in the method
        // callbackGrouperTransaction
        final List < Group > groupsAsMemberhips = new ArrayList < Group >();

        GrouperSession session = null;
        edu.internet2.middleware.subject.Subject person = null;
        try {
            // long deb = System.currentTimeMillis();
            session = GrouperSession.start(SubjectFinder.findById(thePerson.getId(), true));
            person = SubjectFinder.findById(theSubjectId, true);
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
            throw new ESCOTechnicalException(ServiceConstants.SUBJECT_NOT_FOUND, e);
        } catch (SubjectNotUniqueException e) {
            throw new ESCOTechnicalException(ServiceConstants.SUBJECT_NOT_UNIQUE, e);
        }

        try {
            final GrouperSession grouperSession = session;
            final Subject subject = person;
            final IWrapper < edu.internet2.middleware.grouper.Group, Group > grouperApiWrapper = this.groupAPIWrapper;

            // start a transaction
            // long deb = System.currentTimeMillis();
            GrouperTransaction.callbackGrouperTransaction(new GrouperTransactionHandler() {
                public Object callback(final GrouperTransaction grouperTransaction) throws GrouperDAOException {
                    Member member = MemberFinder.findBySubject(grouperSession, subject, true);
                    Set < Membership > memberships = null;
                    if (ScopeEnum.IMMEDIATE.equals(theMembershipsScope)) {
                        memberships = member.getImmediateMemberships();
                    } else {
                        if (ScopeEnum.EFFECTIVE.equals(theMembershipsScope)) {
                            memberships = member.getEffectiveMemberships();
                        } else {
                            if (ScopeEnum.ALL.equals(theMembershipsScope)) {
                                memberships = member.getMemberships();
                            } else {
                                throw new ESCOTechnicalException("The scope of membership is invalid.");
                            }
                        }
                    }
                    for (Membership membership : memberships) {
                        try {
                            groupsAsMemberhips.add(grouperApiWrapper.wrap(membership.getGroup()));
                        } catch (final GroupNotFoundException e) {
                            throw new GrouperDAOException(e);
                        }
                    }
                    return groupsAsMemberhips;
                }
            });
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GrouperDAOException e) {
            GrouperSession.stopQuietly(session);
            Throwable cause = e.getCause();
            if (cause instanceof GroupNotFoundException) {
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
            } else {
                throw new ESCOTechnicalException(ServiceConstants.API_ERROR, e);
            }
        } finally {
            GrouperSession.stopQuietly(session);
        }
        // Log to calculate time of service
        // this.LOGGER.error("findMemberships;" + timeTotal);
        GrouperSession.stopQuietly(session);
        return groupsAsMemberhips;
    }

    /**
     * {@inheritDoc}
     */
    public List < GroupType > findListTypes(final String[] theNames) {
        Validate.notNull(theNames, "The names must be defined");

        List < GroupType > groupTypes = new ArrayList < GroupType >();

        GroupType groupType = null;
        for (String name : theNames) {
            try {
                groupType = this.getGroupTypeWrapper().wrap(GroupTypeFinder.find(name, true));
            } catch (SchemaException e) {
                throw new ESCOTechnicalException("Invalid group type.", e);
            }
            groupTypes.add(groupType);
        }

        return groupTypes;
    }

    /**
     * {@inheritDoc}
     */
    public Map < String, GroupType > findGroupTypes(final String[] theNames) {
        Validate.notNull(theNames, "The names must be defined");

        Map < String, GroupType > groupTypes = new HashMap < String, GroupType >();

        GroupType groupType = null;
        for (String name : theNames) {
            try {
                groupType = this.getGroupTypeWrapper().wrap(GroupTypeFinder.find(name, true));
            } catch (SchemaException e) {
                throw new ESCOTechnicalException("Invalid group type.", e);
            }
            groupTypes.put(groupType.getName(), groupType);
        }

        return groupTypes;
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findGroupsMemberOptinOptout(final Person thePerson) throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);

        // this list is the result and it is modified in the method
        // callbackGrouperTransaction
        final List < Group > groups = new ArrayList < Group >();
        // long timeTotal = 0;
        GrouperSession session = null;
        Subject person = null;
        try {
            // long deb = System.currentTimeMillis();
            person = SubjectFinder.findById(thePerson.getId(), true);
            // timeTotal += System.currentTimeMillis() - deb;
            if (person == null) {
                throw new ESCOSubjectNotFoundException(ServiceConstants.SUBJECT_NOT_FOUND);
            }
            session = GrouperSession.start(person);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
            throw new ESCOSubjectNotFoundException(ServiceConstants.SUBJECT_NOT_FOUND, e);
        } catch (SubjectNotUniqueException e) {
            throw new ESCOSubjectNotUniqueException(ServiceConstants.SUBJECT_NOT_UNIQUE, e);
        }

        try {
            final GrouperSession grouperSession = session;
            final Subject subject = person;
            final IWrapper < edu.internet2.middleware.grouper.Group, Group > grouperApiWrapper = this.groupAPIWrapper;

            // start a transaction
            // long deb = System.currentTimeMillis();
            GrouperTransaction.callbackGrouperTransaction(new GrouperTransactionHandler() {
                public Object callback(final GrouperTransaction grouperTransaction) throws GrouperDAOException {
                    Member member = MemberFinder.findBySubject(grouperSession, subject, false);

                    Set < edu.internet2.middleware.grouper.Group > groupOptin = member.hasOptin();
                    Set < edu.internet2.middleware.grouper.Group > groupOptout = member.hasOptout();
                    Set < edu.internet2.middleware.grouper.Group > groupsAll = new HashSet < edu.internet2.middleware.grouper.Group >();

                    groupsAll.addAll(groupOptin);
                    groupsAll.addAll(groupOptout);

                    Group group = null;
                    for (edu.internet2.middleware.grouper.Group groupApi : groupsAll) {
                        group = grouperApiWrapper.wrap(groupApi);

                        if (groupApi.hasMember(subject)) {
                            group.addMappingFieldCol(ServiceConstants.MAPPING_FIELD_COL_MEMBER, Boolean.TRUE
                                    .toString());
                        } else {
                            group.addMappingFieldCol(ServiceConstants.MAPPING_FIELD_COL_MEMBER, Boolean.FALSE
                                    .toString());
                        }

                        group.setCanOptin(groupApi.hasOptin(subject));
                        group.setCanOptout(groupApi.hasOptout(subject));
                        groups.add(group);
                    }
                    return groups;
                }
            });
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GrouperDAOException e) {
            GrouperSession.stopQuietly(session);
            throw new ESCOTechnicalException(ServiceConstants.API_ERROR, e);
        } finally {
            GrouperSession.stopQuietly(session);
        }
        // Log to calculate time of service
        // this.LOGGER.error("findGroupsMemberOptinOptout;" + timeTotal);
        GrouperSession.stopQuietly(session);
        return groups;
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findGroupPrivileges(final Person thePerson, final List < String > theAttributes,
            final Map < String, SourceTypeEnum > theSources, final String theGroupName,
            final ScopeEnum thePrivilegesScope) {
        return this.findStemOrGroupPrivileges(thePerson, theAttributes, theSources, theGroupName,
                thePrivilegesScope, PrivilegeSearchEnum.GROUP);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findSubjectPrivilegesGroup(final Person thePerson, final String theSubjectId,
            final ScopeEnum theScope) {
        // long timeTotal = 0;
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theSubjectId, ServiceConstants.THE_SUBJECT_MUST_BE_DEFINED);
        Validate.notNull(theScope, ServiceConstants.THE_SCOPE_MUST_BE_DEFINED);

        // this list is the result and it is modified in the method
        // callbackGrouperTransaction
        final List < Group > groups = new ArrayList < Group >();

        GrouperSession session = null;
        Subject subject = null;
        try {
            // long deb = System.currentTimeMillis();
            session = GrouperSession.startRootSession();
            // session =
            // GrouperSession.start(SubjectFinder.findById(thePerson.getId()));
            subject = SubjectFinder.findById(theSubjectId, true);
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            final GrouperSession grouperSession = session;
            final Subject subject2 = subject;

            // start a transaction
            // long deb = System.currentTimeMillis();
            GrouperTransaction.callbackGrouperTransaction(new GrouperTransactionHandler() {
                public Object callback(final GrouperTransaction grouperTransaction) throws GrouperDAOException {

                    List < String > uuidAlreadyUse = new ArrayList < String >();
                    Member member = MemberFinder.findBySubject(grouperSession, subject2, false);

                    Set < edu.internet2.middleware.grouper.Group > groupAdmn = member.hasAdmin();
                    Set < edu.internet2.middleware.grouper.Group > groupUpde = member.hasUpdate();
                    Set < edu.internet2.middleware.grouper.Group > groupRead = member.hasRead();
                    Set < edu.internet2.middleware.grouper.Group > groupView = member.hasView();

                    for (edu.internet2.middleware.grouper.Group groupApi : groupAdmn) {
                        if (!uuidAlreadyUse.contains(groupApi.getUuid())) {
                            Group aux = GrouperServiceApi.this.getGroupWithPrivileges(theSubjectId, groupApi,
                                    theScope, groupApi.getAdmins(), "admin");
                            if (aux != null) {
                                groups.add(aux);
                                uuidAlreadyUse.add(aux.getIdGroup());
                            }
                        }
                    }

                    for (edu.internet2.middleware.grouper.Group groupApi : groupUpde) {
                        if (!uuidAlreadyUse.contains(groupApi.getUuid())) {
                            Group aux = GrouperServiceApi.this.getGroupWithPrivileges(theSubjectId, groupApi,
                                    theScope, groupApi.getUpdaters(), "update");
                            if (aux != null) {
                                groups.add(aux);
                                uuidAlreadyUse.add(aux.getIdGroup());
                            }
                        }
                    }

                    for (edu.internet2.middleware.grouper.Group groupApi : groupRead) {
                        if (!uuidAlreadyUse.contains(groupApi.getUuid())) {
                            Group aux = GrouperServiceApi.this.getGroupWithPrivileges(theSubjectId, groupApi,
                                    theScope, groupApi.getReaders(), "read");
                            if (aux != null) {
                                groups.add(aux);
                                uuidAlreadyUse.add(aux.getIdGroup());
                            }
                        }
                    }

                    for (edu.internet2.middleware.grouper.Group groupApi : groupView) {
                        if (!uuidAlreadyUse.contains(groupApi.getUuid())) {
                            Group aux = GrouperServiceApi.this.getGroupWithPrivileges(theSubjectId, groupApi,
                                    theScope, groupApi.getViewers(), "view");
                            if (aux != null) {
                                groups.add(aux);
                                uuidAlreadyUse.add(aux.getIdGroup());
                            }
                        }
                    }

                    return groups;
                }
            });
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GrouperDAOException e) {
            GrouperSession.stopQuietly(session);
            throw new ESCOTechnicalException(ServiceConstants.API_ERROR, e);
        } finally {
            GrouperSession.stopQuietly(session);
        }
        // Log to calculate time of service
        // this.LOGGER.error("findSubjectPrivilegesGroup;" + timeTotal);
        return groups;
    }

    /**
     * {@inheritDoc}
     */
    public List < Stem > findSubjectPrivilegesStem(final Person thePerson, final String theSubjectId,
            final ScopeEnum thePrivilegesScope) {
        // long timeTotal = 0;
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theSubjectId, ServiceConstants.THE_SUBJECT_MUST_BE_DEFINED);
        Validate.notNull(thePrivilegesScope, ServiceConstants.THE_SCOPE_MUST_BE_DEFINED);

        // this list is the result and it is modified in the method
        // callbackGrouperTransaction
        final List < Stem > stems = new ArrayList < Stem >();

        GrouperSession session = null;
        edu.internet2.middleware.subject.Subject subject = null;
        try {
            // long deb = System.currentTimeMillis();
            session = GrouperSession.startRootSession();
            // session =
            // GrouperSession.start(SubjectFinder.findById(thePerson.getId()));
            subject = SubjectFinder.findById(theSubjectId, true);
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            final GrouperSession grouperSession = session;
            final Subject subject2 = subject;
            final IWrapper < edu.internet2.middleware.grouper.Stem, Stem > stemApiWrapper = this.stemAPIWrapper;

            // start a transaction
            // long deb = System.currentTimeMillis();
            GrouperTransaction.callbackGrouperTransaction(new GrouperTransactionHandler() {
                public Object callback(final GrouperTransaction grouperTransaction) throws GrouperDAOException {

                    List < String > uuidAlreadyUse = new ArrayList < String >();
                    Member member = MemberFinder.findBySubject(grouperSession, subject2, false);

                    Set < edu.internet2.middleware.grouper.Stem > stemsCF = member.hasStem();
                    Set < edu.internet2.middleware.grouper.Stem > stemsCG = member.hasCreate();

                    Set < NamingPrivilege > privileges;
                    boolean immediate;
                    Stem stemToAdd;
                    for (edu.internet2.middleware.grouper.Stem stemApi : stemsCF) {

                        // Immediate children of this stem.
                        immediate = false;
                        privileges = stemApi.getPrivs(subject2);
                        for (NamingPrivilege namingPrivilege : privileges) {
                            if (namingPrivilege.isRevokable()) {
                                immediate = true;
                                break;
                            }
                        }

                        boolean isEffective = ScopeEnum.EFFECTIVE.equals(thePrivilegesScope) && !immediate;
                        boolean isImmediate = ScopeEnum.IMMEDIATE.equals(thePrivilegesScope) && immediate;
                        if (ScopeEnum.ALL.equals(thePrivilegesScope) || isEffective || isImmediate) {
                            stemToAdd = stemApiWrapper.wrap(stemApi);
                            stemToAdd.setHasStem(true);
                            stems.add(stemToAdd);
                            uuidAlreadyUse.add(stemToAdd.getUuid());
                        }

                    }

                    for (edu.internet2.middleware.grouper.Stem stemApi : stemsCG) {

                        // Immediate children of this stem.
                        immediate = false;
                        privileges = stemApi.getPrivs(subject2);
                        for (NamingPrivilege namingPrivilege : privileges) {
                            if (namingPrivilege.isRevokable()) {
                                immediate = true;
                                break;
                            }
                        }

                        boolean isEffective = ScopeEnum.EFFECTIVE.equals(thePrivilegesScope) && !immediate;
                        boolean isImmediate = ScopeEnum.IMMEDIATE.equals(thePrivilegesScope) && immediate;
                        if (ScopeEnum.ALL.equals(thePrivilegesScope) || isEffective || isImmediate) {
                            stemToAdd = stemApiWrapper.wrap(stemApi);

                            if (uuidAlreadyUse.contains(stemToAdd.getUuid())) {
                                // I search the record already contained in the
                                // final
                                // list to add the right CG more than CF
                                for (Stem stem : stems) {
                                    if (stem.getUuid().equals(stemToAdd.getUuid())) {
                                        stem.setHasCreate(true);
                                        break;
                                    }
                                }
                            } else {
                                stemToAdd.setHasCreate(true);
                                stems.add(stemToAdd);
                            }
                        }
                    }
                    return stems;
                }
            });
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GrouperDAOException e) {
            GrouperSession.stopQuietly(session);
            throw new ESCOTechnicalException(ServiceConstants.API_ERROR, e);
        } finally {
            GrouperSession.stopQuietly(session);
        }
        // Log to calculate time of service
        // this.LOGGER.error("findSubjectPrivilegesStem;" + timeTotal);
        return stems;
    }

    /**
     * {@inheritDoc}
     */
    public Boolean moveGroup(final Person thePerson, final String theOriginalGroupId, final Stem theTargetStem)
            throws ESCOGroupNotMoveException, ESCOGroupNotFoundException, ESCOStemNotFoundException {

        GrouperSession session = null;
        edu.internet2.middleware.subject.Subject subject = null;
        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            session = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        edu.internet2.middleware.grouper.Group theInitGroup = null;
        edu.internet2.middleware.grouper.Stem theTargetedStem = null;

        try {
            theInitGroup = GroupFinder.findByUuid(session, theOriginalGroupId, true);
        } catch (GroupNotFoundException e) {
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        }
        try {
            theTargetedStem = StemFinder.findByName(session, theTargetStem.getName(), true);

        } catch (StemNotFoundException e) {
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        }

        GroupMove gMove = new GroupMove(theInitGroup, theTargetedStem);
        gMove.assignAlternateName(false);
        try {
            gMove.save();
        } catch (GroupModifyException e) {
            GrouperSession.stopQuietly(session);
            throw new ESCOGroupNotMoveException(ServiceConstants.GROUP_CANNOT_BE_MOVED, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(session);
            throw new ESCOGroupNotMoveException(ServiceConstants.GROUP_CANNOT_BE_MOVED, e);
        }
        GrouperSession.stopQuietly(session);
        return Boolean.TRUE;

    }

    /**
     * Converts a Lazy subject into a Privilege.
     * 
     * @param theSubject
     *            The subject to convert.
     * @param theScope
     *            The privilege scope.
     * @param thePrivilegeName
     *            The privilege name.
     * @return The privilege from the subject.
     */
    private Privilege convertToPrivilege(final LazySubject theSubject, final ScopeEnum theScope,
            final String thePrivilegeName) {

        if (theSubject == null || theSubject.getMembership() == null || theSubject.getType() == null
                || theSubject.getType().getName() == null
                || ServiceConstants.GROUPER_ALL.equals(theSubject.getId())) {
            return null;
        }

        Privilege privilege = new Privilege();
        privilege.setPrivilegeName(thePrivilegeName);

        if (ScopeEnum.IMMEDIATE.equals(theScope) && "immediate".equals(theSubject.getMembership().getType())) {
            privilege.setType(ScopeEnum.IMMEDIATE);

        } else
            if (ScopeEnum.EFFECTIVE.equals(theScope) && "effective".equals(theSubject.getMembership().getType())) {
                privilege.setType(ScopeEnum.EFFECTIVE);

            } else
                if (ScopeEnum.ALL.equals(theScope)) {
                    privilege.setType(ScopeEnum.ALL);
                } else {
                    return null;
                }
        if (SourceTypeEnum.PERSON.equals(SourceTypeEnum.valueOf(theSubject.getType().getName().toUpperCase()))) {
            Person person = new Person();
            person.setId(theSubject.getId());
            person.setAttributes(theSubject.getAttributes());
            privilege.setPersonTarget(person);
        } else {
            Group oneGroup = new Group();
            oneGroup.setIdGroup(theSubject.getId());
            oneGroup.setAttributes(theSubject.getAttributes());
            privilege.setGroupTarget(oneGroup);
        }
        return privilege;
    }

    /**
     * Get all group with this specific privilege.
     * 
     * @param theParentId
     *            The parent uid.
     * @param theGroup
     *            The group.
     * @param theScope
     *            The scope.
     * @param listToExplore
     *            The list of items to explore.
     * @param thePrivilege
     *            The current right.
     * @return The list of the group.
     */
    private Group getGroupWithPrivileges(final String theParentId,
            final edu.internet2.middleware.grouper.Group theGroup, final ScopeEnum theScope,
            final Set < Subject > listToExplore, final String thePrivilege) {
        Group group = null;
        Iterator < Subject > itAux = listToExplore.iterator();
        while (itAux.hasNext()) {
            LazySubject object = (LazySubject) itAux.next();
            if (object.getId().equals(theParentId)) {
                // My folder is admin.
                if (ScopeEnum.IMMEDIATE.equals(theScope) && object.getMembership().getType().equals("immediate")) {
                    group = this.groupAPIWrapper.wrap(theGroup);
                    group.setUserRight(GroupPrivilegeEnum.fromValue(thePrivilege));
                    group.setCanOptin(this.getOptinOrOptoutPrivilege(theGroup, theParentId, true));
                    group.setCanOptout(this.getOptinOrOptoutPrivilege(theGroup, theParentId, false));
                } else
                    if (ScopeEnum.EFFECTIVE.equals(theScope)
                            && object.getMembership().getType().equals("effective")) {
                        group = this.groupAPIWrapper.wrap(theGroup);
                        group.setUserRight(GroupPrivilegeEnum.fromValue(thePrivilege));
                        group.setCanOptin(this.getOptinOrOptoutPrivilege(theGroup, theParentId, true));
                        group.setCanOptout(this.getOptinOrOptoutPrivilege(theGroup, theParentId, false));
                    } else
                        if (ScopeEnum.ALL.equals(theScope)) {
                            group = this.groupAPIWrapper.wrap(theGroup);
                            group.setUserRight(GroupPrivilegeEnum.fromValue(thePrivilege));
                            group.setCanOptin(this.getOptinOrOptoutPrivilege(theGroup, theParentId, true));
                            group.setCanOptout(this.getOptinOrOptoutPrivilege(theGroup, theParentId, false));
                        }
                break;
            }

        }
        return group;
    }

    /**
     * Get if the parent group has the optin or optout rigth.
     * 
     * @param theGroup
     *            The group to test.
     * @param theParentId
     *            The parent group.
     * @param isOptin
     *            True if we test optin else false for optout.
     * @return the result of the request.
     */
    private boolean getOptinOrOptoutPrivilege(final edu.internet2.middleware.grouper.Group theGroup,
            final String theParentId, final boolean isOptin) {

        boolean result = false;
        Set < Subject > aux;
        if (isOptin) {
            aux = theGroup.getOptins();
        } else {
            aux = theGroup.getOptouts();
        }
        for (Subject subject : aux) {
            if (subject != null && subject.getId().equals(theParentId)) {
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     * {@inheritDoc}
     */
    public Boolean moveStem(final Person thePerson, final String theOriginalStemName, final Stem theTargetStem)
            throws ESCOStemNotMoveException, ESCOStemNotFoundException {
        Validate.notNull(thePerson, "The thePerson canot be null.");
        Validate.notNull(theOriginalStemName, "The theOriginalStemName canot be null.");
        Validate.notNull(theTargetStem, "The theTargetStem canot be null.");

        GrouperSession grouperSession = null;
        Subject subject = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            StemMove stemMove = new StemMove(StemFinder.findByName(grouperSession, theOriginalStemName, true),
                    StemFinder.findByName(grouperSession, theTargetStem.getName(), true));
            stemMove.assignAlternateName(false);
            stemMove.save();
        } catch (StemModifyException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotMoveException(e.getMessage());
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotMoveException(e.getMessage());
        } catch (StemNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotFoundException(e.getMessage());
        }
        GrouperSession.stopQuietly(grouperSession);
        return Boolean.TRUE;
    }

    /**
     * Getter for attribute <b>personWrapper</b>.
     * 
     * @return the personWrapper
     */
    public IWrapper < edu.internet2.middleware.subject.Subject, Person > getPersonWrapper() {
        return this.personWrapper;
    }

    /**
     * Setter for attribute <b>personWrapper</b>.
     * 
     * @param thePersonWrapper
     *            the personWrapper to set
     */
    public void setPersonWrapper(
            final IWrapper < edu.internet2.middleware.subject.Subject, Person > thePersonWrapper) {
        this.personWrapper = thePersonWrapper;
    }

    /**
     * Getter for attribute <b>strategyLocator</b>.
     * 
     * @return the strategyLocator
     */
    public IStrategySubjectSearchLocator getStrategyLocator() {
        return this.strategyLocator;
    }

    /**
     * @return
     */
    public IStrategyGroupSearchLocator getStrategyGroupLocator() {
        return this.strategyGroupLocator;
    }

    /**
     * @param theStrategyGroupLocator
     */
    public void setStrategyGroupLocator(final IStrategyGroupSearchLocator theStrategyGroupLocator) {
        this.strategyGroupLocator = theStrategyGroupLocator;
    }

    /**
     * Setter for attribute <b>strategyLocator</b>.
     * 
     * @param theStrategyLocator
     *            : the strategyLocator to set
     */
    public void setStrategyLocator(final IStrategySubjectSearchLocator theStrategyLocator) {
        this.strategyLocator = theStrategyLocator;
    }

    /**
     * Getter for attribute <b>groupTypeWrapper</b>.
     * 
     * @return the groupTypeWrapper
     */
    public IWrapper < edu.internet2.middleware.grouper.GroupType, GroupType > getGroupTypeWrapper() {
        return this.groupTypeWrapper;
    }

    /**
     * Setter for attribute <b>groupTypeWrapper</b>.
     * 
     * @param theGroupTypeWrapper
     *            the groupTypeWrapper to set
     */
    public void setGroupTypeWrapper(
            final IWrapper < edu.internet2.middleware.grouper.GroupType, GroupType > theGroupTypeWrapper) {
        this.groupTypeWrapper = theGroupTypeWrapper;
    }

    /**
     * Getter for attribute <b>groupAPIWrapper</b>.
     * 
     * @return the groupAPIWrapper
     */
    public IWrapper < edu.internet2.middleware.grouper.Group, Group > getGroupAPIWrapper() {
        return this.groupAPIWrapper;
    }

    /**
     * Setter for attribute <b>groupAPIWrapper</b>.
     * 
     * @param theGroupAPIWrapper
     *            the groupAPIWrapper to set
     */
    public void setGroupAPIWrapper(
            final IWrapper < edu.internet2.middleware.grouper.Group, Group > theGroupAPIWrapper) {
        this.groupAPIWrapper = theGroupAPIWrapper;
    }

    /**
     * Getter for attribute <b>stemAPIWrapper</b>.
     * 
     * @return the stemAPIWrapper to get.
     */
    public final IWrapper < edu.internet2.middleware.grouper.Stem, Stem > getStemAPIWrapper() {
        return this.stemAPIWrapper;
    }

    /**
     * Setter for attribute <b>stemAPIWrapper</b>.
     * 
     * @param theStemAPIWrapper
     *            the stemAPIWrapper to set.
     */
    public final void setStemAPIWrapper(
            final IWrapper < edu.internet2.middleware.grouper.Stem, Stem > theStemAPIWrapper) {
        this.stemAPIWrapper = theStemAPIWrapper;
    }

    /**
     * {@inheritDoc}
     */
    public Members findMembers(final Person thePerson, final String theGroupName,
            final List < String > theAttributes, final Map < String, SourceTypeEnum > theSources,
            final ScopeEnum theMembersScope) throws ESCOGroupNotFoundException,
            ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupName, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);
        Validate.notNull(theAttributes, "The attributes must be defined");
        Validate.notNull(theSources, "The sources must be defined");
        Validate.notNull(theMembersScope, ServiceConstants.THE_SCOPE_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        Members members = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder.findByName(grouperSession, theGroupName,
                    true);

            Set < Member > myMembers = null;
            SourceTypeEnum type = null;

            if (ScopeEnum.ALL.equals(theMembersScope)) {
                myMembers = group.getMembers();
            } else
                if (ScopeEnum.EFFECTIVE.equals(theMembersScope)) {
                    myMembers = group.getEffectiveMembers();
                } else
                    if (ScopeEnum.IMMEDIATE.equals(theMembersScope)) {
                        myMembers = group.getImmediateMembers();
                    }

            members = new Members();

            for (Member member : myMembers) {
                type = theSources.get(member.getSubjectSourceId());

                if (type != null) {

                    if (SourceTypeEnum.PERSON.equals(type)) {
                        Person person = new Person();
                        person.setId(member.getSubjectId());
                        person.setAttributes(member.getSubject().getAttributes());
                        person.setTypeEnum(type);
                        members.addPerson(person);
                    } else
                        if (SourceTypeEnum.GROUP.equals(type)) {
                            edu.internet2.middleware.grouper.Group groupFind = null;
                            groupFind = GroupFinder.findByUuid(grouperSession, member.getSubjectId(), true);

                            if (groupFind != null) {
                                Group groupAdd = new Group();
                                groupAdd.setIdGroup(member.getSubjectId());
                                groupAdd.setAttributes(member.getSubject().getAttributes());
                                groupAdd.setTypeEnum(type);
                                members.addGroup(groupAdd);
                            }
                        } else {
                            // Must never occur.
                            GrouperSession.stopQuietly(grouperSession);
                            throw new ESCOTechnicalException("The type of source is undefined.");
                        }

                }
            }

        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        }
        GrouperSession.stopQuietly(grouperSession);
        return members;
    }

    /**
     * {@inheritDoc}
     */
    public Integer countPersons(final Person thePerson, final List < String > theGroupsName,
            final Map < String, SourceTypeEnum > theSources, final ScopeEnum theMembersScope)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupsName, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        int cpt = 0;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            for (String groupName : theGroupsName) {
                edu.internet2.middleware.grouper.Group group = GroupFinder.findByName(grouperSession, groupName,
                        true);

                Set < Member > myMembers = null;

                if (ScopeEnum.ALL.equals(theMembersScope)) {
                    myMembers = group.getMembers();
                } else
                    if (ScopeEnum.EFFECTIVE.equals(theMembersScope)) {
                        myMembers = group.getEffectiveMembers();
                    } else
                        if (ScopeEnum.IMMEDIATE.equals(theMembersScope)) {
                            myMembers = group.getImmediateMembers();
                        }
                for (Member member : myMembers) {
                    if (SourceTypeEnum.PERSON.equals(theSources.get(member.getSubjectSourceId()))) {
                        cpt++;
                    }
                }
            }
        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        }
        GrouperSession.stopQuietly(grouperSession);
        return new Integer(cpt);
    }

    /**
     * {@inheritDoc}
     */
    public void addMembers(final Person thePerson, final String theGroupName, final List < String > theMembersToAdd)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCOAddMemberException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupName, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);
        Validate.notNull(theMembersToAdd, ServiceConstants.THE_MEMBERS_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder.findByName(grouperSession, theGroupName,
                    true);

            Subject myMember = null;

            for (String subjectId : theMembersToAdd) {
                myMember = SubjectFinder.findById(subjectId, true);
                if (!group.hasMember(myMember)) {
                    group.addMember(myMember);
                }
            }
        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (MemberAddException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOAddMemberException(ServiceConstants.MEMBER_CANNOT_BE_ADDED, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }
        GrouperSession.stopQuietly(grouperSession);
    }

    /**
     * {@inheritDoc}
     */
    public void removeMembers(final Person thePerson, final String theGroupName,
            final List < String > theMembersToRemove) throws ESCOGroupNotFoundException,
            ESCOInsufficientPrivilegesException, ESCODeleteMemberException {
        this.removeMembers(thePerson, theGroupName, theMembersToRemove, true);
    }

    /**
     * {@inheritDoc}
     */
    public void removeMembers(final Person thePerson, final String theGroupName,
            final List < String > theMembersToRemove, final boolean isActAsSubject)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCODeleteMemberException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupName, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);
        Validate.notNull(theMembersToRemove, ServiceConstants.THE_MEMBERS_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);

            if (isActAsSubject) {
                grouperSession = GrouperSession.start(subject);
            } else {
                grouperSession = GrouperSession.startRootSession();
            }
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder.findByName(grouperSession, theGroupName,
                    true);
            Subject myMember = null;
            for (String subjectId : theMembersToRemove) {
                myMember = SubjectFinder.findById(subjectId, true);
                if (group.hasMember(myMember)) {
                    group.deleteMember(myMember, false);
                }
            }

        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (MemberDeleteException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCODeleteMemberException(ServiceConstants.MEMBER_CANNOT_BE_DELETED, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }
        GrouperSession.stopQuietly(grouperSession);
    }

    /**
     * {@inheritDoc}
     */
    public void copyMembers(final Person thePerson, final String theSourceName, final String theTargetName)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCOAddMemberException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theSourceName, "The source name must be defined");
        Validate.notNull(theTargetName, "The target name must be defined");

        GrouperSession grouperSession = null;
        Subject subject = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder.findByName(grouperSession, theSourceName,
                    true);
            edu.internet2.middleware.grouper.Group targetGroup = GroupFinder.findByName(grouperSession,
                    theTargetName, true);
            for (Member member : group.getMembers()) {
                targetGroup.addMember(member.getSubject());
            }

        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }
        GrouperSession.stopQuietly(grouperSession);
    }

    /**
     * {@inheritDoc}
     */
    public Stem findStemByUuid(final Person thePerson, final String theUuid) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theUuid, ServiceConstants.THE_ID_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        Stem stem = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Stem myStem = StemFinder.findByUuid(grouperSession, theUuid, true);
            stem = this.getStemAPIWrapper().wrap(myStem);
            stem.setIsEmpty(this.isEmptyStem(stem.getName()));
        } catch (StemNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        }
        GrouperSession.stopQuietly(grouperSession);
        return stem;
    }

    /**
     * {@inheritDoc}
     */
    public Stem findStemByName(final Person thePerson, final String theName) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theName, ServiceConstants.THE_NAME_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        Stem stem = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Stem myStem = StemFinder.findByName(grouperSession, theName, true);
            stem = this.getStemAPIWrapper().wrap(myStem);
            stem.setIsEmpty(this.isEmptyStem(stem.getName()));
        } catch (StemNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        }
        GrouperSession.stopQuietly(grouperSession);
        return stem;
    }

    /**
     * {@inheritDoc}
     */
    public List < Stem > searchStems(final Person thePerson, final SearchStemEnum theField, final String theTerm,
            final String thePath) throws ESCOStemNotFoundException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theField, ServiceConstants.THE_FIELD_MUST_BE_DEFINED);
        Validate.notNull(theTerm, ServiceConstants.THE_TERM_MUST_BE_DEFINED);
        Validate.notNull(thePath, ServiceConstants.THE_PATH_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        List < Stem > stems = new ArrayList < Stem >();

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            String prettyTerm = theTerm.replace(ServiceConstants.WILDCARD, ServiceConstants.GROUPER_WILDCARD);
            List < edu.internet2.middleware.grouper.Stem > stemsTmp = new ArrayList(StemFinder
                    .internal_findAllByApproximateName(grouperSession, prettyTerm));

            for (edu.internet2.middleware.grouper.Stem stem : stemsTmp) {
                stems.add(this.getStemAPIWrapper().wrap(stem));
            }
        } catch (QueryException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        }
        GrouperSession.stopQuietly(grouperSession);
        return stems;
    }

    /**
     * {@inheritDoc}
     */
    public String stemCreate(final Person thePerson, final Stem theStemToCreate) throws ESCOStemNotSaveException,
            ESCOStemNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theStemToCreate, ServiceConstants.THE_STEM_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        String stemUuid = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        edu.internet2.middleware.grouper.Stem alreadyExist = StemFinder.findByName(grouperSession, theStemToCreate
                .getName(), false);
        if (alreadyExist != null) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotSaveException(ServiceConstants.STEM_ALREADY_EXIST);
        }
        edu.internet2.middleware.grouper.Stem stemCreated;

        if (theStemToCreate.getDescription() != null) {
            theStemToCreate.setDescription(theStemToCreate.getDescription().trim());
        }

        try {
            StemSave myStem = new StemSave(grouperSession);
            if (StringUtils.isNotEmpty(theStemToCreate.getUuid())) {
                myStem.assignUuid(theStemToCreate.getUuid());
            }

            if (StringUtils.isNotEmpty(theStemToCreate.getDescription())) {
                myStem.assignDescription(theStemToCreate.getDescription());
            }

            if (StringUtils.isNotEmpty(theStemToCreate.getDisplayExtension())) {
                myStem.assignDisplayExtension(theStemToCreate.getDisplayExtension());
            }

            if (StringUtils.isNotEmpty(theStemToCreate.getDisplayName())) {
                myStem.assignDisplayName(theStemToCreate.getDisplayName());
            }

            if (StringUtils.isNotEmpty(theStemToCreate.getName())) {
                myStem.assignName(theStemToCreate.getName());
            }
            myStem.assignSaveMode(SaveMode.INSERT);
            stemCreated = myStem.save();
        } catch (StemNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (StemAddException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotSaveException(ServiceConstants.STEM_CANNOT_BE_SAVED, e);
        } catch (StemModifyException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotSaveException(ServiceConstants.STEM_CANNOT_BE_SAVED, e);
        }

        if (stemCreated != null) {
            stemUuid = stemCreated.getUuid();
            Privilege privilege = new Privilege();
            privilege.setPrivilegeType(PrivilegeTypeEnum.NAMING.getValue());
            privilege.setPrivilegeName(StemPrivilegeEnum.CREATE.getValue());
            try {
                this.assignStemPrivileges(thePerson, thePerson.getId(), stemUuid, privilege);
            } catch (ESCOStemNotUniqueException e) {
                // Nothing to do because no exception here
                // possible.
            }
        } else {
            GrouperSession.stopQuietly(grouperSession);
            new ESCOStemNotSaveException(ServiceConstants.STEM_CANNOT_BE_SAVED);
        }
        GrouperSession.stopQuietly(grouperSession);
        return stemUuid;
    }

    /**
     * {@inheritDoc}
     */
    public void stemUpdate(final Person thePerson, final Stem theStemToUpdate) throws ESCOStemNotSaveException,
            ESCOStemNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theStemToUpdate, ServiceConstants.THE_STEM_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        if (theStemToUpdate.getDescription() != null) {
            theStemToUpdate.setDescription(theStemToUpdate.getDescription().trim());
        }

        try {
            StemSave myStem = new StemSave(grouperSession);
            myStem.assignStemNameToEdit(theStemToUpdate.getOriginalName());
            if (StringUtils.isNotEmpty(theStemToUpdate.getUuid())) {
                myStem.assignUuid(theStemToUpdate.getUuid());
            }

            if (StringUtils.isNotEmpty(theStemToUpdate.getDescription())) {
                myStem.assignDescription(theStemToUpdate.getDescription());
            }

            if (StringUtils.isNotEmpty(theStemToUpdate.getDisplayExtension())) {
                myStem.assignDisplayExtension(theStemToUpdate.getDisplayExtension());
            }

            if (StringUtils.isNotEmpty(theStemToUpdate.getDisplayName())) {
                myStem.assignDisplayName(theStemToUpdate.getDisplayName());
            }

            if (StringUtils.isNotEmpty(theStemToUpdate.getName())) {
                myStem.assignName(theStemToUpdate.getName());
            }

            myStem.assignSaveMode(SaveMode.UPDATE);
            myStem.save();
        } catch (StemNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (StemAddException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotSaveException(ServiceConstants.STEM_CANNOT_BE_SAVED, e);
        } catch (StemModifyException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotSaveException(ServiceConstants.STEM_CANNOT_BE_SAVED, e);
        } catch (Exception e) {
            throw new ESCOStemNotSaveException(ServiceConstants.STEM_CANNOT_BE_SAVED, e);
        }
        GrouperSession.stopQuietly(grouperSession);
    }

    /**
     * {@inheritDoc}
     */
    public void stemDelete(final Person thePerson, final String theStemId) throws ESCOStemNotFoundException,
            ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theStemId, ServiceConstants.THE_STEM_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Stem stem = StemFinder.findByUuid(grouperSession, theStemId, true);
            if (stem != null) {
                stem.delete();
            }
        } catch (StemNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (StemDeleteException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_CANNOT_BE_DELETED, e);
        }
        GrouperSession.stopQuietly(grouperSession);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotFoundException
     */
    public ArrayListMultimap < Integer, Group > getAllGroupsFrom(final String theParentName,
            final String thePersonId) throws ESCOStemNotFoundException {

        Validate.notNull(theParentName, "The name of the parent must be defined");
        Validate.notNull(thePersonId, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);

        ArrayListMultimap < Integer, Group > result = ArrayListMultimap.create();

        int cpt = 0;

        GrouperSession session = null;
        Subject person = null;
        try {
            person = SubjectFinder.findById(thePersonId, true);
            session = GrouperSession.start(person);

        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
            throw new ESCOTechnicalException(ServiceConstants.SUBJECT_NOT_FOUND, e);
        } catch (SubjectNotUniqueException e) {
            throw new ESCOTechnicalException(ServiceConstants.SUBJECT_NOT_UNIQUE, e);
        }

        try {
            edu.internet2.middleware.grouper.Stem parentStem = StemFinder.findByName(session, theParentName, true);
            Set < edu.internet2.middleware.grouper.Group > groups = parentStem.getChildGroups(Scope.ONE);

            for (edu.internet2.middleware.grouper.Group group : groups) {
                Group aux = this.groupAPIWrapper.wrap(group);
                aux.setCanOptin(false);
                aux.setCanOptout(false);
                aux.setUserRight(null);
                Set < AccessPrivilege > privs = group.getPrivs(person);
                for (AccessPrivilege priv : privs) {
                    PrivilegeAssignUtils.assignPrivilege(aux, priv.getName());
                }
                result.put(cpt++, aux);
            }

        } catch (StemNotFoundException stemNotFoundException) {
            GrouperSession.stopQuietly(session);
            throw new ESCOStemNotFoundException();
        }
        GrouperSession.stopQuietly(session);
        return result;

    }

    /**
     * {@inheritDoc}
     */
    public Group findGroupByUid(final Person thePerson, final String theUid) throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theUid, ServiceConstants.THE_ID_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        Group myGroup = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder.findByUuid(grouperSession, theUid, true);
            myGroup = this.getGroupAPIWrapper().wrap(group);
        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        }
        GrouperSession.stopQuietly(grouperSession);
        return myGroup;
    }

    /**
     * {@inheritDoc}
     */
    public Group findGroupByName(final Person thePerson, final String theName) throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theName, ServiceConstants.THE_NAME_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        Group myGroup = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder.findByName(grouperSession, theName, true);
            myGroup = this.getGroupAPIWrapper().wrap(group);
        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        }
        GrouperSession.stopQuietly(grouperSession);
        return myGroup;
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > searchGroups(final Person thePerson, final SearchGroupEnum theField,
            final SearchTypeEnum theSearchType, final String thePath, final String theTerm)
            throws ESCOGroupNotFoundException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theField, ServiceConstants.THE_FIELD_MUST_BE_DEFINED);
        Validate.notNull(theSearchType, ServiceConstants.THE_SEARCH_TYPE_MUST_BE_DEFINED);
        Validate.notNull(thePath, ServiceConstants.THE_PATH_MUST_BE_DEFINED);
        Validate.notNull(theTerm, ServiceConstants.THE_TERM_MUST_BE_DEFINED);

        IStrategyGroupSearch strategy = this.getStrategyGroupLocator().locate(theField, theSearchType, thePath,
                theTerm, thePerson.getId());
        if (strategy == null) {
            throw new ESCOTechnicalException(ServiceConstants.STRATEGY_NOT_FOUND);
        }
        return strategy.searchGroups(thePerson, theField, theSearchType, thePath, theTerm);
    }

    /**
     * {@inheritDoc}
     */
    public String groupCreate(final Person thePerson, final Group theGroupToCreate)
            throws ESCOGroupNotSaveException, ESCOGroupNotFoundException, ESCOAttributeException,
            ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupToCreate, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        String groupUuid = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        edu.internet2.middleware.grouper.Group alreadyExist = GroupFinder.findByName(grouperSession,
                theGroupToCreate.getName(), false);
        if (alreadyExist != null) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotSaveException(ServiceConstants.GROUP_NOT_UNIQUE);
        }
        edu.internet2.middleware.grouper.Group groupCreated = null;
        try {
            GroupSave myGroup = new GroupSave(grouperSession);
            myGroup.assignUuid(theGroupToCreate.getIdGroup());
            myGroup.assignDescription(theGroupToCreate.getDescription());
            myGroup.assignDisplayExtension(theGroupToCreate.getDisplayExtension());
            myGroup.assignDisplayName(theGroupToCreate.getDisplayName());
            myGroup.assignName(theGroupToCreate.getName());
            myGroup.assignSaveMode(SaveMode.INSERT);
            groupCreated = myGroup.save();
        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (GroupModifyException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotSaveException(ServiceConstants.STEM_CANNOT_BE_SAVED, e);
        }

        if (groupCreated != null) {
            groupUuid = groupCreated.getUuid();

            // Manage of the group details.
            GroupDetail details = theGroupToCreate.getDetail();
            GroupDAO dao = GrouperDAOFactory.getFactory().getGroup();
            if (details != null) {
                if (details.getAttributeNames() != null && details.getAttributeValues() != null
                        && details.getAttributeNames().length == details.getAttributeValues().length) {
                    for (int i = 0; i < details.getAttributeNames().length; i++) {
                        groupCreated.setAttribute(details.getAttributeNames()[i], details.getAttributeValues()[i]);
                    }
                    try {
                        dao.update(groupCreated);
                    } catch (Exception e) {
                    }
                }
                if (details.getTypeNames() != null) {
                    for (String type : details.getTypeNames()) {
                        try {
                            edu.internet2.middleware.grouper.GroupType aux = GroupTypeFinder.find(type, true);
                            if (!groupCreated.getTypes().contains(aux)) {
                                dao.addType(groupCreated, aux);
                                // types.add(GroupTypeFinder.find(type, true));
                            }
                        } catch (Exception e) {
                        }
                    }
                    // groupCreated.setTypes(types);
                }
            }
        } else {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotSaveException(ServiceConstants.GROUP_CANNOT_BE_SAVED);
        }
        GrouperSession.stopQuietly(grouperSession);
        return groupUuid;
    }

    /**
     * {@inheritDoc}
     */
    public void groupUpdate(final Person thePerson, final Group theGroupToUpdate)
            throws ESCOGroupNotSaveException, ESCOGroupNotFoundException, ESCOAttributeException,
            ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupToUpdate, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }
        edu.internet2.middleware.grouper.Group theGroupUpdated = null;
        try {
            theGroupUpdated = GroupFinder.findByUuid(grouperSession, theGroupToUpdate.getIdGroup(), true);
            if (theGroupUpdated == null) {
                GrouperSession.stopQuietly(grouperSession);
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND);
            }
        } catch (ESCOGroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        }

        try {
            GroupSave myGroup = new GroupSave(grouperSession);
            myGroup.assignGroupNameToEdit(theGroupUpdated.getName());
            myGroup.assignUuid(theGroupToUpdate.getIdGroup());
            myGroup.assignDescription(theGroupToUpdate.getDescription());
            myGroup.assignDisplayExtension(theGroupToUpdate.getDisplayExtension());
            myGroup.assignDisplayName(theGroupToUpdate.getDisplayName());
            myGroup.assignName(theGroupToUpdate.getName());
            myGroup.assignSaveMode(SaveMode.UPDATE);
            theGroupUpdated = myGroup.save();
        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (GroupModifyException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotSaveException(ServiceConstants.GROUP_CANNOT_BE_SAVED, e);
        } catch (Exception e) {
            throw new ESCOGroupNotSaveException(ServiceConstants.GROUP_CANNOT_BE_SAVED, e);
        }
        if (theGroupUpdated != null) {
            // Manage of the group details.
            GroupDetail details = theGroupToUpdate.getDetail();
            GroupDAO dao = GrouperDAOFactory.getFactory().getGroup();

            if (details != null) {

                // Manage the group attributes.
                if (details.getAttributeNames() != null && details.getAttributeValues() != null
                        && ArrayUtils.isSameLength(details.getAttributeNames(), details.getAttributeValues())) {
                    for (int i = 0; i < details.getAttributeNames().length; i++) {
                        theGroupUpdated.setAttribute(details.getAttributeNames()[i],
                                details.getAttributeValues()[i]);
                    }
                    try {
                        dao.update(theGroupUpdated);
                    } catch (Exception e) {
                    }
                }

                if (details.getTypeNames() != null) {
                    List < String > typeNames = Arrays.asList(details.getTypeNames());
                    // Add some type.
                    for (String type : typeNames) {
                        try {
                            edu.internet2.middleware.grouper.GroupType aux = GroupTypeFinder.find(type, true);
                            if (!theGroupUpdated.getTypes().contains(aux)) {
                                dao.addType(theGroupUpdated, aux);
                            }
                        } catch (Exception e) {
                        }
                    }
                    // Remove some type.
                    Set < edu.internet2.middleware.grouper.GroupType > originalGroupDetails = dao
                            ._findAllTypesByGroup(theGroupToUpdate.getIdGroup());

                    for (edu.internet2.middleware.grouper.GroupType type : originalGroupDetails) {
                        try {
                            if (!typeNames.contains(type.getName())
                                    && !type.getName().equals(ESCOConstantes.BASE_TYPE)) {
                                dao.deleteType(theGroupUpdated, type);
                            }
                        } catch (Exception e) {
                        }
                    }
                }

            }
        }
        GrouperSession.stopQuietly(grouperSession);
    }

    /**
     * {@inheritDoc}
     */
    public void groupDelete(final Person thePerson, final String theGroupId)
            throws ESCOInsufficientPrivilegesException, ESCOGroupNotFoundException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupId, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder
                    .findByUuid(grouperSession, theGroupId, true);
            group.delete();
        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        } catch (InsufficientPrivilegeException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
        } catch (GroupDeleteException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.STEM_CANNOT_BE_DELETED, e);
        }
        GrouperSession.stopQuietly(grouperSession);
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findStemPrivileges(final Person thePerson, final String theStemName) {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theStemName, ServiceConstants.THE_STEM_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        List < Privilege > myPrivileges = new ArrayList < Privilege >();

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Stem stem = StemFinder.findByName(grouperSession, theStemName, true);

            for (NamingPrivilege privilege : stem.getPrivs(subject)) {
                Privilege myPrivilege = new Privilege();
                myPrivilege.setPrivilegeName(privilege.getName());
                myPrivileges.add(myPrivilege);
            }
        } catch (StemNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOTechnicalException(ServiceConstants.STEM_NOT_FOUND);
        }
        GrouperSession.stopQuietly(grouperSession);
        return myPrivileges;
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findStemPrivileges(final Person thePerson, final List < String > theAttributes,
            final Map < String, SourceTypeEnum > theSources, final String theStemName,
            final ScopeEnum thePrivilegesScope) {
        return this.findStemOrGroupPrivileges(thePerson, theAttributes, theSources, theStemName,
                thePrivilegesScope, PrivilegeSearchEnum.STEM);
    }

    /**
     * Finds privileges of a stem or a group.
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theAttributes
     *            the collection of attributes of the subjects which we want to
     *            retrieve.
     * @param theSources
     *            the collection of sources. These sources determine the type of
     *            object associated with the privilege (group or person).
     * @param theStemOrGroupName
     *            the name of the stem or the group.
     * @param thePrivilegesScope
     *            the scope of privileges to return (immediate, effective or
     *            both).
     * @param theTypeSearch
     *            the type of target (group or stem).
     * @return a collection of privileges.
     */
    private List < Privilege > findStemOrGroupPrivileges(final Person thePerson,
            final List < String > theAttributes, final Map < String, SourceTypeEnum > theSources,
            final String theStemOrGroupName, final ScopeEnum thePrivilegesScope,
            final PrivilegeSearchEnum theTypeSearch) {
        // long timeTotal = 0;
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theSources, "The sources must be defined");
        Validate.notNull(theStemOrGroupName, ServiceConstants.THE_STEM_OR_GROUP_MUST_BE_DEFINED);
        Validate.notNull(thePrivilegesScope, ServiceConstants.THE_SCOPE_MUST_BE_DEFINED);
        Validate.notNull(theTypeSearch, ServiceConstants.THE_SEARCH_TYPE_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        edu.internet2.middleware.grouper.Group group = null;
        edu.internet2.middleware.grouper.Stem stem = null;
        List < Privilege > result = new ArrayList < Privilege >();

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        if (PrivilegeSearchEnum.GROUP.equals(theTypeSearch)) {

            group = GroupFinder.findByName(grouperSession, theStemOrGroupName, true);

            Set < Subject > subjects = group.getAdmins();
            for (Subject element : subjects) {
                LazySubject object = (LazySubject) element;
                Privilege priv = GrouperServiceApi.this.convertToPrivilege(object, thePrivilegesScope, "admin");
                if (priv != null) {
                    switch (thePrivilegesScope.getCode().intValue()) {
                        case 0:
                            // immediate (direct) = revokable
                            if (priv.getType().getValue().equals(ScopeEnum.IMMEDIATE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 1:
                            // effective (indirect) = irrevokable
                            if (priv.getType().getValue().equals(ScopeEnum.EFFECTIVE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 2:
                            // all
                            result.add(priv);
                            break;
                        default:
                            // Must never occur.
                            GrouperSession.stopQuietly(grouperSession);
                            throw new ESCOTechnicalException("The scope is invalid.");
                    }
                }
            }

            subjects = group.getUpdaters();
            for (Subject element : subjects) {
                LazySubject object = (LazySubject) element;
                Privilege priv = GrouperServiceApi.this.convertToPrivilege(object, thePrivilegesScope, "update");
                if (priv != null) {
                    switch (thePrivilegesScope.getCode().intValue()) {
                        case 0:
                            // immediate (direct) = revokable
                            if (priv.getType().getValue().equals(ScopeEnum.IMMEDIATE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 1:
                            // effective (indirect) = irrevokable
                            if (priv.getType().getValue().equals(ScopeEnum.EFFECTIVE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 2:
                            // all
                            result.add(priv);
                            break;
                        default:
                            // Must never occur.
                            GrouperSession.stopQuietly(grouperSession);
                            throw new ESCOTechnicalException("The scope is invalid.");
                    }
                }
            }

            subjects = group.getReaders();
            for (Subject element : subjects) {
                LazySubject object = (LazySubject) element;
                Privilege priv = GrouperServiceApi.this.convertToPrivilege(object, thePrivilegesScope, "read");
                if (priv != null) {
                    switch (thePrivilegesScope.getCode().intValue()) {
                        case 0:
                            // immediate (direct) = revokable
                            if (priv.getType().getValue().equals(ScopeEnum.IMMEDIATE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 1:
                            // effective (indirect) = irrevokable
                            if (priv.getType().getValue().equals(ScopeEnum.EFFECTIVE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 2:
                            // all
                            result.add(priv);
                            break;
                        default:
                            // Must never occur.
                            GrouperSession.stopQuietly(grouperSession);
                            throw new ESCOTechnicalException("The scope is invalid.");
                    }
                }
            }

            subjects = group.getViewers();
            for (Subject element : subjects) {
                LazySubject object = (LazySubject) element;
                Privilege priv = GrouperServiceApi.this.convertToPrivilege(object, thePrivilegesScope, "view");
                if (priv != null) {
                    switch (thePrivilegesScope.getCode().intValue()) {
                        case 0:
                            // immediate (direct) = revokable
                            if (priv.getType().getValue().equals(ScopeEnum.IMMEDIATE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 1:
                            // effective (indirect) = irrevokable
                            if (priv.getType().getValue().equals(ScopeEnum.EFFECTIVE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 2:
                            // all
                            result.add(priv);
                            break;
                        default:
                            // Must never occur.
                            GrouperSession.stopQuietly(grouperSession);
                            throw new ESCOTechnicalException("The scope is invalid.");
                    }
                }
            }

            subjects = group.getOptins();
            for (Subject element : subjects) {
                LazySubject object = (LazySubject) element;
                Privilege priv = GrouperServiceApi.this.convertToPrivilege(object, thePrivilegesScope, "optin");
                if (priv != null) {
                    switch (thePrivilegesScope.getCode().intValue()) {
                        case 0:
                            // immediate (direct) = revokable
                            if (priv.getType().getValue().equals(ScopeEnum.IMMEDIATE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 1:
                            // effective (indirect) = irrevokable
                            if (priv.getType().getValue().equals(ScopeEnum.EFFECTIVE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 2:
                            // all
                            result.add(priv);
                            break;
                        default:
                            // Must never occur.
                            GrouperSession.stopQuietly(grouperSession);
                            throw new ESCOTechnicalException("The scope is invalid.");
                    }
                }
            }

            subjects = group.getOptouts();
            for (Subject element : subjects) {
                LazySubject object = (LazySubject) element;
                Privilege priv = GrouperServiceApi.this.convertToPrivilege(object, thePrivilegesScope, "optout");
                if (priv != null) {
                    switch (thePrivilegesScope.getCode().intValue()) {
                        case 0:
                            // immediate (direct) = revokable
                            if (priv.getType().getValue().equals(ScopeEnum.IMMEDIATE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 1:
                            // effective (indirect) = irrevokable
                            if (priv.getType().getValue().equals(ScopeEnum.EFFECTIVE.getValue())) {
                                result.add(priv);
                            }
                            break;
                        case 2:
                            // all
                            result.add(priv);
                            break;
                        default:
                            // Must never occur.
                            GrouperSession.stopQuietly(grouperSession);
                            throw new ESCOTechnicalException("The scope is invalid.");
                    }
                }
            }

        } else
            if (PrivilegeSearchEnum.STEM.equals(theTypeSearch)) {
                stem = StemFinder.findByName(grouperSession, theStemOrGroupName, true);

                Set < Subject > subjects = stem.getStemmers();
                for (Subject element : subjects) {
                    LazySubject object = (LazySubject) element;
                    Privilege priv = GrouperServiceApi.this.convertToPrivilege(object, thePrivilegesScope, "stem");
                    if (priv != null) {
                        switch (thePrivilegesScope.getCode().intValue()) {
                            case 0:
                                // immediate (direct) = revokable
                                if (priv.getType().getValue().equals(ScopeEnum.IMMEDIATE.getValue())) {
                                    result.add(priv);
                                }
                                break;
                            case 1:
                                // effective (indirect) = irrevokable
                                if (priv.getType().getValue().equals(ScopeEnum.EFFECTIVE.getValue())) {
                                    result.add(priv);
                                }
                                break;
                            case 2:
                                // all
                                result.add(priv);
                                break;
                            default:
                                // Must never occur.
                                GrouperSession.stopQuietly(grouperSession);
                                throw new ESCOTechnicalException("The scope is invalid.");
                        }
                    }
                }
                subjects = stem.getCreators();
                for (Subject element : subjects) {
                    LazySubject object = (LazySubject) element;
                    Privilege priv = GrouperServiceApi.this.convertToPrivilege(object, thePrivilegesScope,
                            "create");
                    if (priv != null) {
                        switch (thePrivilegesScope.getCode().intValue()) {
                            case 0:
                                // immediate (direct) = revokable
                                if (priv.getType().getValue().equals(ScopeEnum.IMMEDIATE.getValue())) {
                                    result.add(priv);
                                }
                                break;
                            case 1:
                                // effective (indirect) = irrevokable
                                if (priv.getType().getValue().equals(ScopeEnum.EFFECTIVE.getValue())) {
                                    result.add(priv);
                                }
                                break;
                            case 2:
                                // all
                                result.add(priv);
                                break;
                            default:
                                // Must never occur.
                                GrouperSession.stopQuietly(grouperSession);
                                throw new ESCOTechnicalException("The scope is invalid.");
                        }
                    }
                }

            } else {
                GrouperSession.stopQuietly(grouperSession);
                // Must never occur.
                throw new ESCOTechnicalException("The type must be group or stem.");
            }
        GrouperSession.stopQuietly(grouperSession);
        return result;
    }

    /**
     * {@inheritDoc}
     */
    public void assignStemPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theStemIdOn, final Privilege thePrivilege) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException, ESCOInsufficientPrivilegesException {
        try {
            this.assignOrRemovePrivilegesOnStemOrGroup(thePerson, theSubjectIdTo, theStemIdOn, thePrivilege, true,
                    PrivilegeSearchEnum.STEM);
        } catch (ESCOGroupNotUniqueException e) {
            // this case doesn't happen if the type is stem
        } catch (ESCOGroupNotFoundException e) {
            // this case doesn't happen if the type is stem
        } catch (ESCOSubjectNotFoundException e) {
            // this case doesn't happen if the type is stem
        }
    }

    /**
     * Assigns or removes a privilege on a folder to a subject (group or
     * person).
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theSubjectIdTo
     *            the id of the subject (group or person) who the privileges are
     *            granted/revoked to.
     * @param theStemOrGroupUuidOn
     *            the uuid of the stem/group on which the privileges are
     *            granted/revoked.
     * @param thePrivilege
     *            the privilege to assign/remove.
     * @param isAssign
     *            is true if the privilege must be assigned and false if the
     *            privilege must be removed
     * @param theType
     *            the type of target : stem or group
     * @throws ESCOStemNotUniqueException
     *             if the stem is not unique
     * @throws ESCOStemNotFoundException
     *             if the stem is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOSubjectNotFoundException
     *             if the subject matches with theSubjectIdTo is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to assign/remove
     *             privileges.
     */
    private void assignOrRemovePrivilegesOnStemOrGroup(final Person thePerson, final String theSubjectIdTo,
            final String theStemOrGroupUuidOn, final Privilege thePrivilege, final boolean isAssign,
            final PrivilegeSearchEnum theType) throws ESCOStemNotUniqueException, ESCOStemNotFoundException,
            ESCOGroupNotUniqueException, ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException,
            ESCOSubjectNotFoundException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theSubjectIdTo, "The subject id must be defined");
        Validate.notNull(theStemOrGroupUuidOn, ServiceConstants.THE_STEM_OR_GROUP_MUST_BE_DEFINED);
        Validate.notNull(thePrivilege, "The privilege must be defined");

        GrouperSession grouperSession = null;
        Subject subject = null;
        Subject subjectTo = null;
        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            subjectTo = SubjectFinder.findById(theSubjectIdTo, true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOSubjectNotFoundException(ServiceConstants.SUBJECT_NOT_FOUND, e);
        } catch (SubjectNotUniqueException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOSubjectNotFoundException(ServiceConstants.SUBJECT_NOT_FOUND, e);
        }

        edu.internet2.middleware.grouper.privs.Privilege privilege = edu.internet2.middleware.grouper.privs.Privilege
                .getInstance(thePrivilege.getPrivilegeName());

        if (PrivilegeSearchEnum.STEM.equals(theType)) {
            try {
                edu.internet2.middleware.grouper.Stem stem = StemFinder.findByUuid(grouperSession,
                        theStemOrGroupUuidOn, true);
                if (isAssign) {
                    stem.grantPriv(subjectTo, privilege, false);
                } else {
                    stem.revokePriv(subjectTo, privilege, false);
                }
            } catch (StemNotFoundException e) {
                GrouperSession.stopQuietly(grouperSession);
                throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
            } catch (InsufficientPrivilegeException e) {
                GrouperSession.stopQuietly(grouperSession);
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
            } catch (GrantPrivilegeException e) {
                GrouperSession.stopQuietly(grouperSession);
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
            }
        } else
            if (PrivilegeSearchEnum.GROUP.equals(theType)) {
                try {
                    edu.internet2.middleware.grouper.Group group = GroupFinder.findByUuid(grouperSession,
                            theStemOrGroupUuidOn, true);
                    if (isAssign) {
                        group.grantPriv(subjectTo, privilege, false);
                    } else {
                        group.revokePriv(subjectTo, privilege, false);
                    }
                } catch (GroupNotFoundException e) {
                    GrouperSession.stopQuietly(grouperSession);
                    throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
                } catch (InsufficientPrivilegeException e) {
                    GrouperSession.stopQuietly(grouperSession);
                    throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
                } catch (GrantPrivilegeException e) {
                    GrouperSession.stopQuietly(grouperSession);
                    throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, e);
                }
            } else {
                GrouperSession.stopQuietly(grouperSession);
                // This case must never occur
                throw new ESCOTechnicalException("The type is not stem or group");
            }
        GrouperSession.stopQuietly(grouperSession);
    }

    /**
     * {@inheritDoc}
     */
    public void removeStemPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theStemIdOn, final Privilege thePrivilege) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException, ESCOInsufficientPrivilegesException {
        try {
            this.assignOrRemovePrivilegesOnStemOrGroup(thePerson, theSubjectIdTo, theStemIdOn, thePrivilege,
                    false, PrivilegeSearchEnum.STEM);
        } catch (ESCOGroupNotUniqueException e) {
            // this case doesn't happen if the type is stem
        } catch (ESCOGroupNotFoundException e) {
            // this case doesn't happen if the type is stem
        } catch (ESCOSubjectNotFoundException e) {
            // this case doesn't happen if the type is stem
        }
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findDefaultGroupPrivileges(final Person thePerson, final String theGroupName) {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupName, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        GrouperSession grouperSession = null;
        Subject subject = null;
        Subject subjectGrouperAll = null;
        List < Privilege > myPrivileges = new ArrayList < Privilege >();

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            subjectGrouperAll = SubjectFinder.findById(ServiceConstants.GROUPER_ALL, true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder.findByName(grouperSession, theGroupName,
                    true);

            for (AccessPrivilege privilege : group.getPrivs(subjectGrouperAll)) {
                Privilege myPrivilege = new Privilege();
                myPrivilege.setPrivilegeName(privilege.getName());
                myPrivilege.setPrivilegeType(privilege.getType());
                myPrivilege.setAllowed(privilege.isRevokable());
                myPrivilege.setGroup(this.getGroupAPIWrapper().wrap(group));
                myPrivilege.setType(ScopeEnum.getFromValue(privilege.getType()));
                myPrivileges.add(myPrivilege);
            }
        } catch (GroupNotFoundException e) {
        }
        GrouperSession.stopQuietly(grouperSession);
        return myPrivileges;
    }

    /**
     * {@inheritDoc}
     */
    public void assignGroupPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theGroupIdOn, final Privilege thePrivilege) throws ESCOGroupNotUniqueException,
            ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException {
        try {
            this.assignOrRemovePrivilegesOnStemOrGroup(thePerson, theSubjectIdTo, theGroupIdOn, thePrivilege,
                    true, PrivilegeSearchEnum.GROUP);
        } catch (ESCOStemNotUniqueException e) {
            // this case doesn't happen if the type is group
        } catch (ESCOStemNotFoundException e) {
            // this case doesn't happen if the type is group
        } catch (ESCOSubjectNotFoundException e) {
            // this case doesn't happen if the type is group
        }
    }

    /**
     * {@inheritDoc}
     */
    public void removeGroupPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theGroupIdOn, final Privilege thePrivilege) throws ESCOGroupNotUniqueException,
            ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException {
        try {
            this.assignOrRemovePrivilegesOnStemOrGroup(thePerson, theSubjectIdTo, theGroupIdOn, thePrivilege,
                    false, PrivilegeSearchEnum.GROUP);
        } catch (ESCOStemNotUniqueException e) {
            // this case doesn't happen if the type is group
        } catch (ESCOStemNotFoundException e) {
            // this case doesn't happen if the type is group
        } catch (ESCOSubjectNotFoundException e) {
            // this case doesn't happen if the type is group
        }
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotFoundException
     */
    public ArrayListMultimap < Integer, Stem > getAllStemsFrom(final String theParentName,
            final String thePersonId, final Boolean theSearchIfEmpty, final String searchMode)
            throws ESCOStemNotFoundException {
        Validate.notNull(theParentName, "The name of the parent must be defined");
        Validate.notNull(thePersonId, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);

        ArrayListMultimap < Integer, Stem > requestResult = ArrayListMultimap.create();
        int cpt = 0;
        String loadPerf = PropertyManager.find("LOAD_PERFORMANCE_PACK").deType(String.class);

        // On passe loadPerfActiv à true si on a une valeur (true ou int)
        boolean loadPerfActiv = !"false".equals(loadPerf);
        int seuilStem = -1;

        if (!"true".equals(loadPerf)) {
            try {
                // On récupère le seul
                seuilStem = Integer.parseInt(loadPerf);
            } catch (Exception e) {
                // En cas d'erreur on passe loadPerfActiv à false
                seuilStem = -1;
                loadPerfActiv = false;
                this.LOGGER.debug("getAllStemsFrom() - Le paramètrage du seuil est incorect " + loadPerf
                        + " doit être un entier.");
            }
        }

        GrouperSession session = null;
        Subject person = null;
        try {
            person = SubjectFinder.findById(thePersonId, true);
            session = GrouperSession.start(person);

        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
            GrouperSession.stopQuietly(session);
            throw new ESCOTechnicalException(ServiceConstants.SUBJECT_NOT_FOUND, e);
        } catch (SubjectNotUniqueException e) {
            GrouperSession.stopQuietly(session);
            throw new ESCOTechnicalException(ServiceConstants.SUBJECT_NOT_UNIQUE, e);
        }

        try {
            edu.internet2.middleware.grouper.Stem parentStem = StemFinder.findByName(session, theParentName, true);

            Set < edu.internet2.middleware.grouper.Stem > childStems = parentStem.getChildStems(Scope.ONE);

            // On applique le seuil // pl
            loadPerfActiv = loadPerfActiv && (seuilStem == -1 || childStems.size() <= seuilStem);

            // pl creation du grouperhelper qui va permetre de tester les stems
            EscoGrouperHelper egh = new EscoGrouperHelper(session);

            for (edu.internet2.middleware.grouper.Stem stem : childStems) {
                // pl modification de tout le for ...
                if (!loadPerfActiv || egh.userHasPrivs(stem.getName())) {
                    Stem aux = this.stemAPIWrapper.wrap(stem);
                    aux.setHasCreate(false);
                    aux.setHasStem(false);
                    Set < NamingPrivilege > privs = stem.getPrivs(person);

                    for (NamingPrivilege priv : privs) {
                        PrivilegeAssignUtils.assignPrivilege(aux, priv.getName());
                    }
                    requestResult.put(cpt++, aux);
                }
            }
        } catch (StemNotFoundException stemNotFoundException) {
            GrouperSession.stopQuietly(session);
            throw new ESCOStemNotFoundException();
        }
        GrouperSession.stopQuietly(session);
        return requestResult;
    }

    /**
     * {@inheritDoc}
     */
    public GroupPrivilegeEnum getPrivilegeOnGroup(final Person thePerson, final Group theGroup)
            throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException, CloneNotSupportedException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroup, "The group name must be defined");

        GrouperSession grouperSession = null;
        Subject subject = null;
        GroupPrivilegeEnum groupPrivilegeEnum = GroupPrivilegeEnum.NONE;

        try {
            subject = SubjectFinder.findById(thePerson.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Group group = GroupFinder.findByName(grouperSession, theGroup
                    .getName(), true);

            if (PrivilegeHelper.canAdmin(grouperSession, group, subject)) {
                groupPrivilegeEnum = GroupPrivilegeEnum.ADMIN;
            } else
                if (PrivilegeHelper.canUpdate(grouperSession, group, subject)) {
                    groupPrivilegeEnum = GroupPrivilegeEnum.UPDATE;
                } else
                    if (PrivilegeHelper.canRead(grouperSession, group, subject)) {
                        groupPrivilegeEnum = GroupPrivilegeEnum.READ;
                    } else
                        if (PrivilegeHelper.canView(grouperSession, group, subject)) {
                            groupPrivilegeEnum = GroupPrivilegeEnum.VIEW;
                        } else
                            if (PrivilegeHelper.canOptin(grouperSession, group, subject)) {
                                groupPrivilegeEnum = GroupPrivilegeEnum.OPTIN;
                            } else
                                if (PrivilegeHelper.canOptout(grouperSession, group, subject)) {
                                    groupPrivilegeEnum = GroupPrivilegeEnum.OPTOUT;
                                } else {
                                    groupPrivilegeEnum = GroupPrivilegeEnum.NONE;
                                }

        } catch (GroupNotFoundException e) {
            GrouperSession.stopQuietly(grouperSession);
            throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }
        GrouperSession.stopQuietly(grouperSession);
        return groupPrivilegeEnum;
    }

    /**
     * Get if a stem is empty.
     * 
     * @param theParentName
     *            The stem to find the empty value.
     * @param thePersonId
     *            The connected person id.
     * @return true if the stem is empty else false otherwise.
     * @throws ESCOStemNotFoundException
     *             exception sur le stem
     */
    private Boolean isEmptyStem(final String theParentName) throws ESCOStemNotFoundException {
        Boolean isEmptyStem = Boolean.FALSE;

        GrouperSession session = null;

        try {
            session = GrouperSession.startRootSession();
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        try {
            edu.internet2.middleware.grouper.Stem myStem = StemFinder.findByName(session, theParentName, true);
            isEmptyStem = myStem.getChildStems().isEmpty() && myStem.getChildGroups().isEmpty();
        } catch (StemNotFoundException e) {
            GrouperSession.stopQuietly(session);
            throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, e);
        }

        return isEmptyStem;
    }

}
