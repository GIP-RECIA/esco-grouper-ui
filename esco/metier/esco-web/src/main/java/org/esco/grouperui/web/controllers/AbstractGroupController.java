package org.esco.grouperui.web.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOStemNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.XMLResultString;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.plugins.AbstractTabsControllerAware;
import org.esco.grouperui.web.plugins.ITabController;
import org.esco.grouperui.web.utils.I18nExceptionAdapter;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class GroupController. Requirement(s): <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008] <br />
 * [RECIA-ESCO-L2-002]
 * 
 * @author aChesneau
 */
public abstract class AbstractGroupController extends AbstractTabsControllerAware {

    /**
     * serialVersionUID.
     */
    private static final long                  serialVersionUID          = 7264200314055495520L;

    /** Logger. */
    private static final IESCOLogger           LOGGER                    = ESCOLoggerFactory
                                                                                 .getLogger(AbstractGroupController.class);

    /** Get Parameter : groupUuid. */
    private static final String                PARAM_GROUP_UUID          = "groupUuid";

    /**
     * The default message exception/
     */
    private static final String                DEFAULT_MESSAGE_EXCEPTION = "DEFAULT_MESSAGE_EXCEPTION";

    /** Get Parameter : initialization. */
    private static final String                PARAM_GROUP_INIT          = "init";

    /** Get Parameter : stemName. */
    private static final String                PARAM_STEM_NAME           = "stemName";

    /** Get Parameter : stemDisplayName. */
    private static final String                PARAM_STEM_DISPLAY_NAME   = "stemDisplayName";

    /** Get Parameter : groupDestName */
    private static final String                PARAM_GROUP_DEST          = "groupDestName";

    /** Get Parameter : groupOriginName */
    private static final String                PARAM_GROUP_ORIGIN        = "groupOriginName";

    /** The parent stem. */
    protected Stem                             parentStem;

    /** Boolean to check if we are in creation or in modification. */
    protected Boolean                          creation                  = Boolean.FALSE;

    /** The group. */
    protected Group                            group;

    /** The xmlProducer wrapper. */
    protected IWrapper < XmlProducer, String > xmlProducerWrapper;

    /** Boolean to check if the save have been done. */
    protected boolean                          saveCall                  = Boolean.FALSE;

    /** The list of errors the happened while saving the modifications. */
    protected List < String >                  errors                    = new ArrayList < String >();

    /** The GrouperService that provide services from grouper. */
    private IGrouperService                    grouperService;

    /** */
    private IParameterService                  parameterService;

    /**
     * Default constructor.
     */
    public AbstractGroupController() {
    }

    /**
     * Setter for grouperServiceExt.
     * 
     * @param theGrouperService
     *            the grouperService to set.
     */
    public final void setGrouperService(final IGrouperService theGrouperService) {
        this.grouperService = theGrouperService;
    }

    /**
     * Move the group to an other stem.
     * 
     * @return the result of the move operation.
     * @throws ESCOSubjectNotUniqueException
     *             if the subject is not unique.
     * @throws ESCOSubjectNotFoundException
     *             if the subject is not found.
     * @throws ESCOGroupNotUniqueException
     * @throws ESCOGroupNotFoundException
     */
    public String moveGroup() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException,
            ESCOGroupNotFoundException, ESCOGroupNotUniqueException {
        String theGroupId = this.getParam(AbstractGroupController.PARAM_GROUP_UUID);
        String theStemName = this.getParam(AbstractGroupController.PARAM_STEM_NAME);
        String theStemDisplayName = this.getParam(AbstractGroupController.PARAM_STEM_DISPLAY_NAME);
        Validate.notNull(theGroupId);
        Validate.notNull(theStemName);
        Validate.notNull(theStemDisplayName);
        String theError = "";
        IGrouperService grouperService = this.getGrouperService();
        Person userConnected = PersonController.getConnectedPerson();

        Stem stem = new Stem();
        stem.setName(theStemName);
        stem.setDisplayName(theStemDisplayName);

        try {
            grouperService.moveGroup(userConnected, theGroupId, stem);
        } catch (ESCOBusinessException e) {
            AbstractGroupController.LOGGER.error(e);
            theError = e.getClass().getSimpleName();
        }

        XmlProducer producer = new XmlProducer();
        if ("".equals(theError)) {
            Group group = this.grouperService.findGroupByUid(userConnected, theGroupId);
            producer.setTarget(new org.esco.grouperui.web.beans.Error(true, group.getDisplayName()));
        } else {
            theError = I18nExceptionAdapter.getExceptionString(this.getI18nService(), theError,
                    AbstractGroupController.DEFAULT_MESSAGE_EXCEPTION);
            producer.setTarget(new org.esco.grouperui.web.beans.Error(false, theError));
        }
        producer.setTypesOfTarget(org.esco.grouperui.web.beans.Error.class);
        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * setter for property parameterService.
     * 
     * @param theParameterService
     *            the parameterService to set
     */
    public void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

    /**
     * setter for property xmlProducerWrapper.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set
     */
    public void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
    }

    /**
     * Getter for errors.
     * 
     * @return the errors to get.
     */
    public final List < String > getErrors() {
        return this.errors;
    }

    /**
     * Initialization of the group.
     * 
     * @throws ESCOGroupNotFoundException
     *             if the current group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the current group is not unique.
     * @throws ESCOStemNotFoundException
     *             if the parent stem is not found.
     * @throws ESCOStemNotUniqueException
     *             if the parent stem is not unique.
     * @throws CloneNotSupportedException
     *             if the clone of the group failed.
     */
    public abstract void initGroupAttributes() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            ESCOStemNotFoundException, ESCOStemNotUniqueException, CloneNotSupportedException;

    /**
     * Get a group.
     * 
     * @return a group.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     */
    public Group getAGroup() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException {
        Group result = null;
        String theUiid = this.getParam(AbstractGroupController.PARAM_GROUP_UUID);

        Validate.notNull(theUiid);

        Person person = null;
        try {
            person = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e1) {
            AbstractGroupController.LOGGER.error(e1);
        } catch (ESCOSubjectNotUniqueException e1) {
            AbstractGroupController.LOGGER.error(e1);
        }

        if (!StringUtils.isEmpty(theUiid)) {
            result = this.grouperService.findGroupByUid(person, theUiid);
        }
        return result;
    }

    /**
     * Allow to retrieve the display name of the group.
     * 
     * @return the display name of the group.
     */
    public String getDisplayName() {
        String result = null;

        if (this.group != null) {
            result = this.group.getDisplayName();
        } else
            if (this.getParam("displayName") != null) {
                result = this.getParam("displayName");
            }
        return result;
    }

    /**
     * Allow to retrieve the display name of the group.
     * 
     * @return the display name of the group.
     */
    public String getDisplayExtension() {
        String result = null;

        if (this.group != null) {
            result = this.group.getDisplayExtension();
        }
        return result;
    }

    /**
     * Allow to retrieve the name (path) of the group.
     * 
     * @return the name (path) of the group.
     */
    public String getNameSearchPath() {
        String result = ESCOConstantes.ROOT_NAME;

        if (this.creation && this.parentStem != null && this.parentStem.getName() != null) {
            // add the root element to the parentStem
            result = ESCOConstantes.STEM_NAME_SEPARATOR + this.parentStem.getName();
        } else
            if (this.group != null && this.group.getName() != null) {
                result = "";
                String[] aux = this.group.getName().split(":");
                for (String element : aux) {
                    result += element + ":";
                }
                // add the root element and delete the last :
                result = ESCOConstantes.STEM_NAME_SEPARATOR + result.substring(0, result.length() - 1);
            }

        return result;
    }

    /**
     * Allow to retrieve the name (path) of the group.
     * 
     * @return the name (path) of the group.
     */
    public String getDisplayNameSearchPath() {
        String result = ESCOConstantes.ROOT_NAME;

        if (this.creation && this.parentStem != null && this.parentStem.getDisplayName() != null) {
            // add the root element to the parentStem
            result = ESCOConstantes.STEM_NAME_SEPARATOR + this.parentStem.getDisplayName();
        } else
            if (this.group != null && this.group.getDisplayName() != null) {
                result = "";
                String[] aux = this.group.getDisplayName().split(":");
                for (String element : aux) {
                    result += element + ":";
                }
                // add the root element and delete the last :
                result = ESCOConstantes.STEM_NAME_SEPARATOR + result.substring(0, result.length() - 1);
            }

        return result;
    }

    /**
     * Allow to retrieve the name (path) of the parent stem.
     * 
     * @return the name (path) of the parent stem.
     */
    public String getParentNameSearchPath() {
        String result = ESCOConstantes.ROOT_NAME;

        if (this.creation && this.parentStem != null && this.parentStem.getName() != null) {
            // add the root element to the parentStem
            result = ESCOConstantes.STEM_NAME_SEPARATOR + this.parentStem.getName();
        } else
            if (this.group != null && this.group.getName() != null) {
                result = "";
                String[] aux = this.group.getName().split(":");
                for (int i = 0; i < aux.length - 1; i++) {
                    result += aux[i] + ":";
                }
                // add the root element and delete the last :
                result = ESCOConstantes.STEM_NAME_SEPARATOR + result.substring(0, result.length() - 1);
            }

        return result;
    }

    /**
     * Allow to retrieve the name (path) of the parent stem.
     * 
     * @return the name (path) of the parent stem.
     */
    public String getParentDisplayNameSearchPath() {
        String result = ESCOConstantes.ROOT_NAME;

        if (this.creation && this.parentStem != null && this.parentStem.getDisplayName() != null) {
            // add the root element to the parentStem
            result = ESCOConstantes.STEM_NAME_SEPARATOR + this.parentStem.getDisplayName();
        } else
            if (this.group != null && this.group.getDisplayName() != null) {
                result = "";
                String[] aux = this.group.getDisplayName().split(":");
                for (int i = 0; i < aux.length - 1; i++) {
                    result += aux[i] + ":";
                }
                // add the root element and delete the last :
                result = ESCOConstantes.STEM_NAME_SEPARATOR + result.substring(0, result.length() - 1);
            }

        return result;
    }

    /**
     * Retrieve the groupUuid from the request.
     * 
     * @return the groupUuid.
     */
    public String getGroupUuid() {
        return this.getParam(AbstractGroupController.PARAM_GROUP_UUID);
    }

    /**
     * Retrieve the caller name from the request.
     * 
     * @return the caller name.
     */
    public String fromCall() {
        return this.getParam(ESCOConstantes.PARAM_FROM_CALL);
    }

    /**
     * getter for property grouperService.
     * 
     * @return the grouperService
     */
    public IGrouperService getGrouperService() {
        return this.grouperService;
    }

    /**
     * getter for property parameterService.
     * 
     * @return the parameterService
     */
    public IParameterService getParameterService() {
        return this.parameterService;
    }

    /**
     * getter for property group.
     * 
     * @return the group
     */
    public Group getGroup() {
        return this.group;
    }

    /**
     * Setter for group.
     * 
     * @param theGroup
     *            the group to set.
     */
    public final void setGroup(final Group theGroup) {
        this.group = theGroup;
    }

    /**
     * Check if the current status is an initialization.
     * 
     * @return true if initialization sequence, false else.
     */
    public boolean isInit() {
        return Boolean.valueOf(this.getParam(AbstractGroupController.PARAM_GROUP_INIT));
    }

    /**
     * Check if need to redirect to parent.
     * 
     * @return true if need redirection to parent, false otherwise.
     */
    public String getNeedToRedirectToParent() {
        return this.getParam("needToRedirect");
    }

    /**
     * Check if one of the groups properties have been change.
     * 
     * @return the XML data.
     */
    public String isModifiedGroups() {

        Boolean status = Boolean.FALSE;

        // Clear all the sub controller
        Iterator < ITabController > controller = this.tabControllers.iterator();
        ITabController currentController = null;
        while (controller.hasNext()) {
            currentController = controller.next();
            if (currentController.isModified()) {
                status = Boolean.TRUE;
                break;
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(status));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Allow to clear all the sub controller.
     * 
     * @return the xml status (true / false).
     */
    public String clearModification() {
        Iterator < ITabController > controller = this.tabControllers.iterator();
        ITabController currentController = null;
        while (controller.hasNext()) {
            currentController = controller.next();
            currentController.clear();
        }

        // Reinitialize the previous errors
        this.errors.clear();

        // Reinitialize the saveCall attribute
        this.saveCall = Boolean.FALSE;

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * call each controller for compute summary.
     * 
     * @return list off all summary for each controller.
     */
    public List < Resume > getListResume() {
        Iterator < ITabController > controller = this.tabControllers.iterator();

        List < Resume > resumes = new ArrayList < Resume >();
        this.errors.clear();
        while (controller.hasNext()) {
            ITabController iGroupController = controller.next();

            if (iGroupController.getTabInfo().getIsResume()) {
                resumes.addAll(iGroupController.getListResume());
            }
        }
        return resumes;
    }

    /**
     * Check if the save action have been done.
     * 
     * @return true if the save action have been done, false else.
     */
    public boolean getSaveCall() {
        return this.saveCall;
    }

    /**
     * Allow to save the modification on a group.
     * 
     * @return the xml status (true / false).
     */
    public String saveGroup() {
        Iterator < ITabController > controller = this.tabControllers.iterator();
        Status status = null;

        // Reinitialize the previous errors
        this.errors.clear();

        while (controller.hasNext()) {
            ITabController iGroupController = controller.next();

            status = iGroupController.save();
            if (null != status.getStatus() && !status.getStatus()) {
                this.errors = iGroupController.getErrorClassesNames();
                break;
            }
        }

        this.saveCall = Boolean.TRUE;

        // Clear modifications for all the controllers if no error happened
        if (this.errors.isEmpty()) {
            // Clear the modifications
            this.clearModification();
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(this.errors.isEmpty()));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Apply changes made on the attribute that raised an exception.
     * 
     * @return the result.
     */
    public String applyModification() {
        final String idModification = this.getParam("id");
        final String newValue = this.getParam("newValue");

        Iterator < ITabController > controller = this.tabControllers.iterator();
        while (controller.hasNext()) {
            ITabController iGroupController = controller.next();
            iGroupController.applyModification(idModification, newValue);
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Discard a modification that raised an exception.
     * 
     * @return the result.
     */
    public String discardModification() {

        final String idModification = this.getParam("id");
        final String controllerClass = this.getParam("controllerClass");

        Iterator < ITabController > controller = this.tabControllers.iterator();

        while (controller.hasNext()) {
            ITabController iGroupController = controller.next();

            if (iGroupController.getClass().getName().equals(controllerClass)) {
                iGroupController.discardModification(idModification);
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Getter for the attribute key that is modified.
     * 
     * @return the result.
     */
    public String getAttributeKey() {
        final String idModification = this.getParam("id");
        String attributeKey = null;

        Iterator < ITabController > controller = this.tabControllers.iterator();
        while (controller.hasNext()) {
            ITabController iGroupController = controller.next();
            attributeKey = iGroupController.getAttributeKey(idModification);
            if (null != attributeKey) {
                break;
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new XMLResultString(attributeKey));
        producer.setTypesOfTarget(XMLResultString.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Get if the user is admin of the group.
     * 
     * @return True if is admin else false otherwise.
     */
    public Boolean getIsAdmin() {
        if (this.group == null) {
            AbstractGroupController.LOGGER.debug("The group is null, it is not possible to get the privilege");
            return false;
        } else {
            return GroupPrivilegeEnum.ADMIN.eq(this.group.getUserRight());
        }
    }

    /**
     * Get if the user is updater of the group.
     * 
     * @return True if is updater else false otherwise.
     */
    public Boolean getIsUpdater() {
        if (this.group == null) {
            AbstractGroupController.LOGGER.debug("The group is null, it is not possible to get the privilege");
            return false;
        } else {
            return GroupPrivilegeEnum.UPDATE.eq(this.group.getUserRight());
        }
    }

    /**
     * Get if the user is reader of the group.
     * 
     * @return True if is reader else false otherwise.
     */
    public Boolean getIsReader() {
        if (this.group == null) {
            AbstractGroupController.LOGGER.debug("The group is null, it is not possible to get the privilege");
            return false;
        } else {
            return GroupPrivilegeEnum.READ.eq(this.group.getUserRight());
        }
    }

    /**
     * Get if the user is viewer of the group.
     * 
     * @return True if is viewer else false otherwise.
     */
    public Boolean getIsViewer() {
        if (this.group == null) {
            AbstractGroupController.LOGGER.debug("The group is null, it is not possible to get the privilege");
            return false;
        } else {
            return GroupPrivilegeEnum.VIEW.eq(this.group.getUserRight());
        }
    }

    /**
     * Get the creation property.
     * 
     * @return the creation
     */
    public Boolean getCreation() {
        return this.creation;
    }

    /**
     * Setter of the creation property.
     * 
     * @param theCreation
     *            the creation to set
     */
    public void setCreation(final Boolean theCreation) {
        this.creation = theCreation;
    }
}
