/**
 *
 */
package org.esco.grouperui.web.security;

import org.esco.grouperui.domaine.beans.Person;
import org.springframework.security.Authentication;
import org.springframework.security.GrantedAuthority;

/**
 * @author aChesneau
 */
public class EscoAuthenticationAdapter implements Authentication {

    /**
     *
     */
    private static final long    serialVersionUID = 6375173881500349873L;
    /**
     *
     */
    private final Authentication delegate;
    /**
     *
     */
    private Person               person;

    /**
     * default constructor.
     * 
     * @param theDelegate
     *            the authentication to delegate
     */
    public EscoAuthenticationAdapter(final Authentication theDelegate) {
        this.delegate = theDelegate;
    }

    /**
     * {@inheritDoc}
     */
    public GrantedAuthority[] getAuthorities() {
        return this.delegate.getAuthorities();
    }

    /**
     * {@inheritDoc}
     */
    public Object getCredentials() {
        return this.delegate.getCredentials();
    }

    /**
     * {@inheritDoc}
     */
    public Object getDetails() {
        return this.delegate.getDetails();
    }

    /**
     * {@inheritDoc}
     */
    public Object getPrincipal() {
        return this.delegate.getPrincipal();
    }

    /**
     * {@inheritDoc}
     */
    public boolean isAuthenticated() {
        return this.delegate.isAuthenticated();
    }

    /**
     * {@inheritDoc}
     */
    public void setAuthenticated(final boolean theAuthenticated) throws IllegalArgumentException {
        this.delegate.setAuthenticated(theAuthenticated);
    }

    /**
     * {@inheritDoc}
     */
    public String getName() {
        return this.delegate.getName();
    }

    /**
     * Get the person property.
     * 
     * @return the person
     */
    public Person getPerson() {
        return this.person;
    }

    /**
     * Setter of the person property.
     * 
     * @param thePerson
     *            the person to set
     */
    public void setPerson(final Person thePerson) {
        this.person = thePerson;
    }

}
