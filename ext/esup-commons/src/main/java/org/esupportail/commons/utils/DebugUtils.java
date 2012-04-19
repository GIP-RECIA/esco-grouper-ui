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

import java.util.Enumeration;
import java.util.Set;
import java.util.TreeSet;

import javax.servlet.ServletRequest;
import javax.servlet.ServletRequestWrapper;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.esupportail.commons.services.logging.Logger;

/**
 * Utilities to debug.
 */
public class DebugUtils {

	/**
	 * No instanciation.
	 */
	private DebugUtils() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @param level
	 * @return a prefix to indent things.
	 */
	private static String indentPrefix(final int level) {
		String result = "*";
		for (int i = 0; i < level; i++) {
			result += "    ";
		}
		return result + "| ";
	}

	/**
	 * print an object with an indentation level.
	 * @param logger 
	 * @param title
	 * @param o
	 * @param level
	 */
	@SuppressWarnings("unchecked")
	private static void print(final Logger logger, final String title, final Object o, final int level) {
		logger.debug(indentPrefix(level - 1) + title);
		final String prefix = indentPrefix(level);
		if (o == null) {
			logger.debug(prefix + "null");
			return;
		}
		logger.debug(prefix + o.toString());
		logger.debug(prefix + "class = [" + o.getClass().getName() + "]");
		if (o instanceof ServletRequest) {
			final ServletRequest servletRequest = (ServletRequest) o;
			logger.debug(prefix + "Scheme: " + servletRequest.getScheme());
			final Enumeration<String> attributeNames = servletRequest.getAttributeNames();
			if (attributeNames.hasMoreElements()) {
				logger.debug(prefix + "Attributes:");
				Set<String> strings = new TreeSet<String>();
				while (attributeNames.hasMoreElements()) {
					String name = attributeNames.nextElement();
					Object value = servletRequest.getAttribute(name);
					strings.add("- '" + name + "' = [" + value + "]");
				}
				for (final String string : strings) {
					logger.debug(prefix + string);
				}
			} else {
				logger.debug(prefix + "No attribute.");
			}
			final Enumeration<String> parameterNames = servletRequest.getParameterNames();
			if (parameterNames.hasMoreElements()) {
				logger.debug(prefix + "Parameters:");
				Set<String> strings = new TreeSet<String>();
				while (parameterNames.hasMoreElements()) {
					String name = parameterNames.nextElement();
					String [] values = servletRequest.getParameterValues(name);
					for (int i = 0; i < values.length; i++) {
						final String value = values[i];
						strings.add("- '" + name + "' = [" + value + "]");
					}
				}
				for (final String string : strings) {
					logger.debug(prefix + string);
				}
			} else {
				logger.debug(prefix + "No parameter.");
			}
			if (servletRequest instanceof HttpServletRequest) {
				HttpServletRequest httpServletRequest = 
					(HttpServletRequest) servletRequest;
				logger.debug(prefix + "Query string: [" 
						+ httpServletRequest.getQueryString() + "]");
				HttpSession httpSession = httpServletRequest.getSession(false);
				logger.debug(prefix + "Session: [" 
						+ httpSession + "]");
				if (httpSession != null) {
					print(logger, "getSession()", httpSession, level + 1);
				}
			}
		}
		if (o instanceof ServletRequestWrapper) {
			ServletRequestWrapper requestWrapper = (ServletRequestWrapper) o;
			print(logger, "getRequest()", requestWrapper.getRequest(), level + 1);
		}
		if (o instanceof HttpSession) {
			HttpSession session = (HttpSession) o;
			final Enumeration<String> attributeNames = session.getAttributeNames();
			logger.debug(prefix + "SESSION_ID = " + session.getId());
			if (attributeNames.hasMoreElements()) {
				logger.debug(prefix + "Attributes:");
				while (attributeNames.hasMoreElements()) {
					String name = attributeNames.nextElement();
					Object value = session.getAttribute(name);
					logger.debug(prefix + name + "=> " + value);
				}
			} else {
				logger.debug(prefix + "No parameter.");
			}
		}
	}

	/**
	 * Debug any object.
	 * @param logger 
	 * @param title
	 * @param o
	 */
	public static void print(final Logger logger, final String title, final Object o) {
		logger.debug("*******************************************************************");
		print(logger, title, o, 1);
		logger.debug("*******************************************************************");
	}

}
