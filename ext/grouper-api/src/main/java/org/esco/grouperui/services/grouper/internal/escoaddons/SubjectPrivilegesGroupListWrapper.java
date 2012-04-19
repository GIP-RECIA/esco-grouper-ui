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

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Set;


import org.esco.grouperui.domaine.beans.Group;

/**
 * @author sopragroup
 */
public class SubjectPrivilegesGroupListWrapper implements List<Group> {
	private Set < edu.internet2.middleware.grouper.Group > groupAdmn;
	 private Set < edu.internet2.middleware.grouper.Group > groupUpde;
	 private Set < edu.internet2.middleware.grouper.Group > groupRead; // = member.hasRead();
	 private Set < edu.internet2.middleware.grouper.Group > groupView; // = member.hasView();
	 private Set< edu.internet2.middleware.grouper.Group > groupOptin ;
	 private Set< edu.internet2.middleware.grouper.Group > groupOptout ;
	
	 


	protected void setGroupAdmn(
			Set<edu.internet2.middleware.grouper.Group> groupAdmn) {
		this.groupAdmn = groupAdmn;
	}

	protected void setGroupUpde(
			Set<edu.internet2.middleware.grouper.Group> groupUpde) {
		this.groupUpde = groupUpde;
	}

	protected void setGroupRead(
			Set<edu.internet2.middleware.grouper.Group> groupRead) {
		this.groupRead = groupRead;
	}

	protected void setGroupView(
			Set<edu.internet2.middleware.grouper.Group> groupView) {
		this.groupView = groupView;
	}

	protected void setGroupOptin(
			Set<edu.internet2.middleware.grouper.Group> groupOptin) {
		this.groupOptin = groupOptin;
	}

	protected void setGroupOptout(
			Set<edu.internet2.middleware.grouper.Group> groupOptout) {
		this.groupOptout = groupOptout;
	}

	@Override
	public boolean add(Group e) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void add(int index, Group element) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean addAll(Collection<? extends Group> c) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean addAll(int index, Collection<? extends Group> c) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void clear() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean contains(Object o) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean containsAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Group get(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int indexOf(Object o) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean isEmpty() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Iterator<Group> iterator() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int lastIndexOf(Object o) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public ListIterator<Group> listIterator() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ListIterator<Group> listIterator(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Group remove(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean remove(Object o) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean removeAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean retainAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Group set(int index, Group element) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int size() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Group> subList(int fromIndex, int toIndex) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object[] toArray() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> T[] toArray(T[] a) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
