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
