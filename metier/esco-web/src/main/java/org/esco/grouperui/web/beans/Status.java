package org.esco.grouperui.web.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

/**
 * @author dMoulron
 */
@XmlRootElement(name = "status")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class Status {

    /**
     *
     */
    private Boolean status = Boolean.FALSE;

    /**
     * Default constructor.
     */
    public Status() {
    }

    /**
     * minimal constructor.
     * 
     * @param theStatus
     *            the status to be set
     */
    public Status(final Boolean theStatus) {
        this.status = theStatus;
    }

    /**
     * getter for property status.
     * 
     * @return the status
     */
    @XmlValue
    public Boolean getStatus() {
        return this.status;
    }
}
