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
