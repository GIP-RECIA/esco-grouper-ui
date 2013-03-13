/**
 * 
 */
package edu.internet2.middleware.subject.provider;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.SearchResult;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouper.Member;
import edu.internet2.middleware.subject.Source;
import edu.internet2.middleware.subject.Subject;
import edu.internet2.middleware.subject.provider.LdapSourceAdapter;

/**
 * 
 * <h1><code>ILDAPQueryDelegate</code>.</h1>
 * <hr/>
 * <br/>
 * Interface for objects that can perform an LDAP query.
 * <br/><br/>
 * <hr/>
 * <b>Creation date:</b> 2012<br/>
 * <hr/>
 * <i>Author: A. Deman.</i>
 */
interface ILDAPQueryDelegate {
	/**
	 * Execution of an LDAP query.
	 * @param search The search to execute.
	 * @param ldapQuery The Query to perform.
	 * @param attributeNames The attributes to retrieve.
	 * @return An iterator thought the search results.
	 */
	abstract Iterator<SearchResult> performLDAPQuery(final Search search, final String ldapQuery, 
			final String[] attributeNames);
}

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
	 * Retrieves all the attributes of a set of subjects.
	 * @param subjects The subjects for which the attributes has to be retrieved.
	 * @param result The instance used to store the results.
	 * @param alreadyKnown The map of person by id previously retrieved.
	 * @return All the subjects of the group with all their attributes.
	 */
	Map<String, Person> getPersonsData(final Set<Subject> subjects, final Map<String, Person> result, final Map<String, Person> alreadyKnown);
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
	 * @see edu.internet2.middleware.subject.provider.IGetPersonsDataStrategy#getPersonsData(java.util.Set, java.util.Map, java.util.Map)
	 */
	public Map<String, Person> getPersonsData(final Set<Subject> subjects, final Map<String, Person> result, final Map<String, Person> alreadyKnown) {


		for (Subject subject : subjects) {
			if (subject.getSourceId().equals(source.getId())) {
				final Person known = alreadyKnown == null ? null : alreadyKnown.get(subject.getId());
				if (known != null) {
					result.put(subject.getId(), known);
				} else {
					Person person = new Person();
					person.setId(subject.getId());
					person.setAttributes(subject.getAttributes());
					person.setTypeEnum(SourceTypeEnum.PERSON);
					result.put(subject.getId(), person);
				}

			}
		}

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
class BaseLdapGetPersonsDataStrategy<T extends BaseSourceAdapter> implements IGetPersonsDataStrategy {

	/**Serial version UID.*/
	private static final long serialVersionUID = 845350790201884057L;

	/** The number of conditions in a filter. */
	private static final int FILTER_SIZE = 500;

	/** Logger. */
	private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(LdapGetPersonsDataStrategy.class);

	/** The key used by the subject API for the subject id. */
	private static final String ID_ATTRIBUTE_KEY = "SubjectID_AttributeType";

	/** The key used by the subject API for the subject name. */
	private static final String NAME_ATTRIBUTE_KEY = "Name_AttributeType";

	/** The key used by the subject API for the subject description. */
	private static final String DESC_ATTRIBUTE_KEY = "Description_AttributeType";

	/** The key for the LDAP filter in the search instances. */
	private static final String FILTER_KEY = "filter";

	/** The replaced term in the LDAP filters. */
	private static final String TERM = "%TERM%";

	/** The underlying LDAP source. */
	private T source;

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

	/** The object that will perform the LDAP query. */
	private ILDAPQueryDelegate ldapQueryDelegate;


	/**
	 * Builds an instance of LdapGetAllMembersDataDelegate.
	 * @param source The underlying source.
	 */
	public BaseLdapGetPersonsDataStrategy(final T source, final ILDAPQueryDelegate ldapQueryDelegate) {
		LOGGER.debug("Creation of an instance for the source: " + source.getId());
		this.source =  source;
		this.ldapQueryDelegate = ldapQueryDelegate;

		final Properties props = this.source.getInitParams();
		idAttribute = props.getProperty(ID_ATTRIBUTE_KEY);
		nameAttribute = props.getProperty(NAME_ATTRIBUTE_KEY);
		descAttribute = props.getProperty(DESC_ATTRIBUTE_KEY);

		@SuppressWarnings("unchecked")
		final Set<String> attributeNameSet = this.source.getAttributes();
		attributeNames =  new String[attributeNameSet.size() + 3];

		// Retrieves the attribute names for the queries.
		int index = 0;
		attributeNames[index++] = idAttribute;
		attributeNames[index++] = nameAttribute;
		attributeNames[index++] = descAttribute;

		for (String attributeName : attributeNameSet) {
			attributeNames[index++] =  attributeName;
		}


		// Initializes a specific search operation, copied from the search by identifier operation (excepted the filter).
		search = new Search();
		final Search searchByIdentifier = this.source.getSearch("searchSubjectByIdentifier");
		search.setSearchType(searchByIdentifier.getSearchType());
		for (Object key : searchByIdentifier.getParams().keySet()) {
			final String keyStr = (String) key;
			search.addParam(keyStr, searchByIdentifier.getParam(keyStr));
		}
		search.addParam(FILTER_KEY, TERM);

	}

	/**
	 * @see edu.internet2.middleware.subject.provider.IGetPersonsDataStrategy#getPersonsData(java.util.Set, java.util.Map, java.util.Map)
	 */
	@Override
	public Map<String, Person> getPersonsData(final Set<Subject> subjects, final Map<String, Person> result, final Map<String, Person> alreadyKnown) {
		if (subjects.size() == 0) {
			return result;
		}


		StringBuilder sb = new StringBuilder("(|");
		List<String> ldapQueries = new ArrayList<String>();
		int queryNbCond=0;

		for (Subject subject : subjects) {
			if (subject.getSourceId().equals(source.getId())) {
				final Person known = alreadyKnown == null ? null : alreadyKnown.get(subject.getId());
				if (known != null) {
					result.put(subject.getId(), known);
				} else {
					sb.append("(");
					sb.append(idAttribute);
					sb.append("=");
					sb.append(subject.getId());
					sb.append(")");
				}

			}
			if (queryNbCond++ == FILTER_SIZE) {
				sb.append(")");
				ldapQueries.add(sb.toString());
				sb = new StringBuilder("(|");
				queryNbCond = 0;
			}
		}
		if (! sb.toString().equals("(|")) {
			sb.append(")");
			ldapQueries.add(sb.toString());
		}


		for (String ldapQuery : ldapQueries) {
			final Iterator<SearchResult> ldapSearchResults = ldapQueryDelegate.performLDAPQuery(search, ldapQuery, attributeNames);
			while (ldapSearchResults.hasNext()) {
				final SearchResult searchResult =  ldapSearchResults.next();
				final Person person = createPerson(searchResult);
				if (person != null) {
					result.put(person.getId(), person);
				}
			}
		}

		return result;  
	}

	/**
	 * Getter for source.
	 * @return the source
	 */
	public T getSource() {
		return source;
	}

	/**
	 * Getter for attributeNames.
	 * @return the attributeNames.
	 */
	public final String[] getAttributeNames() {
		return attributeNames;
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
class LdapGetPersonsDataStrategy extends LdapSourceAdapter implements IGetPersonsDataStrategy, ILDAPQueryDelegate {

	/** Serial version UID. */
	private static final long serialVersionUID = 1235919264804356400L;

	/** Logger. */
	private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(LdapGetPersonsDataStrategy.class);

	private BaseLdapGetPersonsDataStrategy<LdapSourceAdapter> baseGetPersonDataStrategy;

	/**
	 * Builds an instance of LdapGetAllMembersDataDelegate.
	 * @param source The underlying source.
	 */
	public LdapGetPersonsDataStrategy(final Source source) {
		baseGetPersonDataStrategy = new BaseLdapGetPersonsDataStrategy<LdapSourceAdapter> ((LdapSourceAdapter) source, this);
		this.params = baseGetPersonDataStrategy.getSource().getInitParams();
		this.searches = baseGetPersonDataStrategy.getSource().getSearches();
		init();
		LOGGER.debug("Creation of an instance for the source: " + source.getId());

	}

	/**
	 * @see edu.internet2.middleware.subject.provider.IGetPersonsDataStrategy#getPersonsData(java.util.Set, java.util.Map, java.util.Map)
	 */
	public Map<String, Person> getPersonsData(final Set<Subject> subjects, final Map<String, Person> result, final Map<String, Person> alreadyKnown) {
		return baseGetPersonDataStrategy.getPersonsData(subjects, result, alreadyKnown);  
	}

	/**
	 * Disables the escapeSearchFilter operation.
	 * @return The filter.
	 */
	protected String escapeSearchFilter(String filter) {
		return filter;
	}

	/**
	 * @see edu.internet2.middleware.subject.provider.ILDAPQueryDelegate#
	 * performLDAPQuery(edu.internet2.middleware.subject.provider.Search, java.lang.String, java.lang.String[])
	 */
	@Override
	public Iterator<SearchResult> performLDAPQuery(final Search search,
			final String ldapQuery, final String[] attributeNames) {
		return getLdapResults(search, ldapQuery, attributeNames);
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
class JNDIGetPersonsDataStrategy extends JNDISourceAdapter implements IGetPersonsDataStrategy, ILDAPQueryDelegate {

	/** Serial version UID.   */
	private static final long serialVersionUID = 6411850990038564362L;

	/** Underlying LDAP strategy.*/
	private BaseLdapGetPersonsDataStrategy<JNDISourceAdapter> baseGetPersonDataStrategy;

	/** Logger. */
	private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(JNDIGetPersonsDataStrategy.class);


	/**
	 * Builds an instance of JNDIGetAllMembersDataDelegate.
	 * @param source the underlying source.
	 */
	public JNDIGetPersonsDataStrategy(final Source source) {
		baseGetPersonDataStrategy = new BaseLdapGetPersonsDataStrategy<JNDISourceAdapter>((JNDISourceAdapter) source, this);
		this.environment = baseGetPersonDataStrategy.getSource().environment;
		LOGGER.debug("Creation of an instance for the source: " + source.getId());
	}

	/**
	 * @see edu.internet2.middleware.subject.provider.IGetPersonsDataStrategy#getPersonsData(java.util.Set, 
	 * org.esco.grouperui.domaine.beans.Members)
	 */
	public Map<String, Person> getPersonsData(final Set<Subject> subjects, final Map<String, Person> result, final Map<String, Person> alreadyKnown) {
		return baseGetPersonDataStrategy.getPersonsData(subjects, result, alreadyKnown);
	}

	/**
	 * @see edu.internet2.middleware.subject.provider.ILDAPQueryDelegate#
	 * performLDAPQuery(edu.internet2.middleware.subject.provider.Search, java.lang.String, java.lang.String[])
	 */
	@Override
	public Iterator<SearchResult> performLDAPQuery(final Search search, final String ldapQuery, 
			final String[] attributeNames) {
		final NamingEnumeration<?> ldapSearchResults = getLdapResults(search, ldapQuery, attributeNames);
		return new Iterator<SearchResult>(){

			/**
			 * @see java.util.Iterator#hasNext()
			 */
			@Override
			public boolean hasNext() {
				return ldapSearchResults.hasMoreElements();
			}
			/**
			 * @see java.util.Iterator#next()
			 */
			@Override
			public SearchResult next() {
				return (SearchResult) ldapSearchResults.nextElement();
			}

			/**
			 * @see java.util.Iterator#remove()
			 */
			@Override
			public void remove() {
				throw new UnsupportedOperationException();

			}

		};

	}

	/**
	 * Disables the escapeSearchFilter operation.
	 * @return The filter.
	 */
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
	 * Gives the data about a set of members.
	 * @param sources The sources.
	 * @param members The members.
	 * @return The Map of person by id.
	 */
	public Map<String, Person> getPersonsDataFromMembers(final Map < String, SourceTypeEnum > sources, final Set<Member> members) {
		return getPersonsDataFromMembers(sources, members, null);
	}

	/**
	 * Gives the data about a set of members.
	 * @param sources The sources.
	 * @param members The members.
	 * @param alreadyKnown The map of already known persons (e.g. from a previous call).
	 * @return The Map of person by id.
	 */
	public Map<String, Person> getPersonsDataFromMembers(final Map < String, SourceTypeEnum > sources, final Set<Member> members, final Map<String, Person> alreadyKnown) {
		final Set<Subject> subjects = new HashSet<Subject>();
		for (Member member : members) {
			subjects.add(member.getSubject());
		}
		return getPersonsDataFromSubjects(sources, subjects, alreadyKnown);
	}

	/**
	 * Gives the data about a set of subjects
	 * @param personSourceIds The sources id for the persons.
	 * @param subjects The subjects for which the information has to be retrieved.
	 * @return The Map of person by id.
	 */
	public Map<String, Person> getPersonsDataFromSubjects(final Map < String, SourceTypeEnum > sources, final Set<Subject> subjects) {
		return getPersonsDataFromSubjects(sources, subjects, null);
	}

	/**
	 * Gives the data about a set of subjects
	 * @param personSourceIds The sources id for the persons.
	 * @param subjects The subjects for which the information has to be retrieved.
	 * @param alreadyKnown The map of already known persons (e.g. from a previous call).
	 * @return The Map of person by id.
	 */
	public Map<String, Person> getPersonsDataFromSubjects(final Map < String, SourceTypeEnum > sources, final Set<Subject> subjects, final Map<String, Person> alreadyKnown) {
		final Map<String, Person> result =  new HashMap<String, Person>();
		if (subjects.size() > 0) {

			for (String sourceId : sources.keySet()) {
				if (SourceTypeEnum.PERSON.equals(sources.get(sourceId))) {
					getStrategy(sourceId).getPersonsData(subjects, result, alreadyKnown);
				}
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

