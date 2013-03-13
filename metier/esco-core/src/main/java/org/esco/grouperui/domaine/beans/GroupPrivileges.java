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
package org.esco.grouperui.domaine.beans;

import java.util.ArrayList;
import java.util.List;

import org.esco.grouperui.tools.DistinctSortableList;

/**
 * Class GroupPrivileges. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-009] <br/>
 * [RECIA-ESCO-L1-010]
 * 
 * @author SopraGroup
 */
public class GroupPrivileges extends Privileges {

    /** Subscribe right. */
    private static final String OPTIN  = "optin";

    /** Unsubscribe right. */
    private static final String OPTOUT = "optout";

    /** View right. */
    private static final String VIEW   = "view";

    /** Read right. */
    private static final String READ   = "read";

    /** Update right. */
    private static final String UPDATE = "update";

    /** Admin right. */
    private static final String ADMIN  = "admin";

    /**
     * Default constructor.
     * 
     * @param thePrivileges
     *            : the list of privileges to add to the stem.
     */
    public GroupPrivileges(final List < Privilege > thePrivileges) {
        this.privileges = thePrivileges;
        this.subjects = new DistinctSortableList<Subject>();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void transformeToSubjects() {
        SubjectPrivilegeAdapter privilegeAdapter = null;
        Subject subject = null;

        if (!this.privileges.isEmpty()) {
            for (Privilege current : this.privileges) {

                // Privilege on person
                if (current.getPersonTarget() != null) {
                    privilegeAdapter = this.getSubjectFormPrivilege(current, current.getPersonTarget());
                    subject = privilegeAdapter.getTarget();

                    subject.setAttributes(this.getListAttributes(current.getPersonTarget().getAttributes()));
                } else
                    if (current.getGroupTarget() != null) {
                        privilegeAdapter = this.getSubjectFormPrivilege(current, current.getGroupTarget());
                        subject = privilegeAdapter.getTarget();

                        subject.setAttributes(this
                                .getListAttributes(current.getGroupTarget().getAttributes()));
                    }

                if (privilegeAdapter.isNewSubject()) {
                    this.subjects.add(subject);
                }
            }
        }
    }

    /**
     * @param current
     *            the current privilege
     * @param theTarget
     *            the sortable object (person or group) that can be extract from
     *            privilege
     * @return a SubjectPrivilegeAdapter that contain the subject and true if
     *         this is a new subject, false otherwise.
     */
    private SubjectPrivilegeAdapter getSubjectFormPrivilege(final Privilege current, final Sortable theTarget) {

        // Privilege on group
        String subjectID = theTarget.getValueFormCol("id");
        Subject subject = this.containSubject(subjectID);
        String privilegeName = current.getPrivilegeName();
        boolean isNewSubject = Boolean.FALSE;

        // We already have the subject
        if (subject == null) {
            // We don't have the subject
            subject = new Subject();
            subject.setId(subjectID);
            subject.setTypeEnum(theTarget.getTypeEnum());
            isNewSubject = Boolean.TRUE;
        }

        this.grantPrivileges(subject, privilegeName);

        return new SubjectPrivilegeAdapter(subject, isNewSubject);
    }

    /**
     * Allow to set a new privilege (subscribe or privilege) to the subject.
     * 
     * @param theSubject
     *            the subject on which we want to give a new privilege.
     * @param thePrivilegeName
     *            the name of the given privilege.
     */
    private void grantPrivileges(final Subject theSubject, final String thePrivilegeName) {

        // We grant the subscribe - unsubscribe rights.
        if (GroupPrivileges.OPTIN.equals(thePrivilegeName)) {
            theSubject.setOptin(Boolean.TRUE);
        }

        if (GroupPrivileges.OPTOUT.equals(thePrivilegeName)) {
            theSubject.setOptout(Boolean.TRUE);
        }

        // We grant the privileges
        // If the subject doesn't have any privileges, we set the NONE.
        GroupPrivilegeEnum thePrivilege = GroupPrivilegeEnum.NONE;
        if (theSubject.getSubjectRight() == null) {
            theSubject.setSubjectRight(thePrivilege);
        }
        // If the privileges is view, read, update or admin
        if (GroupPrivileges.VIEW.equals(thePrivilegeName) || GroupPrivileges.READ.equals(thePrivilegeName)
                || GroupPrivileges.UPDATE.equals(thePrivilegeName)
                || GroupPrivileges.ADMIN.equals(thePrivilegeName)) {
            thePrivilege = GroupPrivilegeEnum.fromValue(thePrivilegeName);
            if (theSubject.getSubjectRight().lt(thePrivilege)) {
                theSubject.setSubjectRight(thePrivilege);
            }
        }
    }
}
