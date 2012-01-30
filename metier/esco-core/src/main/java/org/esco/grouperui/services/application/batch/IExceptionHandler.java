package org.esco.grouperui.services.application.batch;

import java.util.Map;

/**
 * Interface of step exception exposed.<br>
 * Requirement(s) : [RECIA-ESCO-L2-004]
 * 
 * @author SopraGroup
 */
public interface IExceptionHandler {

    /**
     * Starts the exception handling.
     * 
     * @param theCause
     *            the cause
     */
    void handleException(Throwable theCause);

    /**
     * Stores in the map a key and a value.
     * 
     * @param theKey
     *            the key to put in the map
     * @param theValue
     *            the value to put in the map
     */
    void storeData(String theKey, Object theValue);

    /**
     * Stores a map.
     * 
     * @param data
     *            the map to store
     */
    void storeData(Map data);

    /**
     * Gets an element of the map from the key.
     * 
     * @param theKey
     *            a key of the map
     * @return the element of the map matching with the key.
     */
    Object getData(String theKey);

}
