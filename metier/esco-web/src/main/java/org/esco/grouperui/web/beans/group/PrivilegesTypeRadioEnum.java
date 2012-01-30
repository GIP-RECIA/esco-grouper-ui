package org.esco.grouperui.web.beans.group;

/**
 * Class PrivilegesTypeRadioEnum. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public enum PrivilegesTypeRadioEnum {

    /**
     * The different kind of Radio.
     */
    GROUP(1, "PRIVILEGE_TYPE_RADIO_GROUP"), FOLDER(0, "PRIVILEGE_TYPE_RADIO_FOLDER");

    /** The id. */
    private int    id;

    /** The label. */
    private String label;

    /**
     * Default constructor.
     * 
     * @param theId
     *            the id.
     * @param theLabel
     *            the label.
     */
    private PrivilegesTypeRadioEnum(final int theId, final String theLabel) {
        this.id = theId;
        this.label = theLabel;
    }

    /**
     * Get the MembersRadioEnum from the value.
     * 
     * @param theLabel
     *            the label of the MembersRadioEnum item
     * @return the MembersRadioEnum
     */
    public static PrivilegesTypeRadioEnum fromValue(final String theLabel) {
        return PrivilegesTypeRadioEnum.valueOf(theLabel);
    }

    /**
     * Getter for id.
     * 
     * @return the id to get.
     */
    public final int getId() {
        return this.id;
    }

    /**
     * Getter for label.
     * 
     * @return the label to get.
     */
    public final String getLabel() {
        return this.label;
    }

}
