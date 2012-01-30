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
