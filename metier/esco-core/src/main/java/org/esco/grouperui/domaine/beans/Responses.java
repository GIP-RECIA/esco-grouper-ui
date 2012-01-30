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
