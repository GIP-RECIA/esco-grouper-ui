package org.esco.grouperui.web.jsf;

import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import javax.servlet.http.HttpServletResponse;

/**
 * Add the cache control to all JSF.
 * 
 * @author aChesneau
 */
public class CacheControlPhaseListener implements PhaseListener {

    /**
     * TheUID of the class.
     */
    private static final long serialVersionUID = 8225152642961305498L;

    /**
     * Default constructor.
     */
    public CacheControlPhaseListener() {
    }

    /**
     * {@inheritDoc}
     */
    public void afterPhase(final PhaseEvent theEvent) {
    }

    /**
     * {@inheritDoc}
     */
    public void beforePhase(final PhaseEvent theEvent) {
        FacesContext facesContext = theEvent.getFacesContext();

        if (theEvent.getPhaseId() != PhaseId.RENDER_RESPONSE) {
            return;
        }

        HttpServletResponse response = (HttpServletResponse) facesContext.getExternalContext().getResponse();
        response.addHeader("Pragma", "no-cache");
        response.addHeader("Cache-Control", "no-cache");
        response.addHeader("Cache-Control", "no-store");
        response.addHeader("Cache-Control", "must-revalidate");
        response.addHeader("Expires", "0");
    }

    public PhaseId getPhaseId() {
        return PhaseId.RENDER_RESPONSE;
    }

}
