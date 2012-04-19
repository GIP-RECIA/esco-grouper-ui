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
package org.esco.grouperui.services.grouper.internal;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.services.extension.ServiceConstants;
import org.esco.grouperui.services.grouper.strategy.search.IStrategySubjectSearch;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouper.GrouperSession;
import edu.internet2.middleware.grouper.SubjectFinder;
import edu.internet2.middleware.grouper.exception.SessionException;
import edu.internet2.middleware.subject.Subject;
import edu.internet2.middleware.subject.SubjectType;
import edu.internet2.middleware.subject.provider.SubjectTypeEnum;

/**
 * <b>Default strategy group search.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public class DefaultStrategySubjectSearch implements IStrategySubjectSearch {

    /** Logger for this class. */
    private static final IESCOLogger                                      LOGGER = ESCOLoggerFactory
                                                                                         .getLogger(DefaultStrategySubjectSearch.class);

    /** Wrapper : WSGroup to Group. */
    private IWrapper < edu.internet2.middleware.subject.Subject, Person > personWrapper;

    /**
     * Default constructor.
     */
    public DefaultStrategySubjectSearch() {
    }

    /**
     * Getter for attribute <b>personWrapper</b>.
     * 
     * @return the personWrapper
     */
    public IWrapper < edu.internet2.middleware.subject.Subject, Person > getPersonWrapper() {
        return this.personWrapper;
    }

    /**
     * Setter for attribute <b>personWrapper</b>.
     * 
     * @param thePersonWrapper
     *            the personWrapper to set
     */
    public void setPersonWrapper(
            final IWrapper < edu.internet2.middleware.subject.Subject, Person > thePersonWrapper) {
        this.personWrapper = thePersonWrapper;
    }

    /**
     * {@inheritDoc}
     */
    public List < Person > searchSubjects(final Person thePerson, final String thePath, final String theTerm) {

        DefaultStrategySubjectSearch.LOGGER
                .debug("searchSubjects(final Person thePerson, final String thePath, final String theTerm) - start");

        Set < edu.internet2.middleware.subject.Subject > persons = null;
        // long timeTotal = 0;
        try {
            // long deb = System.currentTimeMillis();
            GrouperSession.startRootSession();
            persons = SubjectFinder.findAll(theTerm);
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        }

        List < Person > retour = new ArrayList < Person >();
        Subject subject = null;
        SubjectType subjectType = null;

        Iterator iterator = persons.iterator();
        while (iterator.hasNext()) {
            subject = (edu.internet2.middleware.subject.Subject) iterator.next();
            subjectType = subject.getType();

            if (SubjectTypeEnum.PERSON.getName().equals(subjectType.getName())) {
                retour.add(this.personWrapper.wrap(subject));
            }
        }

        if (retour == null || retour.isEmpty()) {
            DefaultStrategySubjectSearch.LOGGER.debug("No subject(s) found");
        } else {
            DefaultStrategySubjectSearch.LOGGER.debug(retour.size() + " subject(s) found");
        }
        // Log to calculate time of service
        // DefaultStrategySubjectSearch.LOGGER.error("searchSubjects;" +
        // timeTotal);

        return retour;
    }
}
