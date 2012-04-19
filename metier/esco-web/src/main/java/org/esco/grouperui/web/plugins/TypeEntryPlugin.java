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
package org.esco.grouperui.web.plugins;

/**
 * @author dMoulron
 */
public enum TypeEntryPlugin {
    /**
     * the Tab enum value.
     */
    TAB("tab"),
    /**
     * the resume enum value.
     */
    RESUME("resume");

    /**
     * The type property.
     */
    @SuppressWarnings("unused")
    private String type;

    /**
     * Constructor.
     * 
     * @param theType
     *            the type.
     */
    private TypeEntryPlugin(final String theType) {
        this.type = theType;
    }

    /**
     * @param theValue
     *            the value.
     * @return the type entry plugin.
     */
    public static TypeEntryPlugin fromTab(final String theValue) {
        String type = theValue.substring(theValue.indexOf(".") + 1, theValue.length());

        TypeEntryPlugin[] entryPlugins = TypeEntryPlugin.values();
        for (TypeEntryPlugin typeEntryPlugin : entryPlugins) {
            if (typeEntryPlugin.name().equals(type.toUpperCase())) {
                return typeEntryPlugin;
            }
        }
        return null;
    }
}
