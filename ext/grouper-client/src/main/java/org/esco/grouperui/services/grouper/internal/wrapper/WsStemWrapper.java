package org.esco.grouperui.services.grouper.internal.wrapper;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.ws.beans.WsStem;

/**
 * <b>Wrapper for stem. Convert a WsStem into Stem.</b><br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004]<br/>
 * 
 * @author SopraGroup
 */
public class WsStemWrapper implements IWrapper < Stem, WsStem > {

    /** UID. */
    private static final long        serialVersionUID = -8481101729709005218L;

    /** Logger for this class. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(WsStemWrapper.class);

    /**
     * Default constructor.
     */
    public WsStemWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public WsStem wrap(final Stem theObjectSource) throws ESCOWrapperException {

        Validate.notNull(theObjectSource, "the source object is undefined");

        WsStemWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - start");

        WsStem stem = new WsStem();

        if (theObjectSource.getDescription() != null) {
            stem.setDescription(theObjectSource.getDescription());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("description"))
                    && !"null".equals(theObjectSource.getValueFormCol("description"))) {
                stem.setDescription(theObjectSource.getValueFormCol("description"));
            }

        if (theObjectSource.getDisplayExtension() != null) {
            stem.setDisplayExtension(theObjectSource.getDisplayExtension());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("displayExtension"))
                    && !"null".equals(theObjectSource.getValueFormCol("displayExtension"))) {
                stem.setDisplayExtension(theObjectSource.getValueFormCol("displayExtension"));
            }

        if (theObjectSource.getDisplayName() != null) {
            stem.setDisplayName(theObjectSource.getDisplayName());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("displayName"))
                    && !"null".equals(theObjectSource.getValueFormCol("displayName"))) {
                stem.setDisplayName(theObjectSource.getValueFormCol("displayName"));
            }

        if (theObjectSource.getExtension() != null) {
            stem.setExtension(theObjectSource.getExtension());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("extension"))
                    && !"null".equals(theObjectSource.getValueFormCol("extension"))) {
                stem.setExtension(theObjectSource.getValueFormCol("extension"));
            }

        if (theObjectSource.getName() != null) {
            stem.setName(theObjectSource.getName());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("name"))
                    && !"null".equals(theObjectSource.getValueFormCol("name"))) {
                stem.setName(theObjectSource.getValueFormCol("name"));
            }

        if (theObjectSource.getUuid() != null) {
            stem.setUuid(theObjectSource.getUuid());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("uuid"))
                    && !"null".equals(theObjectSource.getValueFormCol("uuid"))) {
                stem.setUuid(theObjectSource.getValueFormCol("uuid"));
            }

        WsStemWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - end");

        return stem;
    }
}
