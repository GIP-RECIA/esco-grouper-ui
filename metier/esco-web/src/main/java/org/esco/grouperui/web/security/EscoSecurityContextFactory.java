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
