package org.esco.grouperui.services.grouper.internal.wrapper;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupDetail;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroupDetail;

/**
 * <b>Wrapper for stem. Convert a WsStem into Stem.</b><br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004]<br/>
 * 
 * @author SopraGroup
 */
public class WsGroupWrapper implements IWrapper < Group, WsGroup > {

    /** UID. */
    private static final long                       serialVersionUID = -671093115677902979L;

    /** Logger for this class. */
    private static final IESCOLogger                LOGGER           = ESCOLoggerFactory
                                                                             .getLogger(WsGroupWrapper.class);

    /** Wrapper : WSGroupDetail to GroupDetail. */
    private IWrapper < GroupDetail, WsGroupDetail > wsGroupDetailWrapper;

    /**
     * Default constructor.
     */
    public WsGroupWrapper() {
    }

    /**
     * Getter for attribute <b>wsGroupDetailWrapper</b>.
     * 
     * @return the wsGroupDetailWrapper
     */
    public IWrapper < GroupDetail, WsGroupDetail > getWsGroupDetailWrapper() {
        return this.wsGroupDetailWrapper;
    }

    /**
     * Setter for attribute <b>wsGroupDetailWrapper</b>.
     * 
     * @param theWsGroupDetailWrapper
     *            the wsGroupDetailWrapper to set
     */
    public void setWsGroupDetailWrapper(final IWrapper < GroupDetail, WsGroupDetail > theWsGroupDetailWrapper) {
        this.wsGroupDetailWrapper = theWsGroupDetailWrapper;
    }

    /**
     * {@inheritDoc}
     */
    public WsGroup wrap(final Group theObjectSource) throws ESCOWrapperException {

        Validate.notNull(theObjectSource, "the source object is undefined");

        WsGroupWrapper.LOGGER.debug("wrap(final Group theObjectSource) - start");

        WsGroup group = new WsGroup();

        if (theObjectSource.getDescription() != null) {
            group.setDescription(theObjectSource.getDescription());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("description"))
                    && !"null".equals(theObjectSource.getValueFormCol("description"))) {
                group.setDescription(theObjectSource.getValueFormCol("description"));
            }

        if (theObjectSource.getDetail() != null) {
            group.setDetail(this.wsGroupDetailWrapper.wrap(theObjectSource.getDetail()));
        }

        if (theObjectSource.getDisplayExtension() != null) {
            group.setDisplayExtension(theObjectSource.getDisplayExtension());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("displayExtension"))
                    && !"null".equals(theObjectSource.getValueFormCol("displayExtension"))) {
                group.setDisplayExtension(theObjectSource.getValueFormCol("displayExtension"));
            }

        if (theObjectSource.getDisplayName() != null) {
            group.setDisplayName(theObjectSource.getDisplayName());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("displayName"))
                    && !"null".equals(theObjectSource.getValueFormCol("displayName"))) {
                group.setDisplayName(theObjectSource.getValueFormCol("displayName"));
            }

        if (theObjectSource.getExtension() != null) {
            group.setExtension(theObjectSource.getExtension());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("extension"))
                    && !"null".equals(theObjectSource.getValueFormCol("extension"))) {
                group.setExtension(theObjectSource.getValueFormCol("extension"));
            }

        if (theObjectSource.getName() != null) {
            group.setName(theObjectSource.getName());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("name"))
                    && !"null".equals(theObjectSource.getValueFormCol("name"))) {
                group.setName(theObjectSource.getValueFormCol("name"));
            }

        if (theObjectSource.getIdGroup() != null) {
            group.setUuid(theObjectSource.getIdGroup());
        } else
            if (!"".equals(theObjectSource.getValueFormCol("id"))
                    && !"null".equals(theObjectSource.getValueFormCol("id"))) {
                group.setUuid(theObjectSource.getValueFormCol("id"));
            }

        WsGroupWrapper.LOGGER.debug("wrap(final Group theObjectSource) - end");

        return group;
    }
}
