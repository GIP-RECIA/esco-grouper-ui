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

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.SimpleValue;
import org.esco.grouperui.domaine.beans.Sortable;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;

/**
 * Wrapper to wrap Subject in Group. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
/**
 * @author aChesneau
 */
public class SubjectToSortableWrapper implements IWrapper < Subject, Sortable > {

    /**
     * Serial UID generated of the class.
     */
    private static final long serialVersionUID = -2922060349572584325L;

    /**
     * Default constructor.
     */
    public SubjectToSortableWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Sortable wrap(final Subject theObjectSource) throws ESCOWrapperException {
        Group newGroup = null;

        // If the object is not null
        if (null != theObjectSource) {

            newGroup = new Group();

            // Set if group is selected.
            newGroup.setSelected(theObjectSource.getSelected());
            // Set if group is added.
            newGroup.setAdded(theObjectSource.isAdded());
            // Set the id of the group.
            newGroup.setIdGroup(theObjectSource.getValueFormCol("id"));
            // Set if the group privilege is can optin.
            newGroup.setCanOptin(theObjectSource.getOptin());
            // Set if the group privilege is can optout.
            newGroup.setCanOptout(theObjectSource.getOptout());
            // Set the description of the group.
            newGroup.setDescription(theObjectSource.getValueFormCol("description"));
            // Set the display extension of the group.
            newGroup.setDisplayExtension(theObjectSource.getValueFormCol("displayExtension"));
            // Set the display name of the group.
            newGroup.setDisplayName(theObjectSource.getValueFormCol("displayName"));
            // Set the extension of the group.
            newGroup.setExtension(theObjectSource.getValueFormCol("extension"));
            // set the name of the group.
            newGroup.setName(theObjectSource.getValueFormCol("name"));
            // Set the user right of the group by mapping the value.
            newGroup.setUserRight(theObjectSource.getSubjectRight());
            // Set the type of sortable to group.s
            newGroup.setTypeEnum(SourceTypeEnum.GROUP);

            List < SimpleValue > list = theObjectSource.getAttributes();
            Map < String, Set < String >> theGroupAttr = new HashMap < String, Set < String >>();
            for (int i = 0; i < list.size(); i++) {
                Set < String > aux = new HashSet < String >();
                aux.add(list.get(i).getValue());
                theGroupAttr.put(list.get(i).getKey(), aux);
            }
            newGroup.setAttributes(theGroupAttr);
            // TODO: Voir pour les GoupDetails. Pas utils pour le moment.
        }

        return newGroup;
    }
}
