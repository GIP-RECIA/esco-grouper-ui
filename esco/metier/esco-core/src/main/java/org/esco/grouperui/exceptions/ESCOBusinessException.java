package org.esco.grouperui.exceptions;

/**
 * Logical business exceptions.
 * 
 * @author SopraGroup
 */
public class ESCOBusinessException extends Exception {

    /** UID. */
    private static final long serialVersionUID = -8740530765329819935L;

    /**
     * default constructor.
     */
    public ESCOBusinessException() {

    }

    /**
     * Constructeur pour Si2mTechniqueException.
     * 
     * @param theCode
     *            String
     */
    public ESCOBusinessException(final String theCode) {
        super(theCode);
    }

    /**
     * Constructeur pour Si2mTechniqueException.
     * 
     * @param theCode
     *            String
     * @param theCause
     *            Throwable
     */
    public ESCOBusinessException(final String theCode, final Throwable theCause) {
        super(theCode, theCause);
    }
}
