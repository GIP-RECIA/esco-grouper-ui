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

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Class Member. Requirement(s):[RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class Members implements Serializable {

    /**
     * The serial uid.
     */
    private static final long     serialVersionUID = 1L;

    /** The persons. */
    private final List < Person > persons;

    /** The groups. */
    private final List < Group >  groups;

    /**
     * Default constructor.
     */
    public Members() {
        this.persons = new ArrayList < Person >();
        this.groups = new ArrayList < Group >();
    }

    /**
     * Get the persons property.
     * 
     * @return the persons
     */
    public List < Person > getPersons() {
        return this.persons;
    }

    /**
     * Get the groups property.
     * 
     * @return the groups
     */
    public List < Group > getGroups() {
        return this.groups;
    }

    /**
     * Allow to add a person.
     * 
     * @param person
     *            the person to add.
     */
    public void addPerson(final Person person) {
        this.persons.add(person);
    }

    /**
     * Allow to add a group.
     * 
     * @param group
     *            the group to add.
     */
    public void addGroup(final Group group) {
        this.groups.add(group);
    }

    /**
     * Allow to retrieve the list of SimpleValue (key, value) for the persons
     * and groups.
     * 
     * @return the list of SimpleValue (key, value).
     */
    public List < Subject > getSubjects() {
        List < Subject > subjects = new ArrayList < Subject >();
        Subject subject = null;

        for (Person person : this.persons) {
            subject = new Subject();

            subject.setId(person.getId());
            subject.setTypeEnum(person.getTypeEnum());
            subject.setAttributes(this.getListAttributes(person.getAttributes()));

            subjects.add(subject);
        }

        for (Group group : this.groups) {
            subject = new Subject();

            if (group.getAttributes() != null) {
                subject.setAttributes(this.getListAttributes(group.getAttributes()));
            } else {
                Iterator < String > iterator = group.getKeysOfMapping().iterator();
                while (iterator.hasNext()) {
                    String aux = iterator.next();
                    subject.addAttribute(new SimpleValue(aux, group.getValueFormCol(aux)));
                }
            }

            subject.setId(group.getIdGroup());
            subject.setTypeEnum(group.getTypeEnum());
            subject.setOptin(group.isCanOptin());
            subject.setOptout(group.isCanOptout());
            if (group.getUserRight() == null) {
                group.setUserRight(GroupPrivilegeEnum.NONE);
            }
            subject.setSubjectRight(group.getUserRight());
            subject.setAdded(group.isAdded());
            subject.setSelected(group.getSelected());
            subjects.add(subject);
        }

        return subjects;
    }

    /**
     * Create a Subject with a map of attributes.
     * 
     * @param attributes
     *            the attributes based on which we create the Subject.
     * @return the subject resulting.
     */
    private List < SimpleValue > getListAttributes(final Map < String, Set < String > > attributes) {
        List < SimpleValue > attrSimpleValues = new ArrayList < SimpleValue >();

        if (attributes != null) {
            for (String currentKey : attributes.keySet()) {
                Set < String > setValue = attributes.get(currentKey);

                String value = "";
                Iterator < String > setValueIt = setValue.iterator();
                while (setValueIt.hasNext()) {
                    value += setValueIt.next();
                    if (setValueIt.hasNext()) {
                        value += ";";
                    }
                }
                SimpleValue simpleValue = new SimpleValue();
                simpleValue.setKey(currentKey);
                simpleValue.setValue(value);

                attrSimpleValues.add(simpleValue);
            }
        }

        return attrSimpleValues;
    }
}
