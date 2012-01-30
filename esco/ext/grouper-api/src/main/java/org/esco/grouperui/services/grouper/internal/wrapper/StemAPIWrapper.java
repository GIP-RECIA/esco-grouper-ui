package org.esco.grouperui.services.grouper.internal.wrapper;

import org.esco.grouperui.domaine.beans.Stem;
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
public class StemAPIWrapper implements IWrapper < edu.internet2.middleware.grouper.Stem, Stem > {

    /** UID. */
    private static final long        serialVersionUID = 4430210530068046238L;

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(StemAPIWrapper.class);

    /**
     * Default constructor.
     */
    public StemAPIWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Stem wrap(final edu.internet2.middleware.grouper.Stem theObjectSource) throws ESCOWrapperException {

        StemAPIWrapper.LOGGER
                .debug("wrap(final edu.internet2.middleware.grouper.Group theObjectSource) throws Exception - debut");

        Stem stem = new Stem();

        stem.setDescription(theObjectSource.getDescription());
        stem.setDisplayExtension(theObjectSource.getDisplayExtension());
        stem.setDisplayName(theObjectSource.getDisplayName());
        stem.setExtension(theObjectSource.getExtension());
        stem.setName(theObjectSource.getName());
        stem.setUuid(theObjectSource.getUuid());

        StemAPIWrapper.LOGGER
                .debug("wrap(final edu.internet2.middleware.grouper.Group theObjectSource) throws Exception - fin");

        return stem;
    }

}
