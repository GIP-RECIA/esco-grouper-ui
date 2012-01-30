/**
 *
 */
package org.esco.grouperui.tools.log;

import java.io.Serializable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Wrapper for logger.
 * 
 * @author dMoulron
 */
public class DefaultLogger implements IESCOLogger, Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1212299311012800530L;

    /**
     * logger.
     */
    private final Log         logger;

    /**
     * @param theClass
     *            class to be log
     */
    public DefaultLogger(final Class < ? > theClass) {
        this.logger = LogFactory.getLog(theClass);
    }

    /**
     * {@inheritDoc}
     */
    public final void debug(final Object theMessage) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(theMessage);
        }
    }

    /**
     * {@inheritDoc}
     */
    public final void debug(final Object theMessage, final Throwable theException) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(theMessage, theException);
        }
    }

    /**
     * {@inheritDoc}
     */
    public final void info(final Object theMessage) {
        if (this.logger.isInfoEnabled()) {
            this.logger.info(theMessage);
        }
    }

    /**
     * {@inheritDoc}
     */
    public final void info(final Object theMessage, final Throwable theException) {
        if (this.logger.isInfoEnabled()) {
            this.logger.info(theMessage, theException);
        }
    }

    /**
     * {@inheritDoc}
     */
    public final void error(final Object theMessage) {
        this.logger.error(theMessage);
    }

    /**
     * {@inheritDoc}
     */
    public final void error(final Object theMessage, final Throwable theException) {
        this.logger.error(theMessage, theException);
    }

    /**
     * {@inheritDoc}
     */
    public final void warn(final Object theMessage, final Throwable theException) {
        if (this.logger.isWarnEnabled()) {
            this.logger.warn(theMessage, theException);
        }
    }

    /**
     * {@inheritDoc}
     */
    public Log getLogger() {
        return this.logger;
    }

}
