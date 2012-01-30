package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Source not avalaible business exception.</b><br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-002]<br/>
 *
 * @author SopraGroup
 */
public class ESCOInsufficientPrivilegesException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = 6319559855459232001L;

    /**
     * Default constructor.
     */
    public ESCOInsufficientPrivilegesException() {
    }

    /**
     * Second constructor, with code.
     *
     * @param code
     *            : the code of the exception.
     */
    public ESCOInsufficientPrivilegesException(final String code) {
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
    public ESCOInsufficientPrivilegesException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
