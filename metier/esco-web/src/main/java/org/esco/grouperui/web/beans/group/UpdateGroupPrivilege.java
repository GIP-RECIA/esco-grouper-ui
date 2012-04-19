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

import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;

/**
 * Class GroupPrivilegesController. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class UpdateGroupPrivilege {

    /** The group uuid. */
    private String               groupUuid;

    /** The possibility to subscribe. */
    private Boolean              optIn;

    /** The possibility to unsubscribe. */
    private Boolean              optOut;

    /** The group privileges. */
    private GroupPrivilegeEnum privilege;

    /**
     *
     */
    public UpdateGroupPrivilege() {
    }

    /**
     * Getter for groupUuid.
     * 
     * @return the groupUuid to get.
     */
    public final String getGroupUuid() {
        return this.groupUuid;
    }

    /**
     * Setter for groupUuid.
     * 
     * @param theGroupUuid
     *            the groupUuid to set.
     */
    public final void setGroupUuid(final String theGroupUuid) {
        this.groupUuid = theGroupUuid;
    }

    /**
     * Getter for optIn.
     * 
     * @return the optIn to get.
     */
    public final Boolean getOptIn() {
        return this.optIn;
    }

    /**
     * Setter for optIn.
     * 
     * @param theOptIn
     *            the optIn to set.
     */
    public final void setOptIn(final Boolean theOptIn) {
        this.optIn = theOptIn;
    }

    /**
     * Getter for optOut.
     * 
     * @return the optOut to get.
     */
    public final Boolean getOptOut() {
        return this.optOut;
    }

    /**
     * Setter for optOut.
     * 
     * @param theOptOut
     *            the optOut to set.
     */
    public final void setOptOut(final Boolean theOptOut) {
        this.optOut = theOptOut;
    }

    /**
     * Getter for privilege.
     * 
     * @return the privilege to get.
     */
    public final GroupPrivilegeEnum getPrivilege() {
        return this.privilege;
    }

    /**
     * Setter for privilege.
     * 
     * @param thePrivilege
     *            the privilege to set.
     */
    public final void setPrivilege(final GroupPrivilegeEnum thePrivilege) {
        this.privilege = thePrivilege;
    }

}
