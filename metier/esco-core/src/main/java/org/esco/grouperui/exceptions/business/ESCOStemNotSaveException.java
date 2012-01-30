package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Group not found business exception.</b> <br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004]<br/>
 * [RECIA-ESCO-L1-005]<br/>
 * [RECIA-ESCO-L1-010]<br/>
 * 
 * @author SopraGroup
 */
public class ESCOStemNotSaveException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = -1469076236203810508L;

    /**
     * Default constructor.
     */
    public ESCOStemNotSaveException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOStemNotSaveException(final String code) {
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
    public ESCOStemNotSaveException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
