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
