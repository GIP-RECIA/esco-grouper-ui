package org.esco.grouperui.web.beans.tree;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Attributes class. Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "attributes")
public class Attributes {

    /**
     * The id property. For the tree construction, it is necessary to nominate
     * the property "id".
     */
    private String id;

    /** The name property. */
    private String name;

    /** The display name property. */
    private String displayName;

    /** The type property. */
    private String typeNode;

    /** The right property. */
    private String right;

    /** The optin property. */
    private String optin;

    /** The optout property. */
    private String optout;

    /** The empty information. */
    private String isEmpty;

    /**
     * Default constructor.
     */
    public Attributes() {
    }

    /**
     * Get the id property.
     * 
     * @return the id
     */
    public String getId() {
        return this.id;
    }

    /**
     * Setter of the id property.
     * 
     * @param theId
     *            the id to set
     */
    public void setId(final String theId) {
        this.id = theId;
    }

    /**
     * Get the type property.
     * 
     * @return the type
     */
    @XmlElement(name = "typeNode")
    public String getType() {
        return this.typeNode;
    }

    /**
     * Setter of the type property.
     * 
     * @param theType
     *            the type to set
     */
    public void setType(final String theType) {
        this.typeNode = theType;
    }

    /**
     * Get the right property.
     * 
     * @return the right
     */
    public String getRight() {
        return this.right;
    }

    /**
     * Setter of the right property.
     * 
     * @param theRight
     *            the right to set
     */
    public void setRight(final String theRight) {
        this.right = theRight;
    }

    /**
     * Get the name property.
     * 
     * @return the name
     */
    public String getName() {
        return this.name;
    }

    /**
     * Setter of the name property.
     * 
     * @param theName
     *            the name to set
     */
    public void setName(final String theName) {
        this.name = theName;
    }

    /**
     * Get the displayName property.
     * 
     * @return the displayName
     */
    public String getDisplayName() {
        return this.displayName;
    }

    /**
     * Setter of the displayName property.
     * 
     * @param theDisplayName
     *            the displayName to set
     */
    public void setDisplayName(final String theDisplayName) {
        this.displayName = theDisplayName;
    }

    /**
     * Get the optin property.
     * 
     * @return the optin
     */
    public String getOptin() {
        return this.optin;
    }

    /**
     * Setter of the optin property.
     * 
     * @param theOptin
     *            the optin to set
     */
    public void setOptin(final String theOptin) {
        this.optin = theOptin;
    }

    /**
     * Get the optout property.
     * 
     * @return the optout
     */
    public String getOptout() {
        return this.optout;
    }

    /**
     * Setter of the optout property.
     * 
     * @param theOptout
     *            the optout to set
     */
    public void setOptout(final String theOptout) {
        this.optout = theOptout;
    }

    /**
     * Get the isEmpty property.
     * 
     * @return the isEmpty
     */
    public String getIsEmpty() {
        return this.isEmpty;
    }

    /**
     * Setter of the isEmtpy property.
     * 
     * @param theIsEmpty
     *            the isEmpty to set
     */
    public void setIsEmpty(final String theIsEmpty) {
        this.isEmpty = theIsEmpty;
    }

}
