
/**
    Display the snmp configuration window using config window  by 
    hideing the copy from option and loading the snmp page inside it
*/

function displaySnmpWindow()
{
    resetLogoutTimer();
    var TitleArea = getSubNode(document.getElementById("ConfigWindow"), "Title", 0, 0);
    var mainFrame = document.getElementById("ConfigWindowIFrame");
    document.getElementById("ConfigWindowCopy").style.display = "none";
    document.getElementById("ConfigWindowType").value = "SNMP";
    mainFrame.src = "/cgi/xmlConfig.cgi?page=displaySnmp";
    TitleArea.innerHTML = "SNMP Configuration";
    displayWindow("ConfigWindow");
}

/**
    Display the redundancy configuration window using config window  by 
    hideing the copy from option and loading the redundancy page inside it
*/
function displayRedunWindow()
{
    resetLogoutTimer();
    var TitleArea = getSubNode(document.getElementById("ConfigWindow"), "Title", 0, 0);
    var mainFrame = document.getElementById("ConfigWindowIFrame");
    document.getElementById("ConfigWindowCopy").style.display = "none";
    document.getElementById("ConfigWindowType").value = "REDUN";
    mainFrame.src = "/cgi/xmlConfig.cgi?page=displayRedun";
    TitleArea.innerHTML = "System Configuration";
    displayWindow("ConfigWindow");
}

/**
    Copy the detailed information from another object into the one
    displayed in the detail window 

    @param curObject the object we are copying from
*/
function copyFromExisting(curObject)
{
    var mainFrame = document.getElementById("ConfigWindowIFrame");
    var Value = curEditValue;
    var newName = curObject.value;
    var InputOnlyString =  getSubNode(Value, "inputonly", 0, 0).value;
    var OutputOnlyString =  getSubNode(Value, "outputonly", 0, 0).value;
    var type = 0;

    if(newName == "NONE")
    {
	return;
    }

    
    var colRow = findTableLocation(curEditValue);

    if(colRow.col == 1)
    {
	type = 1;
    }
    else if (globalPathTable.rows[colRow.row].cells.length  < colRow.col +2 || 
		getSubNodeType(globalPathTable.rows[colRow.row].cells[colRow.col +2], "CustSelect", "table"))
    {
	type = 2;

    }
    //reloade the frame source with the information from another object then overwrite the name
    //with that of the old object
    mainFrame.src = "/cgi/xmlConfig.cgi?page=copyview&type="+ getSubNode(Value, "name", 0, 0).value +
                    "&value=" +  newName + "&SelectType="+type+"&inputonly="+
                    InputOnlyString+"&outputonly="+OutputOnlyString+"&oldname=" +  getSubNode(Value, "value", 0, 0).value;


}

/** 
    Display the edit detail window with the correct fields loaded in it

    @param windowId the id of the Edit Window
    @param value the cust select being edited 
    @param selectType the type of object being loaded

*/
function displayEditWindow(windowId, value, selectType)
{


    var type = getSubNodeType(value, "name", "input").value;
    if(type == "FUNCTION" || type == "" || type == "INPUT" || type == "OUTPUT" || type == "NONE" || type == "Filler")
    {
	return;
    }
    //If we are adding comments then do that instead of showing the window
    if (addCommentInd == 1)
    {
        showCommentEdit(value.parentNode.parentNode);
        cancelComment();
        return;
    }



    var TitleArea = getSubNode(document.getElementById(windowId), "Title", 0, 0);
    var nameSelect = getSubNode(document.getElementById(windowId), "NameSelect", 0, 0);
    var mainFrame = getSubNode(document.getElementById(windowId), "ConfigWindowIFrame", 0, 0);

    var InputOnlyString =  getSubNode(value, "inputonly", 0, 0).value;
    var OutputOnlyString =  getSubNode(value, "outputonly", 0, 0).value;
    resetLogoutTimer();

    if(selectType == 4 || selectType == 3)
    {
	document.getElementById("ConfigWindowType").value = "Site";
	if(selectType == 4)
	    document.getElementById("ConfigWindowDeleteButton").style.display = "";
	else
	    document.getElementById("ConfigWindowDeleteButton").style.display = "none";
        document.getElementById("ConfigWindowCopy").style.display = "none";
    }
    else
    {
	document.getElementById("ConfigWindowType").value = "Edit";
	document.getElementById("ConfigWindowDeleteButton").style.display = "none";
        document.getElementById("ConfigWindowCopy").style.display = "";
    }

    var curInputs = findInputs();
    var curOutputs= findOutputs();

    //load the I frame from the CGI
    mainFrame.src = "/cgi/xmlConfig.cgi?page=detailview&type="+ getSubNode(value, "name", 0, 0).value +
                    "&value=" +  getSubNode(value, "value", 0, 0).value + "&SelectType="+selectType+
		    "&inputonly="+InputOnlyString+"&outputonly="+OutputOnlyString+"&outputs="+curOutputs+
		    "&inputs="+curInputs;
    TitleArea.innerHTML = getSubNode(value, "display", 0, 0).value;


    curEditValue = value;

    nameSelect.options.length=0;

    nameSelect.options[0] = new Option("NONE", "NONE");

    var curObjName = getSubNode(value, "name", 0, 0).value;

    var curOption = 1;
    var functionTable = globalPathTable;
    var nameNode;


    var optionSet =0;
    //find all the objects of the same type to fill out the copy from list
    for (var row =0; row < functionTable.rows.length; row ++)
    {
        for (var cell = 0; cell <  functionTable.rows[row].cells.length; cell++)
        {
            nameNode = getSubNode( functionTable.rows[row].cells[cell],  "name", 0 ,0);
            testNode = getSubNode( functionTable.rows[row].cells[cell],  "value", 0 ,0);

            if (nameNode != false)
            {

                if (testNode.value == "undefined" || testNode.value == "default" || testNode.value == "none"  ||testNode.value == getSubNode(value, "value", 0, 0).value )
                {
                    continue;

                }
                if (nameNode.value == curObjName )
                {
                    optionSet = 0;
                    for (var x = 0; x < nameSelect.options.length; x++)
                    {
                        if ( nameSelect.options[x].value == testNode.value)
                        {
                            optionSet = 1;

                        }

                    }
                    if (optionSet != 1)
                    {
                        nameSelect.options[curOption] = new Option(testNode.value, testNode.value);
                        curOption ++;
                    }

                }

            }

        }

    }


    //show the window
    displayWindow(windowId);


}


/**
    Do all that is needed to display a popup window
    @param windowId the id of the window being displayed
*/

function displayWindow(windowId)
{
    curWindow = document.getElementById(windowId);
    //unhide the dive that "greys out" the background
    showBlocker();

    //set dialog to center of the screen
    
    curWindow.style.display = "";
    var windowWidth = curWindow.offsetWidth;
    var windowHeight = curWindow.offsetHeight;
    var windowX;
    var windowY;

    if(window.innerHeight)
    {
        windowX = window.innerWidth /2 - windowWidth / 2;
        windowY = window.innerHeight /2 - windowHeight /2;
    }
    else if(document.documentElement.clientHeight)
    {
        windowX = document.documentElement.clientWidth /2 - windowWidth /2 ;
        windowY = document.documentElement.clientHeight /2 - windowHeight /2;
    }
    else
    {
        windowX = document.body.clientWidth/ 2 - windowWidth /2;
        windowY = document.body.clientHeight/2 - windowHeight /2;
    }

    curWindow.style.top = windowY + "px";
    curWindow.style.left = windowX + "px";

    //unhide the div that is being displayed
}

/**
    Do all that is needed to hide a popup window
    @param windowId the id of the window being displayed
    @param loadScreen if this value is true load the loading screen in the background
*/
function hideWindow(windowId, loadScreen)
{
    //unhide the div that "greys out" the background
    document.getElementById(windowId).style.display = "none";
    //unhide the div that is being displayed

    hideBlocker();
    if (loadScreen == true)
    {
        var mainFrame = getSubNode(document.getElementById(windowId), "ConfigWindowIFrame", 0, 0);
        mainFrame.src = "/loading.html";
    }

    resetLogoutTimer();

}


/**
    Hide the merge to window and cancel the action
*/
function cancelMerge()
{
    mergeToCounter = 0;
    mergeInOperation = 0;
    hideMergeTo();
    hideMergeFrom();
    document.getElementById("CancelMergeWindow").style.display = "none";

}
/**
    Show the add comment window and set the global value that we are 
    selecting a function for commenting.
*/
function addComment()
{
	var cancelCommentWindow = document.getElementById("CancelCommentWindow");
	var windowX;
	if(window.innerHeight)
	{
	      windowX = window.innerWidth /2 - 100;
	}
	else if(document.documentElement.clientHeight)
	{
	      windowX = document.documentElement.clientWidth /2 - 100;
	}
	else
	{
	      windowX = document.body.clientWidth/ 2 - 100;
	}

	cancelCommentWindow.style.left = windowX + "px";
	cancelCommentWindow.style.display = "";

    document.getElementById("UnitRedun").disabled = true;
    document.getElementById("SnmpSettings").disabled = true;
    document.getElementById("ShowType").disabled = true;
    document.getElementById("ShowName").disabled = true;
    document.getElementById("highlight-path").disabled = true;
    document.getElementById("RevertToSaved").disabled = true;
    document.getElementById("SaveFile").disabled = true;
    document.getElementById("SaveAs").disabled = true;

    addCommentInd = 1;

}
/**
    Hide the add comment window and set the global value that we are
    no longer selecting functions for commenting.
*/
function cancelComment()
{
    document.getElementById("UnitRedun").disabled = false;
    document.getElementById("SnmpSettings").disabled = false;
    document.getElementById("ShowType").disabled = false;
    document.getElementById("ShowName").disabled = false;
    document.getElementById("highlight-path").disabled = false;
    document.getElementById("RevertToSaved").disabled = false;
    document.getElementById("SaveFile").disabled = false;
    document.getElementById("SaveAs").disabled = false;
    mergeToCounter = 0;
    mergeInOperation = 0;
    addCommentInd = 0;
    document.getElementById("CancelCommentWindow").style.display = "none";
}

/**
    Set the icons on a function based on lan information in the detailed window

    @param curDocumnet the document that contains the lan detail fields
*/
function setLanIcons(curDocument)
{
    var multicastNIC = curDocument.getElementById("field_MULTICAST_NIC");
    var redMulticastNic = curDocument.getElementById("field_REDUNDANT_MULTICAST_NIC");
    var redundant = curDocument.getElementById("field_MULTICAST_PRIMARY_REDUNDANT");
    var recRedundant = curDocument.getElementById("field_RCV_MULTICAST_PRIMARY_REDUNDANT");
    var primLanIcon = curDocument.getElementById("icon1");
    var redunLanIcon = curDocument.getElementById("icon2");

    if (multicastNIC)
    {
        curDocument.getElementById("updateIcon").value = "true";
        primLanIcon.value = "eth-icon.gif;"+multicastNIC.value;

        if (redMulticastNic)
        {
            if ((recRedundant && recRedundant.value == "ENABLED") || (redundant && redundant.value == "ENABLED"))
            {
                redunLanIcon.value =  "eth-icon.gif;" +redMulticastNic.value;
            }
        }

    }

}

/**
    This is the generic save used by the config window which is used for
    several purposes.
*/
function windowSave()
{
    var success = true;
    if (document.getElementById("ConfigWindowType").value == "Edit")
    {
        success = detailSave();
    }
    else if (document.getElementById("ConfigWindowType").value == "Site")
    {
        success = siteSave();
    }
    else
    {
	var curDoc;
	var curFrame = document.getElementById("ConfigWindowIFrame");
	if(curFrame.contentDocument)
	{
	    curDoc = curFrame.contentDocument;
	}
	else
	{
	    curDoc = document.frames["ConfigWindowIFrame"].document;
	}
 
	if(checkValues(curDoc) == false)
	{
	    return false;
	}



        curDoc.mainForm.submit();
    }

    // on save we let the CGI app update the window otherwise if we did it
    // we may inadvertanlty cancel the CGI app while it is working
    if(success)
    {
	hideWindow('ConfigWindow', false);
    }
}

/**
    Save the detailed configuration windows to the temp file
*/
function siteSave()
{

    var spChars = "!@#$%^&*()+=[]{}\\|;:\'\",<.>/?`~";
    var curDoc;
    var curFrame = document.getElementById("ConfigWindowIFrame");
    var sites = get_sensors();
    var ids = get_sensor_ids();
    if(curFrame.contentDocument)
    {
	curDoc = curFrame.contentDocument;
    }
    else
    {
	curDoc = document.frames["ConfigWindowIFrame"].document;
    }

    var mainTable = curDoc.getElementById("MainTable");
    var name = getSubNode(mainTable, "field_NAME", 0 , 0).value;
    var oldName = curDoc.getElementsByName( "OLD_NAME")[0].value;
    var id = getSubNode(mainTable, "field_RADAR_ID", 0 , 0).value;
    
    if(checkValues(curDoc) == false)
    {
	return false;
    }

    //cancel the save if a duplicate name exists
    if(oldName != name)
    {
	for(var x =0; x < sites.length; x++)
	{
	    if(sites[x] == name)
	    {
		alert("Name " + name + " already used as a site please choose a unique name");
		return false;
	    }
	}
    }
    for(var i=0; i < name.length; i++)
    {
        if(spChars.indexOf(name.charAt(i)) != -1)
        {
            alert("Name cannot contain special characters.");
            return false;
        }
    }

    for(var x =0; x < sites.length; x++)
    {
	if(sites[x] != oldName && ids[x] == id)
	{
	    alert("ID" + id + " already used please choose another Id ");
	    return false;
	}
    }

    curDoc.mainForm.submit();

    if(oldName == "")
    {
	new_sensor(name,id);
    }
    else if(oldName != name)
    {
	rename_sensor(oldName,name,id);
    }
	
    return true;

}

function siteDelete()
{

    var curDoc;
    var curFrame = document.getElementById("ConfigWindowIFrame");
    if(curFrame.contentDocument)
    {
	curDoc = curFrame.contentDocument;
    }
    else
    {
	curDoc = document.frames["ConfigWindowIFrame"].document;
    }

    var oldName = curDoc.getElementsByName( "OLD_NAME")[0].value;
    if(confirm("Delete this sensor (this cannot be undone)?"))
    {	
	curDoc.deleteForm.submit();
	delete_sensor(oldName);
	hideWindow('ConfigWindow', false);
	return true;
    }
    return false;

}

/**
    check all the values in the window return false and alert if there
    is an error
    @param curDoc the document to check
*/


function checkValues(curDoc)
{
alert("CHECKVALUE");
    var inputArr = curDoc.getElementsByTagName( "input" );
    if(!curDoc.getElementById("FieldsValid"))
    {
	return true;
    }
    for (var i = 0; i < inputArr.length; i++)
    {
	if(typeof(inputArr[i].onblur) == "function")
	{
	    inputArr[i].onblur.call(inputArr[i]);
	    if(curDoc.getElementById("FieldsValid").value == "false")
	    {
		return false;
	    }
	}

    }
    return true;

}
/**
    Save the detailed configuration windows to the temp file
*/
function detailSave()
{

    var spChars = "!@#$%^&*()+=[]{}\\|;:\'\",<.>/?`~";
    var curDoc;

    var curFrame = document.getElementById("ConfigWindowIFrame");
    if(curFrame.contentDocument)
    {
	curDoc = curFrame.contentDocument;
    }
    else
    {
	curDoc = document.frames["ConfigWindowIFrame"].document;
    }

    var mainTable = curDoc.getElementById("MainTable");
    setLanIcons(curDoc);
    var iconChange =  curDoc.getElementById("updateIcon").value;
    var icon1Name = curDoc.getElementById("icon1").value;
    var icon2Name  = curDoc.getElementById("icon2").value;
    var icon3Name = curDoc.getElementById("icon3").value;
    var icon4Name  = curDoc.getElementById("icon4").value;
    var icon1= getSubNodeType(curEditValue,"icon1","img");
    var icon2= getSubNodeType(curEditValue,"icon2","img");
    var icon3= getSubNodeType(curEditValue,"icon3","img");
    var icon4= getSubNodeType(curEditValue,"icon4","img");

    var Name = getSubNode(mainTable, "field_NAME", 0 , 0).value;
    var oldName = curDoc.getElementsByName( "OLD_NAME")[0].value;

    //cancel the save if a duplicate name exists
    if(oldName != Name)
    {
	if(checkforDuplicateName(Name))
	{
		alert("Name " + Name + " already used in data flow please select a unique name");
		return false;
	}
    }

    for(var i=0; i < Name.length; i++)
    {
        if(spChars.indexOf(Name.charAt(i)) != -1)
        {
            alert("Name cannot contain special characters.");
            return false;
        }
    }
    if(checkValues(curDoc) == false)
    {
	return false;
    }

    //check if all channels are none. cancel is so.
    if((curDoc.getElementById("port_CHANNEL_1") != null))
    {
        if((curDoc.getElementById("port_CHANNEL_1").value == 0) &&
           (curDoc.getElementById("port_CHANNEL_2").value == 0) &&
           (curDoc.getElementById("port_CHANNEL_3").value == 0) &&
           (curDoc.getElementById("port_CHANNEL_4").value == 0))
        {
            alert("You must select a port for one of the channels.");
            return false;
        }
    }

    var valueObj;
    var tempString = "";
    var x = 0;
    var toolTipObj = getSubNode(mainTable, "_TOOLTIP", 0,0);
    var tipDisplayName;
    var nameObject;

    //format the new tool tip
    if (toolTipObj)
    {
        var Tips = toolTipObj.value.split(';');
        for (x = 0; x < Tips.length; x++)
        {
            valueObj =   getSubNode(mainTable,"field_"+Tips[x] , 0,0);
            nameObject = getSubNodeType(mainTable,"dispn_"+Tips[x], "input");
            if (valueObj && nameObject)
            {
                tipDisplayName = nameObject.value;
                tempString +=  tipDisplayName + "&nbsp;:&nbsp;"+ valueObj.value + "<br>";
            }
        }
    }
    var currentObject;

    var DispName = formatDisplayName( getSubNodeType(curEditValue, "display", "input").value, Name);

    getSubNode(curEditValue, "DispName",0,0).innerHTML = DispName;
    getSubNode(curEditValue, "value", 0, 0).value = Name;
    getSubNode(curEditValue, "tip", 0, 0).value = tempString;

    //if there are new icons set them
    if (iconChange == "true")
    {
	setIconsByObject(curEditValue, icon1Name, icon2Name, icon3Name, icon4Name);
    }
    //loop through all the rows looking for the name to update bi directional
    for(var row =0; row < globalPathTable.rows.length; row++)
    {
	//loop throug all the cells that could contain a custom select
	//only odd numbered cells can contain a custom select so we start
	//at 1 and increment by 2
	for(var cell = 1; cell <  globalPathTable.rows[row].cells.length; cell +=2)
	{
	    currentObject =getSubNode(globalPathTable.rows[row].cells[cell], "value", 0, 0);
	    if(currentObject)
	    {
		if(currentObject.value == oldName && currentObject.value != "none"  )
		{
	
		    getSubNode(globalPathTable.rows[row].cells[cell], "DispName",0,0).innerHTML = DispName;
		    getSubNode(globalPathTable.rows[row].cells[cell], "value", 0, 0).value = Name;
		    getSubNode(globalPathTable.rows[row].cells[cell], "tip", 0, 0).value = tempString;

		    //if there are new icons set them
		    if (iconChange == "true")
		    {
			setIcons(row, cell, icon1Name, icon2Name, icon3Name, icon4Name);
		    }
		}
	    }
	}
    }

    curDoc.mainForm.submit();


    updateBidirectional(globalPathTable);
    deleteUndos();
    return true;

}

/**
    check that no duplicate names are already used in the data path
    
    @param newName the name being checked

    @return true if the name is duplicated false otherwise
*/
function checkforDuplicateName(newName)
{
    var currentName;
    var currentObject

    var curCellIndex = curEditValue.parentNode.parentNode.parentNode.parentNode.cellIndex;
    var curRowIndex= curEditValue.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex;

    //loop through all the rows looking for the name
    for(var row =0; row < globalPathTable.rows.length; row++)
    {
	//loop throug all the cells that could contain a custom select
	//only odd numbered cells can contain a custom select so we start
	//at 1 and increment by 2
	for(var cell = 1; cell <  globalPathTable.rows[row].cells.length; cell +=2)
	{
	    currentObject =getSubNode(globalPathTable.rows[row].cells[cell], "value", 0, 0);
	    if(currentObject)
	    {
		if(currentObject.value == newName && (cell != curCellIndex || row != curRowIndex))
		{
		    return true;
		}
	    }
	}
    }
    return false;
}
