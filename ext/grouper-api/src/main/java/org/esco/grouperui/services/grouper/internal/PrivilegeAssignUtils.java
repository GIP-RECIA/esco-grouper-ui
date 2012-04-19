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
package org.esco.grouperui.services.grouper.internal;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.StemPrivilegeEnum;

/**
 * Requirement(s):[RECIA-ESCO-L1-012].
 * 
 * @author aChesneau
 */
public final class PrivilegeAssignUtils {

    /**
     * Private constructor.
     */
    private PrivilegeAssignUtils() {
    }

    /**
     * Assigns a privilege on a stem.
     * 
     * @param theFolder
     *            The folder to assign on.
     * @param thePrivilege
     *            The privilege to assign.
     * @return the folder of the assignment.
     */
    public static Stem assignPrivilege(final Stem theFolder, final String thePrivilege) {
        Stem folder = theFolder;
        if (StemPrivilegeEnum.STEM.getValue().equals(thePrivilege)) {
            folder.setHasStem(true);
        } else
            if (StemPrivilegeEnum.CREATE.getValue().equals(thePrivilege)) {
                folder.setHasCreate(true);
            }
        return folder;
    }

    /**
     * Assign a privilege on a group.
     * 
     * @param theGroup
     *            The group to assign on.
     * @param thePrivilege
     *            The privilege to assign.
     * @return The group with this new right.
     */
    public static Group assignPrivilege(final Group theGroup, final String thePrivilege) {
        Group group = theGroup;

        GroupPrivilegeEnum privilegeEnum = GroupPrivilegeEnum.fromValue(thePrivilege);

        if (GroupPrivilegeEnum.OPTIN.eq(privilegeEnum)) {
            group.setCanOptin(true);
            if (PrivilegeAssignUtils.canAssignPrivilege(group, GroupPrivilegeEnum.VIEW)) {
                group.setUserRight(GroupPrivilegeEnum.VIEW);
            }
        } else
            if (GroupPrivilegeEnum.OPTOUT.eq(privilegeEnum)) {
                group.setCanOptout(true);
                if (PrivilegeAssignUtils.canAssignPrivilege(group, GroupPrivilegeEnum.VIEW)) {
                    group.setUserRight(GroupPrivilegeEnum.VIEW);
                }
            } else
                if (PrivilegeAssignUtils.canAssignPrivilege(group, privilegeEnum)) {
                    group.setUserRight(privilegeEnum);
                }
        return group;
    }

    /**
     * Test if we can assign the privilege or not.
     * 
     * @param theGroup
     *            The group to test.
     * @param thePrivilegeEnum
     *            The privilege to assign.
     * @return true if the right is greater and false if the right is smaller
     */
    public static boolean canAssignPrivilege(final Group theGroup, final GroupPrivilegeEnum thePrivilegeEnum) {

        boolean isAssignable = theGroup.getUserRight() == null;

        if (!isAssignable && theGroup.getUserRight().lt(thePrivilegeEnum)) {
            isAssignable = true;
        }

        return isAssignable;
    }

}
