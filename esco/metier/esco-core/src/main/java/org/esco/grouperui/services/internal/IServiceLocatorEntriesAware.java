package org.esco.grouperui.services.internal;

import java.util.Map;

import org.esco.grouperui.services.application.IGrouperService;

/**
 * interface to define a service which can add manage method.
 * 
 * @author dMoulron
 */
public interface IServiceLocatorEntriesAware {

    /**
     * setter for property methodRef.
     * 
     * @param theMethodRef
     *            the methodRef to set
     */
    void setMethodRef(final Map < String, IGrouperService > theMethodRef);

}
