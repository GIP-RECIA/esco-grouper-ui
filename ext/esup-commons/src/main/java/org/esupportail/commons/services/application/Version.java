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
package org.esupportail.commons.services.application; 


/**
 * A class that provides facilities with versionning.
 */
public class Version {

	/**
	 * The number of tokens in the version numbers.
	 */
	private static final int TOKENS_NUMBER = 3;
	
	/**
	 * The major number.
	 */
	private int major; 
	
	/**
	 * The minor number.
	 */
	private int minor;
	
	/**
	 * The update number.
	 */
	private int update;

	/**
	 * Constructor.
	 * @param versionString a textual representation of the version
	 * @throws VersionException 
	 */
	public Version(final String versionString) throws VersionException {
		super();
		try {
			String [] numbers = versionString.split("\\.");
			if (numbers.length == TOKENS_NUMBER) {
				major = Integer.parseInt(numbers[0]);
				minor = Integer.parseInt(numbers[1]); 
				update = Integer.parseInt(numbers[2]);
				if (major >= 0 && minor >= 0 && update >= 0) {
					return;
				}
			}
		} catch (NumberFormatException e) {
			// see below
		} 
		throw new VersionException("invalid version number [" + versionString + "]");
	}
	
	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object obj) {
		Version ref = null;
		if (obj == null) {
			return false;
		}
		if (obj instanceof Version) {
			ref = (Version) obj;
		} else if (obj instanceof String) {
			ref = new Version((String) obj);
		} else {
			return false;
		}
		return major == ref.major && minor == ref.minor && update == ref.update;
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return super.hashCode();
	}

	/**
	 * @param ref 
	 * @return true if same major and minor number than another version.
	 */
	public boolean isSameMajorAndMinor(final Version ref) {
		return major == ref.major && minor == ref.minor;
	}

	/**
	 * @param ref
	 * @return true if older than another version.
	 */
	public boolean isOlderThan(final Version ref) {
		if (major != ref.major) {
			return major < ref.major;
		}
		if (minor != ref.minor) {
			return minor < ref.minor;
		}
		return update < ref.update;
	}

	/**
	 * @param ref
	 * @return true if older than another version.
	 */
	public boolean isOlderThan(final String ref) {
		return isOlderThan(new Version(ref));
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return major + "." + minor + "." + update;
	}

}
