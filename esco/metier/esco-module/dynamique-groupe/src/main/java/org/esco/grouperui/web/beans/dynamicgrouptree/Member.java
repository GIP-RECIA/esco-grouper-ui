package org.esco.grouperui.web.beans.dynamicgrouptree;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Member class. Requirement(s) : [RECIA-ESCO-L2-001], [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
@XmlRootElement(name = "member")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class Member {

    /** The type property. */
    private String type;

    /** The value property. */
    private String value;

    /**
     * Default constructor.
     */
    public Member() {

    }

    /**
     * Constructor.
     * 
     * @param theType
     *            the type of the member
     * @param theValue
     *            the value of the member
     */
    public Member(final String theType, final String theValue) {
        super();
        this.type = theType;
        this.value = theValue;
    }

    /**
     * Getter for type.
     * 
     * @return the type to get.
     */
    @XmlAttribute(name = "type")
    public final String getType() {
        return this.type;
    }

    /**
     * Setter for type.
     * 
     * @param theType
     *            the type to set.
     */
    public final void setType(final String theType) {
        this.type = theType;
    }

    /**
     * Getter for value.
     * 
     * @return the value to get.
     */
    @XmlAttribute(name = "value")
    public final String getValue() {
        return this.value;
    }

    /**
     * Setter for value.
     * 
     * @param theValue
     *            the value to set.
     */
    public final void setValue(final String theValue) {
        this.value = theValue;
    }

}
