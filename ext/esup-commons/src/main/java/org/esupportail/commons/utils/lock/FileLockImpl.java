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
package org.esupportail.commons.utils.lock; 

import java.io.File;
import java.io.IOException;


/**
 * A cross-JVMs file lock.
 */
public class FileLockImpl implements Lock {
	
	/**
	 * The lock filename.
	 */
	private String filename;

	/**
	 * Constructor.
	 * @param filename 
	 */
	public FileLockImpl(final String filename) {
		super();
		this.filename = filename;
	}
	
	/**
	 * @see org.esupportail.commons.utils.lock.Lock#lock()
	 */
	public void lock() throws AlreadyLockedException {
	    try {
	        File file = new File(filename);
	        if (!file.createNewFile()) {
	        	throw new AlreadyLockedException("file [" + filename + "] is already locked");
	        }
	    } catch (IOException e) {
	    	throw new LockException("could not lock file [" + filename + "]");
	    }
	}

	/**
	 * @see org.esupportail.commons.utils.lock.Lock#tryLock()
	 */
	public boolean tryLock() {
	    try {
	        lock();
	        return true;
	    } catch (AlreadyLockedException e) {
	    	return false;
	    }
	}

	/**
	 * @see org.esupportail.commons.utils.lock.Lock#unlock()
	 */
	public void unlock() {
        File file = new File(filename);
        if (!file.delete()) {
        	throw new NotLockedException("file [" + filename + "] is not locked");
        }
	}

}
