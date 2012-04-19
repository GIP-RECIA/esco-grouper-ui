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
/**
 * ESUP-Portail Commons - Copyright (c) 2006-2009 ESUP-Portail consortium.
 */
package org.esupportail.commons.jsf; 

//see http://learnjsf.com/wp/2006/08/06/a-prg-phase-listener-for-jsf/

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;
import org.esupportail.commons.utils.ContextUtils;

/**
 * A phase listener to implement the PRG pattern.
 */
public class RedirectPhaseListener extends AbstractPhaseListener {

	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = -4528533350927362247L;

	/**
	 * A logger.
	 */
	private final Logger logger = new LoggerImpl(getClass());
	
	/**
	 * Constructor.
	 */
	public RedirectPhaseListener() {
		super();
	}

	/**
	 * @see org.esupportail.commons.jsf.AbstractPhaseListener#beforePhaseInternal(javax.faces.event.PhaseEvent)
	 */
	@Override
	public void beforePhaseInternal(final PhaseEvent event) {
		FacesContext facesContext = event.getFacesContext();
		ExternalContext externalContext = facesContext.getExternalContext();
		if (event.getPhaseId() != PhaseId.RENDER_RESPONSE) {
			return;
		}
		// Implement POST-REDIRECT-GET pattern
		if (!"POST".equals(getMethod(externalContext))) {
			return;
		}
		if (!ContextUtils.isServlet()) {
			return;
		}
		String nextViewID = facesContext.getViewRoot().getViewId();
		String nextViewURL = facesContext.getApplication().getViewHandler()
		.getActionURL(facesContext, nextViewID);
		if (logger.isDebugEnabled()) {
			logger.debug("Redirecting to " + nextViewURL);
		}
		try {
			event.getFacesContext().getExternalContext().redirect(nextViewURL);
		} catch (Throwable t) {
			logger.error("EXCEPTION: " + t.getMessage());
		}
	}

}
