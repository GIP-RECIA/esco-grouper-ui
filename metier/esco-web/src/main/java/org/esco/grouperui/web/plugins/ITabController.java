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
package org.esco.grouperui.web.plugins;

import java.util.List;

import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.summary.Resume;

/**
 * @author dMoulron
 */
public interface ITabController {

    /**
     * @return all information to construct tab renderer.
     */
    TabInfo getTabInfo();

    /**
     * @return calculate and return all information to construct tab renderer.
     */
    TabInfo calculateTabInfo();

    /**
     * Setter for the Group Controller.
     * 
     * @param theParentController
     *            the parent controller instance.
     */
    void setParentController(ITabsControllerAware theParentController);

    /**
     * Check if the data have been changed.
     * 
     * @return true if changed, else false.
     */
    boolean isModified();

    /**
     * Allow to apply the changes.
     * 
     * @return the status of the save action.
     */
    Status save();

    /**
     * Clear the different changes.
     */
    void clear();

    /**
     * Retrieve a list of the resumes of changes.
     * 
     * @return all data to present added info and deleted info
     */
    List < Resume > getListResume();

    /**
     * Discard changes that have raised an exception.
     * 
     * @param index
     *            index of the modification to discard
     */
    void discardModification(String index);

    /**
     * Apply changes made on the attribute that raised an exception.
     * 
     * @param index
     *            index of the attribute to change
     * @param newValue
     *            new value of the attribute
     */
    void applyModification(String index, String newValue);

    /**
     * Getter for the attribute key that is modified.
     * 
     * @param index
     *            index of the attribute changed
     * @return the key of the attribute
     */
    String getAttributeKey(String index);

    /**
     * Get the classes' names of the errors that happened while saving the
     * modifications.
     * 
     * @return the list of errors
     */
    List < String > getErrorClassesNames();
}
