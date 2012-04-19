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
package org.esupportail.commons.services.database;

import java.io.Serializable;


/**
 * The interface of the database manager stores.
 */
public interface DatabaseManagerStore extends Serializable {
	
	/**
	 * Open the database connections.
	 * @throws DatabaseException 
	 */
	void open() throws DatabaseException;

	/**
	 * Begin a transaction for all the database managers.
	 * @throws DatabaseException 
	 */
	void begin() throws DatabaseException;

	/**
	 * End the current transaction.
	 * @param commit true to commit the current transaction, false to rollback
	 * @throws DatabaseException 
	 */
	void end(final boolean commit) throws DatabaseException;

	/**
	 * Close the database connections, rollback the current transaction if any.
	 * @throws DatabaseException 
	 */
	void close() throws DatabaseException;

	/**
	 * Test the database connections.
	 * @throws DatabaseException 
	 */
	void test() throws DatabaseException;
	
	/**
	 * Create the database structures.
	 * @throws DatabaseException 
	 */
	void create() throws DatabaseException;
	
	/**
	 * Update the database structures.
	 * @throws DatabaseException 
	 */
	void update() throws DatabaseException;

}
