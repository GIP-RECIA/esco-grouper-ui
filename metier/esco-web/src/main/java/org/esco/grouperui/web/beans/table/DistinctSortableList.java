/**
 * 
 */
package org.esco.grouperui.web.beans.table;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import org.esco.grouperui.domaine.beans.Sortable;

/**
 * List of unique Sortable elements.
 * @author A. Deman.
 *
 * @param <String>
 * @param <Sortable>
 */
public class DistinctSortableList implements Serializable, List<Sortable> {

	/** Serial Version UID.*/
	private static final long serialVersionUID = -8478715607048806997L;

	/** Underlying Map. */
	private Map<String, Integer> indexes = new HashMap<String, Integer>();
	
	/** Underlying List. */
	private List<Sortable> list = new ArrayList<Sortable>();
	
	
	
	
	/**
	 * @see java.util.List#size()
	 */
	@Override
	public int size() {
		return list.size();
	}

	/**
	 * @see java.util.List#isEmpty()
	 */
	@Override
	public boolean isEmpty() {
		return list.isEmpty();
	}

	/**
	 * @see java.util.List#contains(java.lang.Object)
	 */
	@Override
	public boolean contains(Object o) {
		if (o instanceof Sortable) {
			final Sortable s = (Sortable) o;
			return indexes.containsKey(s.getId());
		}
		return false;
	}

	/**
	 * @see java.util.List#iterator()
	 */
	@Override
	public Iterator<Sortable> iterator() {
		return list.iterator();
	}

	/**
	 * @see java.util.List#toArray()
	 */
	@Override
	public Object[] toArray() {
		return list.toArray();
	}

	/**
	 * @see java.util.List#toArray(T[])
	 */
	@Override
	public <T> T[] toArray(T[] a) {
		return list.toArray(a);
	}

	/**
	 * @see java.util.List#add(java.lang.Object)
	 */
	@Override
	public boolean add(Sortable e) {
		
		if (indexes.containsKey(e.getId())) {
			list.remove(indexes.get(e.getId()).intValue());
		}
		indexes.put(e.getId(), list.size());
		return list.add(e);
		
	}

	/**
	 * @see java.util.List#remove(java.lang.Object)
	 */
	@Override
	public boolean remove(Object o) {
		if (o instanceof Sortable) {
			final Sortable s = (Sortable) o;
			if (indexes.containsKey(s.getId())) {
				list.remove(indexes.get(s.getId()).intValue());
				return true;
			}
		}
		return false;
	}

	/**
	 * @see java.util.List#containsAll(java.util.Collection)
	 */
	@Override
	public boolean containsAll(Collection<?> c) {
		for (Object o : c) {
			if (! contains(o)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @see java.util.List#addAll(java.util.Collection)
	 */
	@Override
	public boolean addAll(Collection<? extends Sortable> c) {
		boolean result = false;
		for (Sortable s : c) {
			if (add(s)) {
				result = true;
			}
		}
		return result;
	}

	/**
	 * @see java.util.List#addAll(int, java.util.Collection)
	 */
	@Override
	public boolean addAll(int index, Collection<? extends Sortable> c) {
		throw new UnsupportedOperationException("The operation addAll(int, Collection) is not supported by the class " + getClass());
	}

	/**
	 * @see java.util.List#removeAll(java.util.Collection)
	 */
	@Override
	public boolean removeAll(Collection<?> c) {
		boolean result = false;
		for (Object o : c) {
			if (remove(o)) {
				result = true;
			}
		}
		return result;
	}

	/**
	 * @see java.util.List#retainAll(java.util.Collection)
	 */
	@Override
	public boolean retainAll(Collection<?> c) {
		if (list != c) {
			clear();
			for (Object o :c) {
				if (o instanceof Sortable) {
					add((Sortable)o);
				}
			}
			return true;
		}
		return false;
	}

	/**
	 * @see java.util.List#clear()
	 */
	@Override
	public void clear() {
		list.clear();
		indexes.clear();
	}

	/**
	 * @see java.util.List#get(int)
	 */
	@Override
	public Sortable get(int index) {
		return list.get(index);
	}

	/**
	 * @see java.util.List#set(int, java.lang.Object)
	 */
	@Override
	public Sortable set(int index, Sortable element) {
		final Integer previousIndex = indexes.get(element.getId());
		final Sortable previousElement = previousIndex != null ? list.get(previousIndex.intValue()) : null;
		
		list.set(index, element);
		indexes.put(element.getId(), index);
		if (previousIndex != null) {
			if (previousIndex != index) {
				list.remove(previousIndex.intValue());
				for (int i = previousIndex; i < list.size(); i++) {
					indexes.put(list.get(i).getId(), i);
				}
			}
		}
		return previousElement;
	}

	/**
	 * @see java.util.List#add(int, java.lang.Object)
	 */
	@Override
	public void add(int index, Sortable element) {
		final Integer previousIndex = indexes.get(element.getId());
		
		if (previousIndex != null) {
			if (previousIndex == index) {
				list.set(index, element);
			} else {
				list.add(index, element);
				// updates the indexes.
				if (previousIndex < index) { // Actually, not useful if previousIndex+1=index.
					list.remove(previousIndex.intValue());
					for (int i = previousIndex; i < index; i++) {
						indexes.put (list.get(i).getId(), i);
					}
				} else {
					list.remove(previousIndex + 1);
					for (int i = index+1; i <= previousIndex; i++) {
						indexes.put (list.get(i).getId(), i);
					}
				}
			}
		}
	}

	/**
	 * @see java.util.List#remove(int)
	 */
	@Override
	public Sortable remove(int index) {
		final Sortable previousElement = list.get(index);
		indexes.remove(previousElement.getId());
		for (int i = 0; i < list.size(); i++) {
			indexes.put(list.get(i).getId(), i);
		}
		return previousElement;
	}

	/**
	 * @see java.util.List#indexOf(java.lang.Object)
	 */
	@Override
	public int indexOf(Object o) {
		if (o instanceof Sortable) {
			final Integer index = indexes.get(((Sortable)o).getId());
			return index == null ? -1 : index;
		}
		return -1;
	}

	/**
	 * @see java.util.List#lastIndexOf(java.lang.Object)
	 */
	@Override
	public int lastIndexOf(Object o) {
		return indexOf(o);
	}

	/**
	 * @see java.util.List#listIterator()
	 */
	@Override
	public ListIterator<Sortable> listIterator() {
		return list.listIterator();
	}

	/**
	 * @see java.util.List#listIterator(int)
	 */
	@Override
	public ListIterator<Sortable> listIterator(int index) {
		return list.listIterator(index);
	}

	/**
	 * @see java.util.List#subList(int, int)
	 */
	@Override
	public List<Sortable> subList(int fromIndex, int toIndex) {
		final DistinctSortableList subList = new DistinctSortableList();
		subList.list.addAll(list.subList(fromIndex, toIndex));
		for (int i = 0; i < subList.size(); i++) {
			subList.indexes.put(subList.get(i).getId(), i);
		}
		
		return subList;
	}

}
