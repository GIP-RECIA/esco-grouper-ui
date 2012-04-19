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
package org.fckfaces.taglib.html;

import javax.faces.component.UIComponent;

import org.apache.myfaces.taglib.html.HtmlInputTextareaTag;
import org.fckfaces.util.Tags;

/**
 * 
 * @author srecinto
 *
 */
public class FCKFaceEditorTag extends HtmlInputTextareaTag {
	public static final String COMPONENT_TYPE = "org.fckfaces.Editor";
	public static final String RENDERER_TYPE = "org.fckfaces.EditorRenderer";
	
	private String toolbarSet;
	private String height;
	private String width;
	
	/**
	 * 
	 */
	public String getComponentType() { 
		return COMPONENT_TYPE; 
	}
	
	/**
	 * 
	 */
	public String getRendererType() { 
		return RENDERER_TYPE;
	}
	
	/**
	 * 
	 */
	protected void setProperties(UIComponent component) {
	    super.setProperties(component);
	    
	    Tags.setString(component, "toolbarSet", toolbarSet);
	    
	}
	
	/**
	 * 
	 */
	public void release() {
	    super.release();
	    toolbarSet = null;
	}

	public String getToolbarSet() {
		return toolbarSet;
	}

	public void setToolbarSet(String toolbarSet) {
		this.toolbarSet = toolbarSet;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}
}
