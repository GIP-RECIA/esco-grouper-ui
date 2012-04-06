package org.esco.grouperui.domaine.beans;

import java.util.ArrayList;
import java.util.List;

import org.esco.grouperui.tools.DistinctSortableList;

/**
 * Privileges for stem.
 * 
 * @author SopraGroup
 */
public class StemPrivileges extends Privileges {

    /** Create Stem right. */
    private static final String HAS_STEM   = "stem";

    /** Create Group right. */
    private static final String HAS_CREATE = "create";

    /**
     * Default constructor.
     * 
     * @param thePrivileges
     *            : the list of privileges to add to the stem.
     */
    public StemPrivileges(final List < Privilege > thePrivileges) {
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
                    // Privilege on group
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
        String subjectID = theTarget.getValueFormCol("id");
        String privilegeName = current.getPrivilegeName();
        Subject subject = this.containSubject(subjectID);
        boolean isNewSubject = Boolean.FALSE;

        // We don't have the subject
        if (subject == null) {
            subject = new Subject();
            subject.setId(subjectID);
            subject.setTypeEnum(theTarget.getTypeEnum());
            isNewSubject = Boolean.TRUE;
        }

        if (StemPrivileges.HAS_STEM.equals(privilegeName)) {
            subject.setHasStem(Boolean.TRUE);
        } else
            if (StemPrivileges.HAS_CREATE.equals(privilegeName)) {
                subject.setHasCreate(Boolean.TRUE);
            }

        return new SubjectPrivilegeAdapter(subject, isNewSubject);
    }
}
