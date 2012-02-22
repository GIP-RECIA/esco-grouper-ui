package org.esco.grouperui.services.grouper.internal.escoaddons;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.esco.grouperui.tools.IWrapper;
import org.odmg.NotImplementedException;

import edu.internet2.middleware.grouper.Stem;


/**
 * Un Iterable<Stem>  vue comme une List<Stem>.
 * Cette list est en fait un iterable ie seule la methode iterator() est implémentée.
 * 
 * Il doit être initialisé avec deux iterateurs.
 * stemRigth ensemble des stems sur lesquels il y a le droit Stem.
 * creatRight ensemble des stems sur lesquels il y a le droit Create.
 * 
 * 
 * @author legay
 *
 */
public class JustIterableListStemWrapper  extends NotImplementedList<org.esco.grouperui.domaine.beans.Stem>{

	private Iterable<Stem> stemRight;
	private Iterable<Stem> createRight;
	
	
	
	private IWrapper <Stem, org.esco.grouperui.domaine.beans.Stem > stemApiWrapper;

	
	/**
	 * Ensemble de stems pour le droit Stem.
	 */
	private Iterator<Stem> itStem;
	
	
	/**
	 * Ensemble de stems pour le droit Create.
	 */
	private Iterator<Stem> itCreate;
	
	
	/**
	 * @return Ensemble de stems pour le droit Stem.
	 */
	public Iterable<Stem> getStemRight() {
		return stemRight;
	}
	
	
	/**
	 * @param stemRight
	 */
	public void setStemRight(final Iterable<Stem> stemRight) {
		this.stemRight = stemRight;
	}
	
	
	/** 
	 * @return Ensemble de stems pour le droit Create.
	 */
	public Iterable<Stem> getCreateRight() {
		return createRight;
	}
	
	
	/**
	 * @param createRight
	 */
	public void setCreateRight(final Iterable<Stem> createRight) {
		this.createRight = createRight;
	}
	
	/**
	 * @return le stemApiWrapper 
	 */
	IWrapper<Stem, org.esco.grouperui.domaine.beans.Stem> getStemApiWrapper() {
		return stemApiWrapper;
	}

	/**
	 * @param stemApiWrapper
	 */
	public void setStemApiWrapper(
		final	IWrapper<Stem, org.esco.grouperui.domaine.beans.Stem> stemApiWrapper) {
		this.stemApiWrapper = stemApiWrapper;
	}
	
	
	/**
	 * @return itStem est'il initialisé
	 */
	boolean hasItStem(){
		if (itStem == null) {
			if (stemRight != null) {
				itStem = stemRight.iterator();
			}
		}
		return itStem != null;
	}
	
	/**
	 * @return itStem
	 */
	Iterator<Stem> getItStem(){
		if (hasItStem()) return itStem;
		return null;
	}
	
	/**
	 * @return itCreate est'il initialisé
	 */
	boolean hasItCreate() {
		if (itCreate == null) {
			if (createRight != null) {
				itCreate = createRight.iterator();
			}
		}
		return itCreate != null;
	}
	
	/**
	 * @return itCreate
	 */
	Iterator<Stem> getItCreate(){
		if (hasItCreate()) return itCreate;
		return null;
	}
	
	@Override
	public boolean isEmpty() {
		boolean vide = true;
		if (hasItStem()) {
			vide = ! itStem.hasNext();
		}
		if (vide && hasItCreate()) {
			vide = ! itCreate.hasNext();
		}
		return vide;
 	}
	
	@Override
	public Iterator<org.esco.grouperui.domaine.beans.Stem> iterator() {
		if (!(hasItStem() | hasItCreate())){
			return null;
		}
		return new Iterator<org.esco.grouperui.domaine.beans.Stem>() {
			
			private Map<String, org.esco.grouperui.domaine.beans.Stem> total = 
				new HashMap<String, org.esco.grouperui.domaine.beans.Stem>();

			private Iterator<Stem> it ;
			private org.esco.grouperui.domaine.beans.Stem nextStem;
			
			

			{
				it = nextIt();
			}
			
			private Iterator<Stem> nextIt(){
				if (it == null) {
					it = getItStem();
					if (it == null) {	
						it = getItCreate();
					}
				} else if (it == getItStem() && hasItCreate()){
					it = getItCreate();
				} else {
					it = null;
				}
				return it;
			}
			@Override
			public boolean hasNext() {
				if (it == null) return false;
				if (nextStem != null) return true;
				
				boolean inTotal = true;
				while (it.hasNext() && inTotal) {
					Stem stem = it.next();
					String name = stem.getName();
					nextStem = total.get(name);
					if (nextStem == null) {
						inTotal = false;
						nextStem = getStemApiWrapper().wrap(stem);
						total.put(name, nextStem);
					}
					if (it == getItStem()) {
						nextStem.setHasStem(true);
					} else {
						nextStem.setHasCreate(true);
					}
				}
				if (! inTotal) return true;
				it = nextIt();
				return hasNext();
			}
			
			@Override
			public org.esco.grouperui.domaine.beans.Stem next() {
				if (hasNext()) {
					org.esco.grouperui.domaine.beans.Stem stem = nextStem;
					nextStem = null;
					return stem;
				}
				return null;
			}
			@Override
			public void remove() {
				throw new NotImplementedException();
			}
			
			
		};
	}
	
}
