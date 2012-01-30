package org.esco.grouperui.services.grouper.internal.wrapper;

import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * <b>Subject wrapper.</b><br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-007]<br/>
 * 
 * @author SopraGroup
 */
public class PrivilegeAPIWrapper implements
        IWrapper < edu.internet2.middleware.grouper.privs.Privilege, Privilege > {

    /**
     *
     */
    private static final long        serialVersionUID = -823708892934478190L;
    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(PrivilegeAPIWrapper.class);

    /**
     * Default constructor.
     */
    public PrivilegeAPIWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Privilege wrap(final edu.internet2.middleware.grouper.privs.Privilege theObjectSource)
            throws ESCOWrapperException {

        PrivilegeAPIWrapper.LOGGER
                .debug("wrap(final edu.internet2.middleware.grouper.Group theObjectSource) throws Exception - debut");

        Privilege privilege = new Privilege();

        privilege.setPrivilegeName(theObjectSource.getName());

        PrivilegeAPIWrapper.LOGGER
                .debug("wrap(final edu.internet2.middleware.grouper.Group theObjectSource) throws Exception - fin");

        return privilege;
    }

}
