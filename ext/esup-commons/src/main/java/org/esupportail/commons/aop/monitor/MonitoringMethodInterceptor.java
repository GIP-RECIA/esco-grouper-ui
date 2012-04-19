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
package org.esupportail.commons.aop.monitor;

import org.aspectj.lang.ProceedingJoinPoint;
import org.esupportail.commons.utils.ContextUtils;

/**
 * A monitoring interceptor.
 */
public class MonitoringMethodInterceptor {

	/**
	 * The request attribute to store the cache map.
	 */
	private static final String ATTRIBUTE = MonitoringMethodInterceptor.class.getName() + ".map";

	/**
	 * True if a web request (false if batch command).
	 */
	private Boolean web;
	
	/**
	 * The local map.
	 */
	private MonitoringMethodCallMap localMap;

	/**
	 * Constructor.
	 */
	public MonitoringMethodInterceptor() {
		super();
		localMap = new MonitoringMethodCallMap();
	}

	/** @return true for web contexts. */
	protected boolean isWeb() {
		if (web == null) {
			web = ContextUtils.isWeb();
		}
		return web;
	}

	/**
	 * @param create 
	 * @return the map used to store the call results from the web context.
	 */
	protected MonitoringMethodCallMap getMap(final boolean create) {
		if (!isWeb()) {
			return localMap;
		}
		MonitoringMethodCallMap map = (MonitoringMethodCallMap) ContextUtils.getRequestAttribute(ATTRIBUTE);
		if (map == null && create) {
			map = new MonitoringMethodCallMap();
			ContextUtils.setRequestAttribute(ATTRIBUTE, map);
		}
		return map;
	}
	
	/**
	 * The method of the interceptor will be called instead of the original method.
	 * @param joinPoint
	 * @return a cached value or the original result.
	 * @throws Throwable
	 */
	public Object aroundMonitor(final ProceedingJoinPoint joinPoint) throws Throwable {
		long startTime = System.currentTimeMillis();
		try {
			Object result = joinPoint.proceed();
			getMap(true).addCall(joinPoint, startTime);
			return result;
		} catch (Throwable t) {
			getMap(true).addCall(joinPoint, startTime);
			throw t;
		}
	}

	/**
	 * Log the method calls.
	 * @param startTime
	 * @param message 
	 */
	public void log(
			final long startTime,
			final String message) {
		MonitoringMethodCallMap map = getMap(false);
		if (map == null) {
			return;
		}
		map.printLogReport(startTime, message);
	}
	
	/**
	 * Clear.
	 */
	public void clear() {
		MonitoringMethodCallMap map = getMap(false);
		if (map == null) {
			return;
		}
		map.clear();
	}
	
}