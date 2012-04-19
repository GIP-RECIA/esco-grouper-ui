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
package org.esco.grouperui.tools.cache;

/**
 * interface of cache key for cachemanager.
 * 
 * @author X457335
 * @param <T>
 */
public interface ICacheKey<T> extends Cloneable {

    /**
     * @return return key of cache manager
     */
    T getKey();

    /**
     * setter for key.
     * 
     * @param theKey
     *            setter of the real key. Wrapper of cache manager
     */
    void setKey(T theKey);

    /**
     * @return a clone of cache key
     * @throws CloneNotSupportedException
     *             if the clonage fail
     */
    ICacheKey < T > clone() throws CloneNotSupportedException;
}
