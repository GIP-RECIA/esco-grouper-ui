package org.esco.grouperui.web.beans;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Class DropDown. Requirement(s) : [RECIA-ESCO-L2-001], [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
@XmlRootElement(name = "dropDown")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class DropDown {

    /**
     * The list of values in the dropDown object.
     */
    private List < DropDownAttribute > dropDownAttributes;

    /**
     * Default constructor.
     */
    public DropDown() {
        super();
    }

    /**
     * Constructor.
     * 
     * @param theDropDownAttributes
     *            the attributes of the dropDownList
     */
    public DropDown(final List < DropDownAttribute > theDropDownAttributes) {
        super();
        this.dropDownAttributes = theDropDownAttributes;
    }

    /**
     * Getter for dropDownAttributes.
     * 
     * @return the dropDownAttributes to get.
     */
    @XmlElement(name = "dropDownAttribute", type = DropDownAttribute.class)
    public final List < DropDownAttribute > getDropDownAttributes() {
        return this.dropDownAttributes;
    }

    /**
     * Setter for dropDownAttributes.
     * 
     * @param theDropDownAttributes
     *            the dropDownAttributes to set.
     */
    public final void setDropDownAttributes(final List < DropDownAttribute > theDropDownAttributes) {
        this.dropDownAttributes = theDropDownAttributes;
    }

}
