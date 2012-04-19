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
package org.esupportail.commons.services.authentication.info;

import java.util.List;
import java.util.Map;

/** 
 * A basic AuthInfo implementation.
 */
public class AuthInfoImpl extends AbstractAuthInfo {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = -3087036179837477195L;

	/**
	 * Constructor.
	 * @param id
	 * @param type 
	 */
	public AuthInfoImpl(
			final String id,
			final String type) {
		this(id, type, null);
	}

	/**
	 * Constructor.
	 * @param id
	 * @param type 
	 * @param attributes 
	 */
	public AuthInfoImpl(
			final String id,
			final String type,
			final Map<String, List<String>> attributes) {
		super(id, type, attributes);
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return 
		getClass().getSimpleName() + "#" + hashCode() + "["
		+ "id=[" + getId() + "]"
		+ ", type=[" + getType() + "]]";
	}

}
