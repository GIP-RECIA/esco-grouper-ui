package org.esco.grouperui.web.security;

import java.util.List;

import org.esco.grouperui.web.controllers.EscoSecurityContext;
import org.springframework.beans.factory.InitializingBean;

/**
 * @author dMoulron
 */
public class EscoSecurityContextFactory implements InitializingBean {

    /**
     * finder for security context.
     */
    private List < SecurityContextFinder > listSecurityContextFinder;

    /**
     * Default constructor.
     */
    public EscoSecurityContextFactory() {
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (this.listSecurityContextFinder == null) {
            throw new IllegalArgumentException("securityContextFinder can not be null.");
        }
        if (this.listSecurityContextFinder.isEmpty()) {
            throw new IllegalArgumentException("securityContextFinder can not be null.");
        }

        EscoSecurityContext.getInstance().setListSecurityContextFinder(this.listSecurityContextFinder);
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
