package org.esco.grouperui.tools.cache;

/**
 * interface of cache key for cachemanager.
 * 
 * @author X457335
 * @param <T>
 */
public interface ICacheKey<T> extends Cloneable {

    /**
     * @return return key of cache manager
     */
    T getKey();

    /**
     * setter for key.
     * 
     * @param theKey
     *            setter of the real key. Wrapper of cache manager
     */
    void setKey(T theKey);

    /**
     * @return a clone of cache key
     * @throws CloneNotSupportedException
     *             if the clonage fail
     */
    ICacheKey < T > clone() throws CloneNotSupportedException;
}
