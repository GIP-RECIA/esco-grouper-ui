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
package org.esupportail.commons.utils.strings;

/**
 * An class that checks if strings match patterns.
 */
public final class WordPattern {

	/**
	 * The corresponding regexp.
	 */
	private String regexp;

	/**
	 * constructor.
	 * @param pattern a pattern
	 */
	public WordPattern(final String pattern) {
		super();
		this.regexp = string2RegExp(pattern);
	}

	/**
	 * Tell if a string matches the pattern.
	 * @param string
	 * @return true if the pattern is matched.
	 */
	public boolean isMatchedBy(final String string) {
		return string.matches(regexp);
	}

	/**
	 * Tell if a string matches the pattern.
	 * @param string
	 * @return true if the pattern is matched.
	 */
	public boolean isMatchedByIgnoreCase(final String string) {
		return string.toLowerCase().matches(regexp.toLowerCase());
	}

	/**
     * Transform a string to a regular expression.
     * @param string
     * @return string
     */
    private static String string2RegExp(final String string) {
    	if (string == null) {
    		return null;
    	}
        char[] stringArray = string.toCharArray();
        String [] newStringArray = new String[stringArray.length];
        for (int i = 0; i < stringArray.length; i++) {
            if (stringArray[i] == '*') {
                newStringArray[i] = ".*";
            } else if (stringArray[i] == '\\') {
                newStringArray[i] = "\\\\";
            } else if (stringArray[i] == '|') {
                newStringArray[i] = "\\|";
            } else if (stringArray[i] == '[') {
                newStringArray[i] = "\\[";
            } else if (stringArray[i] == ']') {
                newStringArray[i] = "\\]";
            } else if (stringArray[i] == '(') {
                newStringArray[i] = "\\(";
            } else if (stringArray[i] == ')') {
                newStringArray[i] = "\\)";
            } else if (stringArray[i] == '{') {
                newStringArray[i] = "\\{";
            } else if (stringArray[i] == '}') {
                newStringArray[i] = "\\}";
            } else if (stringArray[i] == '^') {
                newStringArray[i] = "\\^";
            } else if (stringArray[i] == '$') {
                newStringArray[i] = "\\$";
            } else if (stringArray[i] == '+') {
                newStringArray[i] = "\\";
            } else if (stringArray[i] == '?') {
                newStringArray[i] = "\\?";
            } else if (stringArray[i] == '.') {
                newStringArray[i] = "\\.";
            } else {
                newStringArray[i] = new String(stringArray, i, 1);
            }
        }      
        StringBuffer regExp = new StringBuffer();
        for (int i = 0; i < newStringArray.length; i++) {
            regExp.append(newStringArray[i]);
        }
        return regExp.toString();
    }


}

