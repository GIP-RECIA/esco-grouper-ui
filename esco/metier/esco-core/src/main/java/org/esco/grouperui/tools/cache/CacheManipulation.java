package org.esco.grouperui.tools.cache;

/**
 * @author dMoulron
 */
public interface CacheManipulation {

    /**
     * @return all region in cache. A region is a zone define by a string.
     */
    String[] getAllRegion();

    /**
     * @param region
     *            a region in cache.
     */
    void clearRegion(String region);

}
