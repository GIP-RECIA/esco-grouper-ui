package org.esco.grouperui.exceptions;

/**
 * @author dMoulron
 */
public class ESCOTechnicalException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = -2744655034573637982L;

    /**
     * dafault constructor.
     */
    public ESCOTechnicalException() {
    }

    /**
     * Constructeur pour Si2mTechniqueException.
     *
     * @param theCode
     *            String
     */
    public ESCOTechnicalException(final String theCode) {
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
    public ESCOTechnicalException(final String theCode, final Throwable theCause) {
        super(theCode, theCause);
    }
}
