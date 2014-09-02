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
package org.esupportail.commons.services.ldap;

import java.io.Serializable;

import org.springframework.ldap.filter.AbstractFilter;

/**
 * A LdapTemplate filter, build with a string (that represents an already-encoded filter).
 */
public class StringFilter extends AbstractFilter implements Serializable {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 7312355712619088000L;

	/**
	 * The filter string.
	 */
	private String filterExpr;

	/**
	 * Bean constructor.
	 * @param filterExpr an already-encoded LDAP filter
	 */
	public StringFilter(final String filterExpr) {
		super();
		this.filterExpr = "(" + filterExpr + ")";
	}

	/**
	 * @see org.springframework.ldap.support.filter.AbstractFilter#encode(java.lang.StringBuffer)
	 */
	@Override
	public StringBuffer encode(final StringBuffer buff) {
		buff.append(filterExpr);
		return buff;
	}

}
