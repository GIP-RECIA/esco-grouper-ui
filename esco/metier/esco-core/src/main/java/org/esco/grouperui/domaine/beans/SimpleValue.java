package org.esco.grouperui.domaine.beans;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Class SimpleValue. Requirement(s): [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
@XmlRootElement(name = "keyValueAttribute")
public class SimpleValue implements Cloneable {

    /** The key corresponding to the values. */
    private String key;

    /** The values corresponding to the key. */
    private String value;

    /**
     * Default constructor.
     */
    public SimpleValue() {
    }

    /**
     * Constructor with all parameters.
     * 
     * @param theKey
     *            the key value
     * @param theValue
     *            the value value
     */
    public SimpleValue(final String theKey, final String theValue) {
        this.key = theKey;
        this.value = theValue;
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
    public final String getValue() {
        return this.value;
    }

    /**
     * Setter for values.
     * 
     * @param theValues
     *            the values to set.
     */
    public final void setValue(final String theValues) {
        this.value = theValues;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Object clone() {
        SimpleValue newObject = null;
        try {
            newObject = (SimpleValue) super.clone();
        } catch (CloneNotSupportedException cnse) {
            // FIXME faire clone exception
        }
        newObject.key = this.key;
        newObject.value = this.value;
        return newObject;
    }

}
