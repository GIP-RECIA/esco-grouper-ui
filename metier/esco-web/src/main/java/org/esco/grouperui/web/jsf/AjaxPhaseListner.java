package org.esco.grouperui.web.jsf;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.servlet.http.HttpServletResponse;

import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.property.PropertyManager;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Error;
import org.esco.grouperui.web.utils.FaceContextUtils;
import org.esco.grouperui.web.utils.JaxbStringWrapper;
import org.esco.grouperui.web.utils.XmlProducer;
import org.esupportail.commons.jsf.AbstractPhaseListener;
import org.esupportail.commons.services.i18n.I18nService;
import org.springframework.beans.factory.config.MethodInvokingFactoryBean;

/**
 * @author dMoulron
 */
public class AjaxPhaseListner extends AbstractPhaseListener {

    /**
     * The third parameter in the url.
     */
    private static final int         PARAMETER_3            = 3;
    /**
     * The 4 parameter in the url.
     */
    private static final int         PARAMETER_4            = 4;

    /**
     * The serialization id.
     */
    private static final long        serialVersionUID       = 3953071290279682585L;

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER                 = ESCOLoggerFactory.getLogger(AjaxPhaseListner.class);

    /**
     * url pattern for ajax call. /ajax/
     */
    private static final Pattern     AJAX_URL               = Pattern
                                                                    .compile("^(.*)\\/ajax(\\/json)?\\/([^\\/]+)\\/([^\\/]+)\\.(.*){3}$");

    /** json request. */
    private static final String      JSON_REQUEST           = "json";

    /** Pattern to verify if i18n message is translated. */
    @SuppressWarnings("unused")
    private static final Pattern     I18N_MESSAGE_NOT_EXIST = Pattern.compile("^\\?\\?\\?(.+)\\?\\?\\?$");

    /**
     * Default constructor.
     */
    public AjaxPhaseListner() {
        super();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void afterPhaseInternal(final PhaseEvent theEvent) {
        FacesContext facesContext = theEvent.getFacesContext();
        ExternalContext externalContext = facesContext.getExternalContext();

        if (facesContext.getViewRoot() != null) {
            String viewId = facesContext.getViewRoot().getViewId();

            if (theEvent.getPhaseId() != PhaseId.RESTORE_VIEW || !this.isAjaxRequest(viewId)) {
                return;
            }

            HttpServletResponse response = (HttpServletResponse) externalContext.getResponse();
            String resultat = null;

            XmlProducer producer = new XmlProducer();
            producer.setTypesOfTarget(org.esco.grouperui.web.beans.Error.class);
            I18nService i18nService = (I18nService) FaceContextUtils.getValueFromContext(facesContext,
                    "i18nService");

            try {
                resultat = this.getControleurResultat(facesContext, viewId);

                if (resultat == null) {
                    super.beforePhaseInternal(theEvent);
                }

            } catch (InvocationTargetException exception) {
                Throwable targetedEx = exception.getTargetException();
                resultat = this.handleException(viewId, producer, i18nService, targetedEx);
            } catch (IllegalAccessException e) {
                resultat = this.handleException(viewId, producer, i18nService, e);
            } catch (ClassNotFoundException e) {
                resultat = this.handleException(viewId, producer, i18nService, e);
            } catch (NoSuchMethodException e) {
                resultat = this.handleException(viewId, producer, i18nService, e);
            } finally {
                try {
                    if (resultat != null) {
                        String encoding = PropertyManager.find(ESCOConstantes.AJAX_ENCODING).deType(String.class);
                        response.setHeader(ESCOConstantes.CONTENT_ENCODING, encoding);
                        if (viewId.indexOf(AjaxPhaseListner.JSON_REQUEST) != -1) {
                            response
                                    .setHeader(ESCOConstantes.CONTENT_TYPE, "application/json;charset=" + encoding);
                        } else {
                            response.setHeader(ESCOConstantes.CONTENT_TYPE, "text/xml;charset=" + encoding);
                        }
                        response.getWriter().write(resultat);
                    }
                } catch (IOException e) {
                    // nothing to do
                    super.beforePhaseInternal(theEvent);
                }
                facesContext.responseComplete();
            }
        }
    }

    /**
     * handle exception. If there is no translation for exception, take general
     * error message.
     * 
     * @param viewId
     *            the url of ajax call.
     * @param producer
     *            the container for produce xml with error data
     * @param i18nService
     *            service for internationalization message.
     * @param exception
     *            the exception
     * @return string representing error. this string must be a xml.
     */
    private String handleException(final String viewId, final XmlProducer producer, final I18nService i18nService,
            final Throwable exception) {

        org.esco.grouperui.web.beans.Error error = new Error();
        IWrapper < XmlProducer, String > wrapper = new JaxbStringWrapper();
        AjaxPhaseListner.LOGGER.error(exception, "Error when invoking controleur for ajax call : " + viewId);
        String msgError = exception.getClass().getCanonicalName();

        if (this.isMessageI18NExist(i18nService.getStrings(), msgError)) {
            if (this.isMessageI18NExist(i18nService.getStrings(), exception.getMessage())) {
                error.setMessage(i18nService.getString(msgError, i18nService.getString(exception.getMessage())));
            } else {
                error.setMessage(i18nService.getString(msgError, i18nService.getString(exception.getMessage())));
            }
        } else {
            error.setMessage(i18nService.getString(ESCOConstantes.EXCEPTION_TITLE));
        }

        producer.setTarget(error);
        return wrapper.wrap(producer);
    }

    /**
     * @param theStringsI18N
     *            the map with all i18n messages
     * @param theMsgError
     *            the message search
     * @return true if there is translation for this message, false otherwise.
     */
    private boolean isMessageI18NExist(final Map < String, String > theStringsI18N, final String theMsgError) {
        return theStringsI18N.containsKey(theMsgError);
    }

    /**
     * method to call controller and return result. this result must be an xml.
     * 
     * @param theFacesContext
     *            the context of JSF
     * @param theViewId
     *            the vewId, url of page
     * @return
     * @throws IllegalAccessException
     *             the method of controller cannot be call
     * @throws InvocationTargetException
     *             the target cannot be invoke
     * @throws NoSuchMethodException
     *             the method of controller does not exist
     * @throws ClassNotFoundException
     *             the controller does not exist
     * @return the xml of call result of controller
     */
    private String getControleurResultat(final FacesContext theFacesContext, final String theViewId)
            throws InvocationTargetException, IllegalAccessException, ClassNotFoundException,
            NoSuchMethodException {

        Matcher matcherAjax = AjaxPhaseListner.AJAX_URL.matcher(theViewId);
        if (matcherAjax.find()) {

            String contoleur = matcherAjax.group(AjaxPhaseListner.PARAMETER_3);
            String methodControleur = matcherAjax.group(AjaxPhaseListner.PARAMETER_4);

            Object object = FaceContextUtils.getValueFromContext(theFacesContext, contoleur);
            MethodInvokingFactoryBean invokingFactoryBean = new MethodInvokingFactoryBean();
            invokingFactoryBean.setTargetObject(object);
            invokingFactoryBean.setTargetMethod(methodControleur);
            invokingFactoryBean.prepare();

            return (String) invokingFactoryBean.invoke();
        } else {
            return null;
        }
    }

    /**
     * method to verify if call is an ajax call.
     * 
     * @param theRequestURI
     *            the uri (patterm http://...) of caller
     * @return true if the uri is an ajax call.
     */
    private boolean isAjaxRequest(final String theRequestURI) {
        Matcher matcherAjax = AjaxPhaseListner.AJAX_URL.matcher(theRequestURI);
        return matcherAjax.find();
    }

}
