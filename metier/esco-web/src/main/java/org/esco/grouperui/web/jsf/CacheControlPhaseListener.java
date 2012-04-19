/**
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
