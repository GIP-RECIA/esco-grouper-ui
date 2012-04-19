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
package org.esco.grouperui.services.grouper.internal.utils;

/**
 * WS utility constants.
 * 
 * @author SopraGroup
 */
public class WSConstants {

    /** PROBLEM_DELETING_STEMS. */
    public static final String PROBLEM_DELETING_STEMS           = "PROBLEM_DELETING_STEMS";

    /** PROBLEM_DELETING_GROUPS. */
    public static final String PROBLEM_DELETING_GROUPS          = "PROBLEM_DELETING_GROUPS";

    /** PROBLEM_SAVING_STEMS. */
    public static final String PROBLEM_SAVING_STEMS             = "PROBLEM_SAVING_STEMS";

    /** PROBLEM_SAVING_GROUPS. */
    public static final String PROBLEM_SAVING_GROUPS            = "PROBLEM_SAVING_GROUPS";

    /** STEM_NOT_FOUND_EXCEPTION. */
    public static final String STEM_NOT_FOUND_EXCEPTION         = "STEM_NOT_FOUND";

    /** GROUP_NOT_FOUND_EXCEPTION. */
    public static final String GROUP_NOT_FOUND_EXCEPTION        = "GROUP_NOT_FOUND";

    /** SUBJECT_NOT_FOUND_EXCEPTION. */
    public static final String SUBJECT_NOT_FOUND_EXCEPTION      = "SUBJECT_NOT_FOUND";

    /** INSUFFICIENT_PRIVILEGE_EXCEPTION. */
    public static final String INSUFFICIENT_PRIVILEGE_EXCEPTION = "INSUFFICIENT_PRIVILEGES";

    /** GRANT_PRIVILEGE_EXCEPTION. */
    public static final String GRANT_PRIVILEGE_EXCEPTION        = "GrantPrivilegeException";

    /** REVOKE_PRIVILEGE_EXCEPTION. */
    public static final String REVOKE_PRIVILEGE_EXCEPTION       = "RevokePrivilegeException";

    /** STEM_NAME_NOT_VALID. */
    public static final String STEM_NAME_NOT_VALID              = "Cant find stem";

    /** GROUP_NAME_NOT_VALID. */
    public static final String GROUP_NAME_NOT_VALID             = "Cant find group";

    /**
     * Private constructor.
     */
    private WSConstants() {
    }

}
