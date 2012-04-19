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
package org.esupportail.commons.mock;

import java.io.InputStream;

import org.apache.myfaces.custom.fileupload.UploadedFile;

/**
 * An uploaded file mock.
 *
 */
public class MockUploadedFile implements UploadedFile {

	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 6640876144695737829L;

	/**
	 * The input stream.
	 */
	private InputStream stream;

	/**
	 * The file name.
	 */
	private String name;

	/**
	 * @param stream
	 * @param name
	 */
	public MockUploadedFile(
			final InputStream stream, 
			final String name) {
		super();
		this.stream = stream;
		this.name = name;
	}

	/**
	 * @see org.apache.myfaces.custom.fileupload.UploadedFile#getBytes()
	 */
	public byte[] getBytes() {
		return null;
	}

	/**
	 * @see org.apache.myfaces.custom.fileupload.UploadedFile#getContentType()
	 */
	public String getContentType() {
		return null;
	}

	/**
	 * @see org.apache.myfaces.custom.fileupload.UploadedFile#getInputStream()
	 */
	public InputStream getInputStream() {
		return stream;
	}

	/**
	 * @see org.apache.myfaces.custom.fileupload.UploadedFile#getName()
	 */
	public String getName() {
		return name;
	}

	/**
	 * @see org.apache.myfaces.custom.fileupload.UploadedFile#getSize()
	 */
	public long getSize() {
		return 0;
	}

}
