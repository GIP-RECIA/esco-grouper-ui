package org.esco.grouperui.exceptions.technicals;

import org.esco.grouperui.exceptions.ESCOTechnicalException;

/**
 * <b>Subject not unique business exception.</b><br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-001]<br/>
 * 
 * @author SopraGroup
 */
public class ESCOWrapperException extends ESCOTechnicalException {

    /** UID. */
    private static final long serialVersionUID = -8740530765329819935L;

    /**
     * Default constructor.
     */
    public ESCOWrapperException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOWrapperException(final String code) {
        super(code);
    }

    /**
     * Third constructor, with code & cause.
     * 
     * @param code
     *            : the code of the exception.
     * @param cause
     *            : the cause of the exception.
     */
    public ESCOWrapperException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
