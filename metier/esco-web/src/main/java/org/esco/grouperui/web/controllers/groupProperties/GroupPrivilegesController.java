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
package org.esco.grouperui.web.controllers.groupProperties;

import java.util.ArrayList;
import java.util.List;

import javax.faces.model.SelectItem;

import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.PrivilegesRadioEnum;
import org.esco.grouperui.web.beans.group.PrivilegesTypeRadioEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.controllers.GroupController;
import org.esco.grouperui.web.plugins.AbstractControllerAware;

/**
 * Class GroupPrivilegesController. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class GroupPrivilegesController extends AbstractControllerAware {

    /**
     *
     */
    private static final long serialVersionUID = 1276822780935740635L;

    /**
     * Default constructor.
     */
    public GroupPrivilegesController() {
    }

    /**
     * get TabsController for this tab and cast it in appropriate class.
     * 
     * @return GroupController.
     */
    public GroupController getGroupController() {
        return (GroupController) super.getTabsController();
    }

    /**
     * Get the list of the privilege radio.
     * 
     * @return a list of SelectIem for the radio button.
     */
    public List < SelectItem > getListPrivilegesRadio() {
        PrivilegesRadioEnum[] enums = PrivilegesRadioEnum.values();

        List < SelectItem > selectItems = new ArrayList < SelectItem >();

        for (PrivilegesRadioEnum membershipsRadio : enums) {
            selectItems.add(new SelectItem(membershipsRadio.getLabel(), this
                    .getString(membershipsRadio.getLabel())));
        }

        return selectItems;
    }

    /**
     * Get the list of the privilege type radio.
     * 
     * @return a list of SelectIem for the radio button.
     */
    public List < SelectItem > getListPrivilegesTypeRadio() {
        PrivilegesTypeRadioEnum[] enums = PrivilegesTypeRadioEnum.values();

        List < SelectItem > selectItems = new ArrayList < SelectItem >();

        for (PrivilegesTypeRadioEnum membershipsRadio : enums) {
            selectItems.add(new SelectItem(membershipsRadio.getLabel(), this
                    .getString(membershipsRadio.getLabel())));
        }

        return selectItems;
    }

    /**
     * The default radio for privilege.
     * 
     * @return the default label for privileges radio.
     */
    public PrivilegesRadioEnum getDefaultPrivilegesRadio() {
        return PrivilegesRadioEnum.IMMEDIATE;
    }

    /**
     * The radio for privilege type.
     * 
     * @return the label for privileges radio.
     */
    public PrivilegesTypeRadioEnum getPrivilegesTypeRadio() {
        return this.getGroupController().getCurrentPrivilegeOption();
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String theIndex, final String theNewValue) {
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
     */
    public List < Resume > getListResume() {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {
        return new Status(Boolean.TRUE);
    }
}
