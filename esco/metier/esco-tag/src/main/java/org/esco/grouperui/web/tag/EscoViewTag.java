package org.esco.grouperui.web.tag;

import java.util.Locale;

import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;
import javax.servlet.ServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.jstl.core.Config;

import org.apache.myfaces.taglib.core.ViewTag;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esupportail.commons.web.tags.config.TagsConfigurator;

/**
 * @author dMoulron
 */
public class EscoViewTag extends ViewTag {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(EscoViewTag.class);
    /**
     *
     */
    private String                   stringsVar;

    /**
     * Default constructor.
     */
    public EscoViewTag() {
        super();
    }

    /**
     * getter for property stringsVar.
     * 
     * @return the stringsVar
     */
    public String getStringsVar() {
        return this.stringsVar;
    }

    /**
     * setter for property stringsVar.
     * 
     * @param theStringsVar
     *            the stringsVar to set
     */
    public void setStringsVar(final String theStringsVar) {
        this.stringsVar = theStringsVar;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int doStartTag() throws JspException {
        EscoViewTag.LOGGER.debug("entering EscoViewTag.doStartTag");
        int result = super.doStartTag();

        Locale locale = (Locale) Config.get((ServletRequest) this.getFacesContext().getExternalContext()
                .getRequest(), Config.FMT_LOCALE);

        FacesContext facesContext = FacesContext.getCurrentInstance();
        TagsConfigurator tagsConfigurator = TagsConfigurator.getInstance();
        facesContext.getExternalContext().getRequestMap()
                .put(this.stringsVar, tagsConfigurator.getStrings(locale));

        // parameter label
        ValueBinding valueBinding = this.getFacesContext().getApplication().createValueBinding(
                "#{" + this.stringsVar + "}");
        valueBinding.setValue(this.getFacesContext(), tagsConfigurator.getStrings(locale));

        return result;
    }
}
