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
