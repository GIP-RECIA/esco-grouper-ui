package org.esco.grouperui.web.controllers.groupProperties;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.Subject;

/**
 * Class PrivilegeDisplayUtils.<br/>
 * Requirement(s) : [RECIA-ESCO-L1-008]
 */

public final class PrivilegeDisplayUtils {

    /**
     * Private constructor.
     */
    private PrivilegeDisplayUtils() {
    }

    /**
     * Assign the display privilege for a group.
     * 
     * @param theGroup
     *            The group.
     * @param cells
     *            the cells.
     */
    public static void assignDisplayPrivilege(final Group theGroup, final List < String > cells) {

        // Subscription
        if (theGroup.isCanOptin()) {
            cells.add("1");
        } else {
            cells.add("0");
        }

        // Unsubscription
        if (theGroup.isCanOptout()) {
            cells.add("1");
        } else {
            cells.add("0");
        }

        // Privileges
        GroupPrivilegeEnum privilege = theGroup.getUserRight();

        if (GroupPrivilegeEnum.ADMIN.equals(privilege)) {
            cells.add("1");
            cells.add("1");
            cells.add("1");
            cells.add("1");
        } else
            if (GroupPrivilegeEnum.UPDATE.equals(privilege)) {
                cells.add("1");
                cells.add("1");
                cells.add("1");
                cells.add("0");
            } else
                if (GroupPrivilegeEnum.READ.equals(privilege)) {
                    cells.add("1");
                    cells.add("1");
                    cells.add("0");
                    cells.add("0");
                } else
                    if (GroupPrivilegeEnum.VIEW.equals(privilege)) {
                        cells.add("1");
                        cells.add("0");
                        cells.add("0");
                        cells.add("0");
                    } else
                        if (GroupPrivilegeEnum.NONE.equals(privilege)) {
                            cells.add("0");
                            cells.add("0");
                            cells.add("0");
                            cells.add("0");
                        }

    }

    /**
     * Assign the display privileges for a stem.
     * 
     * @param theStem
     *            the stem.
     * @param cells
     *            the cells.
     * @param originalStemPrivilege
     *            The original stem.
     * @param originals
     *            The original privileges.
     */
    public static void assignDisplayStemPrivilege(final Stem theStem, final List < String > cells,
            final Stem originalStemPrivilege, final List < String > originals) {

        // Stem creation privilege
        if (null != theStem.getHasStem()) {
            if (theStem.getHasStem()) {
                cells.add("1");
            } else {
                cells.add("0");
            }
        } else
            if (null != originalStemPrivilege.getHasStem()) {
                if (originalStemPrivilege.getHasStem()) {
                    cells.add("1");
                } else {
                    cells.add("0");
                }
            }
        if (null != originalStemPrivilege.getHasStem()) {
            if (originalStemPrivilege.getHasStem()) {
                originals.add("1");
            } else {
                originals.add("0");
            }
        }

        // Group creation privilege
        if (null != theStem.getHasCreate()) {
            if (theStem.getHasCreate()) {
                cells.add("1");
            } else {
                cells.add("0");
            }
        } else
            if (null != originalStemPrivilege.getHasCreate()) {
                if (originalStemPrivilege.getHasCreate()) {
                    cells.add("1");
                } else {
                    cells.add("0");
                }
            }
        if (null != originalStemPrivilege.getHasCreate()) {
            if (originalStemPrivilege.getHasCreate()) {
                originals.add("1");
            } else {
                originals.add("0");
            }
        }
    }

    /**
     * Assign the display privileges for a stem.
     * 
     * @param theStem
     *            the stem.
     * @param cells
     *            the cells.
     * @param originalStemPrivilege
     *            The original stem.
     * @param originals
     *            The original privileges.
     */
    public static void assignDisplayStemPrivilege(final Subject theStem, final List < String > cells,
            final Subject originalStemPrivilege, final List < String > originals) {

        // Stem creation privilege
        if (null != theStem.getHasStem()) {
            if (theStem.getHasStem()) {
                cells.add("1");
            } else {
                cells.add("0");
            }
        } else
            if (null != originalStemPrivilege.getHasStem()) {
                if (originalStemPrivilege.getHasStem()) {
                    cells.add("1");
                } else {
                    cells.add("0");
                }
            }
        if (null != originalStemPrivilege.getHasStem()) {
            if (originalStemPrivilege.getHasStem()) {
                originals.add("1");
            } else {
                originals.add("0");
            }
        }

        // Group creation privilege
        if (null != theStem.getHasCreate()) {
            if (theStem.getHasCreate()) {
                cells.add("1");
            } else {
                cells.add("0");
            }
        } else
            if (null != originalStemPrivilege.getHasCreate()) {
                if (originalStemPrivilege.getHasCreate()) {
                    cells.add("1");
                } else {
                    cells.add("0");
                }
            }
        if (null != originalStemPrivilege.getHasCreate()) {
            if (originalStemPrivilege.getHasCreate()) {
                originals.add("1");
            } else {
                originals.add("0");
            }
        }
    }

    /**
     * Check if a new privilege has to be assigned.
     * 
     * @param originalPrivilege
     *            the original privilege
     * @param newPrivilege
     *            the new privilege
     * @return a Boolean indicating if the privilege has to be assigned
     */
    public static Boolean hasToAssignPrivilege(final Boolean originalPrivilege, final Boolean newPrivilege) {
        Boolean hasToAssign = Boolean.FALSE;

        if (null != newPrivilege && newPrivilege && !newPrivilege.equals(originalPrivilege)) {
            hasToAssign = Boolean.TRUE;
        }

        return hasToAssign;
    }

    /**
     * Check if a privilege has to be removed.
     * 
     * @param originalPrivilege
     *            the original privilege
     * @param newPrivilege
     *            the new privilege
     * @return a Boolean indicating if the privilege has to be removed
     */
    public static Boolean hasToRemovePrivilege(final Boolean originalPrivilege, final Boolean newPrivilege) {
        Boolean hasToRemove = Boolean.FALSE;

        if (null != newPrivilege && null != originalPrivilege && !newPrivilege
                && !newPrivilege.equals(originalPrivilege)) {
            hasToRemove = Boolean.TRUE;
        }

        return hasToRemove;
    }

    /**
     * Get the list of privileges to assign to the group.
     * 
     * @param originalGroupPrivilege
     *            the original privileges on the group
     * @param updateGroupPrivilege
     *            the new privileges on the group
     * @return the list of privileges to assign
     */
    public static List < GroupPrivilegeEnum > getPrivilegesToAssign(final Group originalGroupPrivilege,
            final Group updateGroupPrivilege) {
        return PrivilegeDisplayUtils.getPrivileges(originalGroupPrivilege, updateGroupPrivilege, true);
    }

    /**
     * Get the list of privileges to remove to the group.
     * 
     * @param originalGroupPrivilege
     *            the original privileges on the group
     * @param updateGroupPrivilege
     *            the new privileges on the group
     * @return the list of privileges to remove
     */
    public static List < GroupPrivilegeEnum > getPrivilegesToRemove(final Group originalGroupPrivilege,
            final Group updateGroupPrivilege) {
        return PrivilegeDisplayUtils.getPrivileges(originalGroupPrivilege, updateGroupPrivilege, false);
    }

    /**
     * Get the list of privileges to remove to the group.
     * 
     * @param originalGroupPrivilege
     *            the original privileges on the group
     * @param updateGroupPrivilege
     *            the new privileges on the group
     * @param isAssign
     *            true if we find privilege to be assign, false otherwise
     * @return the list of privileges to remove
     */
    private static List < GroupPrivilegeEnum > getPrivileges(final Group originalGroupPrivilege,
            final Group updateGroupPrivilege, final boolean isAssign) {
        List < GroupPrivilegeEnum > privileges = new ArrayList < GroupPrivilegeEnum >();

        GroupPrivilegeEnum originalPrivilege = originalGroupPrivilege.getUserRight();
        List < GroupPrivilegeEnum > originalPrivilegesAssigned = PrivilegeDisplayUtils
                .getPrivilegesAssigned(originalPrivilege);

        GroupPrivilegeEnum updatePrivilege = updateGroupPrivilege.getUserRight();
        List < GroupPrivilegeEnum > updatePrivilegesAssigned = PrivilegeDisplayUtils
                .getPrivilegesAssigned(updatePrivilege);

        if (isAssign) {
            if (PrivilegeDisplayUtils.hasToAssignPrivilege(originalGroupPrivilege.isCanOptin(),
                    updateGroupPrivilege.isCanOptin())) {
                privileges.add(GroupPrivilegeEnum.OPTIN);
            }

            if (PrivilegeDisplayUtils.hasToAssignPrivilege(originalGroupPrivilege.isCanOptout(),
                    updateGroupPrivilege.isCanOptout())) {
                privileges.add(GroupPrivilegeEnum.OPTOUT);
            }

            privileges.addAll(updatePrivilegesAssigned);

        } else {
            if (PrivilegeDisplayUtils.hasToRemovePrivilege(originalGroupPrivilege.isCanOptin(),
                    updateGroupPrivilege.isCanOptin())) {
                privileges.add(GroupPrivilegeEnum.OPTIN);
            }

            if (PrivilegeDisplayUtils.hasToRemovePrivilege(originalGroupPrivilege.isCanOptout(),
                    updateGroupPrivilege.isCanOptout())) {
                privileges.add(GroupPrivilegeEnum.OPTOUT);
            }

            for (GroupPrivilegeEnum privilegeEnum : originalPrivilegesAssigned) {
                if (!updatePrivilegesAssigned.contains(privilegeEnum)) {
                    privileges.add(privilegeEnum);
                }
            }
        }

        Collections.sort(privileges, new Comparator < GroupPrivilegeEnum >() {
            public int compare(final GroupPrivilegeEnum theO1, final GroupPrivilegeEnum theO2) {
                Boolean result = theO1.gt(theO2);
                if (result) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });

        return privileges;
    }

    /**
     * Get the list of privileges that are assigned to the group.
     * 
     * @param privilege
     *            the privileges of the group
     * @return the list of privileges assigned
     */
    private static List < GroupPrivilegeEnum > getPrivilegesAssigned(final GroupPrivilegeEnum privilege) {
        List < GroupPrivilegeEnum > privilegesAssigned = new ArrayList < GroupPrivilegeEnum >();
        privilegesAssigned.addAll(GroupPrivilegeEnum.allPrivLt(privilege));

        return privilegesAssigned;
    }

    /**
     * Get the list of privileges to assign or remove to the group.
     * 
     * @param groupPrivilege
     *            the privileges of the group
     * @return the list of privileges to assign or remove
     */
    public static List < GroupPrivilegeEnum > getPrivilegesToAssignOrRemove(final Group groupPrivilege) {
        List < GroupPrivilegeEnum > privilegesToAssignOrRemove = new ArrayList < GroupPrivilegeEnum >();

        // optin
        if (groupPrivilege.isCanOptin()) {
            privilegesToAssignOrRemove.add(GroupPrivilegeEnum.OPTIN);
        }

        // optout
        if (groupPrivilege.isCanOptout()) {
            privilegesToAssignOrRemove.add(GroupPrivilegeEnum.OPTOUT);
        }

        privilegesToAssignOrRemove.addAll(GroupPrivilegeEnum.allPrivLt(groupPrivilege.getUserRight()));

        return privilegesToAssignOrRemove;
    }

    /**
     * Get the privilege to display from a String.
     * 
     * @param privilege
     *            the privilege.
     * @return the privilege to display
     */
    public static String getDisplayPrivilege(final String privilege) {
        String value = null;

        if ("true".equals(privilege)) {
            value = "1";
        } else
            if ("false".equals(privilege)) {
                value = "0";
            } else {
                value = privilege;
            }

        return value;
    }

    /**
     * Get the privilege to display from a boolean.
     * 
     * @param privilege
     *            the privilege.
     * @return the privilege to display
     */
    public static String getDisplayPrivilege(final boolean privilege) {
        String value = null;

        if (privilege) {
            value = "1";
        } else {
            value = "0";
        }

        return value;
    }

}
