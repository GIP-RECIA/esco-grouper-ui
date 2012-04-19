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

import java.util.List;
import java.util.Map;

import org.esupportail.commons.services.authentication.info.AuthInfo;
import org.esupportail.commons.services.authentication.info.AuthInfoImpl;

/** 
 * Authentication utilities.
 */
public abstract class AuthUtils {
	
	/**
	 * Type for null authentication.
	 */
	public static final String NONE = ""; 

	/**
	 * Type for application authentication.
	 */
	public static final String APPLICATION = "application"; 

	/**
	 * Type for CAS authentication.
	 */
	public static final String CAS = "cas"; 

	/**
	 * Type for Shibboleth authentication.
	 */
	public static final String SHIBBOLETH = "shibboleth"; 

	/**
	 * Constructor.
	 */
	private AuthUtils() {
		super();
	}

	/**
	 * @param id 
	 * @param type 
	 * @param attributes 
	 * @return an AuthInfo
	 */
	public static AuthInfo authInfo(
			final String id,
			final String type,
			final Map<String, List<String>> attributes) {
		return new AuthInfoImpl(id, type, attributes);
	}
	
	/**
	 * @param id 
	 * @param type 
	 * @return an AuthInfo
	 */
	public static AuthInfo authInfo(
			final String id,
			final String type) {
		return authInfo(id, type, null);
	}
	
	/**
	 * @param userId
	 * @return a database AuthInfo
	 */
	public static AuthInfo applicationAuthInfo(final String userId) {
		return new AuthInfoImpl(userId, APPLICATION);
	}
	
}
