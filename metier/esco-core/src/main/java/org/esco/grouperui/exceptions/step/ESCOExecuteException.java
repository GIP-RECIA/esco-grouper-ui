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
package org.esco.grouperui.exceptions.step;

/**
 * Logical business exceptions occuring the execution of a step.<br>
 * Requirement(s) : [RECIA-ESCO-L2-004]
 * 
 * @author SopraGroup
 */
public class ESCOExecuteException extends Exception {

    /** UID. */
    private static final long serialVersionUID = -6165278636851623567L;

    /**
     * Default constructor.
     */
    public ESCOExecuteException() {

    }

    /**
     * constructor with code.
     * 
     * @param theCode
     *            the code of the exception
     */
    public ESCOExecuteException(final String theCode) {
        super(theCode);
    }

    /**
     * constructor with code and cause.
     * 
     * @param theCode
     *            the code of the exception
     * @param theCause
     *            the initial exception
     */
    public ESCOExecuteException(final String theCode, final Throwable theCause) {
        super(theCode, theCause);
    }

}
