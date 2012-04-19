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

/***
 * interface to define a object cache.
 * 
 * @param <ICacheKey>
 *            the key of the cache
 * @param <V>
 *            the type of the object can be cached
 * @author sopragroup
 */
@SuppressWarnings("hiding")
public interface ICache<ICacheKey, V> {

    /**
     * gettter for a object in cache.
     * 
     * @param theKey
     *            the key of the object is in cache.
     * @return the object is in cache.
     */
    Object get(ICacheKey theKey);

    /**
     * set a object in the cache.
     * 
     * @param theKey
     *            the key of the object.
     * @param theObject
     *            the object it self
     */
    void put(ICacheKey theKey, V theObject);
}
