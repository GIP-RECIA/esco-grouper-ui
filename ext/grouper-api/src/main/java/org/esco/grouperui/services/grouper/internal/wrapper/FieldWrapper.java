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

import org.esco.grouperui.domaine.beans.Field;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;

/**
 * Class FieldWrapper. Requirements: [RECIA-ESCO-L1-007]
 * 
 * @author SopraGroup
 */
public class FieldWrapper implements IWrapper < edu.internet2.middleware.grouper.Field, Field > {

    /** UID. */
    private static final long serialVersionUID = 833079998986284712L;

    /**
     * Default constructor.
     */
    public FieldWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Field wrap(final edu.internet2.middleware.grouper.Field theObjectSource) throws ESCOWrapperException {
        Field field = new Field();

        field.setName(theObjectSource.getName());
        field.setUuid(theObjectSource.getUuid());
        field.setGroupTypeUuid(theObjectSource.getGroupTypeUuid());

        return field;
    }

}
