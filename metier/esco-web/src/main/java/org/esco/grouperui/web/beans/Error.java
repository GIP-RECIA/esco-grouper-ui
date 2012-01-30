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
