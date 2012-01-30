package org.esco.grouperui.tools.cache;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.cache.ehcache.EhCacheFactoryBean;

/**
 * @author X457335
 */
public class EhCache implements ICache < ICacheKey < String >, Object >, CacheManipulation, InitializingBean {

    /**
     * The cache manager.
     */
    private CacheManager cacheManagerWrapper;
    /**
     * The cache it self.
     */
    private Cache        cacheWrapper;

    /**
     * the name of region cache.
     */
    private String       cacheName;

    /**
     * Default constructor.
     */
    public EhCache() {
    }

    /**
     * {@inheritDoc}
     */
    public Object get(final ICacheKey < String > theKey) {

        Element element = this.cacheWrapper.get(theKey.getKey());

        if (element != null) {
            return element.getObjectValue();
        } else {
            return null;
        }
    }

    /**
     * {@inheritDoc}
     */
    public void put(final ICacheKey < String > theKey, final Object theObject) {
        Element element = new Element(theKey.getKey(), theObject);
        this.cacheWrapper.put(element);
    }

    /**
     * setter for property cacheManagerWrapper.
     * 
     * @param theCacheManagerWrapper
     *            the cacheManagerWrapper to set
     */
    public void setCacheManagerWrapper(final CacheManager theCacheManagerWrapper) {
        this.cacheManagerWrapper = theCacheManagerWrapper;
    }

    /**
     * setter for property cacheName.
     * 
     * @param theCacheName
     *            the cacheName to set
     */
    public void setCacheName(final String theCacheName) {
        this.cacheName = theCacheName;
    }

    /**
     * {@inheritDoc}
     */
    public String[] getAllRegion() {
        String[] regions = CacheManager.getInstance().getCacheNames();

        return regions;
    }

    /**
     * @param region
     *            the name of region cache.
     */
    public void clearRegion(final String region) {
        Cache cache = CacheManager.getInstance().getCache(region);

        if (cache != null) {
            cache.removeAll();
        }
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (this.cacheManagerWrapper == null) {
            throw new IllegalArgumentException("the cacheManagerWrapper can not be noull.");
        }
        EhCacheFactoryBean cacheFactoryBean = new EhCacheFactoryBean();
        cacheFactoryBean.setCacheManager(this.cacheManagerWrapper);
        cacheFactoryBean.setCacheName(this.cacheName);

        cacheFactoryBean.afterPropertiesSet();

        this.cacheWrapper = (Cache) cacheFactoryBean.getObject();
    }

}
