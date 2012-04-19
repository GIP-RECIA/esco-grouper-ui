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
package org.esupportail.commons.web.deepLinking;

import org.esupportail.commons.beans.AbstractI18nAwareBean;
import org.esupportail.commons.web.controllers.Resettable;

/**
 * A deep linking redirector that does nothing.
 */
@SuppressWarnings("serial")
public abstract class AbstractDeepLinkingRedirector 
extends AbstractI18nAwareBean implements DeepLinkingRedirector, Resettable {

	/**
	 * A parameter name.
	 */
	public static final String ENTER_PARAM = "enter";
	
	/**
	 * True until firstCall() is called().
	 */
	private boolean called;
	
	/**
	 * Bean constructor.
	 */
	public AbstractDeepLinkingRedirector() {
		super();
		reset();
	}

	/**
	 * @see org.esupportail.commons.web.controllers.Resettable#reset()
	 */
	public void reset() {
		called = false;
	}

	/**
	 * @see org.esupportail.commons.web.deepLinking.DeepLinkingRedirector#firstCall()
	 */
	public boolean firstCall() {
		boolean oldCalled = called;
		called = true;
		return !oldCalled;
	}

	/**
	 * Print an error message when a parameter is missing.
	 * @param param
	 */
	protected void addErrorMessageMissingParameter(
			final String param) {
		addErrorMessage(null, "DEEP_LINKS.MESSAGE.MISSING_PARAMETER", param);
	}

	/**
	 * Print an error message when a parameter is invalid.
	 * @param param
	 * @param value 
	 */
	protected void addErrorMessageInvalidParameter(
			final String param,
			final String value) {
		addErrorMessage(null, "DEEP_LINKS.MESSAGE.INVALID_PARAMETER", param, value);
	}

}
