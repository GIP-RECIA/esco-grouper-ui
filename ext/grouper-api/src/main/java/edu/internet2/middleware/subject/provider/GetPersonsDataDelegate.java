/**
 * 
 */
package edu.internet2.middleware.subject.provider;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.SearchResult;

import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouper.Member;
import edu.internet2.middleware.subject.Source;
import edu.internet2.middleware.subject.provider.LdapSourceAdapter;

/**
 * 
 * <h1><code>IGetPersonsDataStrategy</code>.</h1>
 * <hr/>
 * <br/>
 * Interface for an optimization to retrieve all the attributes of a group's members.
 * <br/><br/>
 * <hr/>
 * <b>Creation date:</b> 2012<br/>
 * <hr/>
 * <i>Author: A. Deman.</i>
 */
interface IGetPersonsDataStrategy extends Serializable {

	/**
	 * Retrieves all the members' attributes of a group.
	 * @param members The members of the group.
	 * @param result The instance used to store the results.
	 * @return All the subjects of the group with all their attributes.
	 */
	Members getPersonsData(final Set<Member> members, final Members result);
}

/**
 * <h1><code>GrouperGetPersonsDataStrategy</code>.</h1>
 * <hr/>
 * <br/>
 * Unoptimized strategy. The behavior if the original Grouper's one, i.e. one query to the back-end per member.  
 * <br/><br/>
 * <hr/>
 * <b>Creation date:</b> 2012<br/>
 * <hr/>
 * <i>Author: A. Deman.</i>
 */
class GrouperGetPersonsDataStrategy implements IGetPersonsDataStrategy  {

	/** Serial version UID.*/
	private static final long serialVersionUID = -2851527223048059681L;

	/** Logger. */
	private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(GrouperGetPersonsDataStrategy.class);

	/** The underlying source. */
	private Source source;

	/**
	 * Builds an instance of GrouperGetMembersDataStrategy.
	 * @param source The underlying source.
	 */
	public GrouperGetPersonsDataStrategy(final Source source) {
		LOGGER.debug("Creation of an instance for the source: " + source.getId());
		this.source = source;
	}

	/**
	 * @see edu.internet2.middleware.subject.provider.IGetPersonsDataStrategy#getPersonsData(java.util.Set, 
	 * org.esco.grouperui.domaine.beans.Members)
	 */
	public Members getPersonsData(final Set<Member> members, final Members result) {

		if (members.size() == 0) {
			return result;
		}
		final Set<Member> toRemove = new HashSet<Member>();

		for (Member member : members) {
			if (member.getSubjectSourceId().equals(source.getId())) {
				Person person = new Person();
				person.setId(member.getSubjectId());
				person.setAttributes(member.getSubject().getAttributes());
				person.setTypeEnum(SourceTypeEnum.PERSON);
				result.addPerson(person);
				toRemove.add(member);
			}
		}
		members.removeAll(toRemove);
		return result;
	}
}


/**
 * <h1><code>LdapGetPersonsDataStrategy</code>.</h1>
 * <hr/>
 * <br/>
 * Optimized strategy to retrieve all the attributes of a group's members for a VT-LDAP source adapter. 
 * <br/><br/>
 * <hr/>
 * <b>Creation date:</b> 2012<br/>
 * <hr/>
 * <i>Author: A. Deman.</i>
 */
@SuppressWarnings("unchecked")
class LdapGetPersonsDataStrategy extends LdapSourceAdapter implements IGetPersonsDataStrategy {

	/** Serial version UID. */
	private static final long serialVersionUID = 1235919264804356400L;

	/** Logger. */
	private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(LdapGetPersonsDataStrategy.class);

	/** The underlying LDAP source. */
	private LdapSourceAdapter ldapSource;

	/**
	 * Builds an instance of LdapGetAllMembersDataDelegate.
	 * @param ldapSource The underlying source.
	 */
	public LdapGetPersonsDataStrategy(final Source ldapSource) {
		LOGGER.debug("Creation of an instance for the source: " + ldapSource.getId());
		this.ldapSource = (LdapSourceAdapter) ldapSource;
		//ldapSource.

	}

	/**
	 * @see edu.internet2.middleware.subject.provider.IGetPersonsDataStrategy#getPersonsData(java.util.Set, 
	 * org.esco.grouperui.domaine.beans.Members)
	 */
	public Members getPersonsData(final Set<Member> members, final Members result) {
		for (Member member : members) {
			if (member.getSubjectSourceId().equals(ldapSource.getId())) {

			}
		}
		return result;
	}
}

/**
 * <h1><code>JNDIGetPersonsDataStrategy</code>.</h1>
 * <hr/>
 * <br/>
 * Optimized strategy to retrieve all the attributes of a group's members for a JNDI source adapter. 
 * <br/><br/>
 * <hr/>
 * <b>Creation date:</b> 2012<br/>
 * <hr/>
 * <i>Author: A. Deman.</i>
 */
class JNDIGetPersonsDataStrategy extends JNDISourceAdapter implements IGetPersonsDataStrategy {

	/** Serial version UID.   */
	private static final long serialVersionUID = 6411850990038564362L;

	/** The key used by the subject API for the subject id. */
	private static final String ID_ATTRIBUTE_KEY = "SubjectID_AttributeType";

	/** The key used by the subject API for the subject name. */
	private static final String NAME_ATTRIBUTE_KEY = "Name_AttributeType";

	/** The key used by the subject API for the subject description. */
	private static final String DESC_ATTRIBUTE_KEY = "Description_AttributeType";

	/** The key for the ldap filter in the search instances. */
	private static final String FILTER_KEY = "filter";

	/** The replaced term in the ldap filters. */
	private static final String TERM = "%TERM%";

	/** Logger. */
	private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(JNDIGetPersonsDataStrategy.class);

	/** The underlying JNDI source. */
	private JNDISourceAdapter jndiSource;

	/** The id attribute. */ 
	private String idAttribute;

	/** The name attribute. */ 
	private String nameAttribute;

	/** The description attribute. */ 
	private String descAttribute;

	/** The names of the attributes to retrieve. */
	private String[] attributeNames;

	/** Internal search operation .*/
	private Search search;

	/**
	 * Builds an instance of JNDIGetAllMembersDataDelegate.
	 * @param jndiSource
	 */
	public JNDIGetPersonsDataStrategy(final Source jndiSource) {
		LOGGER.debug("Creation of an instance for the source: " + jndiSource.getId());
		this.jndiSource = (JNDISourceAdapter) jndiSource;

		final Properties props = this.jndiSource.getInitParams();
		idAttribute = props.getProperty(ID_ATTRIBUTE_KEY);
		nameAttribute = props.getProperty(NAME_ATTRIBUTE_KEY);
		descAttribute = props.getProperty(DESC_ATTRIBUTE_KEY);

		@SuppressWarnings("unchecked")
		final Set<String> attributeNameSet = this.jndiSource.getAttributes();
		attributeNames =  new String[attributeNameSet.size() + 3];

		// Retrieves the attribute names for the queries.
		int index = 0;
		attributeNames[index++] = idAttribute;
		attributeNames[index++] = nameAttribute;
		attributeNames[index++] = descAttribute;

		for (String attributeName : attributeNameSet) {
			attributeNames[index++] =  attributeName;
		}

		this.environment = this.jndiSource.environment;

		// Initializes a specific search operation, copied from the search by identifier operation (excepted the filter).
		search = new Search();
		final Search searchByIdentifier = this.jndiSource.getSearch("searchSubjectByIdentifier");
		search.setSearchType(searchByIdentifier.getSearchType());
		for (Object key : searchByIdentifier.getParams().keySet()) {
			final String keyStr = (String) key;
			search.addParam(keyStr, searchByIdentifier.getParam(keyStr));
		}
		search.addParam(FILTER_KEY, TERM);
	}

	/**
	 * Creates a person from an LDAP search result.
	 * @param searchResult The Search result.
	 * @return The person if created or null if an exception arises.
	 */
	private Person createPerson(final SearchResult searchResult) {
		try {
			final String id = (String) searchResult.getAttributes().get(idAttribute).get();
			final Person person = new Person();
			person.setId(id);
			final Map<String, Set<String>> attributes = new HashMap<String, Set<String>>();

			for (String attributeName : attributeNames) {
				final Attribute attribute = searchResult.getAttributes().get(attributeName);
				if (attribute != null) {
					final NamingEnumeration<?> ldapAttributeValues = attribute.getAll();
					final Set<String> attributeValues = new HashSet<String>();
					while (ldapAttributeValues.hasMoreElements()) {
						attributeValues.add((String) ldapAttributeValues.nextElement());
					}
					attributes.put(attributeName, attributeValues);
				}
			}
			person.setAttributes(attributes);
			return person;
		} catch (NamingException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * @see edu.internet2.middleware.subject.provider.IGetPersonsDataStrategy#getPersonsData(java.util.Set, 
	 * org.esco.grouperui.domaine.beans.Members)
	 */
	public Members getPersonsData(final Set<Member> members, final Members result) {

		if (members.size() == 0) {
			return result;
		}
		final Set<Member> toRemove = new HashSet<Member>();

		StringBuilder sb = new StringBuilder("(|");
		List<String> ldapQueries = new ArrayList<String>();
		int queryNbCond=0;
		for (Member member : members) {
			if (member.getSubjectSourceId().equals(jndiSource.getId())) {
				sb.append("(");
				sb.append(idAttribute);
				sb.append("=");
				sb.append(member.getSubjectId());
				sb.append(")");
				toRemove.add(member);
			}
			if (queryNbCond++ == 500) {
				sb.append(")");
				ldapQueries.add(sb.toString());
				sb = new StringBuilder("(|");
				queryNbCond = 0;
			}
		}
		if (! sb.equals("(|")) {
			sb.append(")");
			ldapQueries.add(sb.toString());
		}
		int count=0;
		if (toRemove.size()>0) {
			members.removeAll(toRemove);
			for (String ldapQuery : ldapQueries) {
				final NamingEnumeration<?> ldapSearchResults = getLdapResults(search, ldapQuery, attributeNames);
				while (ldapSearchResults.hasMoreElements()) {
					final SearchResult searchResult = (SearchResult) ldapSearchResults.nextElement();
					final Person person = createPerson(searchResult);
					if (person != null) {
						result.addPerson(person);
						count++;
					}
				}
			}
		}
		return result;  
	}

	protected String escapeSearchFilter(String filter) {
		return filter;
	}
}



/**
 * <h1><code>GetPersonsDataDelegate</code>.</h1>
 * <hr/>
 * <br/>
 * 
 * <br/><br/>
 * <hr/>
 * <b>Creation date:</b> 2012<br/>
 * <hr/>
 * <i>Author: A. Deman.</i>
 */
public class GetPersonsDataDelegate {

	/** The strategies used to retrieve all the members of a group in an optimized way 
	 * (if possible, depending of the kind of source). */
	private Map<String, IGetPersonsDataStrategy> strategies = new HashMap<String, IGetPersonsDataStrategy>();

	/**
	 * Gives the data about a group's members.
	 * @param personSourceIds The sources ids for the persons.
	 * @param members The members of a group.
	 * @param result The instance used to store the result.
	 * @return
	 */
	public Members getPersonsData(final Set<String> personSourceIds, final Set<Member> members, final Members result) {
		if (members.size() > 0) {
			for (String personSourceId : personSourceIds) {
				getStrategy(personSourceId).getPersonsData(members, result);
			}
		}
		return result;
	}

	/**
	 * Gives the strategy for a source id.
	 * @param personSourceId The id of the source to use (must be a person type).
	 * @return The strategy to use.
	 */
	private IGetPersonsDataStrategy getStrategy(final String personSourceId) {
		if (!strategies.containsKey(personSourceId)) {
			final Source source = SourceManager.getInstance().getSource(personSourceId);
			if (source instanceof JNDISourceAdapter) {
				strategies.put(personSourceId, new JNDIGetPersonsDataStrategy((JNDISourceAdapter) source));
			} else if (source instanceof LdapSourceAdapter) {
				strategies.put(personSourceId, new LdapGetPersonsDataStrategy((LdapSourceAdapter) source));
			} else {
				strategies.put(personSourceId, new GrouperGetPersonsDataStrategy(source));
			}
		}
		return strategies.get(personSourceId);
	}
}

