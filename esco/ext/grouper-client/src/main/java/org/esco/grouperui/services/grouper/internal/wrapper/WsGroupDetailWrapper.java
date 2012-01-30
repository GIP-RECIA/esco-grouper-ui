package org.esco.grouperui.services.grouper.internal.wrapper;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupDetail;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.services.grouper.WSUtils;
import org.esco.grouperui.services.grouper.internal.utils.DateUtils;
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
public class WsGroupDetailWrapper implements IWrapper < GroupDetail, WsGroupDetail > {

    /** UID. */
    private static final long           serialVersionUID = -4124306411078003035L;

    /** Logger for this class. */
    private static final IESCOLogger    LOGGER           = ESCOLoggerFactory.getLogger(WsGroupDetailWrapper.class);

    /** Wrapper : Group to WsGroup. */
    private IWrapper < Group, WsGroup > wsGroupWrapper;

    /**
     * Default constructor.
     */
    public WsGroupDetailWrapper() {
    }

    /**
     * Getter for attribute <b>wsGroupWrapper</b>.
     * 
     * @return the wsGroupWrapper
     */
    public IWrapper < Group, WsGroup > getWsGroupWrapper() {
        return this.wsGroupWrapper;
    }

    /**
     * Setter for attribute <b>wsGroupWrapper</b>.
     * 
     * @param theWsGroupWrapper
     *            the wsGroupWrapper to set
     */
    public void setWsGroupWrapper(final IWrapper < Group, WsGroup > theWsGroupWrapper) {
        this.wsGroupWrapper = theWsGroupWrapper;
    }

    /**
     * {@inheritDoc}
     */
    public WsGroupDetail wrap(final GroupDetail theObjectSource) throws ESCOWrapperException {

        Validate.notNull(theObjectSource, "the source object is undefined");

        WsGroupDetailWrapper.LOGGER.debug("wrap(final GroupDetail theObjectSource) - start");

        WsGroupDetail groupDetail = new WsGroupDetail();

        groupDetail.setAttributeNames(theObjectSource.getAttributeNames());

        groupDetail.setAttributeValues(theObjectSource.getAttributeValues());

        if (theObjectSource.getCompositeType() != null) {
            groupDetail.setCompositeType(theObjectSource.getCompositeType().getValue());
        }

        groupDetail.setCreateSubjectId(theObjectSource.getCreatorID());

        if (null != theObjectSource.getCreatedTime()) {
            groupDetail.setCreateTime(DateUtils.dateToString(theObjectSource.getCreatedTime()));
        }

        if (null != theObjectSource.getHasComposite()) {
            if (theObjectSource.getHasComposite()) {
                groupDetail.setHasComposite(WSUtils.SUCCESS);
            } else {
                groupDetail.setHasComposite(WSUtils.FAILURE);
            }
        }

        if (null != theObjectSource.getIsCompositeFactor()) {
            if (theObjectSource.getIsCompositeFactor()) {
                groupDetail.setIsCompositeFactor(WSUtils.SUCCESS);
            } else {
                groupDetail.setIsCompositeFactor(WSUtils.FAILURE);
            }
        }

        if (theObjectSource.getLeftGroup() != null) {
            groupDetail.setLeftGroup(this.wsGroupWrapper.wrap(theObjectSource.getLeftGroup()));
        }
        if (theObjectSource.getRightGroup() != null) {
            groupDetail.setRightGroup(this.wsGroupWrapper.wrap(theObjectSource.getRightGroup()));
        }

        groupDetail.setModifySource(theObjectSource.getModifySource());

        groupDetail.setModifySubjectId(theObjectSource.getModifierID());

        if (null != theObjectSource.getModifyTime()) {
            groupDetail.setModifyTime(DateUtils.dateToString(theObjectSource.getModifyTime()));
        }

        groupDetail.setTypeNames(theObjectSource.getTypeNames());

        WsGroupDetailWrapper.LOGGER.debug("wrap(final GroupDetail theObjectSource) - end");

        return groupDetail;
    }

}
