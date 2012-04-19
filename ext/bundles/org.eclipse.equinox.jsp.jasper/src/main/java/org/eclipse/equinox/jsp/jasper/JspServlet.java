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
/*******************************************************************************
 * Copyright (c) 2005, 2008 Cognos Incorporated, IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Cognos Incorporated - initial API and implementation
 *     IBM Corporation - bug fixes and enhancements
 *******************************************************************************/
package org.eclipse.equinox.jsp.jasper;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.equinox.internal.jsp.jasper.JspClassLoader;
import org.osgi.framework.Bundle;

/**
 * <p>
 * JSPServlet wraps the Apache Jasper Servlet making it appropriate for running in an OSGi environment under the Http Service.
 * The Jasper JSPServlet makes use of the Thread Context Classloader to support compile and runtime of JSPs and to accommodate running
 * in an OSGi environment, a Bundle is used to provide the similar context normally provided by the webapp.
 * </p>
 * <p>
 *  The Jasper Servlet will search the ServletContext to find JSPs, tag library descriptors, and additional information in the web.xml
 *  as per the JSP 2.0 specification. In addition to the ServletContext this implementation will search the bundle (but not attached
 *  fragments) for matching resources in a manner consistent with the Http Service's notion of a resource. By using alias and bundleResourcePath the JSP lookup should be in
 *  line with the resource mapping specified in {102.4} of the OSGi HttpService.
 *  </p>
 *  <p>
 *  TLD discovery is slightly different, to clarify it occurs in one of three ways:
 *  <ol>
 *  <li> declarations found in /WEB-INF/web.xml (found either on the bundleResourcePath in the bundle or in the ServletContext)</li>
 *  <li> tld files found under /WEB-INF (found either on the bundleResourcePath in the bundle or in the ServletContext)</li>
 *  <li> tld files found in jars on the Bundle-Classpath (see org.eclipse.equinox.internal.jsp.jasper.JSPClassLoader)</li>
 *  </ol>
 *  </p>
 *  <p>
 *  Other than the setting and resetting of the thread context classloader and additional resource lookups in the bundle the JSPServlet
 *  is behaviourally consistent with the JSP 2.0 specification and regular Jasper operation.
 *  </p>
 * @noextend This class is not intended to be subclassed by clients.
 */

public class JspServlet extends HttpServlet {
	private static final long serialVersionUID = -4110476909131707652L;
	private final Servlet jspServlet = new org.apache.jasper.servlet.JspServlet();
	Bundle bundle;
	private final URLClassLoader jspLoader;
	String bundleResourcePath;
	String alias;

	public JspServlet(final Bundle bundle, final String bundleResourcePath, final String alias) {
		this.bundle = bundle;
		this.bundleResourcePath = bundleResourcePath == null || bundleResourcePath.equals("/") ? "" : bundleResourcePath; //$NON-NLS-1$ //$NON-NLS-2$
		this.alias = alias == null || alias.equals("/") ? null : alias; //$NON-NLS-1$
		this.jspLoader = new JspClassLoader(bundle);
	}

	public JspServlet(final Bundle bundle, final String bundleResourcePath) {
		this(bundle, bundleResourcePath, null);
	}

	public void init(final ServletConfig config) throws ServletException {
		ClassLoader original = Thread.currentThread().getContextClassLoader();
		try {
			Thread.currentThread().setContextClassLoader(this.jspLoader);
			this.jspServlet.init(new ServletConfigAdaptor(config));
		} finally {
			Thread.currentThread().setContextClassLoader(original);
		}
	}

	public void destroy() {
		ClassLoader original = Thread.currentThread().getContextClassLoader();
		try {
			Thread.currentThread().setContextClassLoader(this.jspLoader);
			this.jspServlet.destroy();
		} finally {
			Thread.currentThread().setContextClassLoader(original);
		}
	}

	public void service(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo != null && pathInfo.startsWith("/WEB-INF/")) { //$NON-NLS-1$
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}

		ClassLoader original = Thread.currentThread().getContextClassLoader();
		try {
			Thread.currentThread().setContextClassLoader(this.jspLoader);
			this.jspServlet.service(request, response);
		} finally {
			Thread.currentThread().setContextClassLoader(original);
		}
	}

	public ServletConfig getServletConfig() {
		return this.jspServlet.getServletConfig();
	}

	public String getServletInfo() {
		return this.jspServlet.getServletInfo();
	}

	private class ServletConfigAdaptor implements ServletConfig {
		private final ServletConfig config;
		private final ServletContext context;

		public ServletConfigAdaptor(final ServletConfig config) {
			this.config = config;
			this.context = new ServletContextAdaptor(config.getServletContext());
		}

		public String getInitParameter(final String arg0) {
			return this.config.getInitParameter(arg0);
		}

		public Enumeration getInitParameterNames() {
			return this.config.getInitParameterNames();
		}

		public ServletContext getServletContext() {
			return this.context;
		}

		public String getServletName() {
			return this.config.getServletName();
		}
	}

	private class ServletContextAdaptor implements ServletContext {
		private final ServletContext delegate;

		public ServletContextAdaptor(final ServletContext delegate) {
			this.delegate = delegate;
		}

		public URL getResource(String name) throws MalformedURLException {
			if (JspServlet.this.alias != null && name.startsWith(JspServlet.this.alias))
			{
				name = name.substring(JspServlet.this.alias.length());
			}

			String resourceName = JspServlet.this.bundleResourcePath + name;
			int lastSlash = resourceName.lastIndexOf('/');
			if (lastSlash == -1) {
				return null;
			}

			String path = resourceName.substring(0, lastSlash);
			if (path.length() == 0)
			{
				path = "/"; //$NON-NLS-1$
			}
			String file = resourceName.substring(lastSlash + 1);
			Enumeration entryPaths = JspServlet.this.bundle.findEntries(path, file, false);
			if (entryPaths != null && entryPaths.hasMoreElements()) {
				return (URL) entryPaths.nextElement();
			}

			return this.delegate.getResource(name);
		}

		public InputStream getResourceAsStream(final String name) {
			try {
				URL resourceURL = this.getResource(name);
				if (resourceURL != null) {
					return resourceURL.openStream();
				}
			} catch (IOException e) {
				this.log("Error opening stream for resource '" + name + "'", e); //$NON-NLS-1$ //$NON-NLS-2$
			}
			return null;
		}

		public Set getResourcePaths(final String name) {
			Set result = this.delegate.getResourcePaths(name);
			Enumeration e = JspServlet.this.bundle.findEntries(JspServlet.this.bundleResourcePath + name, null, false);
			if (e != null) {
				if (result == null)
				{
					result = new HashSet();
				}
				while (e.hasMoreElements()) {
					URL entryURL = (URL) e.nextElement();
					result.add(entryURL.getFile().substring(JspServlet.this.bundleResourcePath.length()));
				}
			}
			return result;
		}

		public RequestDispatcher getRequestDispatcher(final String arg0) {
			return this.delegate.getRequestDispatcher(arg0);
		}

		public Object getAttribute(final String arg0) {
			return this.delegate.getAttribute(arg0);
		}

		public Enumeration getAttributeNames() {
			return this.delegate.getAttributeNames();
		}

		public ServletContext getContext(final String arg0) {
			return this.delegate.getContext(arg0);
		}

		public String getInitParameter(final String arg0) {
			return this.delegate.getInitParameter(arg0);
		}

		public Enumeration getInitParameterNames() {
			return this.delegate.getInitParameterNames();
		}

		public int getMajorVersion() {
			return this.delegate.getMajorVersion();
		}

		public String getMimeType(final String arg0) {
			return this.delegate.getMimeType(arg0);
		}

		public int getMinorVersion() {
			return this.delegate.getMinorVersion();
		}

		public RequestDispatcher getNamedDispatcher(final String arg0) {
			return this.delegate.getNamedDispatcher(arg0);
		}

		public String getRealPath(final String arg0) {
			return this.delegate.getRealPath(arg0);
		}

		public String getServerInfo() {
			return this.delegate.getServerInfo();
		}

		/** @deprecated **/
		public Servlet getServlet(final String arg0) throws ServletException {
			return this.delegate.getServlet(arg0);
		}

		public String getServletContextName() {
			return this.delegate.getServletContextName();
		}

		/** @deprecated **/
		public Enumeration getServletNames() {
			return this.delegate.getServletNames();
		}

		/** @deprecated **/
		public Enumeration getServlets() {
			return this.delegate.getServlets();
		}

		/** @deprecated **/
		public void log(final Exception arg0, final String arg1) {
			this.delegate.log(arg0, arg1);
		}

		public void log(final String arg0, final Throwable arg1) {
			this.delegate.log(arg0, arg1);
		}

		public void log(final String arg0) {
			this.delegate.log(arg0);
		}

		public void removeAttribute(final String arg0) {
			this.delegate.removeAttribute(arg0);
		}

		public void setAttribute(final String arg0, final Object arg1) {
			this.delegate.setAttribute(arg0, arg1);
		}

		// Added in Servlet 2.5
		public String getContextPath() {
			try {
				Method getContextPathMethod = this.delegate.getClass().getMethod("getContextPath", null); //$NON-NLS-1$
				return (String) getContextPathMethod.invoke(this.delegate, null);
			} catch (Exception e) {
				// ignore
			}
			return null;
		}
	}

	/**
	 * getter du loader de jsp pour faire fonctionner JSF
	 *
	 * @return
	 */
	public ClassLoader getJspLoader()
	{
		return this.jspLoader;
	}
}
