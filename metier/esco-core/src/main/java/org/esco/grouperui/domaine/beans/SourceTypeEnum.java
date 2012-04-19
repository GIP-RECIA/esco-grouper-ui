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
package org.esco.grouperui.domaine.beans;

/**
 * Class SourceTypeEnum. Requirement(s):[RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public enum SourceTypeEnum {

    /** The different kind of source. */
    GROUP("group"), PERSON("person"), STEM("stem");

    /** The type of the source. */
    private String type;

    /**
     * Default constructor.
     * 
     * @param theType
     *            the type of the source.
     */
    private SourceTypeEnum(final String theType) {
        this.type = theType;
    }

    /**
     * Get the SourceTypeEnum from value.
     * 
     * @param theType
     *            The type of the SourceTypeEnum to get.
     * @return the SourceTypeEnum.
     */
    public SourceTypeEnum fromValue(final String theType) {
        return SourceTypeEnum.valueOf(theType.toUpperCase());
    }

    /**
     * Getter for type.
     * 
     * @return the type to get.
     */
    public final String getType() {
        return this.type;
    }

}
