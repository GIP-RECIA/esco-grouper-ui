package org.esco.grouperui.services.application.filters;

import org.apache.commons.lang.Validate;

/**
 * <b>Enumeration for query.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public enum SearchGroupEnum {

    /** Search by group UUID. **/
    NAME("name"), DISPLAY_NAME("displayName"), EXTENSION("extension");

    /**
     * The value of the enum.
     */
    private final String value;

    /**
     * Default constructor.
     * 
     * @param value
     *            : the value of the enum
     */
    private SearchGroupEnum(final String value) {
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

}