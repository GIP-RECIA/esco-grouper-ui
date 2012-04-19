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
package org.esco.grouperui.services.grouper.internal.escoaddons;

import net.sf.ehcache.Cache;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.cache.ehcache.EhCacheFactoryBean;

import com.mysql.jdbc.Field;

import edu.internet2.middleware.grouper.GrouperSession;
/**
 * @author sopragroup
 */
public class GrouperHelperFactory implements InitializingBean {


	/**
	 * Un logger.
	 */
	 private static final IESCOLogger logger= ESCOLoggerFactory.getLogger(GrouperHelperFactory.class);

	 /**
	  * Pour garder les grouperHelpers d'un même thread.
	  */
	 private ThreadLocal<GrouperHelper> threadLocalGrouperHelper = new ThreadLocal<GrouperHelper>();

	 /**
	 * le cacheFactory
	 */
	 private  EhCacheFactoryBean cacheFactoryBean;

	 private Cache cache;


	@Override
	public void afterPropertiesSet() throws Exception {

		if (cache == null) {
		try {
			cache = (Cache) cacheFactoryBean.getObject();
		} catch (Exception e) {
			logger.error("le cacheFactoryBean doit être un factory de net.sf.ehcache.Cache: " + e.getMessage());
			throw e;
		}
		}
	}

	public GrouperHelper get(GrouperSession session){
		GrouperHelper gh = threadLocalGrouperHelper.get();
		if (gh == null) {
			gh = new GrouperHelper(cache, session);
			threadLocalGrouperHelper.set(gh);
		} else {
			gh.setSession(session);
		}
		return gh;
	}

	public EhCacheFactoryBean getCacheFactoryBean() {
		return cacheFactoryBean;
	}

	public void setCacheFactoryBean(EhCacheFactoryBean cacheFactoryBean) {
		this.cacheFactoryBean = cacheFactoryBean;
	}

	public Cache getCache() {
		return cache;
	}

	public void setCache(Cache cache) {
		this.cache = cache;
	}


}
