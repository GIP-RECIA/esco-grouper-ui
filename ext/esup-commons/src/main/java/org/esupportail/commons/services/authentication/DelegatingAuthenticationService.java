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
package org.esupportail.commons.services.authentication;

import java.util.ArrayList;
import java.util.List;

import org.esupportail.commons.services.authentication.info.AuthInfo;
import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;

/** 
 * An abstract typed authenticator.
 */
public class DelegatingAuthenticationService extends AbstractAuthenticationService {

	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = -163359171428098265L;
	
	/**
	 * A logger.
	 */
	private Logger logger = new LoggerImpl(getClass());
	
	/**
	 * The authenticators to delegate.
	 */
	private List<AuthenticationService> authenticationServices;
	
	/**
	 * Bean constructor.
	 */
	protected DelegatingAuthenticationService() {
		super();
	}

	/**
	 * @see org.esupportail.commons.services.authentication.AbstractAuthenticationService#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() {
		super.afterPropertiesSet();
		if (authenticationServices == null || authenticationServices.isEmpty()) {
			logger.warn("no authenticator set or enabled!");
		}
	}

	/**
	 * @see org.esupportail.commons.services.authentication.AuthenticationService#getAuthInfo()
	 */
	public AuthInfo getAuthInfo() {
		for (AuthenticationService authenticationService : authenticationServices) {
			AuthInfo authInfo = authenticationService.getAuthInfo();
			if (authInfo != null) {
				return authInfo;
			}
		}
		return null;
	}

	/**
	 * @return the authenticators
	 */
	public List<AuthenticationService> getAuthenticationServices() {
		return authenticationServices;
	}

	/**
	 * @param authenticationServices the authenticationServices to set
	 */
	public void setAuthenticationServices(final List<AuthenticationService> authenticationServices) {
		this.authenticationServices = new ArrayList<AuthenticationService>();
		for (AuthenticationService authenticationService : authenticationServices) {
			if (authenticationService.isEnabled()) {
				this.authenticationServices.add(authenticationService);
			}
		}
	}

}
