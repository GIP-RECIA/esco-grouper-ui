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
/**
 *
 */
package org.esco.grouperui.web.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.springframework.security.Authentication;
import org.springframework.security.context.SecurityContextHolder;
import org.springframework.security.ui.SpringSecurityFilter;

/**
 * EscoSecurityContextHolderValFilter class. This class permits to get the
 * attributes of an user. Requirement(s) :[RECIA-ESCO-L1-031]
 * 
 * @author aChesneau
 */
public class EscoSecurityContextHolderValFilter extends SpringSecurityFilter {

    /**
     * Default logger.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory
                                                    .getLogger(EscoSecurityContextHolderValFilter.class);

    /**
     * Filter order in spring security filter chain.
     */
    private static final int         ORDER  = 5000;
    /**
     * The IGrouperService property.
     */
    private IGrouperService          grouperService;

    /**
     * Default constructor.
     */
    public EscoSecurityContextHolderValFilter() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void doFilterHttp(final HttpServletRequest theRequest, final HttpServletResponse theResponse,
            final FilterChain theChain) throws IOException, ServletException {

        boolean error = false;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Person subject;
        try {
            subject = this.grouperService.findSubjectById(authentication.getName());

            EscoAuthenticationAdapter adapter = new EscoAuthenticationAdapter(authentication);
            adapter.setPerson(subject);

            SecurityContextHolder.getContext().setAuthentication(adapter);

        } catch (ESCOSubjectNotFoundException e) {
            EscoSecurityContextHolderValFilter.LOGGER.error(e, "Subject not found");
            error = true;
        } catch (ESCOTechnicalException e) {
            EscoSecurityContextHolderValFilter.LOGGER.error(e, "Technical Error");
            error = true;
        } catch (ESCOSubjectNotUniqueException e) {
            EscoSecurityContextHolderValFilter.LOGGER.error(e, "Subject not unique");
            error = true;
        }

        if (error) {
            HttpSession session = theRequest.getSession();

            EscoSecurityContextHolderValFilter.LOGGER.debug("Invalidating session [" + session.getId() + "]");
            session.invalidate();

            theResponse.sendRedirect("stylesheets/exception/500.jsp");
        }
        theChain.doFilter(theRequest, theResponse);
    }

    /**
     * {@inheritDoc}
     */
    public int getOrder() {
        return EscoSecurityContextHolderValFilter.ORDER;
    }

    /**
     * Setter of the grouperService property.
     * 
     * @param theGrouperService
     *            the grouperService to set
     */
    public void setGrouperService(final IGrouperService theGrouperService) {
        this.grouperService = theGrouperService;
    }

}
