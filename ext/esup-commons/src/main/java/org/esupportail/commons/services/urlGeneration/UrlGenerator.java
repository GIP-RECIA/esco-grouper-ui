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
package org.esupportail.commons.services.urlGeneration; 

import java.io.Serializable;
import java.util.Map;

/**
 * The interface of URL generators.
 */
public interface UrlGenerator extends Serializable {

	/**
	 * @param params 
	 * @return a link to the application with parameters for guest users.
	 */
	String guestUrl(Map<String, String> params);

	/**
	 * @return a link to the application with no parameter for guest users.
	 */
	String guestUrl();

	/**
	 * @param params 
	 * @return a link to the application with parameters for CAS users.
	 */
	String casUrl(Map<String, String> params);

	/**
	 * @return a link to the application with no parameter for CAS users.
	 */
	String casUrl();

	/**
	 * @param params 
	 * @return a link to the application with parameters for Shibboleth users.
	 */
	String shibbolethUrl(Map<String, String> params);

	/**
	 * @return a link to the application with no parameter for Shibboleth users.
	 */
	String shibbolethUrl();

}
