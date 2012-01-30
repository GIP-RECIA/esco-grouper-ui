package org.esco.grouperui.services.application.filters;

import org.apache.commons.lang.Validate;

/**
 * <b>Enumeration for privileges searches.</b>
 * 
 * @author SopraGroup
 */
public enum PrivilegeTypeEnum {

    /** read. **/
    ATTRIBUTE("attribute"),
    /** read. **/
    ACCESS("access"),
    /** read. **/
    NAMING("naming"),
    /** read. **/
    LIST("list");

    /** The value of the enum. */
    private final String value;

    /**
     * Default constructor.
     * 
     * @param value
     *            : the value.
     */
    private PrivilegeTypeEnum(final String value) {
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
    public static PrivilegeTypeEnum getFromValue(final String value) {

        PrivilegeTypeEnum retour = null;

        for (PrivilegeTypeEnum en : PrivilegeTypeEnum.values()) {
            if (en.getValue().equals(value)) {
                retour = en;
                break;
            }
        }

        return retour;

    }
}
