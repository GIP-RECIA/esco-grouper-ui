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
 * Class PrivilegesRadioEnum. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public enum PrivilegesRadioEnum {

    /**
     * The different kind of Radio.
     */
    IMMEDIATE(0, "PRIVILEGE_RADIO_IMMEDIATE"), EFFECTIVE(1, "PRIVILEGE_RADIO_EFFECTIVE"), ALL(2, "PRIVILEGE_RADIO_ALL");

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
    private PrivilegesRadioEnum(final int theId, final String theLabel) {
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
    public static PrivilegesRadioEnum fromValue(final String theLabel) {
        return PrivilegesRadioEnum.valueOf(theLabel);
    }

    /**
     * Get the PrivilegesRadioEnum from the label.
     * 
     * @param theLabel
     *            the label of the PrivilegesRadioEnum.
     * @return the PrivilegesRadioEnum.
     */
    public static PrivilegesRadioEnum fromLabel(final String theLabel) {

        PrivilegesRadioEnum resultEnum = null;
        PrivilegesRadioEnum[] privilegesRadioEnums = PrivilegesRadioEnum.values();

        for (PrivilegesRadioEnum privilegesRadioEnum : privilegesRadioEnums) {
            if (privilegesRadioEnum.getLabel().equals(theLabel)) {
                resultEnum = privilegesRadioEnum;
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
