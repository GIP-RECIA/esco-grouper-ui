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
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.esco.grouperui.services.extension.ServiceConstants;
import org.esco.grouperui.services.grouper.strategy.search.IStrategyGroupSearch;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouper.GrouperSession;
import edu.internet2.middleware.grouper.Stem;
import edu.internet2.middleware.grouper.StemFinder;
import edu.internet2.middleware.grouper.SubjectFinder;
import edu.internet2.middleware.grouper.Stem.Scope;
import edu.internet2.middleware.grouper.exception.SessionException;
import edu.internet2.middleware.grouper.exception.StemNotFoundException;
import edu.internet2.middleware.subject.Subject;
import edu.internet2.middleware.subject.SubjectNotFoundException;
import edu.internet2.middleware.subject.SubjectNotUniqueException;

/**
 * <b>strategy group search.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * Basé sur DefaultStrategyGroupSearchApi de Sopra
 * pour l'adapté à nos besoins.
 * 
 * @author Pierre Legay
 * 
 */
public class EscoStrategyGroupSearchApi extends  DefaultStrategyGroupSearchApi {

    /** Logger for this class. */
    private static final IESCOLogger  LOGGER = ESCOLoggerFactory.getLogger(EscoStrategyGroupSearchApi.class);

    
    /**
     * Default constructor.
     */
    public EscoStrategyGroupSearchApi() {
		super();
    }


    /**
     * {@inheritDoc}
     */
    public List < Group > searchGroups(final Person person, final SearchGroupEnum field,
            final SearchTypeEnum type, final String path, final String term) throws ESCOGroupNotFoundException {

        LOGGER.debug("searchGroups(final SearchFieldEnum field, final SearchTypeEnum type, "
                        + "final String path, final String term, final Subject subject) - start");
        // long timeTotal = 0;
        // Validate input parameters.
        Validate.notNull(field, "The field is undefined");
        Validate.notNull(type, "The type is undefined");
        Validate.notNull(path, "The path is undefined");
        Validate.notNull(term, "The term is undefined");
        Validate.notNull(person, "The subject is undefined");

        GrouperSession grouperSession = null;
        Subject subject = null;

        List < Group > result = new ArrayList < Group >();

        try {
            subject = SubjectFinder.findById(person.getId(), true);
            grouperSession = GrouperSession.start(subject);
        } catch (SessionException e) {
            throw new ESCOTechnicalException(ServiceConstants.SESSION_CANNOT_BE_CREATE, e);
        } catch (SubjectNotFoundException e) {
        } catch (SubjectNotUniqueException e) {
        }

        // TODO : Constantes
        final String prettyTerm = term.replace(".", "\\.").replace("?", "\\?").replace("$", "\\$").replace("^",
                "\\^").replace(ServiceConstants.WILDCARD, ".*");
        LOGGER.debug("The pretty term is " + prettyTerm);

		Pattern pattern = Pattern.compile(prettyTerm,Pattern.CASE_INSENSITIVE);

        Stem stem = null;

        if (!ServiceConstants.EMPTY.equals(path)) {
            try {
                stem = StemFinder.findByName(grouperSession, path, true);
            } catch (StemNotFoundException e) {
            }
        } else {
            LOGGER.debug("Path is undefined");
            try {
                stem = StemFinder.findRootStem(grouperSession);
            } catch (StemNotFoundException e) {
            }
        }
        
        if (stem != null) {
            Set < edu.internet2.middleware.grouper.Group > groups = stem.getChildGroups(Scope.SUB);

            for (edu.internet2.middleware.grouper.Group group : groups) {

                String theValueToMatch; 
                switch (field) {
					case DISPLAY_NAME:	theValueToMatch = group.getDisplayName();
							break;
					case EXTENSION:	theValueToMatch = group.getExtension();
							break;
					case NAME: theValueToMatch = group.getName();
							break;
					default : theValueToMatch = "";
				}
					
                if (pattern.matcher(theValueToMatch).matches()) {
                    result.add(getGroupWrapper().wrap(group));
                }
            }
        } else {
            throw new ESCOGroupNotFoundException("The group " + ("".equals(path) ? path + ":" : "") + term
                    + " cannot be found in grouper");
        }
        return result;
    }
}
