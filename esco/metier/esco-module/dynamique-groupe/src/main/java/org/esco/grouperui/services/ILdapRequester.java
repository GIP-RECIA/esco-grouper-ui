package org.esco.grouperui.services;

import java.util.List;
import java.util.Map;

import org.esco.grouperui.exceptions.business.ESCOLDAPBadRequestException;
import org.esupportail.commons.services.ldap.LdapEntity;
import org.springframework.ldap.LdapTemplate;

/**
 * Class ILdapRequester. Requirement(s) : [RECIA-ESCO-L2-001],
 * [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
public interface ILdapRequester {

    /**
     * {@inheritDoc}
     */
    LdapTemplate getLdapTemplate();

    /**
     * {@inheritDoc}
     */
    void setLdapTemplate(final LdapTemplate theLdapTemplate);

    /**
     * {@inheritDoc}
     */
    void prepareStatement(final String request);

    /**
     * {@inheritDoc}
     */
    List < LdapEntity > executeQuery() throws ESCOLDAPBadRequestException;

    /**
     * {@inheritDoc}
     */
    void setParameter(final int index, final String value);

    /**
     * {@inheritDoc}
     */
    void setParameter(final String value);

    /**
     * {@inheritDoc}
     */
    void setParameters(final Map < Integer, String > parameters);

    /**
     * {@inheritDoc}
     */
    void setAttributes(final List < String > attributes);

    /**
     * {@inheritDoc}
     */
    void setObjectClass(final String objectClass);

    /**
     * {@inheritDoc}
     */
    void clear();

}
