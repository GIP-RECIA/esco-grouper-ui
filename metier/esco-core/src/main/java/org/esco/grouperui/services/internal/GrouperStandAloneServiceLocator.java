package org.esco.grouperui.services.internal;

import java.util.HashMap;
import java.util.Map;

import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * @author dMoulron
 */
public class GrouperStandAloneServiceLocator implements IGrouperServiceLocator, IServiceLocatorEntriesAware {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger        LOGGER    = ESCOLoggerFactory
                                                              .getLogger(GrouperStandAloneServiceLocator.class);

    /**
     * map to store reference in grouper service.
     */
    private Map < String, IGrouperService > methodRef = new HashMap < String, IGrouperService >();

    /**
     * Default constructor.
     */
    public GrouperStandAloneServiceLocator() {
    }

    /**
     * {@inheritDoc}
     */
    public void setMethodRef(final Map < String, IGrouperService > theMethodRef) {
        if (this.methodRef == null) {
            this.methodRef = theMethodRef;
        } else {
            this.methodRef.putAll(theMethodRef);
        }
    }

    /**
     * {@inheritDoc}
     */
    public IGrouperService findServiceForMethod(final String theMethod) {
        GrouperStandAloneServiceLocator.LOGGER.debug("Find service for method : " + theMethod);

        IGrouperService serviceExt = this.methodRef.get(theMethod);

        if (serviceExt == null) {
            throw new ESCOTechnicalException("can't find service for method : " + theMethod);
        }

        return serviceExt;
    }

}
