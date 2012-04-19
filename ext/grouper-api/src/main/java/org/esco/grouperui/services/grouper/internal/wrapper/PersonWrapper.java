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

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * <b>Subject wrapper.</b><br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-007]<br/>
 * 
 * @author SopraGroup
 */
public class PersonWrapper implements IWrapper < edu.internet2.middleware.subject.Subject, Person > {

    /** UID. */
    private static final long        serialVersionUID = -6652121296556691154L;
    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(PersonWrapper.class);

    /**
     * Default constructor.
     */
    public PersonWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Person wrap(final edu.internet2.middleware.subject.Subject theObjectSource) throws ESCOWrapperException {

        // PersonWrapper.LOGGER
        // .debug("wrap(final edu.internet2.middleware.subject.Subject theObjectSource) throws Exception - debut");

        Person person = new Person();

        person.setAttributes(theObjectSource.getAttributes());
        person.setDescription(theObjectSource.getDescription());
        person.setId(theObjectSource.getId());
        person.setName(theObjectSource.getName());
        person.setSource(theObjectSource.getSource().getId());
        person.setType(theObjectSource.getType().getName());

        // PersonWrapper.LOGGER
        // .debug("wrap(final edu.internet2.middleware.subject.Subject theObjectSource) throws Exception - fin");

        return person;
    }

}
