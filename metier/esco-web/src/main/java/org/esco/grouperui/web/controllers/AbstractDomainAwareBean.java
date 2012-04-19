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
/**
 * ESUP-Portail Example Application - Copyright (c) 2006 ESUP-Portail consortium
 * http://sourcesup.cru.fr/projects/esup-example
 */
package org.esco.grouperui.web.controllers;

import java.util.Locale;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.beans.User;
import org.esupportail.commons.beans.AbstractApplicationAwareBean;
import org.esupportail.commons.services.urlGeneration.UrlGenerator;
import org.esupportail.commons.web.controllers.Resettable;

/**
 * An abstract class inherited by all the beans for them to get: - the domain
 * service (domainService). - the application service (applicationService). -
 * the i18n service (i18nService). Requirement(s) : [RECIA-ESCO-L1-002]
 * @author sopragroup
 */
public abstract class AbstractDomainAwareBean extends AbstractApplicationAwareBean implements Resettable {

    /**
     *
     */
    private static final long serialVersionUID = 6695472547941483048L;

    /**
     * A logger.
     */
    private final IESCOLogger logger           = ESCOLoggerFactory.getLogger(this.getClass());

    /**
     * The URL generator.
     */
    private UrlGenerator      urlGenerator;

    /**
     * Constructor.
     */
    protected AbstractDomainAwareBean() {
        super();
    }

    /**
     * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
     */
    @Override
    public final void afterPropertiesSet() {
        super.afterPropertiesSet();
        this.afterPropertiesSetInternal();
        this.reset();
    }

    /**
     * This method is run once the object has been initialized, just before
     * reset().
     */
    protected void afterPropertiesSetInternal() {
        // override this method
    }

    /**
     * @see org.esupportail.commons.web.controllers.Resettable#reset()
     */
    public void reset() {
        // nothing to reset

    }

    /**
     * @return the current user's locale.
     */
    @Override
    public Locale getCurrentUserLocale() {
        this.logger.debug(this.getClass().getName() + ".getCurrentUserLocale()");
        User currentUser = EscoSecurityContext.getUserSecurity();
        if (currentUser == null) {
            this.logger.debug("no current user, return null");
            return null;
        }
        String lang = currentUser.getLang();
        if (lang == null) {
            this.logger.debug("language not set for user '" + currentUser.getId() + "', return null");
            return null;
        }
        Locale locale = new Locale(lang);
        this.logger.debug("language for user '" + currentUser.getId() + "' is '" + locale + "'");
        return locale;
    }

    /**
     * @return the urlGenerator
     */
    protected UrlGenerator getUrlGenerator() {
        return this.urlGenerator;
    }

    /**
     * @param urlGenerator
     *            the urlGenerator to set
     */
    public void setUrlGenerator(final UrlGenerator urlGenerator) {
        this.urlGenerator = urlGenerator;
    }

}
