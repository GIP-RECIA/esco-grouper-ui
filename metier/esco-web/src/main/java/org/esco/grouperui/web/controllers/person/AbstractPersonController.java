package org.esco.grouperui.web.controllers.person;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.plugins.AbstractTabsControllerAware;
import org.esco.grouperui.web.plugins.ITabController;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * This class permits to define some function to all person controllers.
 * Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author aChesneau
 */
public abstract class AbstractPersonController extends AbstractTabsControllerAware {

    /**
     * The default serial version of the class generated.
     */
    private static final long                  serialVersionUID = -4258450140357720871L;

    /** The xmlProducer wrapper. */
    protected IWrapper < XmlProducer, String > xmlProducerWrapper;

    /** Boolean to check if the save have been done. */
    protected boolean                          saveCall         = Boolean.FALSE;

    /** The list of errors the happened while saving the modifications. */
    protected List < String >                  errors           = new ArrayList < String >();

    /**
     * The current person.
     */
    private Person                             person;

    /**
     * Check if one of the groups properties have been change.
     * 
     * @return the XML data.
     */
    public String isModifiedPerson() {

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
     * Allow to save the modification on a person.
     * 
     * @return the xml status (true / false).
     */
    public String savePerson() {
        Iterator < ITabController > controller = this.tabControllers.iterator();
        Status status = null;

        // Reinitialize the previous errors
        this.errors.clear();

        while (controller.hasNext()) {
            ITabController iPersonController = controller.next();

            status = iPersonController.save();
            if (null != status.getStatus() && !status.getStatus()) {
                this.errors = iPersonController.getErrorClassesNames();
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
            ITabController iPersonController = controller.next();

            if (iPersonController.getTabInfo().getIsResume()) {
                resumes.addAll(iPersonController.getListResume());
            }
        }

        return resumes;
    }

    /**
     * Clear all the controllers.
     * 
     * @return the xml
     */
    public String clearControllers() {

        // Clear all the sub controller
        Iterator < ITabController > controller = this.tabControllers.iterator();
        ITabController currentController = null;
        while (controller.hasNext()) {
            currentController = controller.next();
            currentController.clear();
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(true));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Get the xmlProducerWrapper property.
     * 
     * @return the xmlProducerWrapper
     */
    public IWrapper < XmlProducer, String > getXmlProducerWrapper() {
        return this.xmlProducerWrapper;
    }

    /**
     * Setter of the xmlProducerWrapper property.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set
     */
    public void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
    }

    /**
     * Setter of the person property.
     * 
     * @param thePerson
     *            the person to set
     */
    public void setPerson(final Person thePerson) {
        this.person = thePerson;
    }

    /**
     * Get the person property.
     * 
     * @return the person
     */
    public Person getPerson() {
        return this.person;
    }

    /**
     * Get the saveCall property.
     * 
     * @return the saveCall
     */
    public boolean isSaveCall() {
        return this.saveCall;
    }

    /**
     * Setter of the saveCall property.
     * 
     * @param theSaveCall
     *            the saveCall to set
     */
    public void setSaveCall(final boolean theSaveCall) {
        this.saveCall = theSaveCall;
    }

    /**
     * Get the errors property.
     * 
     * @return the errors
     */
    public List < String > getErrors() {
        return this.errors;
    }

    /**
     * Setter of the errors property.
     * 
     * @param theErrors
     *            the errors to set
     */
    public void setErrors(final List < String > theErrors) {
        this.errors = theErrors;
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
}
