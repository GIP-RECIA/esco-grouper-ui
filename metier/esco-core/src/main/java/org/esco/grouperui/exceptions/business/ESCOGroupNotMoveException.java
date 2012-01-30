package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Group not move business exception.</b><br/>
 * Requirements: [RECIA-ESCO-L2-004]
 * 
 * @author SopraGroup
 */
public class ESCOGroupNotMoveException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = -3251194783721004065L;

    /**
     * Default constructor.
     */
    public ESCOGroupNotMoveException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOGroupNotMoveException(final String code) {
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
    public ESCOGroupNotMoveException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
