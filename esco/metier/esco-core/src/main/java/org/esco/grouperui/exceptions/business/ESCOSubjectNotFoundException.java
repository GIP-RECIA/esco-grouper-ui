package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Subject not found business exception.</b><br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-001]<br/>
 * 
 * @author SopraGroup
 */
public class ESCOSubjectNotFoundException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = 7529529197472237989L;

    /**
     * Default constructor.
     */
    public ESCOSubjectNotFoundException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOSubjectNotFoundException(final String code) {
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
    public ESCOSubjectNotFoundException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
