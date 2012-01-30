package org.esco.grouperui.web.controllers;

import java.util.List;

import javax.faces.context.FacesContext;

import org.apache.commons.lang.StringUtils;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.group.PrivilegesTypeRadioEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * Class GroupController. Requirement(s): <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class GroupController extends AbstractGroupController {

    /**
     * serialVersionUID.
     */
    private static final long       serialVersionUID   = -2479468374608700589L;

    /**
     * the id of spring declaration.
     */
    private static final String     TABS_CONTROLLER_ID = "groupController";

    /**
     * The current view of privilege.
     */
    private PrivilegesTypeRadioEnum currentPrivilegeOption;

    /**
     * Default constructor.
     */
    public GroupController() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getTabsControllerId() {
        return GroupController.TABS_CONTROLLER_ID;
    }

    /**
     * {@inheritDoc}
     */
    public void doAddVariableToContext(final FacesContext theFacesContext) {
        FaceContextUtils.addVariableToContext(theFacesContext, "group", this.getGroup());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List < Resume > getListResume() {
        return super.getListResume();
    }

    /**
     * {@inheritDoc}
     * 
     * @throws CloneNotSupportedException
     */
    @Override
    public void initGroupAttributes() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            CloneNotSupportedException {
        boolean needCacheSession = ESCOConstantes.TREE_FROM_CALL.equals(this.fromCall());
        if (needCacheSession) {
            this.clearModification();
            this.resetCurrentPrivilegeOption();
        }
        if (this.group == null || needCacheSession) {

            Person person = null;
            try {
                person = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e1) {
            } catch (ESCOSubjectNotUniqueException e1) {
            }

            this.creation = Boolean.FALSE;
            if (!StringUtils.isEmpty(this.getGroupUuid())) {
                this.setGroup(this.getGrouperService().findGroupByUid(person, this.getGroupUuid()));
                this.group.setUserRight(this.getGrouperService().getPrivilegeOnGroup(person, this.group));
            }
        }
    }

    /**
     * @return always true. this getter is only for jsf call.
     * @throws ESCOGroupNotFoundException
     *             if the current group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the current group is not unique.
     * @throws CloneNotSupportedException
     *             If the clone of the group failed.
     */
    public boolean getInitParameters() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            CloneNotSupportedException {
        String thePrivilegesTypeRadioEnum = this.getParam("thePrivilegesType");
        if (thePrivilegesTypeRadioEnum != null) {
            this.currentPrivilegeOption = PrivilegesTypeRadioEnum.fromValue(thePrivilegesTypeRadioEnum);
        } else {
            this.currentPrivilegeOption = PrivilegesTypeRadioEnum.GROUP;
        }
        this.initGroupAttributes();
        return true;
    }

    /**
     * Setter of the currentPrivilegeOption property.
     */
    public void resetCurrentPrivilegeOption() {
        this.currentPrivilegeOption = PrivilegesTypeRadioEnum.GROUP;
    }

    /**
     * Get the currentPrivilegeOption property.
     * 
     * @return the currentPrivilegeOption
     */
    public PrivilegesTypeRadioEnum getCurrentPrivilegeOption() {
        return this.currentPrivilegeOption;
    }

}
