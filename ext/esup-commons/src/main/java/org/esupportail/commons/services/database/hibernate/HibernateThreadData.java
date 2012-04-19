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
package org.esupportail.commons.services.database.hibernate;

import java.util.HashMap;
import java.util.Map;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;

/**
 * A class to store the Hibernate all the connection data.
 */

public class HibernateThreadData {
	
	/**
	 * A logger.
	 */
	private final Logger logger = new LoggerImpl(getClass());

	/**
	 * A list to store the connection data.
	 */
	private Map<String, HibernateThreadConnectionData> connectionMap;

	/**
	 * Bean constructor.
	 */
	HibernateThreadData() { 
		super();
		connectionMap = new HashMap<String, HibernateThreadConnectionData>();
	}
	
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return getClass().getSimpleName() + "#" + hashCode() + "["
		+ "connectionMap=" + connectionMap
		+ "]";
	}

	/**
	 * Open the session.
	 * @param sessionFactoryBeanName
	 */
	void openSession(
			final String sessionFactoryBeanName) {
		if (logger.isDebugEnabled()) {
			logger.debug("OPEN(" + sessionFactoryBeanName 
					+ ") connnectionData=" + connectionMap.get(sessionFactoryBeanName));
		}
		HibernateThreadConnectionData connectionData = new HibernateThreadConnectionData(
				sessionFactoryBeanName);
		connectionMap.put(sessionFactoryBeanName, connectionData);
		connectionData.openSession();
	}

	/**
	 * Begin a transaction.
	 * @param sessionFactoryBeanName
	 */
	void beginTransaction(
			final String sessionFactoryBeanName) {
		HibernateThreadConnectionData connectionData = connectionMap.get(sessionFactoryBeanName);
		if (connectionData != null) {
			if (logger.isDebugEnabled()) {
				logger.debug("BEGIN(" + sessionFactoryBeanName 
						+ ") connnectionData=" + connectionMap.get(sessionFactoryBeanName));
			}
			connectionData.beginTransaction();
		} else {
			if (logger.isDebugEnabled()) {
				logger.debug("BEGIN(" + sessionFactoryBeanName + ") ***** connectionData is null!");
			}
		}			
	}

	/**
	 * End a transaction.
	 * @param sessionFactoryBeanName
	 * @param commit 
	 */
	void endTransaction(
			final String sessionFactoryBeanName,
			final boolean commit) {
		HibernateThreadConnectionData connectionData = connectionMap.get(sessionFactoryBeanName);
		if (connectionData != null) {
			if (logger.isDebugEnabled()) {
				logger.debug("END(" + sessionFactoryBeanName + ", " 
						+ commit + ") connnectionData=" 
						+ connectionMap.get(sessionFactoryBeanName));
			}
			connectionData.endTransaction(commit);
		} else {
			if (logger.isDebugEnabled()) {
				logger.debug("END(" + sessionFactoryBeanName + ", " 
						+ commit + ") ***** connection data is null!");
			}
		}
	}

	/**
	 * Close the session.
	 * @param sessionFactoryBeanName
	 */
	void closeSession(
			final String sessionFactoryBeanName) {
		HibernateThreadConnectionData connectionData = connectionMap.get(sessionFactoryBeanName);
		if (connectionData != null) {
			if (logger.isDebugEnabled()) {
				logger.debug("CLOSE(" + sessionFactoryBeanName 
						+ ") connnectionData=" + connectionMap.get(sessionFactoryBeanName));
			}
			connectionData.closeSession();
			connectionMap.remove(sessionFactoryBeanName);
		} else {
			if (logger.isDebugEnabled()) {
				logger.debug("CLOSE(" + sessionFactoryBeanName + ")  ***** connectionData is null");
			}
		}
	}

}
