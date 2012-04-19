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
package org.esco.grouperui.services.grouper.internal.wrapper;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Field;
import org.esco.grouperui.domaine.beans.GroupType;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;

/**
 * Class GroupTypeWrapper. Requirements: [RECIA-ESCO-L1-007]
 * 
 * @author SopraGroup
 */
public class GroupTypeWrapper implements IWrapper < edu.internet2.middleware.grouper.GroupType, GroupType > {

    /** UID. */
    private static final long serialVersionUID = 5877006262267568967L;
    /**
     * Wrapper : edu.internet2.middleware.grouper.Field to
     * org.esco.grouperui.domaine.beans.Field.
     */
    private FieldWrapper      fieldWrapper;

    /**
     * Default constructor.
     */
    public GroupTypeWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public GroupType wrap(final edu.internet2.middleware.grouper.GroupType theObjectSource)
            throws ESCOWrapperException {

        GroupType newGroupType = new GroupType();

        newGroupType.setUuid(theObjectSource.getUuid());
        newGroupType.setName(theObjectSource.getName());

        List < Field > fields = new ArrayList < Field >();
        Iterator < edu.internet2.middleware.grouper.Field > fieldIt = theObjectSource.getFields().iterator();
        while (fieldIt.hasNext()) {
            edu.internet2.middleware.grouper.Field currentField = fieldIt.next();
            fields.add(this.fieldWrapper.wrap(currentField));
        }

        newGroupType.setFields(fields);

        return newGroupType;
    }

    /**
     * Setter for fieldWrapper.
     * 
     * @param theFieldWrapper
     *            the fieldWrapper to set.
     */
    public final void setFieldWrapper(final FieldWrapper theFieldWrapper) {
        this.fieldWrapper = theFieldWrapper;
    }

}
