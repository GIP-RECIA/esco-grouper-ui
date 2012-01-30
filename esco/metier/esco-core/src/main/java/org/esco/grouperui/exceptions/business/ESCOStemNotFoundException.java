package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Stem not found business exception.</b><br/>
 * <br/>
 * Requirements:<br/>
 * [RECIA-ESCO-L1-003]<br/>
 * [RECIA-ESCO-L1-004]<br/>
 * 
 * @author SopraGroup
 */
public class ESCOStemNotFoundException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = -5850208043842707681L;

    /**
     * Default constructor.
     */
    public ESCOStemNotFoundException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOStemNotFoundException(final String code) {
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
    public ESCOStemNotFoundException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
