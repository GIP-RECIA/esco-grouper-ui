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

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.ESCOConstantes;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.web.beans.Attribute;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.DataTypeEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.summary.TypeDataSmmary;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.plugins.AbstractControllerAware;

/**
 * It is the controller of the tab Attributes in the person properties.
 * Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
public class PersonAttributesController extends AbstractControllerAware {

    /**
     * The default serial id generated.
     */
    private static final long        serialVersionUID = -3854397790959337895L;

    /**
     * The logger property.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(PersonAttributesController.class);

    /** parameter service acces. */
    private IParameterService        parameterService;

    /**
     * Default constructor.
     */
    public PersonAttributesController() {
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
     * Allow to retrieve the current user attributes from the subject.
     * 
     * @return the list of attributes from a subject.
     * @throws ESCOSubjectNotFoundException
     *             if there is no subject in db corresponding to idPerson
     * @throws ESCOSubjectNotUniqueException
     *             if there are more than one subject return
     */
    public List < Attribute > getSubjectAttributes() throws ESCOSubjectNotUniqueException,
            ESCOSubjectNotFoundException {
        List < Attribute > results = new ArrayList < Attribute >();
        Person person = this.getPersonController().getPerson();

        // list of attributes from the subject.
        Set < String > values = null;
        for (Entry < String, Set < String >> attribute : person.getAttributes().entrySet()) {
            values = attribute.getValue();

            for (String value : values) {
                if (ESCOConstantes.NULL_DATA_IN_THIS_MAPPING_FIELD_COL.equals(value)) {
                    values.remove(value);
                    values.add(org.esco.grouperui.web.ESCOConstantes.EMPTY_DATA);
                }
            }
            results.add(new Attribute(attribute.getKey(), values));
        }

        return results;
    }

    /**
     * Allow to retrieve the current user subject from the grouper service.
     * 
     * @return the subject from grouper service.
     * @throws ESCOSubjectNotFoundException
     *             if there is no subject in db corresponding to idPerson
     * @throws ESCOSubjectNotUniqueException
     *             if there are more than one subject return
     */
    public Person getSubjectInfo() throws ESCOSubjectNotUniqueException, ESCOSubjectNotFoundException {
        return this.getPersonController().getPerson();
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String theIndex, final String theNewValue) {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear() {
    }

    /**
     * {@inheritDoc}
     */
    public void discardModification(final String theIndex) {
    }

    /**
     * {@inheritDoc}
     */
    public String getAttributeKey(final String theIndex) {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public List < String > getErrorClassesNames() {
        return null;
    }

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOSubjectNotFoundException
     * @throws ESCOSubjectNotUniqueException
     */
    public List < Resume > getListResume() {
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();

        List < String > cells = null;

        colNames.add(new ColInfo("PERSON.ATTRIBUTE.LABEL"));
        colNames.add(new ColInfo("PERSON.ATTRIBUTE.VALUE", Boolean.FALSE, DataTypeEnum.LABEL));

        resume.setColInfos(colNames);

        // Sort the map of the attributes.
        List < Attribute > attributes = new ArrayList < Attribute >();
        try {
            attributes = this.getSubjectAttributes();
        } catch (ESCOSubjectNotUniqueException e) {
            PersonAttributesController.LOGGER.error(e);
        } catch (ESCOSubjectNotFoundException e) {
            PersonAttributesController.LOGGER.error(e);
        }
        List < Parameter > parametersSort = this.parameterService.findParametersById(
                "org.esco.grouperui.person.property.attribut.sort", "sort");
        final String[] attrSort = parametersSort.get(0).getValue().split("\\|");
        Collections.sort(attributes, new Comparator < Attribute >() {
            public int compare(final Attribute theO1, final Attribute theO2) {
                int posAttrLeft = PersonAttributesController.this.findPosInAttrsSort(attrSort, theO1.getKey());
                int posAttrRight = PersonAttributesController.this.findPosInAttrsSort(attrSort, theO2.getKey());

                if (posAttrLeft > posAttrRight) {
                    return 1;
                }
                if (posAttrLeft < posAttrRight) {
                    return -1;
                }

                return 0;
            }
        });

        // list of attributes from the subject.
        for (Attribute attribute : attributes) {

            cells = new ArrayList < String >();
            String key = attribute.getKey();
            if (this.parameterService.findParametersById("org.esco.grouperui.person.property.attribut", key)
                    .size() > 0) {

                indexs.add(key);
                cells.add(this.getString(key + ".label"));
                cells.add(attribute.getValues());

                if (this.getPersonController().getPerson().isSaved()) {
                    typeData.add(TypeDataSmmary.SAVED.name());
                } else {
                    typeData.add(TypeDataSmmary.UPDATED.name());
                }

                datas.add(cells);
            }
        }

        resume.setTitle("ATTRIBUTE.OF.PERSON");
        resume.setIndex(indexs);
        resume.setControllerClass(PersonAttributesController.class.getName());
        resume.setData(datas);
        resume.setTypeData(typeData);
        resume.setSaved(typeData.contains(TypeDataSmmary.SAVED.name()) && this.errorData.size() == 0);

        List < Resume > resumes = new ArrayList < Resume >();
        resumes.add(resume);
        return resumes;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isModified() {
        return false;
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {
        return new Status(true);
    }

    /**
     * Allow to find the index of an element in the parameter sort order.
     * 
     * @param theAttrSort
     *            the array of sort order.
     * @param theAtrt
     *            the element to find position.
     * @return the position of the element.
     */
    public int findPosInAttrsSort(final String[] theAttrSort, final String theAtrt) {
        Validate.notEmpty(theAtrt);

        int index = 0;
        for (String attr : theAttrSort) {
            if (theAtrt.equals(attr)) {
                return index;
            }
            index++;
        }

        // the element is not present in the sort order, index is set to the
        // highest possible
        return Integer.MAX_VALUE;
    }

    /**
     * Get if the current person is the person connected.
     * 
     * @return true if connected user is the current person, false otherwise.
     * @throws ESCOSubjectNotUniqueException
     *             If the person is not unique.
     * @throws ESCOSubjectNotFoundException
     *             If the person is not founded.
     */
    public boolean getTheCurrentUserIsTheConnectedPerson() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        if (this.getPersonController().getPerson() == null) {
            return Boolean.FALSE;
        } else {
            return this.getPersonController().getPerson().getId().equals(
                    PersonController.getConnectedPerson().getId());
        }
    }

    /**
     * Setter of the parameterService property.
     * 
     * @param theParameterService
     *            the parameterService to set
     */
    public void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

}
