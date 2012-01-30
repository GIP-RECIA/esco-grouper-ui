package org.esco.grouperui.tools;

import java.io.Serializable;

import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;

/**
 * <b>Wrapper interface.</b> <br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author SopraGroup
 * @param <T>
 *            Type of source objects.
 * @param <V>
 *            typy of return objects.
 */
public interface IWrapper<T, V> extends Serializable {

    /**
     * Wrapping object into another.
     * 
     * @param objectSource
     *            : the object to wrap.
     * @return the wrapping object
     * @throws ESCOWrapperException
     *             : if the wrap is not correct.
     */
    V wrap(T objectSource) throws ESCOWrapperException;
}
