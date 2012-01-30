package org.esco.grouperui.web.beans.group;

/**
 * Class MembersRadioEnum. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public enum MembersRadioEnum {

    /**
     * The different kind of Radio.
     */
    IMMEDIATE(0, "MEMBER_RADIO_IMMEDIATE"), EFFECTIVE(1, "MEMBER_RADIO_EFFECTIVE"), ALL(2, "MEMBER_RADIO_ALL");

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
    private MembersRadioEnum(final int theId, final String theLabel) {
        this.id = theId;
        this.label = theLabel;
    }

    /**
     * Get the MembersRadioEnum from the value.
     * 
     * @param theValue
     *            the label of the MembersRadioEnum item
     * @return the MembersRadioEnum
     */
    public static MembersRadioEnum fromValue(final String theValue) {
        return MembersRadioEnum.valueOf(theValue);
    }

    /**
     * search enum form label.
     * 
     * @param theLabel
     *            the label of the MembersRadioEnum item
     * @return the MembersRadioEnum
     */
    public static MembersRadioEnum formLabel(final String theLabel) {
        MembersRadioEnum[] enums = MembersRadioEnum.values();

        for (MembersRadioEnum membersRadioEnum : enums) {
            if (membersRadioEnum.getLabel().equals(theLabel)) {
                return membersRadioEnum;
            }
        }
        return null;
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
