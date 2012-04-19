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
package org.esupportail.commons.utils; 

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.Properties;
import java.util.Set;
import java.util.TreeSet;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;

/**
 * A class that provides facilities with HTTP requests.
 */
public class SystemUtils {

	/**
	 * A logger.
	 */
	private static final Logger LOG = new LoggerImpl(SystemUtils.class);
	
	/**
	 * Magic number.
	 */
	private static final long MB = 1024 * 1024;

	/**
	 * Private constructor.
	 */
	private SystemUtils() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return The system properties, as a set of strings.
	 */
	@SuppressWarnings("unchecked")
	public static Set<String> getSystemPropertiesStrings() {
		Properties properties = System.getProperties();
		Set<String> sortedPropertiesStrings = new TreeSet<String>();   
		Enumeration keys = properties.keys();
		while (keys.hasMoreElements()) {
			String key = (String) keys.nextElement();
			String value; 
			if (key.contains("password")) {
				value = "******";
			} else {
				value = properties.getProperty(key);
			}
			sortedPropertiesStrings.add(key + " = [" + value + "]");
		}
		return sortedPropertiesStrings;
	}

	/**
	 * @return the name of the server currently running.
	 */
	public static String getServer() {
		try {
			return InetAddress.getLocalHost().getHostName();
		} catch (UnknownHostException e) {
			LOG.error("could not get the address of the server");
		}
		return null;
	}
	
	/**
	 * @return the free memory (Mb).
	 */
	public static long getFreeMemory() {
		return Runtime.getRuntime().freeMemory() / MB;
	}

	/**
	 * @return the total memory (Mb).
	 */
	public static long getTotalMemory() {
		return Runtime.getRuntime().totalMemory() / MB;
	}

	/**
	 * @return the max memory (Mb).
	 */
	public static long getMaxMemory() {
		return Runtime.getRuntime().maxMemory() / MB;
	}

}
