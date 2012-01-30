package org.esco.grouperui.services.grouper.internal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.GroupType;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Response;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.StemPrivilegeEnum;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
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
import org.esco.grouperui.services.application.filters.PrivilegeSearchEnum;
import org.esco.grouperui.services.application.filters.PrivilegeTypeEnum;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchStemEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.esco.grouperui.services.extension.ServiceConstants;
import org.esco.grouperui.services.grouper.WSUtils;
import org.esco.grouperui.services.grouper.internal.utils.WSConstants;
import org.esco.grouperui.services.grouper.strategy.search.IStrategyGroupSearch;
import org.esco.grouperui.services.grouper.strategy.search.locator.IStrategyGroupSearchLocator;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import com.google.common.collect.ArrayListMultimap;

import edu.internet2.middleware.grouperClient.api.GcAddMember;
import edu.internet2.middleware.grouperClient.api.GcAssignGrouperPrivilegesLite;
import edu.internet2.middleware.grouperClient.api.GcDeleteMember;
import edu.internet2.middleware.grouperClient.api.GcFindGroups;
import edu.internet2.middleware.grouperClient.api.GcFindStems;
import edu.internet2.middleware.grouperClient.api.GcGetGrouperPrivilegesLite;
import edu.internet2.middleware.grouperClient.api.GcGetMembers;
import edu.internet2.middleware.grouperClient.api.GcGroupDelete;
import edu.internet2.middleware.grouperClient.api.GcGroupSave;
import edu.internet2.middleware.grouperClient.api.GcStemDelete;
import edu.internet2.middleware.grouperClient.api.GcStemSave;
import edu.internet2.middleware.grouperClient.ws.GcTransactionType;
import edu.internet2.middleware.grouperClient.ws.GcWebServiceError;
import edu.internet2.middleware.grouperClient.ws.WsMemberFilter;
import edu.internet2.middleware.grouperClient.ws.beans.WsAddMemberResult;
import edu.internet2.middleware.grouperClient.ws.beans.WsAddMemberResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsDeleteMemberResult;
import edu.internet2.middleware.grouperClient.ws.beans.WsDeleteMemberResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsFindGroupsResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsFindStemsResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsGetGrouperPrivilegesLiteResult;
import edu.internet2.middleware.grouperClient.ws.beans.WsGetMembersResult;
import edu.internet2.middleware.grouperClient.ws.beans.WsGetMembersResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroupLookup;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroupSaveResult;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroupSaveResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroupToSave;
import edu.internet2.middleware.grouperClient.ws.beans.WsGrouperPrivilegeResult;
import edu.internet2.middleware.grouperClient.ws.beans.WsQueryFilter;
import edu.internet2.middleware.grouperClient.ws.beans.WsStem;
import edu.internet2.middleware.grouperClient.ws.beans.WsStemLookup;
import edu.internet2.middleware.grouperClient.ws.beans.WsStemQueryFilter;
import edu.internet2.middleware.grouperClient.ws.beans.WsStemSaveResult;
import edu.internet2.middleware.grouperClient.ws.beans.WsStemSaveResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsStemToSave;
import edu.internet2.middleware.grouperClient.ws.beans.WsSubject;
import edu.internet2.middleware.grouperClient.ws.beans.WsSubjectLookup;

/**
 * <b>Implementation for grouper service client.</b>
 * 
 * @author SopraGroup
 */
public class GrouperServiceClient implements IGrouperService {

    /** UID. */
    private static final long                                serialVersionUID = -590789800053182579L;

    /** Logger for this class. */
    private static final IESCOLogger                         LOGGER           = ESCOLoggerFactory
                                                                                      .getLogger(GrouperServiceClient.class);

    /** Wrapper : WSStem to Stem. */
    private IWrapper < WsStem, Stem >                        stemWrapper;

    /** Wrapper : WSGroup to Group. */
    private IWrapper < WsGroup, Group >                      groupWrapper;

    /** Strategy locator. */
    private IStrategyGroupSearchLocator                      strategyLocator;

    /** Wrapper : WsGrouperPrivilegeResult to Privilege. */
    private IWrapper < WsGrouperPrivilegeResult, Privilege > privilegeWrapper;

    /** Wrapper : Stem to WSStem. */
    private IWrapper < Stem, WsStem >                        wsStemWrapper;

    /** Wrapper : Group to WsGroup. */
    private IWrapper < Group, WsGroup >                      wsGroupWrapper;

    /** GroupService. */
    private IGrouperService                                  grouperService;

    /**
     * Default constructor.
     */
    public GrouperServiceClient() {
    }

    /**
     * Getter for attribute <b>stemWrapper</b>.
     * 
     * @return the stemWrapper
     */
    public IWrapper < WsStem, Stem > getStemWrapper() {
        return this.stemWrapper;
    }

    /**
     * Setter for attribute <b>stemWrapper</b>.
     * 
     * @param theStemWrapper
     *            : the stemWrapper to set
     */
    public void setStemWrapper(final IWrapper < WsStem, Stem > theStemWrapper) {
        this.stemWrapper = theStemWrapper;
    }

    /**
     * Getter for attribute <b>groupWrapper</b>.
     * 
     * @return the groupWrapper
     */
    public IWrapper < WsGroup, Group > getGroupWrapper() {
        return this.groupWrapper;
    }

    /**
     * Setter for <b>groupWrapper</b>.
     * 
     * @param theGroupWrapper
     *            : the groupWrapper to set.
     */
    public final void setGroupWrapper(final IWrapper < WsGroup, Group > theGroupWrapper) {
        this.groupWrapper = theGroupWrapper;
    }

    /**
     * Getter for attribute <b>strategyLocator</b>.
     * 
     * @return the strategyLocator
     */
    public IStrategyGroupSearchLocator getStrategyLocator() {
        return this.strategyLocator;
    }

    /**
     * Setter for attribute <b>strategyLocator</b>.
     * 
     * @param theStrategyLocator
     *            : the strategyLocator to set
     */
    public void setStrategyLocator(final IStrategyGroupSearchLocator theStrategyLocator) {
        this.strategyLocator = theStrategyLocator;
    }

    /**
     * Getter for attribute <b>privilegeWrapper</b>.
     * 
     * @return the privilegeWrapper
     */
    public IWrapper < WsGrouperPrivilegeResult, Privilege > getPrivilegeWrapper() {
        return this.privilegeWrapper;
    }

    /**
     * Setter for attribute <b>privilegeWrapper</b>.
     * 
     * @param thePrivilegeWrapper
     *            : the privilegeWrapper to set
     */
    public void setPrivilegeWrapper(final IWrapper < WsGrouperPrivilegeResult, Privilege > thePrivilegeWrapper) {
        this.privilegeWrapper = thePrivilegeWrapper;
    }

    /**
     * Getter for attribute <b>wsStemWrapper</b>.
     * 
     * @return the wsStemWrapper
     */
    public IWrapper < Stem, WsStem > getWsStemWrapper() {
        return this.wsStemWrapper;
    }

    /**
     * Setter for attribute <b>wsStemWrapper</b>.
     * 
     * @param theWsStemWrapper
     *            the wsStemWrapper to set
     */
    public void setWsStemWrapper(final IWrapper < Stem, WsStem > theWsStemWrapper) {
        this.wsStemWrapper = theWsStemWrapper;
    }

    /**
     * Getter for attribute <b>wsGroupWrapper</b>.
     * 
     * @return the wsGroupWrapper
     */
    public IWrapper < Group, WsGroup > getWsGroupWrapper() {
        return this.wsGroupWrapper;
    }

    /**
     * Setter for attribute <b>wsGroupWrapper</b>.
     * 
     * @param theWsGroupWrapper
     *            the wsGroupWrapper to set
     */
    public void setWsGroupWrapper(final IWrapper < Group, WsGroup > theWsGroupWrapper) {
        this.wsGroupWrapper = theWsGroupWrapper;
    }

    /**
     * Setter for attribute <b>grouperService</b>.
     * 
     * @param theGrouperService
     *            the grouperService to set.
     */
    public final void setGrouperService(final IGrouperService theGrouperService) {
        this.grouperService = theGrouperService;
    }

    /**
     * Getter for attribute <b>grouperService</b>.
     * 
     * @return the grouperService to get.
     */
    public final IGrouperService getGrouperService() {
        return this.grouperService;
    }

    /**
     * {@inheritDoc}
     */
    public Person findSubjectById(final String theIdentifier) throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public List < Person > searchSubjects(final Person thePerson, final String thePath, final String theTerm) {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findMemberships(final Person thePerson, final String theGroupId,
            final ScopeEnum theMembershipsScope) throws ESCOGroupNotFoundException {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public List < GroupType > findListTypes(final String[] theNames) {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public Map < String, GroupType > findGroupTypes(final String[] theNames) {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findGroupsMemberOptinOptout(final Person thePerson) throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public Boolean moveStem(final Person thePerson, final String theOriginalStemName, final Stem theTargetStem)
            throws ESCOStemNotMoveException, ESCOStemNotFoundException {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
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
        // long timeTotal = 0;
        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        Members members = new Members();
        GcGetMembers gcGetMembers = new GcGetMembers();
        WsGetMembersResults wsGetMembersResults = null;

        // -------------------------------------------
        // ASSIGNMENTS & CALL
        // -------------------------------------------
        gcGetMembers.assignIncludeGroupDetail(false);
        gcGetMembers.assignIncludeSubjectDetail(true);
        gcGetMembers.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        // Adding the list of attributes we want to retrieve
        for (String attr : theAttributes) {
            gcGetMembers.addSubjectAttributeName(attr);
        }

        // Adding group name
        gcGetMembers.addGroupName(theGroupName);

        // Allow to retrieve : all, immediate or effective members
        if (ScopeEnum.ALL.equals(theMembersScope)) {
            gcGetMembers.assignMemberFilter(WsMemberFilter.All);
        } else
            if (ScopeEnum.EFFECTIVE.equals(theMembersScope)) {
                gcGetMembers.assignMemberFilter(WsMemberFilter.Effective);
            } else
                if (ScopeEnum.IMMEDIATE.equals(theMembersScope)) {
                    gcGetMembers.assignMemberFilter(WsMemberFilter.Immediate);
                }

        try {
            // long deb = System.currentTimeMillis();
            wsGetMembersResults = gcGetMembers.execute();
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            if (gcwse.getMessage().contains(WSConstants.GROUP_NOT_FOUND_EXCEPTION)) {
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
            }
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        // Retrieve information from the result
        if (WSUtils.isOK(wsGetMembersResults)) {
            // the ws result.
            WsGetMembersResult[] memberResults = wsGetMembersResults.getResults();
            if (memberResults != null && memberResults.length > 0) {
                WsGetMembersResult memberResult = memberResults[0];

                // the list of members (subjects)
                WsSubject[] subjects = memberResult.getWsSubjects();
                if (subjects != null && subjects.length > 0) {

                    SourceTypeEnum type = null;
                    Map < String, Set < String > > memberAttr = null;
                    String[] subjectAttr = null;

                    // list of attribute used.
                    String[] resultAttributeNames = wsGetMembersResults.getSubjectAttributeNames();

                    for (WsSubject subject : subjects) {
                        type = theSources.get(subject.getSourceId());
                        memberAttr = new HashMap < String, Set < String > >();
                        subjectAttr = subject.getAttributeValues();

                        // type is one of the parameter, the subject attributes
                        // values are not null, the subject attributes names are
                        // not null and their size are the same
                        if (type != null && subjectAttr != null && resultAttributeNames != null
                                && subjectAttr.length == resultAttributeNames.length) {

                            String value = null;
                            String key = null;
                            Set < String > setAttr = null;
                            for (int i = 0; i < subjectAttr.length; i++) {
                                setAttr = new HashSet < String >();
                                value = subjectAttr[i];
                                key = resultAttributeNames[i];
                                setAttr.add(value);
                                memberAttr.put(key, setAttr);
                            }

                            if (SourceTypeEnum.PERSON.equals(type)) {
                                Person person = new Person();
                                person.setId(subject.getId());
                                person.setAttributes(memberAttr);
                                person.setTypeEnum(type);
                                members.addPerson(person);
                            } else
                                if (SourceTypeEnum.GROUP.equals(type)) {
                                    Group groupFind = null;
                                    try {
                                        // long deb =
                                        // System.currentTimeMillis();
                                        groupFind = this.grouperService.findGroupByUid(thePerson, subject.getId());
                                        // timeTotal +=
                                        // System.currentTimeMillis() - deb;
                                    } catch (ESCOGroupNotUniqueException e) {
                                    } catch (ESCOGroupNotFoundException e) {
                                    }

                                    if (groupFind != null) {
                                        Group group = new Group();
                                        group.setIdGroup(subject.getId());
                                        group.setAttributes(memberAttr);
                                        group.setTypeEnum(type);
                                        members.addGroup(group);
                                    }
                                } else {
                                    // Must never occur.
                                    throw new ESCOTechnicalException("The type of source is undefined.");
                                }
                        }
                    }
                }
            }
            // Log to calculate time of service
            // GrouperServiceClient.LOGGER.error("findMembers;" + timeTotal);
            return members;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

    /**
     * {@inheritDoc}
     */
    public Integer countPersons(final Person thePerson, final List < String > theGroupsName,
            final Map < String, SourceTypeEnum > theSources, final ScopeEnum theMembersScope)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupsName, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        ArrayList < String > myIds = new ArrayList < String >();

        // long timeTotal = 0;
        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        GcGetMembers gcGetMembers = null;
        WsGetMembersResults wsGetMembersResults = null;

        // Adding the list of attributes we want to retrieve
        for (String attr : theGroupsName) {
            gcGetMembers = new GcGetMembers();

            // -------------------------------------------
            // ASSIGNMENTS & CALL
            // -------------------------------------------
            gcGetMembers.assignIncludeGroupDetail(false);
            gcGetMembers.assignIncludeSubjectDetail(false);
            gcGetMembers.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

            gcGetMembers.addGroupName(attr);

            // Allow to retrieve : all, immediate or effective members
            if (ScopeEnum.ALL.equals(theMembersScope)) {
                gcGetMembers.assignMemberFilter(WsMemberFilter.All);
            } else
                if (ScopeEnum.EFFECTIVE.equals(theMembersScope)) {
                    gcGetMembers.assignMemberFilter(WsMemberFilter.Effective);
                } else
                    if (ScopeEnum.IMMEDIATE.equals(theMembersScope)) {
                        gcGetMembers.assignMemberFilter(WsMemberFilter.Immediate);
                    }

            try {
                // long deb = System.currentTimeMillis();
                wsGetMembersResults = gcGetMembers.execute();
                // timeTotal += System.currentTimeMillis() - deb;
            } catch (GcWebServiceError gcwse) {
                if (gcwse.getMessage().contains(WSConstants.GROUP_NOT_FOUND_EXCEPTION)) {
                    throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, gcwse);
                }
                if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                    throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
                }
                throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse),
                        gcwse);
            }

            // Retrieve information from the result
            if (WSUtils.isOK(wsGetMembersResults)) {
                // the ws result.
                WsGetMembersResult[] memberResults = wsGetMembersResults.getResults();
                if (memberResults != null && memberResults.length > 0) {
                    WsGetMembersResult memberResult = memberResults[0];

                    // the list of members (subjects)
                    WsSubject[] subjects = memberResult.getWsSubjects();
                    if (subjects != null && subjects.length > 0) {
                        for (WsSubject subject : subjects) {
                            if (SourceTypeEnum.PERSON.equals(theSources.get(subject.getSourceId()))) {
                                if (!myIds.contains(subject.getId())) {
                                    myIds.add(subject.getId());
                                }
                            }
                        }
                    }
                }
                // Log to calculate time of service
                // GrouperServiceClient.LOGGER.error("countPersons;" +
                // timeTotal);
            } else {
                throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
            }

        }

        return new Integer(myIds.size());
    }

    /**
     * {@inheritDoc}
     */
    public void addMembers(final Person thePerson, final String theGroupName, final List < String > theMembersToAdd)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCOAddMemberException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupName, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);
        Validate.notNull(theMembersToAdd, ServiceConstants.THE_MEMBERS_MUST_BE_DEFINED);

        if (!theMembersToAdd.isEmpty()) {
            GcAddMember gcAddMember = new GcAddMember();

            gcAddMember.assignIncludeGroupDetail(true);
            gcAddMember.assignIncludeSubjectDetail(true);
            gcAddMember.assignReplaceAllExisting(false);
            gcAddMember.assignGroupName(theGroupName);
            gcAddMember.assignTxType(GcTransactionType.READ_WRITE_NEW);
            gcAddMember.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));
            for (String subjectId : theMembersToAdd) {
                gcAddMember.addSubjectId(subjectId);
            }

            try {
                gcAddMember.execute();
            } catch (GcWebServiceError gcwse) {
                if (gcwse.getMessage().contains(WSConstants.GROUP_NOT_FOUND_EXCEPTION)) {
                    throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, gcwse);
                }
                if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                    throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
                }
                // Indicates which member could not be added and assigns an
                // exception to this member
                ESCOAddMemberException exception = new ESCOAddMemberException();
                WsAddMemberResults response = (WsAddMemberResults) gcwse.getContainerResponseObject();
                if (response != null) {
                    WsAddMemberResult[] results = response.getResults();
                    if (results != null) {
                        int position = 1;
                        for (WsAddMemberResult result : results) {
                            exception.add(new Response(result.getWsSubject().getId(), WSUtils
                                    .convertToBoolean(result.getResultMetadata().getSuccess()), result
                                    .getResultMetadata().getResultCode(), WSUtils.getDetails(gcwse, position++)));
                        }
                    }
                    throw exception;
                }
                throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse),
                        gcwse);
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    public void removeMembers(final Person thePerson, final String theGroupName,
            final List < String > theMembersToRemove) throws ESCOGroupNotFoundException,
            ESCOInsufficientPrivilegesException, ESCODeleteMemberException {
        this.grouperService.removeMembers(thePerson, theGroupName, theMembersToRemove, true);
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

        GcDeleteMember gcDeleteMember = new GcDeleteMember();

        gcDeleteMember.assignIncludeGroupDetail(true);
        gcDeleteMember.assignIncludeSubjectDetail(true);
        gcDeleteMember.assignGroupName(theGroupName);
        gcDeleteMember.assignTxType(GcTransactionType.READ_WRITE_NEW);
        if (isActAsSubject) {
            gcDeleteMember.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));
        }
        for (String subjectID : theMembersToRemove) {
            gcDeleteMember.addSubjectId(subjectID);
        }

        try {
            gcDeleteMember.execute();
        } catch (GcWebServiceError gcwse) {
            if (gcwse.getMessage().contains(WSConstants.GROUP_NOT_FOUND_EXCEPTION)) {
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
            }
            // Indicates which member could not be deleted and assigns an
            // exception to this member
            ESCODeleteMemberException exception = new ESCODeleteMemberException();
            WsDeleteMemberResults response = (WsDeleteMemberResults) gcwse.getContainerResponseObject();
            if (response != null) {
                WsDeleteMemberResult[] results = response.getResults();
                if (results != null) {
                    int position = 1;
                    for (WsDeleteMemberResult result : results) {
                        exception.add(new Response(result.getWsSubject().getId(), WSUtils.convertToBoolean(result
                                .getResultMetadata().getSuccess()), result.getResultMetadata().getResultCode(),
                                WSUtils.getDetails(gcwse, position++)));
                    }
                }
                throw exception;
            }
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }
    }

    /**
     * {@inheritDoc}
     */
    public void copyMembers(final Person thePerson, final String theSourceName, final String theTargetName)
            throws ESCOGroupNotFoundException, ESCOInsufficientPrivilegesException, ESCOAddMemberException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theSourceName, "The source name must be defined");
        Validate.notNull(theTargetName, "The target name must be defined");

        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        GcGetMembers gcGetMembers = new GcGetMembers();
        WsGetMembersResults wsGetMembersResults = null;

        // -------------------------------------------
        // ASSIGNMENTS & CALL
        // -------------------------------------------
        gcGetMembers.assignIncludeGroupDetail(true);
        gcGetMembers.assignIncludeSubjectDetail(true);
        gcGetMembers.addGroupName(theSourceName);
        gcGetMembers.assignMemberFilter(WsMemberFilter.Immediate);
        gcGetMembers.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        try {
            wsGetMembersResults = gcGetMembers.execute();
        } catch (GcWebServiceError gcwse) {
            if (gcwse.getMessage().contains(WSConstants.GROUP_NOT_FOUND_EXCEPTION)) {
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
            }
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        // Retrieve information from the result
        if (WSUtils.isOK(wsGetMembersResults)) {
            WsGetMembersResult[] memberResults = wsGetMembersResults.getResults();
            if (memberResults != null && memberResults.length > 0) {
                WsGetMembersResult memberResult = memberResults[0];
                // the list of members (subjects)
                WsSubject[] subjects = memberResult.getWsSubjects();
                if (subjects != null && subjects.length > 0) {
                    List < String > membersId = new ArrayList < String >();
                    // We build the list of members to add.
                    for (WsSubject subject : subjects) {
                        membersId.add(subject.getId());
                    }
                    this.getGrouperService().addMembers(thePerson, theTargetName, membersId);
                }
            }
        } else {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
        }

    }

    /**
     * Get if a stem is empty.
     * 
     * @param theParentName
     *            The stem to find the empty value.
     * @param thePersonId
     *            The connected person id.
     * @return true if the stem is empty else false otherwise.
     */
    private Boolean isEmptyStem(final String theParentName) {
        Boolean isEmptyStem = Boolean.FALSE;

        final GcFindStems stemsFinder = new GcFindStems();

        WsStemQueryFilter queryFilter = new WsStemQueryFilter();
        queryFilter.setStemQueryFilterType(ServiceConstants.FIND_BY_PARENT_STEM_NAME);
        queryFilter.setParentStemName(theParentName);
        queryFilter.setParentStemNameScope(ServiceConstants.SCOPE_ONE_LEVEL);
        stemsFinder.assignStemQueryFilter(queryFilter);

        WsFindStemsResults results = null;
        try {
            results = stemsFinder.execute();
        } catch (GcWebServiceError gcwse) {
        }

        if (WSUtils.isOK(results)) {
            final WsStem[] stems = results.getStemResults();
            isEmptyStem = stems == null || stems.length == 0;
        }

        if (isEmptyStem) {
            final GcFindGroups groupFinder = new GcFindGroups();

            WsQueryFilter wsQueryFilter = new WsQueryFilter();
            wsQueryFilter.setQueryFilterType(ServiceConstants.FIND_BY_STEM_NAME);
            wsQueryFilter.setStemName(theParentName);
            wsQueryFilter.setStemNameScope(ServiceConstants.SCOPE_ONE_LEVEL);
            groupFinder.assignQueryFilter(wsQueryFilter);

            WsFindGroupsResults resultGroups = null;
            try {
                resultGroups = groupFinder.execute();
            } catch (GcWebServiceError gcwse) {
            }

            if (WSUtils.isOK(resultGroups)) {
                final WsGroup[] groups = resultGroups.getGroupResults();
                isEmptyStem = groups == null || groups.length == 0;
            }
        }
        return isEmptyStem;
    }

    /**
     * {@inheritDoc}
     */
    public ArrayListMultimap < Integer, Stem > getAllStemsFrom(final String theParentName,
            final String thePersonId, final Boolean searchIfEmpty, final String searchMode)
            throws ESCOStemNotFoundException {

        // long timeGlobal = 0;
        Validate.notNull(theParentName, "The name of the parent must be defined");
        Validate.notNull(thePersonId, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);

        WsSubjectLookup subjectLookup = new WsSubjectLookup();
        subjectLookup.setSubjectId(thePersonId);

        WsGroup[] groups = null;
        if (searchMode.equals(ServiceConstants.WITH_STEM_PRIVILEGE_AND_GROUP)) {

            // Get all stem where user has group
            GcFindGroups groupFinder = new GcFindGroups();
            WsQueryFilter queryFilterGroup = new WsQueryFilter();
            queryFilterGroup.setQueryFilterType(ServiceConstants.FIND_BY_STEM_NAME);
            queryFilterGroup.setStemName(theParentName);
            queryFilterGroup.setStemNameScope("ALL_IN_SUBTREE");

            groupFinder.assignQueryFilter(queryFilterGroup);
            groupFinder.assignActAsSubject(subjectLookup);

            WsFindGroupsResults groupResult = null;
            try {
                groupResult = groupFinder.execute();
            } catch (GcWebServiceError gcwse) {
                throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse),
                        gcwse);
            }

            if (WSUtils.isOK(groupResult)) {
                groups = groupResult.getGroupResults();
            }

        }

        ArrayListMultimap < Integer, Stem > requestResult = ArrayListMultimap.create();

        final GcFindStems stemsFinder = new GcFindStems();

        WsStemQueryFilter queryFilter = new WsStemQueryFilter();
        queryFilter.setStemQueryFilterType(ServiceConstants.FIND_BY_PARENT_STEM_NAME);
        queryFilter.setParentStemName(theParentName);
        queryFilter.setParentStemNameScope(ServiceConstants.SCOPE_ONE_LEVEL);
        stemsFinder.assignStemQueryFilter(queryFilter);

        stemsFinder.assignActAsSubject(subjectLookup);

        WsFindStemsResults result = null;
        try {
            // long deb = System.currentTimeMillis();
            result = stemsFinder.execute();
            // timeGlobal = System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(result)) {
            final WsStem[] stems = result.getStemResults();
            if (stems != null) {
                int cpt = 0;

                for (final WsStem stem : stems) {
                    Boolean display = null;

                    if (searchMode.equals(ServiceConstants.WITH_STEM_PRIVILEGE_AND_GROUP)) {
                        // Manage of group
                        if (groups == null) {
                            display = Boolean.FALSE;
                        } else {
                            for (WsGroup group : groups) {
                                if (group.getName().startsWith(stem.getName())) {
                                    display = Boolean.TRUE;
                                    break;
                                }
                            }
                        }
                    }

                    GcGetGrouperPrivilegesLite privilegesReader = new GcGetGrouperPrivilegesLite();
                    privilegesReader.assignStemName(stem.getName());
                    privilegesReader.assignSubjectLookup(subjectLookup);
                    privilegesReader.assignActAsSubject(subjectLookup);
                    WsGetGrouperPrivilegesLiteResult privilegesReadingResult = null;
                    try {
                        // long deb = System.currentTimeMillis();
                        privilegesReadingResult = privilegesReader.execute();
                        // timeGlobal += System.currentTimeMillis() - deb;
                    } catch (GcWebServiceError gcwse) {
                        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS
                                + WSUtils.getResultCode(gcwse), gcwse);
                    }

                    if (WSUtils.isOK(privilegesReadingResult)) {
                        WsGrouperPrivilegeResult[] privResults = privilegesReadingResult.getPrivilegeResults();

                        Stem theStem = this.getStemWrapper().wrap(stem);

                        if (privResults != null && privResults.length > 0) {
                            for (WsGrouperPrivilegeResult privResult : privResults) {
                                theStem = PrivilegeAssignUtils.assignPrivilege(theStem, privResult
                                        .getPrivilegeName());

                                if (searchMode.equals(ServiceConstants.WITH_STEM_PRIVILEGE_AND_GROUP)) {
                                    display = Boolean.TRUE;
                                }
                            }
                        } else {
                            theStem.setHasStem(false);
                            theStem.setHasCreate(false);
                            if (searchMode.equals(ServiceConstants.WITH_STEM_PRIVILEGE_AND_GROUP)) {
                                if (display == null) {
                                    display = Boolean.FALSE;
                                }
                            }
                        }

                        theStem.setIsEmpty(this.isEmptyStem(theStem.getName()));

                        if (searchMode.equals(ServiceConstants.WITH_STEM_PRIVILEGE_AND_GROUP)) {
                            // Manage of stem privilege

                            if (!display) {
                                // Get all stem where user has group
                                final GcFindStems allStemsFinder = new GcFindStems();
                                WsStemQueryFilter queryFilterStem = new WsStemQueryFilter();
                                queryFilterStem.setStemQueryFilterType(ServiceConstants.FIND_BY_PARENT_STEM_NAME);
                                queryFilterStem.setParentStemName(theParentName);
                                queryFilterStem.setParentStemNameScope("ALL_IN_SUBTREE");
                                allStemsFinder.assignStemQueryFilter(queryFilterStem);

                                allStemsFinder.assignActAsSubject(subjectLookup);

                                WsFindStemsResults stemResult = null;
                                try {
                                    stemResult = allStemsFinder.execute();
                                } catch (GcWebServiceError gcwse) {
                                    throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS
                                            + WSUtils.getResultCode(gcwse), gcwse);
                                }
                                WsStem[] tmpAllStems = null;
                                ArrayList < WsStem > allStems = new ArrayList < WsStem >();
                                if (WSUtils.isOK(stemResult)) {
                                    tmpAllStems = stemResult.getStemResults();
                                }

                                for (WsStem aStem : tmpAllStems) {

                                    privilegesReader = new GcGetGrouperPrivilegesLite();
                                    privilegesReader.assignStemName(aStem.getName());
                                    privilegesReader.assignSubjectLookup(subjectLookup);
                                    privilegesReader.assignActAsSubject(subjectLookup);

                                    privilegesReadingResult = null;
                                    try {
                                        privilegesReadingResult = privilegesReader.execute();
                                    } catch (GcWebServiceError gcwse) {
                                        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS
                                                + WSUtils.getResultCode(gcwse), gcwse);
                                    }

                                    if (WSUtils.isOK(privilegesReadingResult)) {
                                        WsGrouperPrivilegeResult[] listOfPrivileges = privilegesReadingResult
                                                .getPrivilegeResults();
                                        if (listOfPrivileges != null) {
                                            allStems.add(aStem);
                                        }
                                    }

                                }

                                for (WsStem aStem : allStems) {
                                    if (aStem.getName().startsWith(stem.getName())) {
                                        display = Boolean.TRUE;
                                        break;
                                    }
                                }
                            }

                        }

                        if (searchMode.equals(ServiceConstants.WITH_STEM_PRIVILEGE_AND_GROUP)) {
                            if (display) {
                                requestResult.put(cpt++, theStem);
                            }
                        } else {
                            requestResult.put(cpt++, theStem);
                        }
                    }
                }
            }
            // Log to calculate time of service
            // GrouperServiceClient.LOGGER.error("getAllStemsFrom;" +
            // theParentName + ";" + timeGlobal);
            return requestResult;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

    /**
     * {@inheritDoc}
     */
    public Stem findStemByUuid(final Person thePerson, final String theUuid) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theUuid, ServiceConstants.THE_ID_MUST_BE_DEFINED);

        WsStemQueryFilter stemQueryFilter = new WsStemQueryFilter();
        stemQueryFilter.setStemUuid(theUuid);
        stemQueryFilter.setStemQueryFilterType(ServiceConstants.FIND_BY_STEM_UUID);

        return this.findStemByQuery(thePerson, stemQueryFilter);
    }

    /**
     * {@inheritDoc}
     */
    public Stem findStemByName(final Person thePerson, final String theName) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theName, ServiceConstants.THE_NAME_MUST_BE_DEFINED);

        WsStemQueryFilter stemQueryFilter = new WsStemQueryFilter();
        stemQueryFilter.setStemQueryFilterType(ServiceConstants.FIND_BY_STEM_NAME);
        stemQueryFilter.setStemName(theName);

        return this.findStemByQuery(thePerson, stemQueryFilter);
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

        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        List < Stem > stems = new ArrayList < Stem >();
        GcFindStems gcFindStems = new GcFindStems();
        WsStemQueryFilter stemQueryFilter = new WsStemQueryFilter();
        WsFindStemsResults wsFindStemsResults = null;

        // -------------------------------------------
        // ASSIGNMENTS & VARIABLES
        // -------------------------------------------
        String prettyTerm = theTerm.replace(ServiceConstants.WILDCARD, ServiceConstants.GROUPER_WILDCARD);
        stemQueryFilter.setParentStemName(thePath);
        stemQueryFilter.setStemQueryFilterType(ServiceConstants.FIND_BY_APPROXIMATE_ATTRIBUTE);
        stemQueryFilter.setStemAttributeName(theField.getValue());
        stemQueryFilter.setStemAttributeValue(prettyTerm);
        gcFindStems.assignStemQueryFilter(stemQueryFilter);
        gcFindStems.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        try {
            wsFindStemsResults = gcFindStems.execute();
        } catch (GcWebServiceError gcwse) {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(wsFindStemsResults)) {
            WsStem[] wsStems = wsFindStemsResults.getStemResults();
            if (wsStems == null || wsStems.length == 0) {
                throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND);
            }

            for (WsStem stemGrouper : wsStems) {
                stems.add(this.getStemWrapper().wrap(stemGrouper));
            }
            return stems;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotDeleteException
     */
    public String stemCreate(final Person thePerson, final Stem theStemToCreate) throws ESCOStemNotSaveException,
            ESCOStemNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException,
            ESCOStemNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theStemToCreate, ServiceConstants.THE_STEM_MUST_BE_DEFINED);

        // Checks if the stem already exists in Grouper with this name
        try {
            Stem alreadyExist = this.getGrouperService().findStemByName(thePerson, theStemToCreate.getName());
            if (alreadyExist != null) {
                throw new ESCOStemNotUniqueException(ServiceConstants.STEM_ALREADY_EXIST);
            }
        } catch (ESCOStemNotUniqueException e) {
            throw new ESCOStemNotUniqueException(ServiceConstants.STEM_ALREADY_EXIST, e);
        } catch (ESCOStemNotFoundException e) {
            // normal
        }

        WsStemLookup stemLookup = new WsStemLookup();
        stemLookup.setStemName(theStemToCreate.getName());

        return this.stemSave(thePerson, theStemToCreate, true, stemLookup);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotDeleteException
     */
    public void stemUpdate(final Person thePerson, final Stem theStemToUpdate) throws ESCOStemNotSaveException,
            ESCOStemNotFoundException, ESCOAttributeException, ESCOInsufficientPrivilegesException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theStemToUpdate, ServiceConstants.THE_STEM_MUST_BE_DEFINED);

        WsStemLookup stemLookup = new WsStemLookup();
        stemLookup.setUuid(theStemToUpdate.getUuid());

        this.stemSave(thePerson, theStemToUpdate, false, stemLookup);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotDeleteException
     */
    public void stemDelete(final Person thePerson, final String theStemId) throws ESCOStemNotFoundException,
            ESCOInsufficientPrivilegesException, ESCOStemNotDeleteException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theStemId, ServiceConstants.THE_STEM_MUST_BE_DEFINED);

        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        GcStemDelete gcStemDelete = new GcStemDelete();
        WsStemLookup stemLookup = new WsStemLookup();

        // -------------------------------------------
        // ASSIGNMENTS & VARIABLES
        // -------------------------------------------
        stemLookup.setUuid(theStemId);
        gcStemDelete.addStemLookup(stemLookup);
        gcStemDelete.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        try {
            gcStemDelete.execute();
        } catch (GcWebServiceError gcwse) {
            if (gcwse.getMessage().contains(WSConstants.STEM_NOT_FOUND_EXCEPTION)) {
                throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.PROBLEM_DELETING_STEMS)) {
                throw new ESCOStemNotDeleteException(ServiceConstants.STEM_CANNOT_BE_DELETED, gcwse);
            }
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }
    }

    /**
     * {@inheritDoc}
     */
    public ArrayListMultimap < Integer, Group > getAllGroupsFrom(final String theParentName,
            final String thePersonId) {
        // long timeGlobal;
        Validate.notNull(theParentName, "The name of the parent must be defined");
        Validate.notNull(thePersonId, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);

        ArrayListMultimap < Integer, Group > requestResult = ArrayListMultimap.create();

        final GcFindGroups groupFinder = new GcFindGroups();

        WsQueryFilter queryFilter = new WsQueryFilter();
        queryFilter.setQueryFilterType(ServiceConstants.FIND_BY_STEM_NAME);
        queryFilter.setStemName(theParentName);
        queryFilter.setStemNameScope(ServiceConstants.SCOPE_ONE_LEVEL);
        groupFinder.assignQueryFilter(queryFilter);

        WsSubjectLookup subjectLookup = new WsSubjectLookup();
        subjectLookup.setSubjectId(thePersonId);
        groupFinder.assignActAsSubject(subjectLookup);

        groupFinder.assignIncludeGroupDetail(true);

        WsFindGroupsResults result = null;
        try {
            // long deb = System.currentTimeMillis();
            result = groupFinder.execute();
            // timeGlobal = System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(result)) {
            final WsGroup[] groups = result.getGroupResults();
            if (groups != null) {
                int cpt = 0;

                for (final WsGroup group : groups) {

                    final GcGetGrouperPrivilegesLite privilegesReader = new GcGetGrouperPrivilegesLite();
                    privilegesReader.assignGroupName(group.getName());
                    privilegesReader.assignSubjectLookup(subjectLookup);
                    privilegesReader.assignActAsSubject(subjectLookup);

                    WsGetGrouperPrivilegesLiteResult privilegesReadingResult = null;
                    try {
                        // long deb = System.currentTimeMillis();
                        privilegesReadingResult = privilegesReader.execute();
                        // timeGlobal += System.currentTimeMillis() - deb;
                    } catch (GcWebServiceError gcwse) {
                        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS
                                + WSUtils.getResultCode(gcwse), gcwse);
                    }
                    if (WSUtils.isOK(privilegesReadingResult)) {
                        WsGrouperPrivilegeResult[] privResults = privilegesReadingResult.getPrivilegeResults();

                        Group theGroup = this.getGroupWrapper().wrap(group);

                        if (privResults != null && privResults.length > 0) {
                            for (WsGrouperPrivilegeResult privResult : privResults) {
                                theGroup = PrivilegeAssignUtils.assignPrivilege(theGroup, privResult
                                        .getPrivilegeName());
                            }
                        } else {
                            theGroup.setCanOptin(false);
                            theGroup.setCanOptout(false);
                            theGroup.setUserRight(null);
                        }
                        requestResult.put(cpt++, theGroup);
                    }
                }
            }
            // GrouperServiceClient.LOGGER.error("getAllGroupsFrom;" +
            // theParentName + ";" + timeGlobal);
            return requestResult;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

    /**
     * {@inheritDoc}
     */
    public Group findGroupByUid(final Person thePerson, final String theUid) throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException {

        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theUid, ServiceConstants.THE_ID_MUST_BE_DEFINED);

        WsQueryFilter queryFilter = new WsQueryFilter();
        queryFilter.setQueryFilterType(ServiceConstants.FIND_BY_GROUP_UUID);
        queryFilter.setGroupUuid(theUid);

        return this.findGroupByQuery(thePerson, queryFilter);
    }

    /**
     * {@inheritDoc}
     */
    public Group findGroupByName(final Person thePerson, final String theName) throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theName, ServiceConstants.THE_NAME_MUST_BE_DEFINED);

        WsQueryFilter queryFilter = new WsQueryFilter();
        queryFilter.setQueryFilterType(ServiceConstants.FIND_BY_GROUP_NAME_EXACT);
        queryFilter.setGroupName(theName);

        return this.findGroupByQuery(thePerson, queryFilter);
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

        IStrategyGroupSearch strategy = this.getStrategyLocator().locate(theField, theSearchType, thePath,
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
            ESCOInsufficientPrivilegesException, ESCOGroupNotUniqueException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupToCreate, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        // Checks if the group already exists in Grouper with this name
        try {
            Group alreadyExist = this.getGrouperService().findGroupByName(thePerson, theGroupToCreate.getName());
            if (alreadyExist != null) {
                throw new ESCOGroupNotUniqueException(ServiceConstants.GROUP_ALREADY_EXIST);
            }
        } catch (ESCOGroupNotUniqueException e) {
            throw new ESCOGroupNotUniqueException(ServiceConstants.GROUP_ALREADY_EXIST, e);
        } catch (ESCOGroupNotFoundException e) {
            // normal
        }

        WsGroupLookup groupLookup = new WsGroupLookup();
        groupLookup.setGroupName(theGroupToCreate.getName());

        return this.groupSave(thePerson, theGroupToCreate, true, groupLookup);
    }

    /**
     * {@inheritDoc}
     */
    public void groupUpdate(final Person thePerson, final Group theGroupToUpdate)
            throws ESCOGroupNotSaveException, ESCOGroupNotFoundException, ESCOAttributeException,
            ESCOInsufficientPrivilegesException {

        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupToUpdate, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        WsGroupLookup groupLookup = new WsGroupLookup();
        groupLookup.setUuid(theGroupToUpdate.getIdGroup());

        this.groupSave(thePerson, theGroupToUpdate, false, groupLookup);
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOGroupNotDeleteException
     */
    public void groupDelete(final Person thePerson, final String theGroupId)
            throws ESCOInsufficientPrivilegesException, ESCOGroupNotFoundException, ESCOGroupNotDeleteException {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupId, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);

        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        GcGroupDelete gcGroupDelete = new GcGroupDelete();
        WsGroupLookup groupLookup = new WsGroupLookup();

        // -------------------------------------------
        // ASSIGNMENTS & VARIABLES
        // -------------------------------------------
        groupLookup.setUuid(theGroupId);
        gcGroupDelete.addGroupLookup(groupLookup);
        gcGroupDelete.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        try {
            gcGroupDelete.execute();
        } catch (GcWebServiceError gcwse) {
            if (gcwse.getMessage().contains(WSConstants.GROUP_NOT_FOUND_EXCEPTION)) {
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.PROBLEM_DELETING_GROUPS)) {
                throw new ESCOGroupNotDeleteException(ServiceConstants.GROUP_CANNOT_BE_DELETED, gcwse);
            }
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findStemPrivileges(final Person thePerson, final String theStemName) {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theStemName, ServiceConstants.THE_STEM_MUST_BE_DEFINED);
        // long timeTotal = 0;
        final GcGetGrouperPrivilegesLite privilegesReader = new GcGetGrouperPrivilegesLite();
        privilegesReader.assignStemName(theStemName);
        privilegesReader.assignSubjectLookup(GrouperServiceClient.lookupFor(thePerson));
        privilegesReader.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        WsGetGrouperPrivilegesLiteResult privilegesReadingResult = null;
        try {
            // long deb = System.currentTimeMillis();
            privilegesReadingResult = privilegesReader.execute();
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(privilegesReadingResult)) {
            List < Privilege > privileges = new ArrayList < Privilege >();
            WsGrouperPrivilegeResult[] listOfPrivileges = privilegesReadingResult.getPrivilegeResults();
            if (listOfPrivileges != null) {
                for (WsGrouperPrivilegeResult privilege : listOfPrivileges) {
                    privileges.add(this.getPrivilegeWrapper().wrap(privilege));
                }
            }
            // Log to calculate time of service
            // GrouperServiceClient.LOGGER.error("findStemPrivileges;" +
            // timeTotal);
            return privileges;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
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
     * {@inheritDoc}
     */
    public void assignStemPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theStemIdOn, final Privilege thePrivilege) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException, ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        try {
            this.assignOrRemovePrivilegesOnStemOrGroup(thePerson, theSubjectIdTo, theStemIdOn, thePrivilege, true,
                    PrivilegeSearchEnum.STEM);
        } catch (ESCOGroupNotUniqueException e) {
            // this case doesn't happen if the type is stem
        } catch (ESCOGroupNotFoundException e) {
            // this case doesn't happen if the type is stem
        }
    }

    /**
     * {@inheritDoc}
     */
    public void removeStemPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theStemIdOn, final Privilege thePrivilege) throws ESCOStemNotFoundException,
            ESCOStemNotUniqueException, ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        try {
            this.assignOrRemovePrivilegesOnStemOrGroup(thePerson, theSubjectIdTo, theStemIdOn, thePrivilege,
                    false, PrivilegeSearchEnum.STEM);
        } catch (ESCOGroupNotUniqueException e) {
            // this case doesn't happen if the type is stem
        } catch (ESCOGroupNotFoundException e) {
            // this case doesn't happen if the type is stem
        }
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findDefaultGroupPrivileges(final Person thePerson, final String theGroupName) {
        Validate.notNull(thePerson, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);
        Validate.notNull(theGroupName, ServiceConstants.THE_GROUP_MUST_BE_DEFINED);
        // long timeTotal = 0;
        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        List < Privilege > retour = new ArrayList < Privilege >();
        GcGetGrouperPrivilegesLite gcGetGrouperPrivilegesLite = new GcGetGrouperPrivilegesLite();
        WsGetGrouperPrivilegesLiteResult wsGetGrouperPrivilegesLiteResults = null;

        // -------------------------------------------
        // ASSIGNMENT & CALL
        // -------------------------------------------
        gcGetGrouperPrivilegesLite.assignIncludeGroupDetail(true);
        gcGetGrouperPrivilegesLite.assignIncludeSubjectDetail(true);
        gcGetGrouperPrivilegesLite.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        final WsSubjectLookup subjectLookup = new WsSubjectLookup();
        subjectLookup.setSubjectId(ServiceConstants.GROUPER_ALL);
        gcGetGrouperPrivilegesLite.assignSubjectLookup(subjectLookup);

        gcGetGrouperPrivilegesLite.assignGroupName(theGroupName);

        try {
            // long deb = System.currentTimeMillis();
            wsGetGrouperPrivilegesLiteResults = gcGetGrouperPrivilegesLite.execute();
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(wsGetGrouperPrivilegesLiteResults)) {
            WsGrouperPrivilegeResult[] privileges = wsGetGrouperPrivilegesLiteResults.getPrivilegeResults();

            if (privileges == null || privileges.length == 0) {
                GrouperServiceClient.LOGGER.debug("There is no privileges link to group " + theGroupName);
            } else {
                GrouperServiceClient.LOGGER.debug(privileges.length + " privileges found for group "
                        + theGroupName);

                Privilege wrapPrivilege = null;
                for (WsGrouperPrivilegeResult privilege : privileges) {
                    wrapPrivilege = this.getPrivilegeWrapper().wrap(privilege);
                    retour.add(wrapPrivilege);
                }
            }
            // Log to calculate time of service
            // GrouperServiceClient.LOGGER.error("findDefaultGroupPrivileges;" +
            // timeTotal);
            return retour;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

    /**
     * {@inheritDoc}
     */
    public List < Privilege > findGroupPrivileges(final Person thePerson, final List < String > theAttributes,
            final Map < String, SourceTypeEnum > theSources, final String theGroupName,
            final ScopeEnum thePrivilesScope) {
        return this.findStemOrGroupPrivileges(thePerson, theAttributes, theSources, theGroupName,
                thePrivilesScope, PrivilegeSearchEnum.GROUP);
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > findSubjectPrivilegesGroup(final Person thePerson, final String theSubjectId,
            final ScopeEnum thePrivilegesScope) {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public List < Stem > findSubjectPrivilegesStem(final Person thePerson, final String theSubjectId,
            final ScopeEnum thePrivilegesScope) {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public void assignGroupPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theGroupIdOn, final Privilege thePrivilege) throws ESCOGroupNotUniqueException,
            ESCOGroupNotFoundException, ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        try {
            this.assignOrRemovePrivilegesOnStemOrGroup(thePerson, theSubjectIdTo, theGroupIdOn, thePrivilege,
                    true, PrivilegeSearchEnum.GROUP);
        } catch (ESCOStemNotUniqueException e) {
            // this case doesn't happen if the type is group
        } catch (ESCOStemNotFoundException e) {
            // this case doesn't happen if the type is group
        }
    }

    /**
     * {@inheritDoc}
     */
    public void removeGroupPrivileges(final Person thePerson, final String theSubjectIdTo,
            final String theGroupIdOn, final Privilege thePrivilege) throws ESCOGroupNotUniqueException,
            ESCOGroupNotFoundException, ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        try {
            this.assignOrRemovePrivilegesOnStemOrGroup(thePerson, theSubjectIdTo, theGroupIdOn, thePrivilege,
                    false, PrivilegeSearchEnum.GROUP);
        } catch (ESCOStemNotUniqueException e) {
            // this case doesn't happen if the type is group
        } catch (ESCOStemNotFoundException e) {
            // this case doesn't happen if the type is group
        }
    }

    /**
     * {@inheritDoc}
     */
    public Boolean moveGroup(final Person thePerson, final String theOriginalGroupId, final Stem theTargetStem)
            throws ESCOGroupNotMoveException {
        throw new ESCOTechnicalException(ServiceConstants.SERVICE_NOT_IMPLEMENTED);
    }

    /**
     * <b>Converts a Person into a WsSubjectLookup.</b>
     * 
     * @param person
     *            the person to convert.
     * @return a WsSubjectLookup.
     */
    private static WsSubjectLookup lookupFor(final Person person) {

        Validate.notNull(person, ServiceConstants.THE_PERSON_MUST_BE_DEFINED);

        WsSubjectLookup subjectLookup = new WsSubjectLookup();
        if (person != null && person.getId() != null) {
            subjectLookup.setSubjectId(person.getId());
        } else {
            throw new ESCOTechnicalException();
        }
        if (person != null && person.getSource() != null) {
            subjectLookup.setSubjectSourceId(person.getSource());
        }

        return subjectLookup;
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
        Validate.notNull(theAttributes, "The attributes must be defined");
        Validate.notNull(theSources, "The sources must be defined");
        Validate.notNull(theStemOrGroupName, ServiceConstants.THE_STEM_OR_GROUP_MUST_BE_DEFINED);
        Validate.notNull(thePrivilegesScope, ServiceConstants.THE_SCOPE_MUST_BE_DEFINED);
        Validate.notNull(theTypeSearch, ServiceConstants.THE_SEARCH_TYPE_MUST_BE_DEFINED);

        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        List < Privilege > retour = new ArrayList < Privilege >();
        GcGetGrouperPrivilegesLite gcGetGrouperPrivilegesLite = new GcGetGrouperPrivilegesLite();
        WsGetGrouperPrivilegesLiteResult wsGetGrouperPrivilegesLiteResults = null;

        // -------------------------------------------
        // ASSIGNMENT & CALL
        // -------------------------------------------
        gcGetGrouperPrivilegesLite.assignIncludeGroupDetail(true);
        gcGetGrouperPrivilegesLite.assignIncludeSubjectDetail(true);

        // Adding the list of attributes we want to retrieve
        for (String attr : theAttributes) {
            gcGetGrouperPrivilegesLite.addSubjectAttributeName(attr);
        }

        gcGetGrouperPrivilegesLite.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        if (PrivilegeSearchEnum.GROUP.equals(theTypeSearch)) {
            gcGetGrouperPrivilegesLite.assignGroupName(theStemOrGroupName);
        } else
            if (PrivilegeSearchEnum.STEM.equals(theTypeSearch)) {
                gcGetGrouperPrivilegesLite.assignStemName(theStemOrGroupName);
            } else {
                // Must never occur.
                throw new ESCOTechnicalException("The type must be group or stem.");
            }

        try {
            // long deb = System.currentTimeMillis();
            wsGetGrouperPrivilegesLiteResults = gcGetGrouperPrivilegesLite.execute();
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(wsGetGrouperPrivilegesLiteResults)) {
            WsGrouperPrivilegeResult[] privileges = wsGetGrouperPrivilegesLiteResults.getPrivilegeResults();

            if (privileges == null || privileges.length == 0) {
                GrouperServiceClient.LOGGER.debug("There is no privileges link to stem/group "
                        + theStemOrGroupName);
            } else {
                GrouperServiceClient.LOGGER.debug(privileges.length + " privileges found for stem/group "
                        + theStemOrGroupName);

                Privilege wrapPrivilege = null;
                SourceTypeEnum type = null;
                Person personTarget = null;
                Group groupTarget = null;
                String[] subjectAttr = null;

                List < WsGrouperPrivilegeResult > privilegesToUse = new ArrayList < WsGrouperPrivilegeResult >();

                switch (thePrivilegesScope.getCode().intValue()) {
                    case 0:
                        // immediate (direct) = revokable
                        for (WsGrouperPrivilegeResult privilege : privileges) {
                            if (WSUtils.SUCCESS.equals(privilege.getRevokable())) {
                                privilegesToUse.add(privilege);
                            }
                        }
                        break;
                    case 1:
                        // effective (indirect) = irrevokable
                        for (WsGrouperPrivilegeResult privilege : privileges) {
                            if (WSUtils.FAILURE.equals(privilege.getRevokable())) {
                                privilegesToUse.add(privilege);
                            }
                        }
                        break;
                    case 2:
                        // all
                        for (WsGrouperPrivilegeResult privilege : privileges) {
                            privilegesToUse.add(privilege);
                        }
                        break;
                    default:
                        // Must never occur.
                        throw new ESCOTechnicalException("The scope is invalid.");
                }

                for (WsGrouperPrivilegeResult privilege : privilegesToUse) {

                    wrapPrivilege = this.getPrivilegeWrapper().wrap(privilege);

                    // Determines the type of result (group or person)
                    for (String source : theSources.keySet()) {
                        if (source.equals(privilege.getWsSubject().getSourceId())) {
                            type = theSources.get(source);
                            break;
                        }
                    }

                    subjectAttr = privilege.getWsSubject().getAttributeValues();
                    Map < String, Set < String > > attributes = new HashMap < String, Set < String > >();

                    String value = null;
                    String key = null;
                    Set < String > setAttr = null;

                    String[] resultAttributeNames = wsGetGrouperPrivilegesLiteResults.getSubjectAttributeNames();

                    for (int i = 0; i < subjectAttr.length; i++) {
                        setAttr = new HashSet < String >();
                        value = subjectAttr[i];
                        key = resultAttributeNames[i];
                        setAttr.add(value);
                        attributes.put(key, setAttr);
                    }

                    if (SourceTypeEnum.PERSON.equals(type)) {
                        personTarget = new Person();

                        personTarget.setId(privilege.getWsSubject().getId());
                        personTarget.setAttributes(attributes);

                        wrapPrivilege.setPersonTarget(personTarget);

                        retour.add(wrapPrivilege);
                    } else
                        if (SourceTypeEnum.GROUP.equals(type)) {
                            groupTarget = new Group();

                            groupTarget.setIdGroup(privilege.getWsSubject().getId());
                            groupTarget.setAttributes(attributes);

                            wrapPrivilege.setGroupTarget(groupTarget);

                            retour.add(wrapPrivilege);
                        } else {
                            // Must never occur.
                            throw new ESCOTechnicalException("The type of source is undefined.");
                        }
                }
            }
            // Log to calculate time of service
            // GrouperServiceClient.LOGGER.error("findStemOrGroupPrivileges;" +
            // timeTotal);
            return retour;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
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
     *             if the subejct matches with theSubjectIdTo is not found.
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

        GcAssignGrouperPrivilegesLite privilegesWriter = new GcAssignGrouperPrivilegesLite();
        privilegesWriter.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        if (PrivilegeSearchEnum.STEM.equals(theType)) {
            Stem stem = this.getGrouperService().findStemByUuid(thePerson, theStemOrGroupUuidOn);
            privilegesWriter.assignStemName(stem.getName());
        } else
            if (PrivilegeSearchEnum.GROUP.equals(theType)) {
                Group group = this.getGrouperService().findGroupByUid(thePerson, theStemOrGroupUuidOn);
                privilegesWriter.assignGroupName(group.getName());
            } else {
                // This case must never occur
                throw new ESCOTechnicalException("The type is not stem or group");
            }

        final WsSubjectLookup subjectLookup = new WsSubjectLookup();
        subjectLookup.setSubjectId(theSubjectIdTo);
        privilegesWriter.assignSubjectLookup(subjectLookup);

        privilegesWriter.assignPrivilegeName(thePrivilege.getPrivilegeName());
        privilegesWriter.assignPrivilegeType(thePrivilege.getPrivilegeType());
        privilegesWriter.assignAllowed(isAssign);

        try {
            privilegesWriter.execute();
        } catch (GcWebServiceError gcwse) {
            if (gcwse.getMessage().contains(WSConstants.STEM_NOT_FOUND_EXCEPTION)) {
                throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.GROUP_NOT_FOUND_EXCEPTION)) {
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.SUBJECT_NOT_FOUND_EXCEPTION)) {
                throw new ESCOSubjectNotFoundException(ServiceConstants.SUBJECT_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)
                    || gcwse.getMessage().contains(WSConstants.GRANT_PRIVILEGE_EXCEPTION)
                    || gcwse.getMessage().contains(WSConstants.REVOKE_PRIVILEGE_EXCEPTION)) {
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
            }
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }
    }

    /**
     * <b>This method retrieves a stem by a query filter.</b>
     * 
     * @param thePerson
     *            the person performing the action(the connected user).
     * @param theStemQueryFilter
     *            the criteria of search.
     * @return the stem matching with the filter.
     * @throws ESCOStemNotFoundException
     *             if the stem is not found.
     * @throws ESCOStemNotUniqueException
     *             if the stem is found but is not unique i.e. several stems are
     *             found.
     */
    private Stem findStemByQuery(final Person thePerson, final WsStemQueryFilter theStemQueryFilter)
            throws ESCOStemNotFoundException, ESCOStemNotUniqueException {
        // long timeTotal = 0;
        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        GcFindStems gcFindStems = new GcFindStems();
        WsFindStemsResults wsFindStemsResults = null;

        // -------------------------------------------
        // ASSIGNMENTS & VARIABLES
        // -------------------------------------------
        gcFindStems.assignStemQueryFilter(theStemQueryFilter);
        gcFindStems.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        try {
            // long deb = System.currentTimeMillis();
            wsFindStemsResults = gcFindStems.execute();
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(wsFindStemsResults)) {
            WsStem[] stems = wsFindStemsResults.getStemResults();
            if (stems == null || stems.length == 0) {
                throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND);
            }
            if (stems.length > 1) {
                // Usually, not possible, but be careful.
                throw new ESCOStemNotUniqueException(ServiceConstants.STEM_NOT_UNIQUE);
            }
            Stem result = this.getStemWrapper().wrap(stems[0]);

            // long deb = System.currentTimeMillis();
            result.setIsEmpty(this.isEmptyStem(result.getName()));
            // timeTotal += System.currentTimeMillis() - deb;
            // Log to calculate time of service
            // GrouperServiceClient.LOGGER.error("findStemByQuery;" +
            // timeTotal);
            return result;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);

    }

    /**
     * <b>Creates or updates a stem.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theStem
     *            the stem to create or update
     * @param isCreation
     *            true if the method creates the stem, false otherwise
     * @param theStemLookup
     *            different argument between creation and updating : name for
     *            creation and uuid for updating
     * @return the id of the stem created/updated
     * @throws ESCOStemNotSaveException
     *             if the stem cannot be saved.
     * @throws ESCOStemNotFoundException
     *             if the stem cannot be found.
     * @throws ESCOAttributeException
     *             if the stem cannot be saved due to the attribute nested in
     *             this exception.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to save the stem.
     * @throws ESCOStemNotDeleteException
     */
    private String stemSave(final Person thePerson, final Stem theStem, final boolean isCreation,
            final WsStemLookup theStemLookup) throws ESCOStemNotSaveException, ESCOStemNotFoundException,
            ESCOAttributeException, ESCOInsufficientPrivilegesException {

        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        WsStemToSave stemToSave = new WsStemToSave();
        GcStemSave gcStemSave = new GcStemSave();

        if (theStem.getDescription() != null) {
            theStem.setDescription(theStem.getDescription().trim());
        }

        // -------------------------------------------
        // ASSIGNMENTS & CALL
        // -------------------------------------------
        stemToSave.setWsStemLookup(theStemLookup);
        stemToSave.setWsStem(this.getWsStemWrapper().wrap(theStem));

        gcStemSave.addStemToSave(stemToSave);
        gcStemSave.assignTxType(GcTransactionType.READ_WRITE_NEW);
        gcStemSave.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        WsStemSaveResults wsStemSaveResults = null;
        try {
            wsStemSaveResults = gcStemSave.execute();
        } catch (GcWebServiceError gcwse) {
            if (gcwse.getMessage().contains(WSConstants.STEM_NOT_FOUND_EXCEPTION)) {
                throw new ESCOStemNotFoundException(ServiceConstants.STEM_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.STEM_NAME_NOT_VALID)) {
                throw new ESCOAttributeException("The parent stem is not found", gcwse, "name");
            }
            if (WSUtils.getResultCode(gcwse).equals(WSConstants.PROBLEM_SAVING_STEMS)) {
                throw new ESCOStemNotSaveException(ServiceConstants.STEM_CANNOT_BE_SAVED, gcwse);
            }
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(wsStemSaveResults)) {
            WsStemSaveResult result = wsStemSaveResults.getResults()[0];
            if (result != null) {
                WsStem returnStem = result.getWsStem();
                if (returnStem != null) {
                    ESCOAttributeException exception = new ESCOAttributeException(
                            "At least one attribute is not valid");

                    if (returnStem.getExtension() != null && theStem.getExtension() != null
                            && !returnStem.getExtension().equals(theStem.getExtension())) {
                        exception.add("extension");
                    }

                    if (returnStem.getDisplayExtension() != null && theStem.getDisplayExtension() != null
                            && !returnStem.getDisplayExtension().equals(theStem.getDisplayExtension())) {
                        exception.add("displayExtension");
                    }

                    if (returnStem.getDescription() != null && theStem.getDescription() != null
                            && !returnStem.getDescription().equals(theStem.getDescription())) {
                        exception.add("description");
                    }

                    if (!exception.isEmpty()) {
                        if (isCreation) {
                            try {
                                this.getGrouperService().stemDelete(thePerson, returnStem.getUuid());
                            } catch (ESCOStemNotDeleteException e) {
                            }
                        } else {
                            // Backup of the stem to update from the uuid that
                            // cannot be modified.
                            Stem backup = null;
                            try {
                                backup = this.getGrouperService().findStemByUuid(thePerson, theStem.getUuid());
                            } catch (ESCOStemNotUniqueException e) {
                            } catch (ESCOStemNotFoundException e) {
                            }
                            if (backup == null) {
                                throw new ESCOStemNotSaveException("The stem to backup does not exist.");
                            }
                            this.getGrouperService().stemUpdate(thePerson, backup);
                        }
                        throw exception;
                    } else {
                        // Add the privilege to the creator to create stem and
                        // group.
                        if (isCreation) {
                            Privilege privilege = new Privilege();
                            privilege.setPrivilegeType(PrivilegeTypeEnum.NAMING.getValue());
                            privilege.setPrivilegeName(StemPrivilegeEnum.CREATE.getValue());
                            try {
                                this.assignStemPrivileges(thePerson, thePerson.getId(), returnStem.getUuid(),
                                        privilege);
                            } catch (ESCOStemNotUniqueException e) {
                                // Nothing to do because no exception here
                                // possible.
                            } catch (ESCOSubjectNotFoundException e) {
                                // Nothing to do because no exception here
                                // possible.
                            }
                        }
                    }
                }
                return returnStem.getUuid();
            }
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

    /**
     * <b>This method retrieves a group by a query filter.</b>
     * 
     * @param thePerson
     *            the person performing the action(the connected user).
     * @param theQueryFilter
     *            the criteria of search.
     * @return the group matching with the filter.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is found but is not unique i.e. several groups
     *             are found.
     */
    private Group findGroupByQuery(final Person thePerson, final WsQueryFilter theQueryFilter)
            throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException {

        // long timeTotal = 0;
        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        GcFindGroups gcFindGroups = new GcFindGroups();
        WsFindGroupsResults wsFindGroupsResults = null;

        // -------------------------------------------
        // ASSIGNMENTS & VARIABLES
        // -------------------------------------------
        gcFindGroups.assignIncludeGroupDetail(true);
        gcFindGroups.assignQueryFilter(theQueryFilter);
        gcFindGroups.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        try {
            // long deb = System.currentTimeMillis();
            wsFindGroupsResults = gcFindGroups.execute();
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(wsFindGroupsResults)) {
            WsGroup[] groups = wsFindGroupsResults.getGroupResults();
            if (groups == null || groups.length == 0) {
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND);
            }
            if (groups.length > 1) {
                // Usually, not possible, but be careful.
                throw new ESCOGroupNotUniqueException(ServiceConstants.GROUP_NOT_UNIQUE);
            }
            // Log to calculate time of service
            // GrouperServiceClient.LOGGER.error("findGroupByQuery;" +
            // timeTotal);
            return this.getGroupWrapper().wrap(groups[0]);
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

    /**
     * <b>Creates or updates a group.</b>
     * 
     * @param thePerson
     *            the person performing the action (the connected user).
     * @param theGroup
     *            the group to save
     * @param isCreation
     *            true if the method creates the group, false otherwise
     * @param theGroupLookup
     *            different argument between creation and updating : name for
     *            creation and uuid for updating
     * @return the id of the group saved
     * @throws ESCOGroupNotSaveException
     *             if the group cannot be saved.
     * @throws ESCOGroupNotFoundException
     *             if the group cannot be found.
     * @throws ESCOAttributeException
     *             if the group cannot be saved due to the attribute nested in
     *             this exception.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to save the group.
     */
    private String groupSave(final Person thePerson, final Group theGroup, final boolean isCreation,
            final WsGroupLookup theGroupLookup) throws ESCOGroupNotSaveException, ESCOGroupNotFoundException,
            ESCOAttributeException, ESCOInsufficientPrivilegesException {

        // -------------------------------------------
        // LOCAL VARIABLES
        // -------------------------------------------
        WsGroupToSave groupToSave = new WsGroupToSave();
        GcGroupSave gcGroupSave = new GcGroupSave();

        // -------------------------------------------
        // Modify the group description to trim space character
        // -------------------------------------------
        if (theGroup.getDescription() != null) {
            theGroup.setDescription(theGroup.getDescription().trim());
        }

        // -------------------------------------------
        // ASSIGNMENTS & CALL
        // -------------------------------------------
        groupToSave.setWsGroupLookup(theGroupLookup);
        groupToSave.setWsGroup(this.getWsGroupWrapper().wrap(theGroup));

        gcGroupSave.addGroupToSave(groupToSave);
        gcGroupSave.assignTxType(GcTransactionType.READ_WRITE_NEW);
        gcGroupSave.assignActAsSubject(GrouperServiceClient.lookupFor(thePerson));

        WsGroupSaveResults wsGroupSaveResults = null;
        try {
            wsGroupSaveResults = gcGroupSave.execute();
        } catch (GcWebServiceError gcwse) {
            if (gcwse.getMessage().contains(WSConstants.GROUP_NOT_FOUND_EXCEPTION)) {
                throw new ESCOGroupNotFoundException(ServiceConstants.GROUP_NOT_FOUND, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.INSUFFICIENT_PRIVILEGE_EXCEPTION)) {
                throw new ESCOInsufficientPrivilegesException(ServiceConstants.INSUFFICIENT_PRIVILEGES, gcwse);
            }
            if (gcwse.getMessage().contains(WSConstants.GROUP_NAME_NOT_VALID)) {
                throw new ESCOAttributeException("The name is not correct", gcwse, "name");
            }
            if (WSUtils.getResultCode(gcwse).equals(WSConstants.PROBLEM_SAVING_GROUPS)) {
                throw new ESCOGroupNotSaveException(ServiceConstants.GROUP_CANNOT_BE_SAVED, gcwse);
            }
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(wsGroupSaveResults)) {
            WsGroupSaveResult result = wsGroupSaveResults.getResults()[0];
            if (result != null) {
                WsGroup returnGroup = result.getWsGroup();
                if (returnGroup != null) {
                    ESCOAttributeException exception = new ESCOAttributeException(
                            "At least one attribute is not valid");

                    if (returnGroup.getExtension() != null && theGroup.getExtension() != null
                            && !returnGroup.getExtension().equals(theGroup.getExtension())) {
                        exception.add("extension");
                    }

                    if (returnGroup.getDisplayExtension() != null && theGroup.getDisplayExtension() != null
                            && !returnGroup.getDisplayExtension().equals(theGroup.getDisplayExtension())) {
                        exception.add("displayExtension");
                    }

                    if (returnGroup.getDescription() != null && theGroup.getDescription() != null
                            && !returnGroup.getDescription().equals(theGroup.getDescription())) {
                        exception.add("description");
                    }

                    if (!exception.isEmpty()) {
                        if (isCreation) {
                            try {
                                this.getGrouperService().groupDelete(thePerson, returnGroup.getUuid());
                            } catch (ESCOGroupNotDeleteException e) {
                            }
                        } else {
                            // Backup of the group to update from the uuid that
                            // cannot be modified.
                            Group backup = null;
                            try {
                                backup = this.getGrouperService().findGroupByUid(thePerson, theGroup.getIdGroup());
                            } catch (ESCOGroupNotUniqueException e) {
                            } catch (ESCOGroupNotFoundException e) {
                            }
                            if (backup == null) {
                                throw new ESCOGroupNotSaveException("The group to backup does not exist.");
                            }
                            this.getGrouperService().groupUpdate(thePerson, backup);
                        }
                        throw exception;
                    }
                }

                // Revoke all privileges in order to don't have default
                // privileges after the creation whatever the settings of
                // Grouper (grouper.properties)
                if (isCreation) {
                    try {
                        Privilege priv = new Privilege();
                        priv.setPrivilegeName(GroupPrivilegeEnum.ADMIN.getName());
                        this.grouperService.removeGroupPrivileges(thePerson, ServiceConstants.GROUPER_ALL,
                                returnGroup.getUuid(), priv);
                        priv.setPrivilegeName(GroupPrivilegeEnum.UPDATE.getName());
                        this.grouperService.removeGroupPrivileges(thePerson, ServiceConstants.GROUPER_ALL,
                                returnGroup.getUuid(), priv);
                        priv.setPrivilegeName(GroupPrivilegeEnum.READ.getName());
                        this.grouperService.removeGroupPrivileges(thePerson, ServiceConstants.GROUPER_ALL,
                                returnGroup.getUuid(), priv);
                        priv.setPrivilegeName(GroupPrivilegeEnum.VIEW.getName());
                        this.grouperService.removeGroupPrivileges(thePerson, ServiceConstants.GROUPER_ALL,
                                returnGroup.getUuid(), priv);
                    } catch (ESCOGroupNotUniqueException e) {
                    } catch (ESCOSubjectNotFoundException e) {
                    }
                }

                return returnGroup.getUuid();
            }
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

    /**
     * {@inheritDoc}
     */
    public GroupPrivilegeEnum getPrivilegeOnGroup(final Person thePerson, final Group theGroup)
            throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException, CloneNotSupportedException {
        // long timeTotal = 0;
        GroupPrivilegeEnum groupPrivilegeEnum = GroupPrivilegeEnum.NONE;

        Group group = theGroup.clone();

        if (group != null) {

            final GcGetGrouperPrivilegesLite privilegesReader = new GcGetGrouperPrivilegesLite();
            privilegesReader.assignGroupName(group.getName());

            WsSubjectLookup subjectLookup = new WsSubjectLookup();
            subjectLookup.setSubjectId(thePerson.getId());

            privilegesReader.assignSubjectLookup(subjectLookup);
            privilegesReader.assignActAsSubject(subjectLookup);

            WsGetGrouperPrivilegesLiteResult privilegesReadingResult = null;
            try {
                // long deb = System.currentTimeMillis();
                privilegesReadingResult = privilegesReader.execute();
                // timeTotal = System.currentTimeMillis() - deb;
            } catch (GcWebServiceError gcwse) {
                throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse),
                        gcwse);
            }
            if (WSUtils.isOK(privilegesReadingResult)) {
                WsGrouperPrivilegeResult[] privResults = privilegesReadingResult.getPrivilegeResults();

                if (privResults != null && privResults.length > 0) {
                    for (WsGrouperPrivilegeResult privResult : privResults) {
                        group = PrivilegeAssignUtils.assignPrivilege(group, privResult.getPrivilegeName());
                    }
                }
                if (group.getUserRight() != null) {
                    groupPrivilegeEnum = group.getUserRight();
                }
                // Log to calculate time of service
                // GrouperServiceClient.LOGGER.error("getPrivilegeOnGroup;" +
                // timeTotal);
                return groupPrivilegeEnum;
            }
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }

}
