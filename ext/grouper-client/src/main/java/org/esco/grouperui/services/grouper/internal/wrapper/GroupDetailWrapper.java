package org.esco.grouperui.services.grouper.internal.wrapper;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupDetail;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.services.application.filters.CompositeTypeEnum;
import org.esco.grouperui.services.grouper.WSUtils;
import org.esco.grouperui.services.grouper.internal.utils.DateUtils;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroupDetail;
import edu.internet2.middleware.grouperClient.ws.beans.WsParam;

/**
 * <b>Wrapper for group details. Convert a WsGroupDetail into GroupDetail.</b> <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-007]<br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author SopraGroup
 */
public class GroupDetailWrapper implements IWrapper < WsGroupDetail, GroupDetail > {

    /** UID. */
    private static final long           serialVersionUID = 8447387543833662129L;

    /** Logger for this class. */
    private static final IESCOLogger    LOGGER           = ESCOLoggerFactory.getLogger(GroupDetailWrapper.class);

    /** Wrapper : WSGroup to Group. */
    private IWrapper < WsGroup, Group > groupWrapper;

    /**
     * Default constructor.
     */
    public GroupDetailWrapper() {
        super();
    }

    /**
     * Getter for attribute <b>groupWrapper</b>.
     * 
     * @return the groupWrapper
     */
    public IWrapper < WsGroup, Group > getGroupWrapper() {
        return this.groupWrapper;
    }

    /**
     * Setter for attribute <b>groupWrapper</b>.
     * 
     * @param theGroupWrapper
     *            the groupWrapper to set
     */
    public void setGroupWrapper(final IWrapper < WsGroup, Group > theGroupWrapper) {
        this.groupWrapper = theGroupWrapper;
    }

    /**
     * {@inheritDoc}
     */
    public GroupDetail wrap(final WsGroupDetail theObjectSource) throws ESCOWrapperException {

        Validate.notNull(theObjectSource, "the source object is undefined");

        GroupDetailWrapper.LOGGER.debug("wrap(final WsGroupDetail theObjectSource) - start");

        GroupDetail groupDetail = new GroupDetail();

        if (theObjectSource.getAttributeNames() != null && theObjectSource.getAttributeValues() != null) {
            groupDetail.setAttributeNames(theObjectSource.getAttributeNames().clone());
            groupDetail.setAttributeValues(theObjectSource.getAttributeValues().clone());
        } else {
            GroupDetailWrapper.LOGGER.debug("No attributes for this group");
        }

        groupDetail.setCompositeType(CompositeTypeEnum.getFromValue(theObjectSource.getCompositeType()));
        groupDetail.setCreatorID(theObjectSource.getCreateSubjectId());

        try {
            groupDetail.setCreatedTime(DateUtils.stringToDate(theObjectSource.getCreateTime()));
        } catch (ParseException e) {
            GroupDetailWrapper.LOGGER.error("Error while parsing date from Grouper. Bad date is "
                    + theObjectSource.getCreateTime());
        }

        groupDetail.setHasComposite(WSUtils.SUCCESS.equals(theObjectSource.getHasComposite()));
        groupDetail.setIsCompositeFactor(WSUtils.SUCCESS.equals(theObjectSource.getIsCompositeFactor()));

        if (theObjectSource.getLeftGroup() != null) {
            groupDetail.setLeftGroup(this.groupWrapper.wrap(theObjectSource.getLeftGroup()));
        }
        if (theObjectSource.getRightGroup() != null) {
            groupDetail.setRightGroup(this.groupWrapper.wrap(theObjectSource.getRightGroup()));
        }

        groupDetail.setModifySource(theObjectSource.getModifySource());
        groupDetail.setModifierID(theObjectSource.getModifySubjectId());

        try {
            groupDetail.setModifyTime(DateUtils.stringToDate(theObjectSource.getModifyTime()));
        } catch (ParseException e) {
            GroupDetailWrapper.LOGGER.error("Error while parsing date from Grouper. Bad date is "
                    + theObjectSource.getModifyTime());
        }

        groupDetail.setTypeNames(theObjectSource.getTypeNames());

        WsParam[] params = theObjectSource.getParams();
        Map < String, String > parameters = null;
        if (params != null) {
            parameters = new HashMap < String, String >();
            for (WsParam param : params) {
                parameters.put(param.getParamName(), param.getParamValue());
            }
        }

        groupDetail.setParameters(parameters);

        GroupDetailWrapper.LOGGER.debug("wrap(final WsGroupDetail theObjectSource) - end");

        return groupDetail;
    }
}
