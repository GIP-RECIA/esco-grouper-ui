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
package org.esupportail.commons.domain;

import java.io.Serializable;
import java.util.Locale;

import org.esupportail.commons.exceptions.PasswordException;

/**
 * The interface of password managers.
 */
public interface UserPasswordManager extends Serializable {

	/**
	 * @return a ramdom password.
	 */
	String generate();

	/**
	 * Check a password.
	 * @param password the password to check
	 * @param locale 
	 * @throws PasswordException 
	 */
	void check(final String password, final Locale locale) throws PasswordException;

}
