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
package org.esupportail.commons.dao;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

/**
 * This class is used to update a Hibernate sequence.
 */
public class HibernateSequenceUpdater implements HibernateCallback {

	/** The name of the sequence. */
	private String sequenceName;

	/** The value to set. */
	private Long sequenceId;
	
	/**
	 * Constructor.
	 * @param sequenceName
	 * @param sequenceId
	 */
	public HibernateSequenceUpdater(final String sequenceName, final Long sequenceId) {
		this.sequenceId = sequenceId;
		this.sequenceName = sequenceName;
	}
	
	/**
	 * Hibernate callback.
	 * @param session
	 * @return null.
	 * @throws HibernateException
	 */
	public Object doInHibernate(final Session session) throws HibernateException {
		if (sequenceId != null) {
			session.createSQLQuery(
                    "SELECT pg_catalog.setval('" + sequenceName + "', " + sequenceId + ", true)"
                    ).list();
		}
		return null;
	}
}

