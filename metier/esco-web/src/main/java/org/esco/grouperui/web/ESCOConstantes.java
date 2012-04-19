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
package org.esco.grouperui.web;

/**
 * Constants for escogrouper application.
 * 
 * @author dMoulron
 */
public final class ESCOConstantes {

    /** property for encoding value. find in defaults.properties */
    public static final String AJAX_ENCODING                         = "ajax.encoding";

    /** value of header content-type. */
    public static final String CONTENT_TYPE                          = "Content-Type";

    /** value of header content-Encoding. */
    public static final String CONTENT_ENCODING                      = "Content-Encoding";

    /** Get Parameter : from. */
    public static final String PARAM_FROM_CALL                       = "from";

    /** caller needed refresh. */
    public static final String TREE_FROM_CALL                        = "treeNavigate";

    /** Get Parameter : creation. */
    public static final String PARAM_CREATION_CALL                   = "creation";

    /** empty cell data . */
    public static final String EMPTY_DATA                            = "---";

    /** EL attribute for find value in map of grouper properties. */
    public static final String ATTR_EL_ATTRIBUT                      = "attr";

    /** EL attribute for internationalization el EL expression. */
    public static final String MSGS_EL_ATTRIBUT                      = "msgs";

    /** no internationalization msg found in properties bundles. */
    public static final String NO_INTERNATIONALIZATION_MSG           = "??????????";

    /** no internationalization msg found in exception properties bundles. */
    public static final String NO_INTERNATIONALIZATION_EXCEPTION     = "?????";

    /** The from response parameter. */
    public static final String FROM_RESPONSE                         = "fromResponse";

    /** Constant used to retrieve parameterService. */
    public static final String PARAMETER_SERVICE                     = "#{parameterService}";

    /** The separator in stem name. */
    public static final String STEM_NAME_SEPARATOR                   = ":";

    /** The root name. */
    public static final String ROOT_NAME                             = "root";

    /** The separator in group name. */
    public static final String GROUP_NAME_SEPARATOR                  = ".";

    /** String true. */
    public static final String TRUE                                  = "true";

    /** String false. */
    public static final String FALSE                                 = "false";

    /** internationalization constant for general exception with no Translation. */
    public static final String EXCEPTION_TITLE                       = "EXCEPTION.TITLE";

    /** The value of userRight in the mapping from col. */
    public static final String USER_RIGHT_VALUE                      = "userRight";

    /** The value of root. */
    public static final String ROOT_VALUE                            = ":";

    /** The group of custom type context. */
    public static final String TYPE_GROUP_CONTEXT                    = "org.esco.grouperui.group.context";

    /** The group of custom type. */
    public static final String TYPE_GROUP_CUSTOM                     = "org.esco.grouperui.group.custom.type";

    /** The group of group attributes. */
    public static final String GROUP_GROUP_ATTRIBUT                  = "org.esco.grouperui.group.attribut";

    /** The group of context incompatibilities. */
    public static final String GROUP_GROUP_CONTEXT_INCOMPATIBILITIES = "org.esco.grouperui.group.context.incompatibilities";

    /** The group of privileges. */
    public static final String GROUP_GROUP_PRIVILEGES                = "org.esco.grouperui.group.right";

    /** The key of the default custom type context. */
    public static final String TYPE_CUSTOM_DEFAULT_KEY               = "default";

    /** The group of the default custom type context. */
    public static final String TYPE_CUSTOM_DEFAULT                   = "org.esco.grouperui.group.custom.default";

    /** the value for dynamic group. */
    public static final String TYPE_CUSTOM_DYN_GROUP_VALUE           = "dynamic";

    /** The mappingFromCol key for the displayName property. */
    public static final String DISPLAY_NAME                          = "displayName";

    /** The mappingFromCol key for the displayName property. */
    public static final String EXTENSION                             = "extension";

    /** The mappingFromCol key for the displayExtension property. */
    public static final String DISPLAY_EXTENSION                     = "displayExtension";

    /***************************************************************************************
     * Constante for search screen
     ****************************************************************************************/

    /** the display search path parameter. */
    public static final String THE_DISPLAY_SEARCH_PATH               = "theDisplaySearchPath";

    /** the Display Term parameter. */
    public static final String THE_DISPLAY_TERM                      = "theDisplayTerm";

    /** the Search Path parameter. */
    public static final String THE_SEARCH_PATH                       = "theSearchPath";

    /** the search source parameter. */
    public static final String THE_SEARCH_SOURCE                     = "theSearchSource";

    /** the therm parameter of search. */
    public static final String THE_TERM                              = "theTerm";

    /** the step parameter of search. */
    public static final String THE_SEARCH_STEP                       = "theSearchStep";

    /** The id of the node. */
    public static final String ID_NODE                               = "idNode";

    /** The nameId of the node. */
    public static final String NAMEID_NODE                           = "nameIdNode";

    /***************************************************************************************
     * Constante for creation screen
     ****************************************************************************************/

    /** the value of attribut. */
    public static final String VALUE                                 = "value";

    /** the id of attribut input. */
    public static final String ID_INPUT                              = "idInput";

    /** the id of context for custom type. */
    public static final String ID_CONTEXT                            = "idContext";

    /** the id of custom type. */
    public static final String ID_CUSTOM_TYPE                        = "idCustomType";

    /** the state of radio button. */
    public static final String CHECKED                               = "checked";

    /** the id of privilege. */
    public static final String ID_PRIVILEGE                          = "idPrivilege";

    /** the group uuid. */
    public static final String GROUP_UUID                            = "groupUuid";

    /** the state modification. */
    public static final String MODIFICATION                          = "modification";

    /** the state creation. */
    public static final String CREATION                              = "creation";

    /** The mappingFromCol key for the name property. */
    public static final String NAME                                  = "name";

    /** The mappingFromCol key for the has optin property. */
    public static final String CAN_OPTIN                             = "canOptin";

    /** The mappingFromCol key for the has optout property. */
    public static final String CAN_OPTOUT                            = "canOptout";

    /** The mappingFromCol key for the has id property. */
    public static final String ID_PROPERTY                           = "id";

    /** The mappingFromCol key for the has isMember property. */
    public static final String IS_MEMBER                             = "isMember";

    /** constant to store user profil in session for security. */
    public static final String ESCO_USER_PROFILE                     = "org.esco.grouperui.user.profile";

    /** constant to find profile in parameters. */
    public static final String ESCO_PARAMETER_PROFILE                = "profile";

    /** constant to store user locale in session for security. */
    public static final String ESCO_USER_LOCALE                      = "org.esco.grouperui.user.locale";

    /** constant to store user in session for security. */
    public static final String ESCO_USER                             = "org.esco.grouperui.user";

    /** constant to define the portlet mode **/
    public static final String ESCO_PORTLET_MODE                     = "portlet";

    /**
     * Default constructor.
     */
    private ESCOConstantes() {
    }
}
