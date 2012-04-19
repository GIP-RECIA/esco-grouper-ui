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
package org.esco.grouperui.web.beans;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author dMoulron
 */
@XmlRootElement
public class Error {

    /** message to be display . */
    private String  message;

    /** status of operation . */
    private boolean status;

    /**
     * Default constructor.
     */
    public Error() {
    }

    /**
     * Default constructor.
     * 
     * @param theMessage
     *            The message to display.
     * @param theStatus
     *            The status.
     */
    public Error(final boolean theStatus, final String theMessage) {
        super();
        this.message = theMessage;
        this.status = theStatus;
    }

    /**
     * getter for property message.
     * 
     * @return the message
     */
    public String getMessage() {
        return this.message;
    }

    /**
     * setter for property message.
     * 
     * @param theMessage
     *            the message to set.
     */
    public void setMessage(final String theMessage) {
        this.message = theMessage;
    }

    /**
     * Get the status property.
     * 
     * @return the status
     */
    public boolean isStatus() {
        return this.status;
    }

    /**
     * Setter of the status property.
     * 
     * @param theStatus
     *            the status to set
     */
    public void setStatus(final boolean theStatus) {
        this.status = theStatus;
    }

}
