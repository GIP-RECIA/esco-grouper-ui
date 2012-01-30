package org.esco.grouperui.domaine.beans;

import org.apache.commons.lang.Validate;

/**
 * <b>Enumeration for privileges searches.</b>
 * 
 * @author SopraGroup
 */
public enum StemPrivilegeEnum {

    /** STEM. **/
    STEM("stem"),
    /** CREATE. **/
    CREATE("create");

    /** The value of the enum. */
    private final String value;

    /**
     * Default constructor.
     * 
     * @param value
     *            : the value.
     */
    private StemPrivilegeEnum(final String value) {
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
    public static StemPrivilegeEnum getFromValue(final String value) {

        StemPrivilegeEnum result = null;

        for (StemPrivilegeEnum en : StemPrivilegeEnum.values()) {
            if (en.getValue().equals(value)) {
                result = en;
                break;
            }
        }

        return result;
    }
}
