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
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.esco.grouperui.tools.DistinctSortableList;

/**
 * @author dMoulron
 */
public abstract class Privileges {

    /** The privileges. */
    protected List < Privilege > privileges;

    /** The subjects. */
    protected DistinctSortableList< Subject >   subjects;

    /**
     * Check if the subject list already contain a subject with the subjectID.
     * 
     * @param subjectID
     *            the id to check.
     * @return true the subject list already contain a subject with the
     *         subjectID, false else.
     */
    protected Subject containSubject(final String subjectID) {
    	return  subjects.getById(subjectID);
        /*Subject result = null;
        for (Subject subject : this.subjects) {
            if (subject.getId().equals(subjectID)) {
                result = subject;
                break;
            }
        }
        return result;*/
    }

    /**
     * Allow to transform from a list of privileges to a list of subjects.
     */
    protected abstract void transformeToSubjects();

    /**
     * Allow to retrieve the subject list from the privilege list.
     * 
     * @return the subject list.
     */
    public List < Subject > getSubjects() {
        this.transformeToSubjects();
        return this.subjects;
    }

    /**
     * Create a Subject with a map of attributes.
     * 
     * @param attributes
     *            the attributes based on which we create the Subject.
     * @return the subject resulting.
     */
    protected List < SimpleValue > getListAttributes(final Map < String, Set < String > > attributes) {
        List < SimpleValue > attrSimpleValues = new ArrayList < SimpleValue >();

        if (attributes != null) {
            for (String currentKey : attributes.keySet()) {
                Set < String > setValue = attributes.get(currentKey);

                String value = null;
                Iterator < String > setValueIt = setValue.iterator();
                while (setValueIt.hasNext()) {
                    value = setValueIt.next();
                }
                SimpleValue simpleValue = new SimpleValue();
                simpleValue.setKey(currentKey);
                simpleValue.setValue(value);

                attrSimpleValues.add(simpleValue);
            }
        }

        return attrSimpleValues;
    }

    /**
     * @author dMoulron
     */
    protected class SubjectPrivilegeAdapter {
        /** the subject adapter. */
        private final Subject target;
        /** the state ob subject. */
        private boolean       isNewSubject = Boolean.TRUE;

        /**
         * full constructor.
         * 
         * @param theTarget
         *            the subject adapter
         * @param theIsNewSubject
         *            the state ob subject
         */
        public SubjectPrivilegeAdapter(final Subject theTarget, final boolean theIsNewSubject) {
            this.isNewSubject = theIsNewSubject;
            this.target = theTarget;
        }

        /**
         * getter for property target.
         * 
         * @return the target
         */
        public Subject getTarget() {
            return this.target;
        }

        /**
         * getter for property isNewSubject.
         * 
         * @return the isNewSubject
         */
        public boolean isNewSubject() {
            return this.isNewSubject;
        }
    }
}
