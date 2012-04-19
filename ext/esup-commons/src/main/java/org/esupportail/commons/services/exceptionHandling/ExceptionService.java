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
package org.esupportail.commons.services.exceptionHandling;

import java.io.Serializable;
import java.util.Set;

import org.esupportail.commons.exceptions.ExceptionHandlingException;
import org.esupportail.commons.services.application.Version;

/** 
 * The interface of exception services, used to handle unexpected exceptions.
 */
public interface ExceptionService extends Serializable {

	/**
	 * Set the parameters (used later).
	 * @param t a throwable
	 * @throws ExceptionHandlingException 
	 */
	void setParameters(Throwable t) throws ExceptionHandlingException;
	
	/**
	 * Handle an exception. Implementing classes can do anything with the exception,
	 * such as loggin it, send a report to an email address, ...
	 * @throws ExceptionHandlingException 
	 */
	void handleException() throws ExceptionHandlingException;
	
	/**
	 * @return the view to redirect to on exceptions.
	 * @throws ExceptionHandlingException 
	 */
	String getExceptionView();
	
	/**
	 * @return the applicationName
	 */
	String getApplicationName();

	/**
	 * @return the applicationVersion
	 */
	Version getApplicationVersion();

	/**
	 * @return the client
	 */
	String getClient();

	/**
	 * @return the cookies
	 */
	Set<String> getCookies();

	/**
	 * @return the date
	 */
	Long getDate();

	/**
	 * @return the portal
	 */
	String getPortal();

	/**
	 * @return the queryString
	 */
	String getQueryString();

	/**
	 * @return the quickStart
	 */
	Boolean getQuickStart();

	/**
	 * @return the requestHeaders
	 */
	Set<String> getRequestHeaders();

	/**
	 * @return the requestParameters
	 */
	Set<String> getRequestParameters();

	/**
	 * @return the server
	 */
	String getServer();

	/**
	 * @return the requestAttributes
	 */
	Set<String> getRequestAttributes();

	/**
	 * @return the sessionAttributes
	 */
	Set<String> getSessionAttributes();

	/**
	 * @return the globalSessionAttributes
	 */
	Set<String> getGlobalSessionAttributes();

	/**
	 * @return the systemProperties
	 */
	Set<String> getSystemProperties();

	/**
	 * @return the exception
	 */
	Throwable getThrowable();

	/**
	 * @return the userAgent
	 */
	String getUserAgent();

	/**
	 * @return the userId
	 */
	String getUserId();

	/**
	 * @return the userId
	 */
	String getRecipientEmail();

}
