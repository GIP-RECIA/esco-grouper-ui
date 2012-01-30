package org.esco.grouperui.domaine.beans;

import java.util.ArrayList;
import java.util.List;

/**
 * Class GroupType. Requirements: [RECIA-ESCO-L1-007], [RECIA-ESCO-L1-009],
 * [RECIA-ESCO-L1-010s]
 * 
 * @author ctrimoreau
 */
public class GroupType {

    /** The GroupType uuid. */
    private String         uuid;

    /** The GroupType name. */
    private String         name;

    /** The GroupType fields. */
    private List < Field > fields;

    /**
     * Default constructor.
     */
    public GroupType() {
        this.fields = new ArrayList < Field >();
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
     * Getter for fields.
     * 
     * @return the fields to get.
     */
    public final List < Field > getFields() {
        return this.fields;
    }

    /**
     * Setter for fields.
     * 
     * @param theFields
     *            the fields to set.
     */
    public final void setFields(final List < Field > theFields) {
        this.fields = theFields;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return this.name.hashCode();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean equals(final Object theObj) {
        boolean result = false;
        // two groupType are equals if they have the same name
        if (null != theObj
                && theObj instanceof GroupType
                && (((GroupType) theObj).getName() == null && this.name == null || ((GroupType) theObj).getName() != null
                        && ((GroupType) theObj).getName().equals(this.name))) {
            result = true;
        }
        return result;
    }
}
