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

/**
 * An implementation of SmtpService that sends no email at all.
 */
public class VoidSmtpServiceImpl extends AbstractSmtpService {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 1738559445155844511L;

	/**
	 * Constructor.
	 */
	public VoidSmtpServiceImpl() {
		super();
	}

	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#send(
	 * javax.mail.internet.InternetAddress, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
	 */
	public void send(
			@SuppressWarnings("unused")
			final InternetAddress to, 
			@SuppressWarnings("unused")
			final String subject, 
			@SuppressWarnings("unused")
			final String htmlBody, 
			@SuppressWarnings("unused")
			final String textBody,
			@SuppressWarnings("unused")
			final String messageId) {
		// do nothing
	}	
	
	
	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#send(
	 * javax.mail.internet.InternetAddress, java.lang.String, java.lang.String, 
	 * java.lang.String, java.util.List, java.lang.String)
	 */
	public void send(
			@SuppressWarnings("unused")
			final InternetAddress to, 
			@SuppressWarnings("unused")
			final String subject, 
			@SuppressWarnings("unused")
			final String htmlBody, 
			@SuppressWarnings("unused")
			final String textBody,
			@SuppressWarnings("unused")
			final List<File> files,
			@SuppressWarnings("unused")
			final String messageId) {
		// do nothing
	}	
	
	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#sendtocc
	 * (javax.mail.internet.InternetAddress[], 
	 * javax.mail.internet.InternetAddress[], 
	 * javax.mail.internet.InternetAddress[], 
	 * java.lang.String, 
	 * java.lang.String, java.lang.String, java.util.List, java.lang.String)
	 */
	public void sendtocc(
			@SuppressWarnings("unused")
			final InternetAddress[] tos,
			@SuppressWarnings("unused")
			final InternetAddress[] ccs, 
			@SuppressWarnings("unused")
			final InternetAddress[] bccs, 
			@SuppressWarnings("unused")
			final String subject, 
			@SuppressWarnings("unused")
			final String htmlBody, 
			@SuppressWarnings("unused")
			final String textBody, 
			@SuppressWarnings("unused")
			final List<File> files,
			@SuppressWarnings("unused")
			final String messageId) {
		// do nothing
		
	}
	
	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#sendDoNotIntercept(
	 * javax.mail.internet.InternetAddress, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
	 */
	public void sendDoNotIntercept(
			@SuppressWarnings("unused")
			final InternetAddress to, 
			@SuppressWarnings("unused")
			final String subject, 
			@SuppressWarnings("unused")
			final String htmlBody, 
			@SuppressWarnings("unused")
			final String textBody,
			@SuppressWarnings("unused")
			final String messageId) {
		// do nothing
	}
	
	
	
	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#sendDoNotIntercept(
	 * javax.mail.internet.InternetAddress, java.lang.String, java.lang.String, 
	 * java.lang.String, java.util.List, java.lang.String)
	 */
	public void sendDoNotIntercept(
			@SuppressWarnings("unused")
			final InternetAddress to,
			@SuppressWarnings("unused")
			final String subject,
			@SuppressWarnings("unused")
			final String htmlBody,
			@SuppressWarnings("unused")
			final String textBody,
			@SuppressWarnings("unused")
			final List<File> files,
			@SuppressWarnings("unused")
			final String messageId) {
		// do nothing
	}
	
}
