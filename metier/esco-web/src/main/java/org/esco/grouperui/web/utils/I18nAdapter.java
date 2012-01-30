package org.esco.grouperui.web.utils;

import javax.faces.context.FacesContext;
import javax.xml.bind.annotation.adapters.XmlAdapter;

import org.esupportail.commons.services.i18n.I18nService;

public class I18nAdapter extends XmlAdapter < String, String > {

    /**
     * {@inheritDoc}
     */
    @Override
    public String marshal(final String theValueToConvert) throws Exception {

        I18nService i18nService = (I18nService) FaceContextUtils.getValueFromContext(FacesContext
                .getCurrentInstance(), "i18nService");

        return i18nService.getString(theValueToConvert);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String unmarshal(final String theArg0) throws Exception {
        throw new IllegalAccessError();
    }

}
