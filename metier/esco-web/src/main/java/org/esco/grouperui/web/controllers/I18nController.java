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
package org.esco.grouperui.web.controllers;

import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.web.utils.XmlProducer;
import org.esupportail.commons.services.i18n.I18nService;

/**
 * @author aChesneau
 */
public class I18nController {

    /**
     * The default generated uid.
     */
    private static final long                serialVersionUID = -7598331877701646865L;

    /** wrapper for generate JSON from object. */
    private IWrapper < XmlProducer, String > jsonWrapper;

    /** The i18n service. */
    private I18nService                      i18nService;

    /**
     * Default constructor.
     */
    public I18nController() {
    }

    /**
     * Get all messages internationalized for use in JavaScript.
     * 
     * @return
     */
    public String getMessages() {
        XmlProducer producer = new XmlProducer();
        producer.setTarget(this.i18nService.getStrings());
        return this.jsonWrapper.wrap(producer);
    }

    /**
     * Setter of the jsonWrapper property.
     * 
     * @param theJsonWrapper
     *            the jsonWrapper to set
     */
    public void setJsonWrapper(final IWrapper < XmlProducer, String > theJsonWrapper) {
        this.jsonWrapper = theJsonWrapper;
    }

    /**
     * Setter of the i18nService property.
     * 
     * @param theI18nService
     *            the i18nService to set
     */
    public void setI18nService(final I18nService theI18nService) {
        this.i18nService = theI18nService;
    }

}
