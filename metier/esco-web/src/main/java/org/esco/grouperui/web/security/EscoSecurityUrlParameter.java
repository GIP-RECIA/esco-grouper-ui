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
package org.esco.grouperui.web.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.property.PropertyManager;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.controllers.SessionController;
import org.springframework.security.ui.SpringSecurityFilter;

/**
 * @author aChesneau
 */
public class EscoSecurityUrlParameter extends SpringSecurityFilter {

    /**
     * Default logger.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(EscoSecurityUrlParameter.class);

    /**
     * {@inheritDoc}
     */
    @Override
    protected void doFilterHttp(final HttpServletRequest theRequest, final HttpServletResponse theResponse,
            final FilterChain theFilterChain) throws IOException, ServletException {
        try {

            String urlParamter = theRequest.getParameter(ESCOConstantes.ESCO_PARAMETER_PROFILE);

            if (urlParamter != null) {
                theRequest.getSession().setAttribute(ESCOConstantes.ESCO_USER_PROFILE, urlParamter);
            }

            theRequest.getSession().setAttribute(ESCOConstantes.ESCO_USER_LOCALE, theRequest.getLocale());

        } catch (Exception e) {
            EscoSecurityUrlParameter.LOGGER.error(e);
        }

        theFilterChain.doFilter(theRequest, theResponse);
    }

    /**
     * {@inheritDoc}
     */
    public int getOrder() {
        return 0;
    }

}
