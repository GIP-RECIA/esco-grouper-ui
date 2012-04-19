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
import org.esco.grouperui.web.beans.XMLResultString;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Controller for send exception on ajax call.
 * 
 * @author dMoulron
 */
public class ExceptionAjaxController extends AbstractContextAwareController {

    /**
     * the serial uid.
     */
    private static final long                                           serialVersionUID = -7328339844680481956L;

    /**
     * the true exception controller.
     */
    private org.esupportail.commons.web.controllers.ExceptionController exceptionController;

    /** The xmlProducer wrapper. */
    private IWrapper < XmlProducer, String >                            xmlProducerWrapper;

    /**
     * Default constructor.
     */
    public ExceptionAjaxController() {
    }

    /**
     * @return the name of exception translated in human text. if there are no
     *         translation, we take a default message.
     */
    public String getExceptionName() {
        String message = this.getString(this.exceptionController.getExceptionName());

        if (message != null && message.startsWith("????")) {
            message = this.getString("DEFAULT_MESSAGE_EXCEPTION");
        }
        XMLResultString resultString = new XMLResultString(message);

        XmlProducer producer = new XmlProducer();
        producer.setTarget(resultString);
        producer.setTypesOfTarget(XMLResultString.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * setter for property exceptionController.
     * 
     * @param theExceptionController
     *            the exceptionController to set
     */
    public void setExceptionController(
            final org.esupportail.commons.web.controllers.ExceptionController theExceptionController) {
        this.exceptionController = theExceptionController;
    }

    /**
     * Setter of the xmlProducerWrapper property.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set
     */
    public void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
    }

}
