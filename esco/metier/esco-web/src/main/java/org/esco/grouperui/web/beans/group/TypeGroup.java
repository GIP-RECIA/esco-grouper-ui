package org.esco.grouperui.web.beans.group;

import java.util.ArrayList;
import java.util.List;

import org.esco.grouperui.domaine.beans.SimpleValue;

/**
 * Class DynamicGroup. Requirement(s) : [RECIA-ESCO-L1-007]
 * 
 * @author ctrimoreau
 */
public class TypeGroup {

    /** The key. */
    private String               key;

    /** The list of values. */
    private List < SimpleValue > values;

    /**
     * Default constructor.
     */
    public TypeGroup() {
        this.values = new ArrayList < SimpleValue >();
    }

    /**
     * Getter for key.
     * 
     * @return the key to get.
     */
    public final String getKey() {
        return this.key;
    }

    /**
     * Setter for key.
     * 
     * @param theKey
     *            the key to set.
     */
    public final void setKey(final String theKey) {
        this.key = theKey;
    }

    /**
     * Getter for values.
     * 
     * @return the values to get.
     */
    public final List < SimpleValue > getValues() {
        return this.values;
    }

    /**
     * Setter for values.
     * 
     * @param theValues
     *            the values to set.
     */
    public final void setValues(final List < SimpleValue > theValues) {
        this.values = theValues;
    }

}
