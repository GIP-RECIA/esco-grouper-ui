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

import org.esco.grouperui.domaine.beans.Response;
import org.esco.grouperui.domaine.beans.Responses;

/**
 * <b>LDAP exception throws when the request is not valid.</b><br/>
 * Requirements:<br/>
 * [RECIA-ESCO-L2-001]<br/>
 * [RECIA-ESCO-L2-002]
 * 
 * @author SopraGroup
 */
public class ESCOLDAPBadRequestException extends ESCOClientBusinessException {

    /**
     * UID.
     */
    private static final long serialVersionUID = -6339048482297491176L;

    /**
     * Default constructor.
     */
    public ESCOLDAPBadRequestException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOLDAPBadRequestException(final String code) {
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
    public ESCOLDAPBadRequestException(final String code, final Throwable cause) {
        super(code, cause);
    }

    /**
     * @param theCode
     *            : the code of the exception.
     * @param theCause
     *            : the cause of the exception.
     * @param theResponse
     *            : the response, contains the collection of response for each
     *            entry of the service transaction, allowing to know for each
     *            entry the result of the service execution.
     */
    public ESCOLDAPBadRequestException(final String theCode, final Throwable theCause, final Responses theResponse) {
        super(theCode, theCause, theResponse);
    }

    /**
     * @param theResponse
     *            : the response of the service
     */
    public ESCOLDAPBadRequestException(final Responses theResponse) {
        super(theResponse);
    }

    /**
     * Construct a new ESCOAddMemberException from it code, it cause, it
     * response.
     * 
     * @param theCode
     *            : the code of the exception.
     * @param theCause
     *            : the cause of the exception.
     * @param theResponse
     *            : the response of the service, allow to know the entry(ies)
     *            occuring the exception.
     */
    public ESCOLDAPBadRequestException(final String theCode, final Throwable theCause, final Response theResponse) {
        super(theCode, theCause, theResponse);
    }

    /**
     * Construct a new ESCOAddMemberException, from the collection of response.
     * 
     * @param theResponse
     *            : the response of the service for each entry.
     */
    public ESCOLDAPBadRequestException(final Response theResponse) {
        super(theResponse);
    }

}
