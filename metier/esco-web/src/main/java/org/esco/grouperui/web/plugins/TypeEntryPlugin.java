package org.esco.grouperui.web.plugins;

/**
 * @author dMoulron
 */
public enum TypeEntryPlugin {
    /**
     * the Tab enum value.
     */
    TAB("tab"),
    /**
     * the resume enum value.
     */
    RESUME("resume");

    /**
     * The type property.
     */
    @SuppressWarnings("unused")
    private String type;

    /**
     * Constructor.
     * 
     * @param theType
     *            the type.
     */
    private TypeEntryPlugin(final String theType) {
        this.type = theType;
    }

    /**
     * @param theValue
     *            the value.
     * @return the type entry plugin.
     */
    public static TypeEntryPlugin fromTab(final String theValue) {
        String type = theValue.substring(theValue.indexOf(".") + 1, theValue.length());

        TypeEntryPlugin[] entryPlugins = TypeEntryPlugin.values();
        for (TypeEntryPlugin typeEntryPlugin : entryPlugins) {
            if (typeEntryPlugin.name().equals(type.toUpperCase())) {
                return typeEntryPlugin;
            }
        }
        return null;
    }
}
