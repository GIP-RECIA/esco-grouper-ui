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
package org.esco.grouperui.derby.utils;

public class SqlAdd {

    private String pkey;
    private String pgroup;
    private String paramKey;
    private String paramValue;
    private String paramComment;

    /**
     * @param thePkey
     * @param thePgroup
     * @param theParamKey
     * @param theParamValue
     * @param theParamComment
     */
    public SqlAdd(final String thePkey, final String thePgroup, final String theParamKey,
            final String theParamValue, final String theParamComment) {
        super();
        this.pkey = thePkey;
        this.pgroup = thePgroup;
        this.paramKey = theParamKey;
        this.paramValue = theParamValue;
        this.paramComment = theParamComment;
    }

    /**
     * Get the pkey property.
     * 
     * @return the pkey
     */
    public String getPkey() {
        return this.pkey;
    }

    /**
     * Get the pgroup property.
     * 
     * @return the pgroup
     */
    public String getPgroup() {
        return this.pgroup;
    }

    /**
     * Get the paramKey property.
     * 
     * @return the paramKey
     */
    public String getParamKey() {
        return this.paramKey;
    }

    /**
     * Get the paramValue property.
     * 
     * @return the paramValue
     */
    public String getParamValue() {
        return this.paramValue;
    }

    /**
     * Get the paramComment property.
     * 
     * @return the paramComment
     */
    public String getParamComment() {
        return this.paramComment;
    }

    /**
     * Setter of the pkey property.
     * 
     * @param thePkey
     *            the pkey to set
     */
    public void setPkey(final String thePkey) {
        this.pkey = thePkey;
    }

    /**
     * Setter of the pgroup property.
     * 
     * @param thePgroup
     *            the pgroup to set
     */
    public void setPgroup(final String thePgroup) {
        this.pgroup = thePgroup;
    }

    /**
     * Setter of the paramKey property.
     * 
     * @param theParamKey
     *            the paramKey to set
     */
    public void setParamKey(final String theParamKey) {
        this.paramKey = theParamKey;
    }

    /**
     * Setter of the paramValue property.
     * 
     * @param theParamValue
     *            the paramValue to set
     */
    public void setParamValue(final String theParamValue) {
        this.paramValue = theParamValue;
    }

    /**
     * Setter of the paramComment property.
     * 
     * @param theParamComment
     *            the paramComment to set
     */
    public void setParamComment(final String theParamComment) {
        this.paramComment = theParamComment;
    }

}
