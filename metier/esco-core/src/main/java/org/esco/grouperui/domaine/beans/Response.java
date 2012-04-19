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
package org.esco.grouperui.domaine.beans;

/**
 * Response of service call.
 * 
 * @author SopraGroup
 */
public class Response {

    /** The object in entry of service. **/
    private final Object  entry;

    /** True if the object is successfully saved by the service. **/
    private final Boolean success;

    /** Reason of the success/failure state. */
    private final String  reason;

    /** Reason of the success/failure state. */
    private final String  details;

    /**
     * Construct a response from the entry of the service, the success or the
     * failure of the service, the details.
     * 
     * @param theEntry
     *            : the parameter in entry of the service.
     * @param theSuccess
     *            : false if the entry as produce an exception, true otherwise.
     * @param theReason
     *            : the reason of the success/failure.
     * @param theDetails
     *            : the details of the exception if there is an exception.
     */
    public Response(final Object theEntry, final Boolean theSuccess, final String theReason, final String theDetails) {
        super();
        this.entry = theEntry;
        this.success = theSuccess;
        this.reason = theReason;
        this.details = theDetails;
    }

    /**
     * Construct a response from entry of the service, success or failure,
     * reason of the failure if the entry as throw an exception.
     * 
     * @param theEntry
     *            : the parameter in entry of the service.
     * @param theSuccess
     *            : false if the entry as produce an exception, true otherwise.
     * @param theReason
     *            : the reason of the success/failure.
     */
    public Response(final Object theEntry, final Boolean theSuccess, final String theReason) {
        super();
        this.entry = theEntry;
        this.success = theSuccess;
        this.reason = theReason;
        this.details = null;
    }

    /**
     * Getter for attribute <b>details</b>.
     * 
     * @return the details
     */
    public String getDetails() {
        return this.details;
    }

    /**
     * Getter for attribute <b>entry</b>.
     * 
     * @return the entry
     */
    public Object getEntry() {
        return this.entry;
    }

    /**
     * Getter for attribute <b>success</b>.
     * 
     * @return the success
     */
    public Boolean getSuccess() {
        return this.success;
    }

    /**
     * Getter for attribute <b>reason</b>.
     * 
     * @return the reason
     */
    public String getReason() {
        return this.reason;
    }

}
