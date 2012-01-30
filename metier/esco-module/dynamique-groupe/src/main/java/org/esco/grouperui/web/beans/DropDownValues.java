package org.esco.grouperui.web.beans;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.esco.grouperui.domaine.beans.SimpleValue;

/**
 * Class DropDownValues. Requirement(s) : [RECIA-ESCO-L2-001],
 * [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
@XmlRootElement(name = "dropDownValues")
public class DropDownValues {

    /**
     * The list of values in the dropDown object.
     */
    private List < SimpleValue > dynamicAttributes;

    /**
     * Default constructor.
     */
    public DropDownValues() {
        super();
    }

    /**
     * Constructor.
     * 
     * @param theDynamicAttributes
     *            the list of values in the dropDown object.
     */
    public DropDownValues(final List < SimpleValue > theDynamicAttributes) {
        super();
        this.dynamicAttributes = theDynamicAttributes;
    }

    /**
     * Getter for dynamicAttributes.
     * 
     * @return the dynamicAttributes to get.
     */
    @XmlElement(name = "dynamicAttribute", type = SimpleValue.class)
    public final List < SimpleValue > getDynamicAttributes() {
        return this.dynamicAttributes;
    }

    /**
     * Setter for dynamicAttributes.
     * 
     * @param theDynamicAttributes
     *            the dynamicAttributes to set.
     */
    public final void setDynamicAttributes(final List < SimpleValue > theDynamicAttributes) {
        this.dynamicAttributes = theDynamicAttributes;
    }

}
