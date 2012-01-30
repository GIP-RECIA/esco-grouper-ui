package org.esco.grouperui.web.beans.tree;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * TreeNode class. Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "elements")
public class TreeNode {

    /** The attributes property. */
    private Attributes attributes;

    /** The data property. */
    private ViewData   data;

    /** The state property. */
    private String     state;

    /**
     * Default constructor.
     */
    public TreeNode() {

    }

    /**
     * Get the attributes property.
     * 
     * @return the attributes
     */
    @XmlElement(name = "attributes")
    public Attributes getAttributes() {
        return this.attributes;
    }

    /**
     * Setter of the attributes property.
     * 
     * @param theAttributes
     *            the attributes to set
     */
    public void setAttributes(final Attributes theAttributes) {
        this.attributes = theAttributes;
    }

    /**
     * Get the data property.
     * 
     * @return the data
     */
    @XmlElement(name = "data")
    public ViewData getData() {
        return this.data;
    }

    /**
     * Setter of the data property.
     * 
     * @param theData
     *            the data to set
     */
    public void setData(final ViewData theData) {
        this.data = theData;
    }

    /**
     * Get the state property.
     * 
     * @return the state
     */
    public String getState() {
        return this.state;
    }

    /**
     * Set the state property.
     * 
     * @param theState
     *            the state to set
     */
    public void setState(final String theState) {
        this.state = theState;
    }

}
