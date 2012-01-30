package org.esco.grouperui.tools.cache;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Aspect;

@Aspect
public class MethodCacheInterceptor {
    /**
     * Le logger de la classe.
     */
    private static final Log                        LOGGER = LogFactory.getLog(MethodCacheInterceptor.class);

    private ICache < ICacheKey < String >, Object > cache;
    private ICacheKey < String >                    key;

    /**
     * sets cache name to be used.
     * 
     * @param theCache
     *            the cache to set
     */
    public void setCache(final ICache < ICacheKey < String >, Object > theCache) {
        this.cache = theCache;
    }

    /**
     * @param key
     *            the key to set
     */
    public void setKey(final ICacheKey < String > key) {
        this.key = key;
    }

    /**
     * Times repository method invocations and outputs performance results to a
     * Log4J logger.
     * 
     * @param theMethod
     *            The join point representing the intercepted repository method
     * @return The object returned by the target method
     * @throws Throwable
     *             if thrown by the target method
     */
    public Object cache(final ProceedingJoinPoint theMethod) throws Throwable {
        Object result;

        MethodCacheInterceptor.LOGGER.debug("looking for method result in cache");
        ICacheKey < String > cacheKey = this.getCacheKey(theMethod);

        Object element = this.cache.get(cacheKey);
        if (element == null) {
            // call target/sub-interceptor
            MethodCacheInterceptor.LOGGER.debug("calling intercepted method");
            result = theMethod.proceed();

            element = result;
            // cache method result
            MethodCacheInterceptor.LOGGER.debug("caching result");

            this.cache.put(cacheKey, result);
        }
        return element;
    }

    /**
     * creates cache key: targetName.methodName.argument0.argument1...
     * 
     * @param theMethod
     *            les informations sur la méthode dont on crée la cle du cache
     * @return la cle
     */
    private ICacheKey < String > getCacheKey(final ProceedingJoinPoint theMethod) {
        ICacheKey < String > cacheKey = null;
        try {
            cacheKey = this.key.clone();

            Object[] arguments = theMethod.getArgs();
            // Extraction du package + la classes + la m�thode separ� par
            // des
            // points
            String signature = this.createJoinPointTraceName(theMethod);

            StringBuffer stringbuffer = new StringBuffer();
            stringbuffer.append(signature).append("(");
            if (arguments != null && arguments.length != 0) {
                for (int i = 0; i < arguments.length; i++) {
                    if (arguments[i] == null) {
                        stringbuffer.append("null null");
                    } else {
                        stringbuffer.append(arguments[i].getClass().getName()).append(" ").append(arguments[i]);
                    }
                    if (i < arguments.length - 1) {
                        stringbuffer.append(", ");
                    }
                }
            }

            cacheKey.setKey(stringbuffer.append(")").toString());
        } catch (CloneNotSupportedException e) {
        }

        return cacheKey;
    }

    /**
     * Recupere le nom de la methode sous forme de {@link String}.
     * 
     * @param theJoinPoint
     *            la methode
     * @return le nom sous forme de {@link String}
     */
    private String createJoinPointTraceName(final JoinPoint theJoinPoint) {
        Signature signature = theJoinPoint.getSignature();
        StringBuilder stringb = new StringBuilder();
        stringb.append(signature.getDeclaringType().getName());
        stringb.append('.').append(signature.getName());
        return stringb.toString();
    }
}
