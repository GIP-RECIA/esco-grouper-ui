/**
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
