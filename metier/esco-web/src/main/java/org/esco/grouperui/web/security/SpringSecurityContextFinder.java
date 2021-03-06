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

import java.util.Locale;
import java.util.Map;

import javax.faces.component.UIViewRoot;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.User;
import org.esupportail.commons.utils.ContextUtils;
import org.springframework.security.GrantedAuthority;
import org.springframework.security.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author dMoulron
 */
public class SpringSecurityContextFinder implements SecurityContextFinder {

    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(SpringSecurityContextFinder.class);

    /**
     * {@inheritDoc}
     */
    public User getUserSecurity() {

        User user = null;
        EscoAuthenticationAdapter authentication = (EscoAuthenticationAdapter) SecurityContextHolder.getContext()
                .getAuthentication();

        if (authentication != null) {
            user = new User();
            user.setLogin(authentication.getName());

            GrantedAuthority[] grantedAuthorities = authentication.getAuthorities();
            if (grantedAuthorities != null) {
                String[] roles = new String[grantedAuthorities.length];
                int index = 0;

                for (GrantedAuthority grantedAuthority : grantedAuthorities) {
                    roles[index++] = grantedAuthority.getAuthority();
                }

                user.setRole(roles);
            }

            user.setId(authentication.getPerson().getId());

            FacesContext facesContext = FacesContext.getCurrentInstance();
            ExternalContext externalContext = facesContext.getExternalContext();
            Map < String, String[] > parameter = externalContext.getRequestParameterValuesMap();

            Locale userLocale = (Locale) ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                    .getRequest().getSession().getAttribute(ESCOConstantes.ESCO_USER_LOCALE);
            // SET LOCALE FOR ESUP COMMONS
            ContextUtils.setSessionAttribute("locale", userLocale);

            // SET LOCALE FOR JSF
            UIViewRoot viewRoot = null;
            try {
                viewRoot = facesContext.getViewRoot();
                viewRoot.setLocale(userLocale);
            } catch (IllegalStateException e) {
                // context has probably been released, happens on exception
                // handling
            }

            user.setLocale(userLocale);

            String profile = (String) ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                    .getRequest().getSession().getAttribute(ESCOConstantes.ESCO_USER_PROFILE);
            String[] profiles = parameter.get(ESCOConstantes.ESCO_PARAMETER_PROFILE);

            if (profile == null) {
                if (profiles != null && profiles.length == 1) {
                    user.setProfil(profiles[0]);
                }
            } else {
                user.setProfil(profile);
            }
            SpringSecurityContextFinder.LOGGER.info("Profile load for this user : " + user.getProfil());
        }

        return user;
    }
}
