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
package org.esupportail.commons.aop.cache;

/**
 * A call result.
 */
public class CallResult {

	/** The result itself. */
	private Object result;
	/** The exception throw if any. */
	private Throwable throwable;
	/** The execution time. */
	private long time;
	
	/** Constructor. */
	public CallResult() {
		super();
	}
	
	/**
	 * Constructor.
	 * @param result
	 * @param throwable
	 * @param time 
	 */
	CallResult(
			final Object result, 
			final Throwable throwable,
			final long time) {
		super();
		this.result = result;
		this.throwable = throwable;
		this.time = time;
	}
	
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		if (throwable == null) {
			return " returns " + result;
		}
		return " throws " + throwable;
	}

	/** 
	 * @return the result 
	 */
	public Object getResult() {
		return result;
	}
	
	/** 
	 * @return the throwable 
	 */
	public Throwable getThrowable() {
		return throwable;
	}

	/**
	 * @return the time
	 */
	public long getTime() {
		return time;
	}
}
	
