package org.esco.grouperui.web.beans;

import java.util.Set;

/**
 * Class Attribute. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class Attribute {

    /** The key corresponding to the values. */
    private final String         key;

    /** The values corresponding to the key. */
    private final Set < String > values;

    /**
     * Default constructor.
     * 
     * @param theKey
     *            the key.
     * @param theValues
     *            the values.
     */
    public Attribute(final String theKey, final Set < String > theValues) {
        this.key = theKey;
        this.values = theValues;
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
     * Getter for value.
     * 
     * @return the value to get.
     */
    public final String getValues() {
        StringBuffer buffer = new StringBuffer();
        final int nbValues = this.values.size();

        int cpt = 1;
        for (String str : this.values) {
            buffer.append(str);
            if (cpt < nbValues) {
                buffer.append(", ");
            }
            cpt++;
        }

        return buffer.toString();
    }
}
