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
package org.esupportail.commons.aop.cache;

import java.util.HashMap;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;

/**
 * A map of calling results.
 */
public class CallResultMap extends HashMap<String, CallResult> {

	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 1903199664016764896L;

	/**
	 * A logger.
	 */
	private final Logger logger = new LoggerImpl(getClass());
	
	/**
	 * Constructor.
	 */
	public CallResultMap() {
		super();
	}

	/**
	 * @param key 
	 * @return a call result.
	 * @see java.util.HashMap#get(java.lang.Object)
	 */
	public CallResult get(final String key) {
		CallResult callResult = super.get(key);
		if (logger.isDebugEnabled()) {
			logger.debug("GET FROM " + keySet().size() + "\t" + key + callResult);
		}
		return callResult;
	}

	/**
	 * @param key 
	 * @param callResult 
	 * @return the call result.
	 * @see java.util.HashMap#put(java.lang.Object, java.lang.Object)
	 */
	@Override
	public CallResult put(
			final String key, 
			final CallResult callResult) {
		super.put(key, callResult);
		if (logger.isDebugEnabled()) {
			logger.debug("PUT[" + callResult.getTime() + "]\t" + key + callResult);
		}
		return callResult;
	}

}