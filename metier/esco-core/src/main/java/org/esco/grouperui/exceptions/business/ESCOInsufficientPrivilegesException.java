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
package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Source not avalaible business exception.</b><br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-002]<br/>
 *
 * @author SopraGroup
 */
public class ESCOInsufficientPrivilegesException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = 6319559855459232001L;

    /**
     * Default constructor.
     */
    public ESCOInsufficientPrivilegesException() {
    }

    /**
     * Second constructor, with code.
     *
     * @param code
     *            : the code of the exception.
     */
    public ESCOInsufficientPrivilegesException(final String code) {
        super(code);
    }

    /**
     * Third constructor, with code & cause.
     *
     * @param code
     *            : the code of the exception.
     * @param cause
     *            : the cause of the exception.
     */
    public ESCOInsufficientPrivilegesException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
