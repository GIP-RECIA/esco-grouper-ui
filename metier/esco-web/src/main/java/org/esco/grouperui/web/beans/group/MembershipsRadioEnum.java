package org.esco.grouperui.web.beans.group;

/**
 * Class MembershipsRadioEnum. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
public enum MembershipsRadioEnum {

    /**
     * The different kind of Radio.
     */
    // IMMEDIATE(0, "IMMEDIATE"), EFFECTIVE(1, "EFFECTIVE"), ALL(2, "ALL");
    IMMEDIATE(0, "MEMBERSHIP_RADIO_IMMEDIATE"), EFFECTIVE(1, "MEMBERSHIP_RADIO_EFFECTIVE"), ALL(2,
            "MEMBERSHIP_RADIO_ALL");

    /** The id. */
    private int    idEnum;

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
    private MembershipsRadioEnum(final int theId, final String theLabel) {
        this.idEnum = theId;
        this.label = theLabel;
    }

    /**
     * Get the MembershipsRadioEnum from the value.
     * 
     * @param theLabel
     *            the label of the MembershipsRadioEnum item.
     * @return the MembershipsRadioEnum.
     */
    public static MembershipsRadioEnum fromValue(final String theLabel) {
        return MembershipsRadioEnum.valueOf(theLabel);
    }

    /**
     * Get the MembershipsRadioEnum from the label.
     * 
     * @param theLabel
     *            the label of the MembershipsRadioEnum.
     * @return the MembershipsRadioEnum.
     */
    public static MembershipsRadioEnum fromLabel(final String theLabel) {

        MembershipsRadioEnum resultEnum = null;
        MembershipsRadioEnum[] membershipsRadioEnums = MembershipsRadioEnum.values();

        for (MembershipsRadioEnum membershipsRadioEnum : membershipsRadioEnums) {
            if (membershipsRadioEnum.getLabel().equals(theLabel)) {
                resultEnum = membershipsRadioEnum;
            }
        }

        return resultEnum;
    }

    /**
     * Getter for id.
     * 
     * @return the id to get.
     */
    public final int getId() {
        return this.idEnum;
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
