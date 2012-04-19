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
package org.esco.grouperui.web.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.faces.context.FacesContext;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.group.PrivilegesTypeRadioEnum;
import org.esco.grouperui.web.controllers.person.AbstractPersonController;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * Class PersonController. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
/**
 * @author aChesneau
 */
public class PersonController extends AbstractPersonController {

    /**
     * Logger for this class.
     */
    @SuppressWarnings("unused")
    private static final IESCOLogger LOGGER             = ESCOLoggerFactory.getLogger(PersonController.class);

    /**
     * The key in the session that represent the connected user.
     */
    private static final String      KEY_CONNECTED_USER = "org.esco.grouperui.person";

    /**
     * the id of spring declaration.
     */
    private static final String      TABS_CONTROLLER_ID = "personController";

    /**
     * Person id constant.
     */
    private static final String      PARAM_PERSON_ID    = "idPerson";

    /**
     * The serial version of the class.
     */
    private static final long        serialVersionUID   = 3737562397784750327L;

    /**
     * If need clear the context.
     */
    private static final String      NEED_CLEAR         = "needClear";

    /** The GrouperService that provide services from grouper. */
    private IGrouperService          grouperService;

    /**
     * The current privilege option.
     */
    private PrivilegesTypeRadioEnum  currentPrivilegeOption;

    /**
     * Default constructor.
     */
    public PersonController() {
    }

    /**
     * Setter for grouperServiceExt.
     * 
     * @param theGrouperService
     *            the grouperService to set.
     */
    public final void setGrouperService(final IGrouperService theGrouperService) {
        this.grouperService = theGrouperService;
    }

    /**
     * Get the grouperService property.
     * 
     * @return the grouperService
     */
    public IGrouperService getGrouperService() {
        return this.grouperService;
    }

    /**
     * {@inheritDoc}
     */
    public boolean getInitParameters() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {

        String idPerson = this.getParam(PersonController.PARAM_PERSON_ID);
        String needClear = this.getParam(PersonController.NEED_CLEAR);
        String thePrivilegesTypeRadioEnum = this.getParam("thePrivilegesType");

        if (thePrivilegesTypeRadioEnum != null) {
            this.currentPrivilegeOption = PrivilegesTypeRadioEnum.fromValue(thePrivilegesTypeRadioEnum);
        } else {
            this.currentPrivilegeOption = PrivilegesTypeRadioEnum.GROUP;
        }

        // If we need to clear all controllers.
        if (needClear != null && needClear.equals(ESCOConstantes.TRUE)) {
            this.clearControllers();
            this.setPerson(null);
        }

        // Set or not the current person in this controller.
        if (idPerson == null) {
            this.setPerson(PersonController.getConnectedPerson());
        } else {
            if (this.getPerson() == null) {
                this.setPerson(this.grouperService.findSubjectById(idPerson));
            }
        }

        return Boolean.TRUE;
    }

    /**
     * Get the id of the connected person.
     * 
     * @return the id
     * @throws ESCOSubjectNotUniqueException
     * @throws ESCOSubjectNotFoundException
     */
    public String getIdConnectedPerson() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        return PersonController.getConnectedPerson().getId();
    }

    /**
     * Retrieve the connected user in the session. Otherwise throws an exception
     * 
     * @return the connected user
     * @throws ESCOSubjectNotFoundException
     *             if the connected user is not found in the session
     * @throws ESCOSubjectNotUniqueException
     *             several persons with the same id
     */
    public static Person getConnectedPerson() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        FacesContext context = FacesContext.getCurrentInstance();

        if (context == null) {
            throw new ESCOTechnicalException("you can't call this method in other way of JSF environnement");
        }

        Map < String, Object > sessionMap = FacesContext.getCurrentInstance().getExternalContext().getSessionMap();
        Person person = (Person) sessionMap.get(PersonController.KEY_CONNECTED_USER);

        if (person == null) {
            IGrouperService grouperService = (IGrouperService) FaceContextUtils.getValueFromContext(FacesContext
                    .getCurrentInstance(), "grouperService");
            String idPerson = EscoSecurityContext.getUserSecurity().getId();
            person = grouperService.findSubjectById(idPerson);

            sessionMap.put(PersonController.KEY_CONNECTED_USER, person);
        }
        if (person == null) {
            throw new ESCOSubjectNotFoundException();
        }
        return person;
    }

    /**
     * Get if the current user is the person connected.
     * 
     * @return true if we want see the property of the connected user.
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     */
    public boolean getIsConnectedUser() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Boolean result = Boolean.FALSE;
        if (PersonController.getConnectedPerson().getId().equals(this.getPerson().getId())) {
            result = Boolean.TRUE;
        }
        return result;
    }

    /**
     * Get if the user has subscriptions to manage.
     * 
     * @return true if we display the tab else false otherwise.
     * @throws ESCOSubjectNotFoundException
     *             if the person is not found.
     * @throws ESCOSubjectNotUniqueException
     *             if the person is not unique.
     */
    public boolean getHasSubscriptionsToManage() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        List < Group > data = new ArrayList < Group >();
        if (this.getPerson() != null) {
            data = this.getGrouperService().findGroupsMemberOptinOptout(this.getPerson());
        }
        return !data.isEmpty();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getTabsControllerId() {
        return PersonController.TABS_CONTROLLER_ID;
    }

    /**
     * {@inheritDoc}
     */
    public void doAddVariableToContext(final FacesContext theFacesContext) {
    }

    /**
     * Get the currentPrivilegeOption property.
     * 
     * @return the currentPrivilegeOption
     */
    public PrivilegesTypeRadioEnum getCurrentPrivilegeOption() {
        return this.currentPrivilegeOption;
    }

    /**
     * Setter of the currentPrivilegeOption property.
     * 
     * @param theCurrentPrivilegeOption
     *            the currentPrivilegeOption to set
     */
    public void setCurrentPrivilegeOption(final PrivilegesTypeRadioEnum theCurrentPrivilegeOption) {
        this.currentPrivilegeOption = theCurrentPrivilegeOption;
    }

    /**
     * Setter of the currentPrivilegeOption property.
     */
    public void resetCurrentPrivilegeOption() {
        this.currentPrivilegeOption = PrivilegesTypeRadioEnum.GROUP;
    }

}
