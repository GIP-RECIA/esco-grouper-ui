package org.esco.grouperui.services.internal;

import org.esco.grouperui.services.application.IGrouperService;

/**
 * <b>Service locator interface.</b><br/>
 * <br/>
 * Requirements:<br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-002]<br/>
 * [RECIA-ESCO-L1-003]<br/>
 * [RECIA-ESCO-L1-004]<br/>
 * [RECIA-ESCO-L1-005]<br/>
 * [RECIA-ESCO-L1-007]
 * 
 * @author SopraGroup
 */
public interface IGrouperServiceLocator {

    /**
     * Find service for method.
     * 
     * @param theMethod
     *            : the method we search the service for.
     * @return the service.
     */
    IGrouperService findServiceForMethod(final String theMethod);

}
