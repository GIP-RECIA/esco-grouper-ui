/**
 *
 */
package org.esco.grouperui.tools.log;

import java.io.Serializable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Wrapper for logger.
 * modification  de la version de sopra qui posait problème.
 * il reste que l'utiliation d'un wrapper pour les loggers modifies
 * certaines info dans les logs qui les rendent inutilisables.
 * 
 * @author plegay
 * 
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
    
    
    
    private Object concat(Object... theMessages){
    	if (theMessages.length > 1) {
    		StringBuilder sb = new StringBuilder(); 
    		for (Object object : theMessages) {
    			sb.append(object.toString());
    		}
    		return sb;
    	}
    	return  theMessages[0];
    }

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
    public final void debug(final Object... theMessage) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(concat(theMessage));
        }
    }

    /**
     * {@inheritDoc}
     */
    public final void debug(final Throwable theException, final Object... theMessage) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(concat(theMessage), theException);
        }
    }

    /**
     * {@inheritDoc}
     */
    public final void info(final Object... theMessage) {
        if (this.logger.isInfoEnabled()) {
            this.logger.info(concat(theMessage));
        }
    }

    /**
     * {@inheritDoc}
     */
    public final void info(final Throwable theException, final Object... theMessage) {
        if (this.logger.isInfoEnabled()) {
            this.logger.info(concat(theMessage), theException);
        }
    }

    /**
     * {@inheritDoc}
     */
    public final void error(final Object... theMessage) {
        this.logger.error(concat(theMessage));
    }

    /**
     * {@inheritDoc}
     */
    public final void error(final Throwable theException, final Object... theMessage) {
        this.logger.error(concat(theMessage), theException);
    }
    
    public final void error(final Throwable theException) {
    	this.logger.error(theException);
    }
    

    /**
     * {@inheritDoc}
     */
    public final void warn(final Throwable theException, final Object... theMessage) {
        if (this.logger.isWarnEnabled()) {
            this.logger.warn(concat(theMessage), theException);
        }
    }

    /**
     * {@inheritDoc}
     */
    public Log getLogger() {
        return this.logger;
    }
}
