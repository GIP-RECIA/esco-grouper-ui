package org.esco.grouperui.services.grouper.internal.escoaddons;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.ArrayUtils;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.StemPrivilegeEnum;

import edu.internet2.middleware.grouper.Field;
import edu.internet2.middleware.grouper.FieldFinder;

/**
 *  Les privilèges grouper 
 */
 enum Privs {	VIEW ("view","viewers"),
	 			CREATE ("create","creators"), 
	 			READ ("read","readers"),
				UPDATE ("update", "updaters"), 
	 	    	OPTIN ("optin","optins"), 
	 			OPTOUT ("optout", "optouts"), 
				ADMIN ("admin","admins"),
	 			STEM ("stem","stemmers"),
	 			MEMBER ("member","members"),
	 			ANY ("none", "");

 				private String fieldName;
 				private String escoName;
 				private boolean stem = false;
 				private boolean right = true;
 				private boolean group = false;
 				
 				static private final Map<String, Privs> name2privs =
 						new HashMap<String, Privs>();
 		
 				static {
 					for (Privs p : values()) {
						name2privs.put(p.fieldName, p);
						name2privs.put(p.escoName, p);
						name2privs.put(p.toString(), p);
						switch (p) {
						case CREATE:								
						case STEM:
								p.escoName = StemPrivilegeEnum.valueOf(p.toString()).getValue();
								p.stem = true;
							break;
						case MEMBER :
						case ANY: p.right =false;
							break;
						default:
							p.escoName = GroupPrivilegeEnum.valueOf(p.toString()).getName();
							p.group = true;
							break;
						}
	 					name2privs.put(p.escoName, p);
					}
 				}
 				
 				
 				
 				
 				/**
 				 * Recherche un privilège par un nom.
 				 * @param name la chaine de recherche
 				 * @return le privilège trouvé
 				 */
 				public static Privs find(final String name ){
 					return name2privs.get(name);
 				}
 				
 				
 				/**
 				 * Recherche le privilège corespondant au StemPrivilegeEnum donné
 				 * @param priv le StemPrivilegeEnum de recherche
 				 * @return le privilège trouvé
 				 */
 				public static Privs find(final StemPrivilegeEnum priv){
 					Privs p = name2privs.get(priv.getValue());
 					if (p == null) {
 						p = Privs.valueOf(priv.toString());
 					}
 					return p;
 				}
 				
 				/**
 				 * Recherche le privilège corespondant au GroupPrivilegeEnum donné
 				 * @param priv le GroupPrivilegeEnum de recherche
 				 * @return le privilège trouvé
 				 */
 				public static Privs find(GroupPrivilegeEnum priv){
 					Privs p = name2privs.get(priv.getName());
 					if (p == null) {
 						p = Privs.valueOf(priv.toString());
 					}
 					return p;
 				}
 				
 				
 				
 				private Privs(String fieldName){
					this.fieldName = fieldName;
				}
 				
 				private Privs(String escoName, String fieldName){
					this.fieldName = fieldName;
					this.escoName = escoName;
				}
 				/**
 				 * Le nom associé au droit dans la base.
 				 * @return String
 				 */
				public String getFieldName() {
					return fieldName;
				}
				
				
				/**
				 * Le droit  porte t'il sur les stems
				 * @return
				 */
				public boolean isStem() {
					return stem;
				}
				
				/**
				 * Est ce un vrai droit ?
				 * pour member et any return false;
				 * @return boolean
				 */
				public boolean isRight(){
					return right;
				}
				
				/**
				 * Le droit porte t'il sur les groupes
				 * @return boolean
				 */
				public boolean isGroup() {
					return group;	
				}
				
				public static void main(String[] args) {
					Privs p = Privs.find("admin");
					System.out.println(p != null && p.isRight());
				}


				public String getEscoName() {
					return escoName;
				}
	}