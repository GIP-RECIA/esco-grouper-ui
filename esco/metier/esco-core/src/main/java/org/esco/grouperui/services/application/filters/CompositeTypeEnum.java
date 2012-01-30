package org.esco.grouperui.services.application.filters;

import org.apache.commons.lang.Validate;

/**
 * <b>Enumeration for privileges searches.</b>
 * 
 * @author SopraGroup
 */
public enum CompositeTypeEnum {

    /** read. **/
    UNION("UNION"),
    /** read. **/
    COMPLEMENT("COMPLEMENT"),
    /** read. **/
    INTERSECTION("INTERSECTION");

    /** The value of the enum. */
    private final String value;

    /**
     * Default constructor.
     * 
     * @param value
     *            : the value.
     */
    private CompositeTypeEnum(final String value) {
        Validate.notNull(value, "Enum value must be defined");

        this.value = value;
    }

    /**
     * Getter for attribute <b>value</b>.
     * 
     * @return the value
     */
    public String getValue() {
        return this.value;
    }

    /**
     * Get enum from it value.
     * 
     * @param value
     *            : the value of the enum.
     * @return the enum matching value.
     */
    public static CompositeTypeEnum getFromValue(final String value) {

        CompositeTypeEnum retour = null;

        for (CompositeTypeEnum en : CompositeTypeEnum.values()) {
            if (en.getValue().equals(value)) {
                retour = en;
                break;
            }
        }

        return retour;

    }
}
