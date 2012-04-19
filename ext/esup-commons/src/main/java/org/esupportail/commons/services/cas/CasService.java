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
package org.esupportail.commons.services.cas;

import java.io.Serializable;


/** 
 * The interface of the CAS service used to retrieve PTs from the CAs server.
 */
public interface CasService extends Serializable {
	
	/**
	 * @param targetService The service the PT should be sent to.
	 * @return a PT.
	 * @throws CasException 
	 */
	String getProxyTicket(String targetService) throws CasException;
	
	/**
	 * validate the ticket (ST or PT) to get a PGT. This method is 
	 * automatically called when retrieving the first PT for a remote
	 * service, but it can be called manually to prevent from the
	 * peremption of the ticket passed to the application.  
	 * @throws CasException 
	 */
	void validate() throws CasException;
	
}
