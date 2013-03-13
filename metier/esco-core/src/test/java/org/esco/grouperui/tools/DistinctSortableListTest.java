/**
 * 
 */
package org.esco.grouperui.tools;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.esco.grouperui.domaine.beans.Sortable;
import org.junit.Test;



/**
 * <h1><code>DistinctSortableListTest</code>.</h1>
 * <hr/>
 * <br/>
 *  Test case for the class DistinctSortableList.
 * <br/><br/>
 * <hr/>
 * <b>Creation date:</b> 2012<br/>
 * <hr/>
 * <i>Author: A. Deman.</i>
 */
public class DistinctSortableListTest {

	/**
	 * <h1><code>SortableMock</code>.</h1>
	 * <hr/>
	 * <br/>
	 * Mock of Sortable used to test the DistinctSortableList. 
	 * <br/><br/>
	 * <hr/>
	 * <b>Creation date:</b> 2012<br/>
	 * <hr/>
	 * <i>Author: A. Deman.</i>
	 */
	private static class SortableMock extends Sortable {

		/** Serial version UID. */
		private static final long serialVersionUID = 2948032176133381355L;

		/** Id of the mock. */
		private String id;
		
		/** A value for the mock. */
		private String value;
		
		/**
		 * Builds an instance of SortableMock.
		 * @param id The id of the mock.
		 * @param value The value of the mock.
		 */
		public SortableMock(final String id, final String value) {
			this.id = id;
			this.value = value;
		}
		
		/**
		 * @see org.esco.grouperui.domaine.beans.Sortable#getValueFormCol(java.lang.String)
		 */
		@Override
		public String getValueFormCol(String theIndexCol) {
			return null;
		}
		
		/**
		 * @see org.esco.grouperui.domaine.beans.Sortable#getId()
		 */
		@Override
		 public String getId() {
			 return this.id;
		 }
		
		/**
		 * Getter for value.
		 * @return value.
		 */
		public String getValue() {
			return this.value;
		}
		
		/**
		 * @see java.lang.Object#toString()
		 */
		@Override
		public String toString() {
			return "SortableMock#{" + getId() + ", " + getValue() + "}";
		}

		/**
		 * @see java.lang.Object#hashCode()
		 */
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = super.hashCode();
			result = prime * result + ((id == null) ? 0 : id.hashCode());
			result = prime * result + ((value == null) ? 0 : value.hashCode());
			return result;
		}

		/**
		 * @see java.lang.Object#equals(java.lang.Object)
		 */
		@Override
		public boolean equals(Object obj) {
			if (this == obj) {
				return true;
			}
			if (! (obj instanceof SortableMock)) {
				return false;
			}
			final SortableMock other = (SortableMock) obj;
			if (id == null) {
				if (other.id != null) {
					return false;
				}
			} else if (!id.equals(other.id)) {
				return false;
			}
			if (value == null) {
				if (other.value != null) {
					return false;
				}
			}
			return value.equals(other.value);
		}
	};

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#size()}.
	 */
	@Test
	public void testSize() {
		
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		assertEquals(0, dsl.size());
		dsl.add(new SortableMock("1", "v1"));
		assertEquals(1, dsl.size());
		dsl.add(new SortableMock("1", "v1"));
		assertEquals(1, dsl.size());
		dsl.add(new SortableMock("2", "v2"));
		assertEquals(2, dsl.size());
		dsl.add(new SortableMock("3", "v2"));
		dsl.add(new SortableMock("4", "v2"));
		dsl.add(new SortableMock("5", "v2"));
		assertEquals(5, dsl.size());
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#isEmpty()}.
	 */
	@Test
	public void testIsEmpty() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		assertTrue(dsl.isEmpty());
		dsl.add(new SortableMock("1", "v1"));
		assertFalse(dsl.isEmpty());
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#contains(java.lang.Object)}.
	 */
	@Test
	public void testContains() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s2_2 = new SortableMock("2", "v3");
		final Sortable s3 = new SortableMock("3", "v1");
		assertFalse(dsl.contains(s1));
		dsl.add(s1);
		assertTrue(dsl.contains(s1));
		assertFalse(dsl.contains(s2));
		dsl.add(s2);
		assertTrue(dsl.contains(s2));
		assertTrue(dsl.contains(s2_2));
		assertFalse(dsl.contains(s3));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#iterator()}.
	 */
	@Test
	public void testIterator() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable[] all = new Sortable[]{s1, s2, s3, s4, s5};
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		
		int index = 0;
		final Iterator<Sortable> it = dsl.iterator();
		while (it.hasNext()) {
			assertEquals(all[index++], it.next());
		}
		assertEquals(all.length, index);
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#toArray()}.
	 */
	@Test
	public void testToArray() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable[] expected = new Sortable[]{s1, s2, s3, s4, s5};
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		
		assertArrayEquals(expected, dsl.toArray());
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#toArray(T[])}.
	 */
	@Test
	public void testToArrayTArray() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable[] expected = new Sortable[]{s1, s2, s3, s4, s5};
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		
		assertArrayEquals(expected, dsl.toArray(new Sortable[expected.length]));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#add(org.esco.grouperui.domaine.beans.Sortable)}.
	 */
	@Test
	public void testAddS() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		
		assertEquals(3, dsl.size());
		assertTrue(dsl.contains(s1));
		assertTrue(dsl.contains(s2));
		assertTrue(dsl.contains(s3));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#remove(java.lang.Object)}.
	 */
	@Test
	public void testRemoveObject() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v8");
		
		assertFalse(dsl.remove(s1));
		
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		dsl.add(s8);
		
		assertTrue(dsl.remove(s1));
		assertTrue(dsl.remove(s2));
		assertTrue(dsl.remove(s3));
		assertTrue(dsl.remove(s8));
		assertTrue(dsl.remove(s4));
		assertTrue(dsl.remove(s6));
		assertTrue(dsl.remove(s7));
		assertTrue(dsl.remove(s5));
		
		assertTrue(dsl.isEmpty());
		
		assertFalse(dsl.remove(s1));
		assertFalse(dsl.remove(s2));
		assertFalse(dsl.remove(s3));
		assertFalse(dsl.remove(s4));
		assertFalse(dsl.remove(s5));
		assertFalse(dsl.remove(s6));
		assertFalse(dsl.remove(s7));
		assertFalse(dsl.remove(s8));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#containsAll(java.util.Collection)}.
	 */
	@Test
	public void testContainsAll() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final List<Sortable> list = new ArrayList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v8");
		
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		
		assertTrue(dsl.containsAll(list));
		
		list.add(s1);
		assertTrue(dsl.containsAll(list));
		
		list.add(s6);
		list.add(s2);
		list.add(s7);
		list.add(s4);
		list.add(s5);
		list.add(s3);
		
		assertTrue(dsl.containsAll(list));
		
		list.add(s8);
		assertFalse(dsl.containsAll(list));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#addAll(java.util.Collection)}.
	 */
	@Test
	public void testAddAllCollectionOfQextendsS() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final List<Sortable> list = new ArrayList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		
		assertTrue(dsl.contains(s1));
		assertTrue(dsl.contains(s2));
		assertTrue(dsl.contains(s3));
		assertTrue(dsl.contains(s4));
		
		assertFalse(dsl.contains(s5));
		assertFalse(dsl.contains(s6));
		assertFalse(dsl.contains(s7));
				
		list.add(s6);
		list.add(s7);
		list.add(s4);
		list.add(s5);
		list.add(s3);
		
		dsl.addAll(list);
		
		assertTrue(dsl.contains(s1));
		assertTrue(dsl.contains(s2));
		assertTrue(dsl.contains(s3));
		assertTrue(dsl.contains(s4));
		assertTrue(dsl.contains(s5));
		assertTrue(dsl.contains(s6));
		assertTrue(dsl.contains(s7));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#removeAll(java.util.Collection)}.
	 */
	@Test
	public void testRemoveAll() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final List<Sortable> list = new ArrayList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		
		assertEquals(7, dsl.size());
		
		list.add(s6);
		list.add(s7);
		list.add(s4);
		list.add(s5);
		list.add(s3);
		
		dsl.removeAll(list);
		
		assertFalse(dsl.contains(s3));
		assertFalse(dsl.contains(s4));
		assertFalse(dsl.contains(s5));
		assertFalse(dsl.contains(s6));
		assertFalse(dsl.contains(s7));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#retainAll(java.util.Collection)}.
	 */
	@Test
	public void testRetainAll() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final List<Sortable> list = new ArrayList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		
		assertEquals(7, dsl.size());
		
		list.add(s1);
		list.add(s7);
		list.add(s5);
		list.add(s3);
		
		dsl.retainAll(list);
	
		assertTrue(dsl.contains(s1));
		assertTrue(dsl.contains(s3));
		assertTrue(dsl.contains(s5));
		assertTrue(dsl.contains(s7));
		
		assertFalse(dsl.contains(s2));
		assertFalse(dsl.contains(s4));
		assertFalse(dsl.contains(s6));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#clear()}.
	 */
	@Test
	public void testClear() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		
		assertEquals(7, dsl.size());
		
		dsl.clear();
		
		assertEquals(0, dsl.size());
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#get(int)}.
	 */
	@Test
	public void testGet() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		
		assertEquals(s1, dsl.get(0));
		assertEquals(s4, dsl.get(3));
		assertEquals(s7, dsl.get(6));
		
		dsl.remove(5);
		assertEquals(s7, dsl.get(5));
		
		dsl.remove(0);
		
		assertEquals(s2, dsl.get(0));
		assertEquals(s3, dsl.get(1));
		assertEquals(s4, dsl.get(2));
		assertEquals(s5, dsl.get(3));
		assertEquals(s7, dsl.get(4));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#getById(java.lang.String)}.
	 */
	@Test
	public void testGetById() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		
		assertEquals(s1, dsl.getById(s1.getId()));
		assertEquals(s2, dsl.getById(s2.getId()));
		assertEquals(s3, dsl.getById(s3.getId()));
		assertEquals(s4, dsl.getById(s4.getId()));
		assertEquals(s5, dsl.getById(s5.getId()));
		assertEquals(s6, dsl.getById(s6.getId()));
		assertEquals(s7, dsl.getById(s7.getId()));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#set(int, org.esco.grouperui.domaine.beans.Sortable)}.
	 */
	@Test
	public void testSet() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		
		dsl.set(4, s7);
		
		assertEquals(s7, dsl.get(4));
		assertEquals(s6, dsl.get(5));
		assertEquals(6, dsl.size());
		assertFalse(dsl.contains(s5));
		
		dsl.set(0, s5);
		
		assertEquals(s5, dsl.get(0));
		assertEquals(s2, dsl.get(1));
		assertEquals(s3, dsl.get(2));
		assertEquals(s4, dsl.get(3));
		assertEquals(s7, dsl.get(4));
		assertEquals(s6, dsl.get(5));
		
		
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#add(int, org.esco.grouperui.domaine.beans.Sortable)}.
	 */
	@Test
	public void testAddIntS() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		
		dsl.add(0, s8);
		assertEquals(s8, dsl.get(0));
		assertEquals(s1, dsl.get(1));
		assertEquals(s2, dsl.get(2));
		assertEquals(s3, dsl.get(3));
		assertEquals(s4, dsl.get(4));
		assertEquals(s5, dsl.get(5));
		assertEquals(s6, dsl.get(6));
		assertEquals(s7, dsl.get(7));
		
		dsl.add(4, s7);
		
		assertEquals(s7, dsl.get(4));
		assertEquals(s4, dsl.get(5));
		assertEquals(s5, dsl.get(6));
		assertEquals(s6, dsl.get(7));
		
		dsl.add(6, s2);
		
		assertEquals(s8, dsl.get(0));
		assertEquals(s1, dsl.get(1));
		assertEquals(s3, dsl.get(2));
		assertEquals(s7, dsl.get(3));
		assertEquals(s4, dsl.get(4));
		assertEquals(s2, dsl.get(5));
		assertEquals(s5, dsl.get(6));

		assertEquals(s6, dsl.get(7));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#remove(int)}.
	 */
	@Test
	public void testRemoveInt() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		dsl.add(s8);
		
		assertEquals(s1, dsl.remove(0)); 
		assertEquals(s4, dsl.remove(2)); 
		assertEquals(s8, dsl.remove(5)); 
		
		assertFalse(dsl.contains(s1));
		assertFalse(dsl.contains(s4));
		assertFalse(dsl.contains(s8));
		
		assertEquals(5, dsl.size());
		
		assertEquals(s2, dsl.get(0));
		assertEquals(s3, dsl.get(1));
		assertEquals(s5, dsl.get(2));
		assertEquals(s6, dsl.get(3));
		assertEquals(s7, dsl.get(4));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#indexOf(java.lang.Object)}.
	 */
	@Test
	public void testIndexOf() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		dsl.add(s8);
		
		assertEquals(0, dsl.indexOf(s1));
		assertEquals(1, dsl.indexOf(s2));
		assertEquals(2, dsl.indexOf(s3));
		assertEquals(3, dsl.indexOf(s4));
		assertEquals(4, dsl.indexOf(s5));
		assertEquals(5, dsl.indexOf(s6));
		assertEquals(6, dsl.indexOf(s7));
		assertEquals(7, dsl.indexOf(s8));
		
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#lastIndexOf(java.lang.Object)}.
	 */
	@Test
	public void testLastIndexOf() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		dsl.add(s8);
		
		assertEquals(0, dsl.lastIndexOf(s1));
		assertEquals(1, dsl.lastIndexOf(s2));
		assertEquals(2, dsl.lastIndexOf(s3));
		assertEquals(3, dsl.lastIndexOf(s4));
		assertEquals(4, dsl.lastIndexOf(s5));
		assertEquals(5, dsl.lastIndexOf(s6));
		assertEquals(6, dsl.lastIndexOf(s7));
		assertEquals(7, dsl.lastIndexOf(s8));
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#listIterator()}.
	 */
	@Test
	public void testListIterator() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		dsl.add(s8);
		
		final Sortable[] expected = new Sortable[]{s1, s2, s3, s4, s5, s6, s7, s8};
		
		final ListIterator<Sortable> it = dsl.listIterator();
		int index = 0;
		while (it.hasNext()) {
			assertEquals(expected[index ++], it.next());
		}
		
		assertEquals(expected.length, index);
		
		while (it.hasPrevious()) {
			assertEquals(expected[--index], it.previous());
		}
		
		assertEquals(0, index);
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#listIterator(int)}.
	 */
	@Test
	public void testListIteratorInt() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);
		dsl.add(s7);
		dsl.add(s8);
		
		final int start = 3;
		
		final Sortable[] expected = new Sortable[]{s1, s2, s3, s4, s5, s6, s7, s8};
		
		ListIterator<Sortable> it = dsl.listIterator(start);
		int index = start;
		while (it.hasNext()) {
			assertEquals(expected[index ++], it.next());
		}
		
		assertEquals(expected.length, index);
		
		it = dsl.listIterator(start);
		index = start;
		while (it.hasPrevious()) {
			assertEquals(expected[--index], it.previous());
		}
		
		assertEquals(0, index);
	}

	/**
	 * Test method for {@link org.esco.grouperui.tools.DistinctSortableList#subList(int, int)}.
	 */
	@Test
	public void testSubList() {
		final DistinctSortableList<Sortable> dsl = new DistinctSortableList<Sortable>();
		final Sortable s1 = new SortableMock("1", "v1");
		final Sortable s2 = new SortableMock("2", "v2");
		final Sortable s3 = new SortableMock("3", "v3");
		final Sortable s4 = new SortableMock("4", "v4");
		final Sortable s5 = new SortableMock("5", "v5");
		final Sortable s6 = new SortableMock("6", "v6");
		final Sortable s7 = new SortableMock("7", "v7");
		final Sortable s8 = new SortableMock("8", "v7");
		dsl.add(s1);
		dsl.add(s2);
		dsl.add(s3);//
		dsl.add(s4);
		dsl.add(s5);
		dsl.add(s6);//
		dsl.add(s7);
		dsl.add(s8);
		
		final DistinctSortableList<Sortable> subList = (DistinctSortableList<Sortable>) dsl.subList(2, 6);
		
		assertEquals(s3, subList.get(0));
		assertEquals(s4, subList.get(1));
		assertEquals(s5, subList.get(2));
		assertEquals(s6, subList.get(3));
		
		assertEquals(s3, subList.getById(s3.getId()));
		assertEquals(s4, subList.getById(s4.getId()));
		assertEquals(s5, subList.getById(s5.getId()));
		assertEquals(s6, subList.getById(s6.getId()));
	}
}
