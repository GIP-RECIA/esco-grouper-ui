package org.esco.grouperui.domaine.beans;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang.StringUtils;

/**
 * GrouperPrivilegeEnum enum for privilege of group.
 * Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
public enum GroupPrivilegeEnum {

    /** Admin value. */
    ADMIN(50, "admin"),
    /** Update value. */
    UPDATE(40, "update"),
    /** Read value. */
    READ(30, "read"),
    /** View value. */
    VIEW(20, "view"),
    /** None value. */
    NONE(10, "none"),
    /** Opt-in value. */
    OPTIN(-10, "optin"),
    /** Opt-out value. */
    OPTOUT(-20, "optout");

    /** The level of the privilege. */
    private int    level;

    /** The name of the privilege. */
    private String name;

    /**
     * Constructor of the class.
     * 
     * @param theLevel
     *            The level of the GrouperPrivilegeEnum.
     * @param theName
     *            The name of the GrouperPrivilegeEnum.
     */
    GroupPrivilegeEnum(final int theLevel, final String theName) {
        this.level = theLevel;
        this.name = theName;
    }

    /**
     * Get the GrouperPrivilegeEnum from value.
     * 
     * @param theName
     *            The name of the GrouperPrivilegeEnum to get.
     * @return the GrouperPrivilegeEnum.
     */
    public static GroupPrivilegeEnum fromValue(final String theName) {
        GroupPrivilegeEnum result = null;
        if (StringUtils.isNotEmpty(theName)) {
            result = GroupPrivilegeEnum.valueOf(theName.toUpperCase());
        }
        if (result == null) {
            result = GroupPrivilegeEnum.NONE;
        }
        return result;
    }

    /**
     * @param thePrivilegeEnum
     *            the type of privilege
     * @return the list of all privilege lether than thePrivilegeEnum parameter
     */
    public static List < GroupPrivilegeEnum > allPrivLt(final GroupPrivilegeEnum thePrivilegeEnum) {
        List < GroupPrivilegeEnum > privs = new ArrayList < GroupPrivilegeEnum >();

        GroupPrivilegeEnum[] allPrivs = GroupPrivilegeEnum.values();
        for (GroupPrivilegeEnum grouperPrivilegeEnum : allPrivs) {
            if (grouperPrivilegeEnum.lt(thePrivilegeEnum) && grouperPrivilegeEnum.level > 10) {
                privs.add(grouperPrivilegeEnum);
            }
        }

        Collections.sort(privs);

        return privs;
    }

    /**
     * Compare two GrouperPrivilegeEnum.
     * 
     * @param thePrivilegeEnum
     *            The GrouperPrivilegeEnum to compare.
     * @return true if equality.
     */
    public boolean eq(final GroupPrivilegeEnum thePrivilegeEnum) {
        return this.level == thePrivilegeEnum.getLevel();
    }

    /**
     * Compare two GrouperPrivilegeEnum.
     * 
     * @param thePrivilegeEnum
     *            The GrouperPrivilegeEnum to compare.
     * @return true if thePrivilegeEnum is smaller.
     */
    public boolean gt(final GroupPrivilegeEnum thePrivilegeEnum) {
        return this.level >= thePrivilegeEnum.getLevel();
    }

    /**
     * Compare two GrouperPrivilegeEnum.
     * 
     * @param thePrivilegeEnum
     *            GrouperPrivilegeEnum to compare.
     * @return true if thePrivilegeEnum is greater.
     */
    public boolean lt(final GroupPrivilegeEnum thePrivilegeEnum) {
        return this.level <= thePrivilegeEnum.getLevel();
    }

    /**
     * Get the level property.
     * 
     * @return the level
     */
    public int getLevel() {
        return this.level;
    }

    /**
     * Get the name property.
     * 
     * @return the name
     */
    public String getName() {
        return this.name;
    }

}
