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

import java.util.ArrayList;
import java.util.List;

/**
 * Response of service call.
 * 
 * @author SopraGroup
 */
public class Responses {

    /** The object in entry of service. **/
    private List < Response > responses;

    /**
     * Default constructor.
     */
    public Responses() {
        super();
        this.responses = new ArrayList < Response >();
    }

    /**
     * Getter for attribute <b>responses</b>.
     * 
     * @return the responses
     */
    public List < Response > getResponses() {
        return this.responses;
    }

    /**
     * Setter for attribute <b>responses</b>.
     * 
     * @param theResponses
     *            the responses to set
     */
    public void setResponses(final List < Response > theResponses) {
        this.responses = theResponses;
    }

    /**
     * add a new response to the list of response.
     * 
     * @param response
     *            : the response to add.
     */
    public void add(final Response response) {

        if (this.responses == null) {
            this.responses = new ArrayList < Response >();
        }

        this.responses.add(response);
    }

    /**
     * @return the list of messages
     */
    public List < String > getAllMessages() {

        List < String > retour = new ArrayList < String >();

        for (Response response : this.responses) {
            retour.add(response.getReason());
        }

        return retour;
    }

}
