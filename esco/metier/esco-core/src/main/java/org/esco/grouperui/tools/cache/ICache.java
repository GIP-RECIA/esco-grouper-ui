package org.esco.grouperui.tools.cache;

/***
 * interface to define a object cache.
 * 
 * @param <ICacheKey>
 *            the key of the cache
 * @param <V>
 *            the type of the object can be cached
 */
@SuppressWarnings("hiding")
public interface ICache<ICacheKey, V> {

    /**
     * gettter for a object in cache.
     * 
     * @param theKey
     *            the key of the object is in cache.
     * @return the object is in cache.
     */
    Object get(ICacheKey theKey);

    /**
     * set a object in the cache.
     * 
     * @param theKey
     *            the key of the object.
     * @param theObject
     *            the object it self
     */
    void put(ICacheKey theKey, V theObject);
}
