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
package org.esco.grouperui.services.extension;

/**
 * Constants for API.
 * 
 * @author SopraGroup
 */
public class ServiceConstants {

    /** Constant for service not implemented. */
    public static final String SERVICE_NOT_IMPLEMENTED           = "The service is not implemented.";

    /*                        ****** PARAMETERS MUST BE DEFINED ***** */
    /** THE_PERSON_MUST_BE_DEFINED. */
    public static final String THE_PERSON_MUST_BE_DEFINED        = "The person must be defined.";
    /** THE_GROUP_MUST_BE_DEFINED. */
    public static final String THE_GROUP_MUST_BE_DEFINED         = "The group must be defined.";
    /** THE_STEM_OR_GROUP_MUST_BE_DEFINED. */
    public static final String THE_STEM_OR_GROUP_MUST_BE_DEFINED = "The stem or the group must be defined";
    /** THE_STEM_MUST_BE_DEFINED. */
    public static final String THE_STEM_MUST_BE_DEFINED          = "The stem must be defined";
    /** THE_ID_MUST_BE_DEFINED. */
    public static final String THE_ID_MUST_BE_DEFINED            = "The id must be defined.";
    /** THE_NAME_MUST_BE_DEFINED. */
    public static final String THE_NAME_MUST_BE_DEFINED          = "The name must be defined.";
    /** THE_PATH_MUST_BE_DEFINED. */
    public static final String THE_PATH_MUST_BE_DEFINED          = "The path must be defined.";
    /** THE_TERM_MUST_BE_DEFINED. */
    public static final String THE_TERM_MUST_BE_DEFINED          = "The term must be defined.";
    /** THE_SCOPE_MUST_BE_DEFINED. */
    public static final String THE_SCOPE_MUST_BE_DEFINED         = "The scope must be defined.";
    /** THE_FIELD_MUST_BE_DEFINED. */
    public static final String THE_FIELD_MUST_BE_DEFINED         = "The field must be defined";
    /** THE_SEARCH_TYPE_MUST_BE_DEFINED. */
    public static final String THE_SEARCH_TYPE_MUST_BE_DEFINED   = "The type of the search must be defined (add or simple).";
    /** THE_MEMBERSHIP_MUST_BE_DEFINED. */
    public static final String THE_MEMBERSHIP_MUST_BE_DEFINED    = "The membership must be defined";
    /** THE_MEMBERS_MUST_BE_DEFINED. */
    public static final String THE_MEMBERS_MUST_BE_DEFINED       = "The members must be defined";
    /** THE_SUBJECT_MUST_BE_DEFINED. */
    public static final String THE_SUBJECT_MUST_BE_DEFINED       = "The subject must be defined";

    /*                        ****** Technical exceptions ***** */
    /** SESSION_CANNOT_BE_CREATE. */
    public static final String SESSION_CANNOT_BE_CREATE          = "Session cannot be created.";
    /** STRATEGY_NOT_FOUND. */
    public static final String STRATEGY_NOT_FOUND                = "The strategy is not found";
    /** WS_ERROR. */
    public static final String WS_ERROR                          = "Error occurs while calling the Web Services.";
    /** WS_ERROR_IS. */
    public static final String WS_ERROR_IS                       = "Error occurs while calling the Web Services. The error is: ";
    /** API_ERROR. */
    public static final String API_ERROR                         = "Error occurs while calling the API.";

    /*                        ****** Business exceptions ***** */
    /** SUBJECT_NOT_FOUND. */
    public static final String SUBJECT_NOT_FOUND                 = "The subject is not found";
    /** SUBJECT_NOT_UNIQUE. */
    public static final String SUBJECT_NOT_UNIQUE                = "The subject is not unique.";
    /** INSUFFICIENT_PRIVILEGES. */
    public static final String INSUFFICIENT_PRIVILEGES           = "The person has not sufficient privileges";
    /** GROUP_NOT_FOUND. */
    public static final String GROUP_NOT_FOUND                   = "The group is not found";
    /** GROUP_NOT_UNIQUE. */
    public static final String GROUP_NOT_UNIQUE                  = "The group is not unique.";
    /** GROUP_ALREADY_EXIST. */
    public static final String GROUP_ALREADY_EXIST               = "The group already exists.";
    /** GROUP_CANNOT_BE_SAVED. */
    public static final String GROUP_CANNOT_BE_SAVED             = "The group cannot be saved.";
    /** GROUP_CANNOT_BE_DELETED. */
    public static final String GROUP_CANNOT_BE_DELETED           = "The group cannot be deleted.";
    /** MEMBER_CANNOT_BE_DELETED. */
    public static final String MEMBER_CANNOT_BE_DELETED          = "The member cannot be deleted.";
    /** MEMBER_CANNOT_BE_ADDED. */
    public static final String MEMBER_CANNOT_BE_ADDED            = "The member cannot be added.";
    /** GROUP_CANNOT_BE_MOVED. */
    public static final String GROUP_CANNOT_BE_MOVED             = "The group cannot be moved.";
    /** STEM_NOT_FOUND. */
    public static final String STEM_NOT_FOUND                    = "The stem is not found.";
    /** STEM_NOT_UNIQUE. */
    public static final String STEM_NOT_UNIQUE                   = "The stem is not unique.";
    /** STEM_ALREADY_EXIST. */
    public static final String STEM_ALREADY_EXIST                = "The stem already exists.";
    /** STEM_CANNOT_BE_SAVED. */
    public static final String STEM_CANNOT_BE_SAVED              = "The stem cannot be saved.";
    /** STEM_CANNOT_BE_DELETED. */
    public static final String STEM_CANNOT_BE_DELETED            = "The stem cannot be deleted.";

    /*                        ****** Miscellaneous ***** */
    /** Empty string. */
    public static final String EMPTY                             = "";
    /** Semicolon. */
    public static final String DOT_COMMA                         = ";";
    /** Default wildcard. */
    public static final String WILDCARD                          = "*";
    /** Grouper wildcard. */
    public static final String GROUPER_WILDCARD                  = "%";
    /** GrouperAll : everyEntity of Grouper. */
    public static final String GROUPER_ALL                       = "GrouperAll";
    /** MappingFieldCol isMember. */
    public static final String MAPPING_FIELD_COL_MEMBER          = "isMember";

    /*                        ****** Types of search for query filter of Grouper ***** */
    /** FIND_BY_APPROXIMATE_ATTRIBUTE. */
    public static final String FIND_BY_APPROXIMATE_ATTRIBUTE     = "FIND_BY_APPROXIMATE_ATTRIBUTE";
    /** FIND_BY_PARENT_STEM_NAME. */
    public static final String FIND_BY_PARENT_STEM_NAME          = "FIND_BY_PARENT_STEM_NAME";
    /** FIND_BY_STEM_NAME. */
    public static final String FIND_BY_STEM_NAME                 = "FIND_BY_STEM_NAME";
    /** FIND_BY_STEM_UUID. */
    public static final String FIND_BY_STEM_UUID                 = "FIND_BY_STEM_UUID";
    /** FIND_BY_GROUP_NAME_EXACT. */
    public static final String FIND_BY_GROUP_NAME_EXACT          = "FIND_BY_GROUP_NAME_EXACT";
    /** FIND_BY_GROUP_UUID. */
    public static final String FIND_BY_GROUP_UUID                = "FIND_BY_GROUP_UUID";

    /** StemName scope : SCOPE_ONE_LEVEL. */
    public static final String SCOPE_ONE_LEVEL                   = "ONE_LEVEL";

    /** Stem mode : WITH_STEM_PRIVILEGE_AND_GROUP. */
    public static final String WITH_STEM_PRIVILEGE_AND_GROUP     = "WITH_STEM_PRIVILEGE_AND_GROUP";
    /** Stem mode : WITH_STEM_PRIVILEGE_AND_GROUP. */
    public static final String ALL_STEM                          = "ALL_STEM";

    /**
     * Default constructor.
     */
    private ServiceConstants() {
    }
}
