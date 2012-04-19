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
package org.esupportail.commons.services.smtp;

import java.io.File;
import java.util.List;

import javax.mail.internet.InternetAddress;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;

/**
 * An implementation of SmtpService that sends emails asynchronously to 
 * prevent from rendering timetouts.
 * 
 * The configuration of such a bean is exactly the same as SimpleSmtpServiceImpl.
 * 
 * Please note that, as a new thread is created each time an email is sent,
 * exceptions thrown by the threads are not caught at engine level. They are 
 * however logged.
 * 
 * See /properties/smtp/smtp-example.xml.
 */
public class AsynchronousSmtpServiceImpl extends SimpleSmtpServiceImpl {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 6912061623396146367L;

	/**
	 * A logger.
	 */
	private final Logger logger = new LoggerImpl(AsynchronousSmtpServiceImpl.class);

	/**
	 * Bean constructor.
	 */
	public AsynchronousSmtpServiceImpl() {
		super();
	}

	/**
	 * @see org.esupportail.commons.services.smtp.SimpleSmtpServiceImpl#send(
	 * javax.mail.internet.InternetAddress, java.lang.String, java.lang.String, 
	 * java.lang.String, java.util.List, boolean, java.lang.String)
	 */
	@Override
	protected void send(
			final InternetAddress to, 
			final String subject, 
			final String htmlBody, 
			final String textBody, 
			final List<File> files,
			final boolean intercept,
			final String messageId) {
		InternetAddress recipient = getRealRecipient(to, intercept);
		if (logger.isDebugEnabled()) {
			logger.debug("launching a new thread for '" + recipient + "'...");
		}
		// start a new thread that will do the job asynchroneously
		new MailSenderThread(
				getServers(), getFromAddress(), recipient, 
				subject, htmlBody, textBody, files, getCharset(), messageId).start();
		logger.debug("thread launched.");
	}	
	
}
