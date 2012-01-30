package org.esco.grouperui.web.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Class XMLResultString. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author oFages
 */
@XmlRootElement(name = "result")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class XMLResultComplex {

    /**
     * The status.
     */
    private Boolean status = Boolean.FALSE;

    /**
     * The id of the component.
     */
    private String  idOfComponent;

    /**
     * Default constructor.
     */
    public XMLResultComplex() {
    }

    /**
     * minimal constructor.
     * 
     * @param theStatus
     *            the status to be set
     * @param theIdOfComponent
     *            the id to be set
     */
    public XMLResultComplex(final Boolean theStatus, final String theIdOfComponent) {
        this.status = theStatus;
        this.idOfComponent = theIdOfComponent;
    }

    /**
     * getter for property status.
     * 
     * @return the status
     */
    @XmlElement
    public Boolean getStatus() {
        return this.status;
    }

    /**
     * Getter for idOfComponent.
     * 
     * @return the idOfComponent to get.
     */
    @XmlElement
    public final String getIdOfComponent() {
        return this.idOfComponent;
    }

}
