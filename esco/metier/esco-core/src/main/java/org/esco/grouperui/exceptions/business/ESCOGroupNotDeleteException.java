package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Group not delete business exception.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public class ESCOGroupNotDeleteException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = -1469076236203810508L;

    /**
     * Default constructor.
     */
    public ESCOGroupNotDeleteException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOGroupNotDeleteException(final String code) {
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
    public ESCOGroupNotDeleteException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
