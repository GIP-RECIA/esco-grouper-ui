package org.esco.grouperui.web.security;

import org.esupportail.commons.services.authentication.PortalOrCasFilterAuthenticationService;

/**
 * @author aChesneau
 */
@SuppressWarnings("deprecation")
public class EscoSecurityFilterAuthenticationService extends PortalOrCasFilterAuthenticationService {

    /**
     * The default generated serial uid.
     */
    private static final long               serialVersionUID = 6529610119629866161L;
    /**
     * finder for security context.
     */
    @SuppressWarnings("unused")
    private transient SecurityContextFinder securityContextFinder;

    /**
     * Default constructor.
     */
    public EscoSecurityFilterAuthenticationService() {
        super();

    }

    /**
     * setter for property securityContextFinder.
     * 
     * @param theSecurityContextFinder
     *            the securityContextFinder to set
     */
    public void setSecurityContextFinder(final SecurityContextFinder theSecurityContextFinder) {
        this.securityContextFinder = theSecurityContextFinder;
    }
}
