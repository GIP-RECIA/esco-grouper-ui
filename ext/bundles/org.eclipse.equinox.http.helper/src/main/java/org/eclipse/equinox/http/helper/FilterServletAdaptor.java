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
 * Copyright (c) 2007 IBM Corporation
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
package org.eclipse.equinox.http.helper;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Properties;
import javax.servlet.*;

public class FilterServletAdaptor implements Servlet {

	ServletConfig config;
	Servlet delegate;
	Filter filter;
	Properties filterInitParameters;
	private FilterChain filterChain;

	public FilterServletAdaptor(Filter filter, Properties filterInitParameters, Servlet delegate) {
		this.delegate = delegate;
		this.filter = filter;
		this.filterInitParameters = (filterInitParameters == null) ? new Properties(): filterInitParameters;
		this.filterChain = new FilterChainImpl();
	}

	public void init(ServletConfig config) throws ServletException {
		this.config = config;
		filter.init(new FilterConfigImpl());
		delegate.init(config);
	}

	public void service(ServletRequest request, ServletResponse response) throws ServletException, IOException {
		filter.doFilter(request, response, filterChain);
	}

	public void destroy() {
		delegate.destroy();
		filter.destroy();
		config = null;
	}

	public ServletConfig getServletConfig() {
		return config;
	}

	public String getServletInfo() {
		return ""; //$NON-NLS-1$
	}
	public class FilterChainImpl implements FilterChain {

		public void doFilter(ServletRequest request, ServletResponse response) throws IOException, ServletException {
			delegate.service(request, response);
		}

	}

	class FilterConfigImpl implements FilterConfig {

		public String getFilterName() {
			String filterName = filterInitParameters.getProperty("filter-name"); //$NON-NLS-1$
			if(filterName == null)
				filterName = filter.getClass().getName();

			return filterName;
		}

		public String getInitParameter(String name) {
			return filterInitParameters.getProperty(name);
		}

		public Enumeration getInitParameterNames() {
			return filterInitParameters.propertyNames();
		}

		public ServletContext getServletContext() {
			return config.getServletContext();
		}
	}
}
