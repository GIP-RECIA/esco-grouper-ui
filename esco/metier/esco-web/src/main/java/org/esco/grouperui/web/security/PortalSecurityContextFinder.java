package org.esco.grouperui.web.security;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.faces.component.UIViewRoot;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.portlet.PortletPreferences;
import javax.portlet.PortletRequest;
import javax.portlet.PortletSession;

import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.User;
import org.esupportail.commons.services.authentication.AuthenticationService;
import org.esupportail.commons.services.authentication.info.AuthInfo;
import org.esupportail.commons.utils.ContextUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.portlet.context.PortletRequestAttributes;

/**
 * Find user information in portal preference and security. <br />
 * In tomcat you need to modify server.xml. <br/>
 * Add <b>emptySessionPath="true"</b> to the Connector tag.
 * 
 * @author dMoulron
 */
public class PortalSecurityContextFinder implements InitializingBean, SecurityContextFinder {

    private AuthenticationService authenticationService;

    /**
     * @return information of user logged
     */
    public User getUserSecurity() {
        User user = null;
        AuthInfo authInfo = this.authenticationService.getAuthInfo();

        if (authInfo != null) {
            user = new User();
            user.setLogin(authInfo.getId());
            user.setId(authInfo.getId());

            Map < String, Object > userInfo = (Map < String, Object >) ContextUtils
                    .getRequestAttribute(PortletRequest.USER_INFO);

            FacesContext facesContext = FacesContext.getCurrentInstance();
            ExternalContext externalContext = facesContext.getExternalContext();
            PortletRequest request = (PortletRequest) externalContext.getRequest();
            PortletPreferences portletPreferences = request.getPreferences();

            if (userInfo != null) {
                String profil = portletPreferences.getValue(ESCOConstantes.ESCO_PARAMETER_PROFILE, "default");
                user.setProfil(profil);
                ((PortletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
                        .getPortletSession().setAttribute(ESCOConstantes.ESCO_USER_PROFILE, profil,
                                PortletSession.APPLICATION_SCOPE);

                Locale userLocale = ((PortletRequestAttributes) RequestContextHolder.getRequestAttributes())
                        .getRequest().getLocale();
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

                Map < String, Set < String > > userAttrs = new HashMap < String, Set < String > >();
                Set < String > attrValue = null;
                for (java.util.Map.Entry < String, Object > attr : userInfo.entrySet()) {
                    attrValue = new HashSet < String >();

                    attrValue.add((String) attr.getValue());
                    userAttrs.put(attr.getKey(), attrValue);
                }
                user.setAttributes(userAttrs);

                ((PortletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
                        .getPortletSession().setAttribute(ESCOConstantes.ESCO_USER, user,
                                PortletSession.APPLICATION_SCOPE);
            }
        }

        return user;
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (this.authenticationService == null) {
            throw new IllegalArgumentException("authenticationService cannot be null");
        }
    }

    /**
     * setter for property authenticationService.
     * 
     * @param theAuthenticationService
     *            the authenticationService to set
     */
    public void setAuthenticationService(final AuthenticationService theAuthenticationService) {
        this.authenticationService = theAuthenticationService;
    }

}
