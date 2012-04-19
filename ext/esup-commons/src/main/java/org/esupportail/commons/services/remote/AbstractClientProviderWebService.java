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
package org.esupportail.commons.services.remote; 

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.xfire.transport.http.XFireServletController;
import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;

/**
 * An abstract web service that provides the client of the request.
 */
public class AbstractClientProviderWebService {
	
	/**
	 * A logger.
	 */
	private final Logger logger = new LoggerImpl(getClass());

	/**
	 * Bean constructor.
	 */
	public AbstractClientProviderWebService() {
		super();
	}

	/**
	 * @return the client.
	 */
	protected InetAddress getClient() {
		HttpServletRequest request = XFireServletController.getRequest();
		if (request == null) {
			logger.warn("could not get the incoming request");
			return null;
		}
		String remoteAddr = request.getRemoteAddr();
		if (remoteAddr == null) {
			logger.warn("could not get the remote address");
			return null;
		}
		try {
			return InetAddress.getByName(remoteAddr);
		} catch (UnknownHostException e) {
			return null;
		}
	}

}
