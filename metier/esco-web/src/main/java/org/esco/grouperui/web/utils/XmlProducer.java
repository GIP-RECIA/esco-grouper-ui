package org.esco.grouperui.web.utils;

import java.io.Serializable;

/**
 * @author dMoulron
 */
public class XmlProducer implements Serializable {

    /**
     * the serial uID.
     */
    private static final long serialVersionUID = 8377893670327827747L;

    /**
     *
     */
    private Object            target;

    /**
     *
     */
    private Class < ? >[]     typesOfTarget;

    /**
     * Default constructor.
     */
    public XmlProducer() {
    }

    /**
     * getter for property target.
     * 
     * @return the target
     */
    public Object getTarget() {
        return this.target;
    }

    /**
     * setter for property target.
     * 
     * @param theTarget
     *            the target to set
     */
    public void setTarget(final Object theTarget) {
        this.target = theTarget;
    }

    /**
     * getter for property typesOfTarget.
     * 
     * @return the typesOfTarget
     */
    public Class < ? >[] getTypesOfTarget() {
        return this.typesOfTarget;
    }

    /**
     * setter for property typesOfTarget.
     * 
     * @param theTypesOfTarget
     *            the typesOfTarget to set
     */
    public void setTypesOfTarget(final Class < ? >... theTypesOfTarget) {
        this.typesOfTarget = theTypesOfTarget;
    }

}
