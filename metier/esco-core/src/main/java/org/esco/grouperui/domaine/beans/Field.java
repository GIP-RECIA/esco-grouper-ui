package org.esco.grouperui.domaine.beans;

import java.io.Serializable;

/**
 * Class Field. Requirements: [RECIA-ESCO-L1-007]
 * 
 * @author ctrimoreau
 */
public class Field implements Serializable {

    /**
     * The serial uid.
     */
    private static final long serialVersionUID = 6575449438534234790L;

    /** The Field uuid. */
    private String            uuid;

    /** The Field name. */
    private String            name;

    /** The Field groupTypeUuid. */
    private String            groupTypeUuid;

    /**
     * Default constructor.
     */
    public Field() {
    }

    /**
     * Getter for uuid.
     * 
     * @return the uuid to get.
     */
    public final String getUuid() {
        return this.uuid;
    }

    /**
     * Setter for uuid.
     * 
     * @param theUuid
     *            the uuid to set.
     */
    public final void setUuid(final String theUuid) {
        this.uuid = theUuid;
    }

    /**
     * Getter for name.
     * 
     * @return the name to get.
     */
    public final String getName() {
        return this.name;
    }

    /**
     * Setter for name.
     * 
     * @param theName
     *            the name to set.
     */
    public final void setName(final String theName) {
        this.name = theName;
    }

    /**
     * Getter for groupTypeUuid.
     * 
     * @return the groupTypeUuid to get.
     */
    public final String getGroupTypeUuid() {
        return this.groupTypeUuid;
    }

    /**
     * Setter for groupTypeUuid.
     * 
     * @param theGroupTypeUuid
     *            the groupTypeUuid to set.
     */
    public final void setGroupTypeUuid(final String theGroupTypeUuid) {
        this.groupTypeUuid = theGroupTypeUuid;
    }

}
