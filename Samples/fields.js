
/**
    Check if a numeric field is valid

    @param objName the input being checked
    @param minval the minimum value for the field
    @param maxval the maximum value for the field
    @param comma if true commas are allowed
    @param period if true period is allowed
    @param hyphen if true a hyphen is allow
    @param inc the valid increment
    @numbers a string of valid digit

    @return true if the field is valid
*/

function checkNumeric(objName,minval, maxval,comma,period,hyphen,inc,numbers)
{

	var numberfield = objName;
	document.getElementById("FieldsValid").value = "true";
	if (chkNumeric(objName,minval,maxval,comma,period,hyphen,inc,numbers) == false)
	{
		numberfield.select();
		numberfield.focus();
		document.getElementById("FieldsValid").value = "false";
		return false;
	}
	else
	{
		return true;
	}
}

/** registers an event when a particular object is selected
 @param eventName the event name
 @param the object the event is attached to
 */

function registerEvent(eventName, curObject)
{

}


/**
    Check if a hex field is valid

    @param objName the input being checked
    @param minval the minimum value for the field
    @param maxval the maximum value for the field

    @return true if the field is valid
*/
function checkHex(curObject,minval, maxval)
{

    var testString;
    var finalString;
    document.getElementById("FieldsValid").value = "true";

    if(curObject.value.charAt[0] = '0' && (curObject.value.charAt[1] = 'x'))
    {
	    testString = (curObject.value.substr(2));
	    finalString = curObject.value;
    }
    else
    {

	alert("Hex format required \n Example: 0x00AA");
        curObject.select();
        curObject.focus();
        curObject.value = "";
        document.getElementById("FieldsValid").value = "false";
        return false;

    }

    if(validateChars(testString ,"ABCDEF01234567890") == false)
    {
	alert("Bad hex value");
	curObject.select();
	curObject.focus();
	curObject.value = "";
	document.getElementById("FieldsValid").value = "false";
	return false;
    }

    var value = parseInt(testString, 16);

    if(value < minval || value > maxval)
    {
	alert("value is out of range");
	curObject.select();
	curObject.focus();
	curObject.value = "";
	document.getElementById("FieldsValid").value = "false";
	return false;
    }

    curObject.value = finalString;
    return true;
}


/**
    validate that a string consits only of "valid characters"

    @param curString the string being check
    @param validChars a string of valid characters for this string

    @return true if the string is valid
*/
function validateChars(curString, validChars)
{
    for (var i = 0;  i < curString.length;  i++)
    {
	ch = curString.charAt(i).toUpperCase();
	for (var j = 0;  j < validChars.length;  j++)
	    if (ch == validChars.charAt(j))
		break;
	if (j == validChars.length)
	{
	    return  false;
	}
    }

    return true;
}

/**
    Check if a string field is valid

    @param objName the input being checked
    @param minval the minimum value for the field
    @param checkOk a string of valid characters for this string

    @return true if the field is valid
*/

function checkString(objName, minval, checkOk)
{
	var checkStr = objName;
	var allValid = true;
        var dispNameField;
        var fieldTag = checkStr;

        dispNameField = "dispn" + checkStr.name.substring(5);

        if(document.getElementById(dispNameField))
        {
            fieldTag = document.getElementById(dispNameField).value;
        }

	document.getElementById("FieldsValid").value = "true";

	if(checkOk != "")
	{
	    allValid = validateChars(checkStr.value, checkOk);
	}
	if (!allValid)
	{
		alert("Invalid characters in the field \"" + fieldTag + "\"\n");
		document.getElementById("FieldsValid").value = "false";
		return false;
	}
	if( checkStr.value.length < minval)
	{
		alert("Field \"" + fieldTag + "\" must be at least " + minval + " character");
		document.getElementById("FieldsValid").value = "false";
		return false;

	}

	return true;

}

/**
    Check if an IP address field is valid

    @param objName the input being checked

    @return true if the field is valid
*/
function checkIpAddress(objName)
{
    if( ! validateIPv4(objName) )
    {
        if( ! validateIPv6(objName) )
        {
            alert("Invalid IP address " + objName.value);
            objName.focus();
            return false;
        }
    }
    return true;
}

/**
    Check if an IPv4 address field is valid

    @param objName the input being checked

    @return true if the field is valid
*/
function validateIPv4(objName)
{
    var ipStr = objName.value;
    var decCount = 0;
    var prevDec = -1;
    var charCount = 0;
    var octet = 0;
    var valid = true;

    for(var i = 0; i < ipStr.length; i++)
    {
        charCount++;
        if(charCount <= 4)
        {
            if(ipStr.substr(i,1) == '.')
            {
                if(charCount == 1)
                {
                    valid = false;
                }
                decCount++;
                octet = parseInt(ipStr.substr(prevDec+1, i-prevDec), 10);
                prevDec = i;
                charCount = 0;
            }
            else
            {
                valid = validateChars(ipStr.substr(i,1), "0123456789");
            }
        }

        if(charCount > 3 || decCount > 3 || !valid || octet > 255)
        {
            return false;
        }
    }

    octet = parseInt(ipStr.substr(prevDec+1, ipStr.length), 10);

    if((decCount < 3 || prevDec == ipStr.length-1 || octet > 255) && ipStr.length != 0)
    {
        return false;
    }

    return true;
}

/**
    Check if an IPv6 address field is valid

    @param objName the input being checked

    @return true if the field is valid
*/
function validateIPv6(objName)
{
    var ipStr = objName.value;

    // For clarity sake, the regular expression used to validate the ipv6
    // address is broken into the following pieces, then assembled
    // into a single expression
    var regExpressions = new Array
    (
       "^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$",            //1:2:3:4:5:6:7:8
        "^([0-9a-fA-F]{1,4}:){1,7}:$",                          //1::
        "^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$",          //1::8             1:2:3:4:5:6::8  1:2:3:4:5:6::8
        "^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$",   //1::7:8           1:2:3:4:5::7:8  1:2:3:4:5::8
        "^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$",   //1::6:7:8         1:2:3:4::6:7:8  1:2:3:4::8
        "^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$",   //1::5:6:7:8       1:2:3::5:6:7:8  1:2:3::8
        "^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$",   //1::4:5:6:7:8     1:2::4:5:6:7:8  1:2::8
        "^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$",        //1::3:4:5:6:7:8   1::3:4:5:6:7:8  1::8
        "^:((:[0-9a-fA-F]{1,4}){1,7}|:)$"                       //::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8 ::8
    );

    // build the expression by ORing together the pieces
    var regExp = "";
    for(var inx = 0; inx < regExpressions.length; inx++)
    {
        regExp += regExpressions[inx];
        if( inx !== regExpressions.length - 1)
            regExp += "|";
    }
    var check = new RegExp(regExp);
    return check.test(ipStr);
}
/**
    Check make the up down arrows work

    @param curObject input being checked
    @param minval the minimum value for the field
    @param maxval the maximum value for the field
    @param comma if true commas are allowed
    @param period if true period is allowed
    @param hyphen if true a hyphen is allow
    @param inc the valid increment
    @numbers a string of valid digit

    @return true if the field is valid

    @note this function was taken from an example
*/
function upDownArrow(curObject,minval,maxval,inc,e)
{
    var curValue = parseInt(curObject.value);
    var keynum = 0;
    if(e.keyCode) // IE
    {
	keynum = e.keyCode;
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
	keynum = e.which;
    }

    switch(keynum)
    {
	case 38: //up arrow
	    curValue += inc;
	    if(curValue <= maxval)
		curObject.value = curValue;
	break;
	case 40: //down arrow
	    curValue -= inc;
	    if(curValue >= minval)
		curObject.value = curValue;
	break;
	case 33: //page up
	    curValue += inc * 10;
	    if(curValue > maxval)
		curObject.value = maxval;
	    else
		curObject.value = curValue;
	break;
	case 34: //page down
	    curValue -= inc * 10;
	    if(curValue < minval)
		curObject.value = minval;
	    else
		curObject.value = curValue;
	break;
	case 35: //end
	    curObject.value = maxval;
	break;
	case 36: //home
	    curObject.value = minval;
	break;

    }


}


/**
    Check if a numeric field is valid

    @param objName the input being checked
    @param minval the minimum value for the field
    @param maxval the maximum value for the field
    @param comma if true commas are allowed
    @param period if true period is allowed
    @param hyphen if true a hyphen is allow
    @param inc the valid increment
    @numbers a string of valid digit

    @return true if the field is valid

    @note this function was taken from an example
*/

function chkNumeric(objName,minval,maxval,comma,period,hyphen, inc, numbers)
{
	// only allow 0-9 be entered, plus any values passed
	// (can be in any order, and don't have to be comma, period, or hyphen)
	// if all numbers allow commas, periods, hyphens or whatever,
	// just hard code it here and take out the passed parameters

	var checkOK = numbers + comma + period + hyphen;
	var checkStr = objName;
	var allValid = true;
	var decPoints = 0;
	var allNum = "";
	var i;
	var j;
        var dispNameField;
        var displayName = checkStr.name;
	document.getElementById("FieldsValid").value = "true";

        if (checkStr.value.length == 0)
        {
            checkStr.value = minval;
            return true;
        }

	for (i = 0;  i < checkStr.value.length;  i++)
	{
		ch = checkStr.value.charAt(i);
		for (j = 0;  j < checkOK.length;  j++)
			if (ch == checkOK.charAt(j))
				break;
		if (j == checkOK.length)
		{
			allValid = false;
			break;
		}
		if (ch != ",")
			allNum += ch;
	}

        dispNameField = "dispn" + checkStr.name.substring(5);

        if(document.getElementById(dispNameField) != null)
        {
            displayName = document.getElementById(dispNameField).value;
        }

	if (!allValid)
	{
		alertsay = "Please enter only these values \""
		alertsay = alertsay + checkOK + "\" in the \"" + displayName + "\" field."
		alert(alertsay);
		document.getElementById("FieldsValid").value = "false";
		return (false);
	}

	// set the minimum and maximum
	var chkVal = allNum;
	var prsVal = parseInt(allNum);
	if (chkVal != "" && (!(prsVal >= minval && prsVal <= maxval)) ||
            ((prsVal == maxval || (minval < 0 && prsVal == minval)) && allNum.indexOf(".") >=  0))
	{
		if((prsVal == maxval || (minval < 0 && prsVal == minval)) && allNum.indexOf(".") >= 0)
		{
			var tempNum;
			if((tempNum = parseInt(allNum.substring(allNum.indexOf(".") + 1))) == 0 ||
			    tempNum == null)
			{
				return;
			}
		}
		alertsay = "Please enter a value greater than or "
		alertsay = alertsay + "equal to \"" + minval + "\" and less than or "
		alertsay = alertsay + "equal to \"" + maxval + "\" in the \"" + displayName + "\" field."
		alert(alertsay);
		document.getElementById("FieldsValid").value = "false";
		return (false);
	}
	if(prsVal % inc != 0)
	{
    		alert ("value must be incremented by " + inc);
		document.getElementById("FieldsValid").value = "false";
    		return false;
	}
}

/**
    increment a field

    @param field_id the id of the field being modified
    @param min the minum number a field can be set to
    @param max the maximum number a field can be set to
    @param increment the value a field will move by

*/
function increment_field(field_id, min, max, increment)
{
    var value = parseInt(document.getElementById(field_id).value)
    if(value + increment > max)
    {
	return;
    }
    value += increment;
    document.getElementById(field_id).value = value;

}

/**
    Update the hidden field when any of the datablock dropdowns
    change


    @param fieldId the id of the field being modified
*/
function dblkChange(fieldId)
{
    var hiddenField = document.getElementById(fieldId);

    var newValue = "";
    var index = 0;
    var curField;
    var fieldName = fieldId + "_"+index;
    while((curField = document.getElementById(fieldName)))
    {

	if(newValue != "")
	    newValue += ";"
	newValue+=curField.value;
	index ++;
	fieldName = fieldId + "_"+index;
    }
    hiddenField.value = newValue;
}


/**
    decrement a field

    @param field_id the id of the field being modified
    @param min the minum number a field can be set to
    @param max the maximum number a field can be set to
    @param increment the value a field will move by

*/

function decrement_field(field_id, min, max, increment)
{
    var value = parseInt(document.getElementById(field_id).value)

    if(value - increment < min)
    {
	return;
    }
    value -= increment;
    document.getElementById(field_id).value = value;

}

/**
    update a port slot item.  A port slot field actuly consists of 3 fields
    the port, slot and value field when the port or slot are updated this
    method updates the value field

    @param fieldName the name of the field being updated

*/
function updatePortSlot(fieldName)
{
    var mainInput = document.getElementById("field_" + fieldName);
    var slotSelect = document.getElementById("slot_"+fieldName);
    var portSelect = document.getElementById("port_"+fieldName);
    var imgSlotNum = fieldName.substr(fieldName.length - 1,1);
    var imgSlot = document.getElementById("icon"+imgSlotNum);
    var iconLabel;

    mainInput.value = slotSelect.value + "-" + portSelect.value;
    if(slotSelect.style.display != "none")
    {
	iconLabel = mainInput.value;
    }
    else
    {
	iconLabel = portSelect.value;
    }

    if(parseInt(slotSelect.value) != 0 && parseInt(portSelect.value) != 0)
    {
	imgSlot.value = "ser-icon.gif;" + iconLabel;
    }
    else
    {
	imgSlot.value = "";
    }

    document.getElementById("updateIcon").value = "true";
}

function deleteMultiInt(name, row)
{
    var row = document.getElementById(name +'_row'+row);
    row.parentNode.removeChild(row)
}

function newMultiInt(name, min, max, inc, units)
{
    var table =  document.getElementById(name+'_table');
    var lastRow = table.rows.length -1;
    var maxRow = document.getElementById(name+'_maxnodes');
    var rowIndex = maxRow.value ;
    var newRowIndex = parseInt(rowIndex) + 1;

    var row = table.insertRow(lastRow);
    row.id=name +'_row'+rowIndex;
    var col = document.createElement('td');
    row.appendChild(col);
    col.innerHTML =
    "<TABLE CELLPADDING=0 CELLSPACING=0>" +
    "<TR><TD><INPUT TYPE=\"text\" value='"+min+"' ID=\""+name+"_"+rowIndex+"\"  " +
    "NAME=\""+name+"_"+rowIndex+"\" ONBLUR=\"checkNumeric(this, "+min+", "+max+", '', '', '-',"+inc+", '01234567890' )\" " +
    "onchange='registerEvent(\"%s\", this)'></td>\n" +
    "<TD>" +
    "<TABLE CELLPADDING=0 CELLSPACING=1>" +
    "<TR><TD>" +
    "<IMG SRC = \"/img/incup.jpg\" ONCLICK=\"increment_field('"+name+"_"+rowIndex+"',"+min+","+max+","+inc+")\">" +
    "</TD></TR>" +
    "<tr><TD>" +
    "<IMG SRC=\"/img/incdown.jpg\" ONCLICK=\"decrement_field('"+name+"_"+rowIndex+"',"+min+","+max+","+inc+")\">" +
    "</TD></TR>" +
    "</TABLE>" +
    "</TD><TD>&nbsp;&nbsp;"+units+"</TR>" +
    "</TABLE>" ;



    col =  document.createElement('td');
    row.appendChild(col);
    col.innerHTML= "<input type='button' value='Delete' onClick='deleteMultiInt(\""+name+"\","+rowIndex+")'>";

    maxRow.value = newRowIndex;
}

