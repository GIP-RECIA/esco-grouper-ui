package org.esco.grouperui.web.tag.component;

import javax.faces.application.Application;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;
import javax.faces.webapp.UIComponentTag;

/**
 * @author dMoulron
 */
public class EscoIncludeTag extends UIComponentTag {

    /**
     * the url of included page.
     */
    private String url;

    /**
     * Default constructor.
     */
    public EscoIncludeTag() {
    }

    @Override
    public String getComponentType() {
        return EscoIncludeComponent.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void setProperties(final UIComponent component) {
        super.setProperties(component);

        if (this.url != null) {
            if (UIComponentTag.isValueReference(this.url)) {
                FacesContext context = FacesContext.getCurrentInstance();
                Application app = context.getApplication();
                ValueBinding valueBinding = app.createValueBinding(this.url);
                component.setValueBinding("url", valueBinding);
            } else {
                component.getAttributes().put("url", this.url);
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void release() {
        super.release();
        this.url = null;
    }

    /**
     * getter for property url.
     * 
     * @return the url
     */
    public String getUrl() {
        return this.url;
    }

    /**
     * setter for property url.
     * 
     * @param theUrl
     *            the url to set
     */
    public void setUrl(final String theUrl) {
        this.url = theUrl;
    }

}
