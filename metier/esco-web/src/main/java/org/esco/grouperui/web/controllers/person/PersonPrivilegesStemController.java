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
package org.esco.grouperui.web.controllers.person;

import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.PrivilegesRadioEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.utils.AbstractPrivilegeStemController;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * It is the controller of the tab Privileges on stem in the person properties.
 * Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
public class PersonPrivilegesStemController extends AbstractPrivilegeStemController {

    /**
     * The default generated id of the class.
     */
    private static final long serialVersionUID = -3475629357323075631L;

    /**
     * Default constructor.
     */
    public PersonPrivilegesStemController() {
        super();
    }

    /**
     * get TabsController for this tab and cast it in appropriate class.
     * 
     * @return PersonController.
     */
    public PersonController getPersonController() {
        return (PersonController) super.getTabsController();
    }

    /**
     * Retrieve the list of Memberships (Group) of the current group.
     * 
     * @return the XML result of the function.
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     */
    public String findPrivileges() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {

        String thePrivilegeType = this.getParam("privilegeType");
        this.getPersonController().resetCurrentPrivilegeOption();

        // Set the default Membership type if null.
        if (thePrivilegeType == null) {
            this.privilegeScopeEnum = PrivilegesRadioEnum.IMMEDIATE;
        } else {
            this.privilegeScopeEnum = PrivilegesRadioEnum.valueOf(PrivilegesRadioEnum.fromLabel(thePrivilegeType)
                    .name());
        }

        // this.clearContext();
        this.data.clear();

        // The list of groups.
        List < Stem > stems = null;

        if (this.getPersonController().getPerson() != null) {

            String personUuid = this.getPersonController().getPerson().getId();
            Person person = PersonController.getConnectedPerson();

            // The Membership Type selected via the Radio Button.
            PrivilegesRadioEnum radioType = PrivilegesRadioEnum.fromLabel(thePrivilegeType.toUpperCase());
            if (radioType == null) {
                radioType = PrivilegesRadioEnum.IMMEDIATE;
            }

            stems = this.getPersonController().getGrouperService().findSubjectPrivilegesStem(person, personUuid,
                    ScopeEnum.valueOf(radioType.name()));
            // Adding the groups to the stored group privileges.
            Iterator < Stem > itStem = stems.iterator();
            while (itStem.hasNext()) {
                Stem current = itStem.next();
                this.data.add(current);
            }

        }

        this.addedItems();

        if (this.storedData != null) {
            this.storedData.setUnSelectAll();
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(this.isRowToReturn()));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Output the data as an XML stream.
     * 
     * @return the XML data.
     */
    public String dataResult() {
        return this.abstractDataResult();
    }

    public List < Resume > getListResume() {
        return this.abstractGetListResume("PERSON.PRIVILEGES.OF.STEM", PersonPrivilegesStemController.class);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Status save() {
        IGrouperService grouperService = this.getPersonController().getGrouperService();
        Person person = this.getPersonController().getPerson();

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorData.clear();

        // Update group privileges
        for (Sortable sortable : this.data) {
            Stem currentStem = (Stem) sortable;
            Sortable updateStemPrivilege = this.updatedStem.get(currentStem.getUuid());
            if (updateStemPrivilege != null) {
                this.assignOrRemovePrivilegeToStem(grouperService, person.getId(), currentStem,
                        updateStemPrivilege, null);
            }
        }

        // Add privileges to the stem.
        for (Sortable sortable : this.addedData) {
            Stem currentStem = (Stem) sortable;
            this.assignOrRemovePrivilegeToStem(grouperService, person.getId(), currentStem, null, Boolean.TRUE);
        }

        // Remove privileges to the stem.
        for (Sortable sortable : this.deletedData) {
            Stem currentStem = (Stem) sortable;
            this.assignOrRemovePrivilegeToStem(grouperService, person.getId(), currentStem, null, Boolean.FALSE);
        }

        return this.isExistSomeErrors();
    }
}
