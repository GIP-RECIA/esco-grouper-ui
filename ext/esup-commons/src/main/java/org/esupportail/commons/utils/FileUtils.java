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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.esupportail.commons.exceptions.ConfigException;


/**
 * Utilities for files.
 */
public class FileUtils {
	
	/**
	 * The size of the buffer used to read files.
	 */
	private static final int BUFFER_SIZE = 512;
	
	/**
	 * Constructor.
	 */
	private FileUtils() {
		throw new UnsupportedOperationException();
	}
	
    /**
     * @param path
     * @return the content of a file.
     * @throws ConfigException 
     */
    public static byte[] getFileContent(
    		final String path) throws ConfigException {
		try {
			InputStream is = FileUtils.class.getResourceAsStream(path); 
			if (is == null) {
				throw new ConfigException("could not read [" + path + "]");
			}
			ByteArrayOutputStream os = new ByteArrayOutputStream(2 * BUFFER_SIZE);
			byte[] buf = new byte[BUFFER_SIZE];
			int readBytes;
			while ((readBytes = is.read(buf)) > 0) {
			    os.write(buf, 0, readBytes);
			}
			byte[] result = os.toByteArray();
			is.close();
			os.close();
			return result;
		} catch (IOException e) {
			throw new ConfigException(e);
		}
    }

}
