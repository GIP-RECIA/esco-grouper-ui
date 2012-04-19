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

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.esupportail.commons.utils.strings.StringUtils;


/** 
 * An abstract implementation of AuthInfo.
 */
@SuppressWarnings("serial")
public abstract class AbstractAuthInfo implements Serializable, AuthInfo {
	
	/**
	 * The authenticated id.
	 */
	private String id;
	
	/**
	 * The authenticated type.
	 */
	private String type;

	/**
	 * The attributes.
	 */
	private Map<String, List<String>> attributes;

	/**
	 * Constructor.
	 * @param id
	 * @param type
	 * @param attributes 
	 */
	protected AbstractAuthInfo(
			final String id, 
			final String type,
			final Map<String, List<String>> attributes) {
		super();
		this.id = id;
		this.type = type;
		this.attributes = attributes;
	}
	
	/**
	 * @see org.esupportail.commons.services.authentication.info.AuthInfo#getId()
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	protected void setId(final String id) {
		this.id = StringUtils.nullIfEmpty(id);
	}

	/**
	 * @see org.esupportail.commons.services.authentication.info.AuthInfo#getType()
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	protected void setType(final String type) {
		this.type = type;
	}
	
	/**
	 * @see org.esupportail.commons.services.authentication.info.AuthInfo#getAttributes()
	 */
	public Map<String, List<String>> getAttributes() {
		return attributes;
	}

	/**
	 * @param attributes the attributes to set
	 */
	protected void setAttributes(final Map<String, List<String>> attributes) {
		this.attributes = attributes;
	}

}
