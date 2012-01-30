package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Subject not unique business exception.</b><br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-001]<br/>
 * 
 * @author SopraGroup
 */
public class ESCOSubjectNotUniqueException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = -8740530765329819935L;

    /**
     * Default constructor.
     */
    public ESCOSubjectNotUniqueException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOSubjectNotUniqueException(final String code) {
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
    public ESCOSubjectNotUniqueException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
