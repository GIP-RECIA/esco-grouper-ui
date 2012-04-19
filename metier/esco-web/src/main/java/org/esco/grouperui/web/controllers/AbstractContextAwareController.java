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

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.faces.context.FacesContext;

import org.esupportail.commons.utils.Assert;

/**
 * An abstract class inherited by all the beans for them to get: - the context
 * of the application (sessionController). - the domain service (domainService).
 * - the application service (applicationService). - the i18n service
 * (i18nService). Requirement(s) : [RECIA-ESCO-L1-002]
 * @author sopragroup
 */
public abstract class AbstractContextAwareController extends AbstractDomainAwareBean {

    /**
     *
     */
    private static final long serialVersionUID = 3523815164975694054L;
    /**
     * The SessionController.
     */
    private SessionController sessionController;

    /**
     * Constructor.
     */
    protected AbstractContextAwareController() {
        super();
    }

    /**
     * @see org.esupportail.example.web.controllers.AbstractDomainAwareBean#afterPropertiesSetInternal()
     */
    @Override
    public void afterPropertiesSetInternal() {
        Assert.notNull(this.sessionController, "property sessionController of class " + this.getClass().getName()
                + " can not be null");
    }

    /**
     * @param sessionController
     *            the sessionController to set
     */
    public void setSessionController(final SessionController sessionController) {
        this.sessionController = sessionController;
    }

    /**
     * @return the sessionController
     */
    public SessionController getSessionController() {
        return this.sessionController;
    }

    /**
     * Request one parameter by key.
     * 
     * @param key
     *            the key of parameter search
     * @return the value of parameter.
     */
    protected String getParam(final String key) {
        Map < String, String > params = FacesContext.getCurrentInstance().getExternalContext()
                .getRequestParameterMap();
        Map < String, String > headers = FacesContext.getCurrentInstance().getExternalContext()
                .getRequestHeaderMap();

        String param = params.get(key);
        if (param != null) {
            try {
                // FOR IE only, ie send data into utf8, not in page encoding, so
                // we must translate data
                String agent = headers.get("User-Agent");
                String paramISO2UTF = new String(param.getBytes("ISO-8859-1"), "UTF-8");

                if (agent.indexOf("MSIE") > -1) {
                    return paramISO2UTF;
                } else {
                    return param;
                }
            } catch (UnsupportedEncodingException e) {
                // can not be happen
                throw new IllegalArgumentException();
            }
        } else {
            return param;
        }
    }
}
