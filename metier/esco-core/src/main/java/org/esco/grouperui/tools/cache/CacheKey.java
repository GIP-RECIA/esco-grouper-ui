package org.esco.grouperui.tools.cache;

/**
 * @author X457335
 */
public class CacheKey implements ICacheKey < String > {

    /**
     * a unique key form cache object.
     */
    private String key;

    /**
     * default ocnstructor.
     */
    public CacheKey() {
    }

    /**
     * {@inheritDoc}
     */
    public String getKey() {
        return this.key;
    }

    /**
     * {@inheritDoc}
     */
    public void setKey(final String theKey) {
        this.key = theKey;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ICacheKey < String > clone() throws CloneNotSupportedException {
        ICacheKey < String > cloneKey = null;
        try {
            // On récupére l'instance à renvoyer par l'appel de la
            // méthode super.clone()
            cloneKey = (ICacheKey < String >) super.clone();
        } catch (CloneNotSupportedException cnse) {
            // Ne devrait jamais arriver car nous implémentons
            // l'interface Cloneable
        }
        // on renvoie le clone
        return cloneKey;
    }
}
