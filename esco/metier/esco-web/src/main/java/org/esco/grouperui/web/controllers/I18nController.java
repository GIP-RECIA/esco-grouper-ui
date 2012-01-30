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
