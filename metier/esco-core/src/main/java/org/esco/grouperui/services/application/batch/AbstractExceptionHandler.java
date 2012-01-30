package org.esco.grouperui.services.application.batch;

import java.util.HashMap;
import java.util.Map;

import org.esco.grouperui.exceptions.ESCOTechnicalException;

/**
 * An abstract class inherited by all the handlers exception for them to get a
 * map for transverse datas.<br>
 * Requirement(s) : [RECIA-ESCO-L2-004]
 * 
 * @author SopraGroup
 */
public abstract class AbstractExceptionHandler implements IExceptionHandler {

    /** a map containing transverse datas for the exception handler. */
    private Map < String, Object > data;

    /**
     * {@inheritDoc}
     */
    public void storeData(final String theKey, final Object theValue) {
        if (this.data == null) {
            this.data = new HashMap < String, Object >();
        }
        this.data.put(theKey, theValue);
    }

    /**
     * {@inheritDoc}
     */
    public void storeData(final Map theData) {
        this.data = theData;
    }

    /**
     * {@inheritDoc}
     */
    public Object getData(final String theKey) {
        if (this.data == null) {
            throw new ESCOTechnicalException("The map must be initialized.");
        }
        return this.data.get(theKey);
    }

}
