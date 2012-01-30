package org.esco.grouperui.web.plugins;

import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Map.Entry;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;

/**
 * Factory spring for merge multiple properties source in one. <br/>
 * 
 * <pre>
 *     &lt;bean id=&quot;applicationPropertiesBis&quot; class=&quot;org.esco.spring.config.PropertyMergerFactory&quot;&gt;
 *         &lt;property name=&quot;propertyMergerFactoryParent&quot; ref=&quot;&amp;applicationProperties&quot; /&gt;
 *         &lt;property name=&quot;listProperties&quot;&gt;
 *                 &lt;list&gt;
 *                                 &lt;ref local=&quot;propertyConfigurer&quot; /&gt;
 *                                 &lt;ref local=&quot;i18nServiceTree&quot; /&gt;
 *                 &lt;/list&gt;
 *         &lt;/property&gt;
 *     &lt;/bean&gt;
 * </pre>
 * 
 * @author dMoulron
 */
public class PropertyMergerFactory implements InitializingBean, FactoryBean {

    /**
     * list of properties for application configuration.
     */
    private List < Properties >   listProperties;

    /**
     * Merger parent for add new properties.
     */
    private PropertyMergerFactory propertyMergerFactoryParent;

    /**
     * Default constructor.
     */
    public PropertyMergerFactory() {
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (this.listProperties == null) {
            throw new IllegalArgumentException("listProperties can not be null");
        }
        if (this.listProperties.isEmpty()) {
            throw new IllegalArgumentException("listProperties can not be empty");
        }

        if (this.propertyMergerFactoryParent != null) {
            this.propertyMergerFactoryParent.setListProperties(this.listProperties);
        }
    }

    /**
     * {@inheritDoc}
     */
    public Object getObject() throws Exception {

        Properties lProperties = new Properties();
        Iterator < Properties > iteratorListProp = this.listProperties.iterator();

        while (iteratorListProp.hasNext()) {
            Properties properties = iteratorListProp.next();

            for (Entry < Object, Object > prop : properties.entrySet()) {
                lProperties.setProperty((String) prop.getKey(), (String) prop.getValue());
            }
        }

        if (this.propertyMergerFactoryParent != null) {
            Properties innerProperties = (Properties) this.propertyMergerFactoryParent.getObject();
            for (Entry < Object, Object > prop : innerProperties.entrySet()) {
                lProperties.setProperty((String) prop.getKey(), (String) prop.getValue());
            }
        }

        return lProperties;
    }

    /**
     * {@inheritDoc}
     */
    public Class getObjectType() {
        return Properties.class;
    }

    /**
     * {@inheritDoc}
     */
    public boolean isSingleton() {
        return true;
    }

    /**
     * setter for property listProperties.
     * 
     * @param theListProperties
     *            the listProperties to set
     */
    public void setListProperties(final List < Properties > theListProperties) {
        if (this.listProperties == null) {
            this.listProperties = theListProperties;
        } else {
            this.listProperties.addAll(theListProperties);
        }
    }

    /**
     * setter for property propertyMergerFactoryParent.
     * 
     * @param thePropertyMergerFactoryParent
     *            the propertyMergerFactoryParent to set
     */
    public void setPropertyMergerFactoryParent(final PropertyMergerFactory thePropertyMergerFactoryParent) {
        this.propertyMergerFactoryParent = thePropertyMergerFactoryParent;
    }

}
