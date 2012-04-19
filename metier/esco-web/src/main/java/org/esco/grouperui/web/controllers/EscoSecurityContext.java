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
package org.esco.grouperui.web.controllers;

import java.util.List;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.User;
import org.esco.grouperui.web.security.SecurityContextFinder;
import org.esupportail.commons.utils.ContextUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.portlet.context.PortletRequestAttributes;

/**
 * @author dMoulron
 */
public final class EscoSecurityContext {

    private static final IESCOLogger         LOGGER   = ESCOLoggerFactory.getLogger(EscoSecurityContext.class);

    /**
     * instance du singleton.
     */
    private static final EscoSecurityContext INSTANCE = new EscoSecurityContext();

    /**
     * finder for security context.
     */
    private List < SecurityContextFinder >   listSecurityContextFinder;

    /**
     * private constructor.
     */
    private EscoSecurityContext() {
    }

    /**
     * @return singleton instance
     */
    public static EscoSecurityContext getInstance() {
        return EscoSecurityContext.INSTANCE;
    }

    /**
     * @return information of user logged
     */
    public static User getUserSecurity() {
        User user = null;

        if (ContextUtils.isServlet()) {
            user = (User) ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
                    .getSession().getAttribute(ESCOConstantes.ESCO_USER);
        } else {
            user = (User) ((PortletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
                    .getPortletSession().getAttribute(ESCOConstantes.ESCO_USER);
        }

        if (user == null) {
            for (SecurityContextFinder securityContextFinder : EscoSecurityContext.INSTANCE.listSecurityContextFinder) {
                user = securityContextFinder.getUserSecurity();
                if (user != null) {
                    break;
                }
            }
        } else {
            EscoSecurityContext.LOGGER.info("Find user in session : " + user);
        }

        return user;
    }

    /**
     * setter for property listSecurityContextFinder.
     * 
     * @param theListSecurityContextFinder
     *            the listSecurityContextFinder to set
     */
    public void setListSecurityContextFinder(final List < SecurityContextFinder > theListSecurityContextFinder) {
        this.listSecurityContextFinder = theListSecurityContextFinder;
    }

}
