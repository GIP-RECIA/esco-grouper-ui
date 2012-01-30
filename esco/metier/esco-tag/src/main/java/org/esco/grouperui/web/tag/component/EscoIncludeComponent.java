package org.esco.grouperui.web.tag.component;

import java.io.IOException;

import javax.faces.FacesException;
import javax.faces.component.UIComponentBase;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * @author dMoulron
 */
public class EscoIncludeComponent extends UIComponentBase {

    /**
     * The type Component.
     */
    public static final String COMPONENT_TYPE = "org.esco.grouperui.EscoInclude";

    /**
     * Default constructor.
     */
    public EscoIncludeComponent() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void encodeBegin(final FacesContext theContext) throws IOException {
        String url = (String) this.getAttributes().get("url");
        ExternalContext ext = theContext.getExternalContext();

        ServletContext servletContext = (ServletContext) ext.getContext();
        ServletRequest servletRequest = (ServletRequest) ext.getRequest();
        ServletResponse servletResponse = (ServletResponse) ext.getResponse();
        RequestDispatcher dispatcher = servletContext.getRequestDispatcher(url);
        try {
            dispatcher.include(servletRequest, servletResponse);
        } catch (IOException e) {
            throw new FacesException(e);
        } catch (ServletException e) {
            throw new FacesException(e);
        }

        super.encodeBegin(theContext);
    }

    @Override
    public String getFamily() {
        return EscoIncludeComponent.COMPONENT_TYPE;
    }
}
