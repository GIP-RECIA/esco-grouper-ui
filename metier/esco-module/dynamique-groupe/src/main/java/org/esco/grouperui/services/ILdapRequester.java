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
package org.esco.grouperui.services;

import java.util.List;
import java.util.Map;

import org.esco.grouperui.exceptions.business.ESCOLDAPBadRequestException;
import org.esupportail.commons.services.ldap.LdapEntity;
import org.springframework.ldap.core.LdapTemplate;

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
