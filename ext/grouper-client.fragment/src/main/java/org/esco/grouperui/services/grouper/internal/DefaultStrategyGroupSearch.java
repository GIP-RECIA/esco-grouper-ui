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

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.esco.grouperui.services.extension.ServiceConstants;
import org.esco.grouperui.services.grouper.WSUtils;
import org.esco.grouperui.services.grouper.strategy.search.IStrategyGroupSearch;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.api.GcFindGroups;
import edu.internet2.middleware.grouperClient.ws.GcWebServiceError;
import edu.internet2.middleware.grouperClient.ws.beans.WsFindGroupsResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;
import edu.internet2.middleware.grouperClient.ws.beans.WsQueryFilter;
import edu.internet2.middleware.grouperClient.ws.beans.WsSubjectLookup;

/**
 * <b>Default strategy group search.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public class DefaultStrategyGroupSearch implements IStrategyGroupSearch {

    /** Logger for this class. */
    private static final IESCOLogger    LOGGER = ESCOLoggerFactory.getLogger(DefaultStrategyGroupSearch.class);

    /** Wrapper : WSGroup to Group. */
    private IWrapper < WsGroup, Group > groupWrapper;

    /**
     * Default constructor.
     */
    public DefaultStrategyGroupSearch() {

    }

    /**
     * Getter for attribute <b>groupWrapper</b>.
     * 
     * @return the groupWrapper
     */
    public IWrapper < WsGroup, Group > getGroupWrapper() {
        return this.groupWrapper;
    }

    /**
     * Setter for attributes <b>groupWrapper</b>.
     * 
     * @param theGroupWrapper
     *            : the groupWrapper to set
     */
    public void setGroupWrapper(final IWrapper < WsGroup, Group > theGroupWrapper) {
        this.groupWrapper = theGroupWrapper;
    }

    /**
     * {@inheritDoc}
     */
    public List < Group > searchGroups(final Person person, final SearchGroupEnum field,
            final SearchTypeEnum type, final String path, final String term) throws ESCOGroupNotFoundException {

        DefaultStrategyGroupSearch.LOGGER
                .debug("searchGroups(final SearchFieldEnum field, final SearchTypeEnum type, "
                        + "final String path, final String term, final Subject subject) - start");
        // long timeTotal = 0;
        // Validate input parameters.
        Validate.notNull(field, "The field is undefined");
        Validate.notNull(type, "The type is undefined");
        Validate.notNull(path, "The path is undefined");
        Validate.notNull(term, "The term is undefined");
        Validate.notNull(person, "The subject is undefined");

        final String prettyTerm = term.replace(ServiceConstants.WILDCARD, ServiceConstants.GROUPER_WILDCARD);
        DefaultStrategyGroupSearch.LOGGER.debug("The pretty term is " + prettyTerm);

        GcFindGroups gcFindGroups = new GcFindGroups();
        gcFindGroups.assignIncludeGroupDetail(true);

        WsQueryFilter wsQueryFilter = new WsQueryFilter();
        wsQueryFilter.setQueryFilterType(ServiceConstants.FIND_BY_APPROXIMATE_ATTRIBUTE);
        wsQueryFilter.setGroupAttributeName(field.getValue());
        wsQueryFilter.setGroupAttributeValue(prettyTerm);
        if (!ServiceConstants.EMPTY.equals(path)) {
            wsQueryFilter.setStemName(path);
        } else {
            DefaultStrategyGroupSearch.LOGGER.debug("Path is undefined");
        }
        gcFindGroups.assignQueryFilter(wsQueryFilter);

        // Subject
        WsSubjectLookup subjectLookup = new WsSubjectLookup();
        if (person != null && person.getId() != null) {
            subjectLookup.setSubjectId(person.getId());
        }
        if (person != null && person.getSource() != null) {
            subjectLookup.setSubjectSourceId(person.getSource());
        }
        gcFindGroups.assignActAsSubject(subjectLookup);

        WsFindGroupsResults wsFindGroupsResults = null;
        try {
            // long deb = System.currentTimeMillis();
            wsFindGroupsResults = gcFindGroups.execute();
            // timeTotal += System.currentTimeMillis() - deb;
        } catch (GcWebServiceError gcwse) {
            // Here no transaction error or save problems can occurs, so it is a
            // technical exception that is throw.
            throw new ESCOTechnicalException(ServiceConstants.WS_ERROR_IS + WSUtils.getResultCode(gcwse), gcwse);
        }

        if (WSUtils.isOK(wsFindGroupsResults)) {
            WsGroup[] wsGroups = wsFindGroupsResults.getGroupResults();
            if (wsGroups == null || wsGroups.length == 0) {
                throw new ESCOGroupNotFoundException("The group " + ("".equals(path) ? path + ":" : "") + term
                        + " cannot be found in grouper");
            }
            List < Group > groups = new ArrayList < Group >();
            // Wrapping result
            for (WsGroup wsGroup : wsGroups) {
                groups.add(this.getGroupWrapper().wrap(wsGroup));
            }
            // Log to log the time performance of service
            // DefaultStrategyGroupSearch.LOGGER.error("searchGroups;" +
            // timeTotal);
            return groups;
        }
        throw new ESCOTechnicalException(ServiceConstants.WS_ERROR);
    }
}
