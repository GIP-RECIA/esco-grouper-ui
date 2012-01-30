package org.esco.grouperui.tools.parameter;

/**
 * @author dMoulron
 */
public class Parameter {

    /**
     * the pkey of parameter.
     */
    private String pkey;

    /**
     * the key of parameter.
     */
    private String key;

    /**
     * the value of parameter.
     */
    private String value;

    /**
     * Default constructor.
     */
    public Parameter() {
    }

    /**
     * Get the pkey property.
     * 
     * @return the pkey
     */
    public String getPkey() {
        return this.pkey;
    }

    /**
     * Setter of the pkey property.
     * 
     * @param thePkey
     *            the pkey to set
     */
    public void setPkey(final String thePkey) {
        this.pkey = thePkey;
    }

    /**
     * Get the key property.
     * 
     * @return the key
     */
    public String getKey() {
        return this.key;
    }

    /**
     * Setter of the key property.
     * 
     * @param theKey
     *            the key to set
     */
    public void setKey(final String theKey) {
        this.key = theKey;
    }

    /**
     * Get the value property.
     * 
     * @return the value
     */
    public String getValue() {
        return this.value;
    }

    /**
     * Setter of the value property.
     * 
     * @param theValue
     *            the value to set
     */
    public void setValue(final String theValue) {
        this.value = theValue;
    }

}
