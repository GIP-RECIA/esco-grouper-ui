package org.esco.grouperui.services.grouper.internal.wrapper;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.grouper.WSUtils;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;
import edu.internet2.middleware.grouperClient.ws.beans.WsGrouperPrivilegeResult;
import edu.internet2.middleware.grouperClient.ws.beans.WsStem;
import edu.internet2.middleware.grouperClient.ws.beans.WsSubject;

/**
 * <b>Wrapper for stem. Convert a WsStem into Stem.</b><br/>
 * Requirements: [RECIA-ESCO-L1-007]
 * 
 * @author SopraGroup
 */
public class PrivilegeWrapper implements IWrapper < WsGrouperPrivilegeResult, Privilege > {

    /** UID. */
    private static final long              serialVersionUID = -2157330984197862130L;

    /** Logger for this class. */
    private static final IESCOLogger       LOGGER           = ESCOLoggerFactory.getLogger(PrivilegeWrapper.class);

    /** Wrapper : WSGroup to Group. */
    private IWrapper < WsGroup, Group >    groupWrapper;

    /** Wrapper : WSStem to Stem. */
    private IWrapper < WsStem, Stem >      stemWrapper;

    /** Wrapper : WSSubject to Subject. */
    private IWrapper < WsSubject, Person > personWrapper;

    /**
     * Default constructor.
     */
    public PrivilegeWrapper() {
    }

    /**
     * Getter for attribute <b>subjectWrapper</b>.
     * 
     * @return the subjectWrapper
     */
    public IWrapper < WsSubject, Person > getPersonWrapper() {
        return this.personWrapper;
    }

    /**
     * Setter for attribute <b>subjectWrapper</b>.
     * 
     * @param thePersonWrapper
     *            : the personWrapper to set
     */
    public void setPersonWrapper(final IWrapper < WsSubject, Person > thePersonWrapper) {
        this.personWrapper = thePersonWrapper;
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
     *            : the groupWrapper to set
     */
    public void setGroupWrapper(final IWrapper < WsGroup, Group > theGroupWrapper) {
        this.groupWrapper = theGroupWrapper;
    }

    /**
     * Getter for attribute <b>stemWrapper</b>.
     * 
     * @return the stemWrapper
     */
    public IWrapper < WsStem, Stem > getStemWrapper() {
        return this.stemWrapper;
    }

    /**
     * Setter for attribute <b>stemWrapper</b>.
     * 
     * @param theStemWrapper
     *            : the stemWrapper to set
     */
    public void setStemWrapper(final IWrapper < WsStem, Stem > theStemWrapper) {
        this.stemWrapper = theStemWrapper;
    }

    /**
     * {@inheritDoc}
     */
    public Privilege wrap(final WsGrouperPrivilegeResult theObjectSource) throws ESCOWrapperException {

        Validate.notNull(theObjectSource, "the source object is undefined");

        PrivilegeWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - start");

        Privilege privilege = new Privilege();

        privilege.setPrivilegeName(theObjectSource.getPrivilegeName());
        privilege.setPrivilegeType(theObjectSource.getPrivilegeType());
        privilege.setType(ScopeEnum.getFromValue(theObjectSource.getRevokable()));
        if (theObjectSource.getWsGroup() != null) {
            privilege.setGroup(this.groupWrapper.wrap(theObjectSource.getWsGroup()));
        }
        if (theObjectSource.getWsStem() != null) {
            privilege.setStem(this.stemWrapper.wrap(theObjectSource.getWsStem()));
        }
        privilege.setAllowed(WSUtils.SUCCESS.equals(theObjectSource.getAllowed()));

        PrivilegeWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - end");

        return privilege;
    }
}
