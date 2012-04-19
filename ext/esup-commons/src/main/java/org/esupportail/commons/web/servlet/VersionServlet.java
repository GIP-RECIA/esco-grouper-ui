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
package org.esupportail.commons.web.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.esupportail.commons.services.application.ApplicationService;
import org.esupportail.commons.services.application.Version;
import org.esupportail.commons.services.application.VersionException;
import org.esupportail.commons.services.exceptionHandling.ExceptionUtils;
import org.esupportail.commons.utils.BeanUtils;

/**
 * The servlet to show the version number.
 */
public class VersionServlet extends HttpServlet {

	/**
	 * The id for serialization.
	 */
	private static final long serialVersionUID = -4582010858813700546L;
	
	/**
	 * The result.
	 */
	private String result;
	
	/**
	 * Constructor.
	 */
	public VersionServlet() {
		super();
	}
	
	/**
	 * @see javax.servlet.GenericServlet#init(javax.servlet.ServletConfig)
	 */
	@Override
	public void init(final ServletConfig config) throws ServletException {
		super.init(config);
		try {
			ApplicationService applicationService = 
				(ApplicationService) BeanUtils.getBean("applicationService");
			Version version = applicationService.getVersion();
			result = version.toString();
		} catch (Throwable t) {
			result = ExceptionUtils.getShortPrintableStackTrace(t);
		}
	}

	/**
	 * @throws ServletException 
	 * @see javax.servlet.http.HttpServlet#service(javax.servlet.ServletRequest, javax.servlet.ServletResponse)
	 */
	@Override
	public void service(
			@SuppressWarnings("unused")
			final ServletRequest servletRequest, 
			final ServletResponse servletResponse) 
	throws ServletException {
		try {
			HttpServletResponse response = (HttpServletResponse) servletResponse;
			ServletOutputStream out = response.getOutputStream();
			out.write(result.getBytes());
		} catch (Throwable t) {
			Exception ve = new VersionException(t);
			ExceptionUtils.catchException(ve);
			throw new ServletException(ve);
		}
	}

}
