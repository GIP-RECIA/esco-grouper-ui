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

import java.util.Map;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import javax.portlet.PortletRequest;
import javax.servlet.http.HttpServletRequest;

import jp.sf.pal.tomahawk.multipart.MultipartPortletRequestWrapper;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;
import org.esupportail.commons.utils.ContextUtils;

/**
 * An abstract phase listener with debug facilities.
 */
@SuppressWarnings("serial")
public abstract class AbstractPhaseListener implements PhaseListener {

	/**
	 * A logger.
	 */
	private final Logger logger = new LoggerImpl(getClass());
	
	/**
	 * Constructor.
	 */
	protected AbstractPhaseListener() {
		super();
	}

	/**
	 * @see javax.faces.event.PhaseListener#getPhaseId()
	 */
	public PhaseId getPhaseId() {
		return PhaseId.ANY_PHASE;
	}
	
	/**
	 * @param externalContext 
	 * @return the method of the current request.
	 */
	protected String getMethod(
			final ExternalContext externalContext) {
		Object request = externalContext.getRequest();
		if (request == null) {
			return null;
		}
		if (request instanceof HttpServletRequest) {
			return ((HttpServletRequest) request).getMethod();
		}
		if (request instanceof MultipartPortletRequestWrapper) {
			return "POST";
		}
		return null;
	}

	/**
	 * Debug an event.
	 * @param event
	 * @param string
	 */
	@SuppressWarnings("unchecked")
	protected void debugEvent(
			final PhaseEvent event, 
			final String string) {
		if (logger.isDebugEnabled()) {
			FacesContext facesContext = event.getFacesContext();
			ExternalContext externalContext = facesContext.getExternalContext();
			String msg;
			Map<String, Object> userInfo = 
				(Map<String, Object>) ContextUtils.getRequestAttribute(
						PortletRequest.USER_INFO);
			if (userInfo == null || userInfo.isEmpty()) {
				msg = "<guest>";
			} else {
				msg = userInfo.toString();
			}
			msg += " " + string; 
			msg += " " + event.getPhaseId();
			msg += " " + getMethod(externalContext);
			msg += " " + externalContext.getResponse().getClass().getSimpleName();
			logger.debug("----------------------" + getClass().getSimpleName() + "\n" + msg);
		}
	}

	/**
	 * @see javax.faces.event.PhaseListener#afterPhase(javax.faces.event.PhaseEvent)
	 */
	public final void afterPhase(final PhaseEvent event) {
		debugEvent(event, "AFTER");
		afterPhaseInternal(event);
	}

	/**
	 * @see javax.faces.event.PhaseListener#afterPhase(javax.faces.event.PhaseEvent)
	 * @param event
	 */
	protected void afterPhaseInternal(
			@SuppressWarnings("unused")
			final PhaseEvent event) {
		//
	}

	/**
	 * @see javax.faces.event.PhaseListener#beforePhase(javax.faces.event.PhaseEvent)
	 */
	public final void beforePhase(final PhaseEvent event) {
		debugEvent(event, "BEFORE");
		beforePhaseInternal(event);
	}

	/**
	 * @see javax.faces.event.PhaseListener#beforePhase(javax.faces.event.PhaseEvent)
	 * @param event
	 */
	protected void beforePhaseInternal(
			@SuppressWarnings("unused")
			final PhaseEvent event) {
		//
	}

}
