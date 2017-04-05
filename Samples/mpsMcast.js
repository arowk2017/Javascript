

var url="../cgi/mpsMcast.sh";


var http = getHTTPObject();
var edit_link_num = "";

//GLOBAL MCAST LINK NUMBER VARIABLE
var mcast_link_num = "";

function handleHttpResponse() {
	// 4 is the signal for finished
  if (http.readyState == 4) {
 
    results = http.responseText;
	

	var data=document.getElementById( 'mcast' );
	data.innerHTML = results; 

  }
}

function handleHttpResponse2() {
        // 4 is the signal for finished
  if (http.readyState == 4) {
  
    results = http.responseText;

        var data=document.getElementById( 'view_mcast' );
        data.innerHTML = results;


  }
}

function handleHttpResponse3() {
        // 4 is the signal for finished
  if (http.readyState == 4) {

    results = http.responseText;

        var data=document.getElementById( 'edit_mcast' );
        data.innerHTML = results;


  }
}


function start()
{

//Begin communication with status.cgi
http.open("GET", url, true);

http.onreadystatechange = handleHttpResponse;

http.send(null);

}

function mcast_start()
{
var mcast_url="../cgi/Mcast.cgi"
http.open("GET", mcast_url, true);

http.onreadystatechange = handleHttpResponse;

http.send(null);
}

function view_mcast_start(mps_mcast)
{
var mcast_url="../cgi/view_mpsMcast.sh?mcast="+mps_mcast;

//Begin communication with status.cgi
http.open("GET", mcast_url, true);

// When the state changes call our other method
// handleHttpResponse
http.onreadystatechange = handleHttpResponse2;

http.send(null);
}


function getHTTPObject() {
 var xmlhttp=false;
    
     if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
       xmlhttp = new XMLHttpRequest();
     } 
  return xmlhttp;
}


function reset(){
 
   http.open("GET", url2, true);

}

function display_mcast_line(line){

var data=document.getElementById( 'display_mcast' );
        data.innerHTML = line;
}

var genDialogCloseAction;


function mcastPopup(mcastId, proto)
{
    mcast_link_num = mcastId;

    curWindow = document.getElementById("McastWindow");
    //unhide the div that "greys out" the background
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
    var mcastWindow = document.getElementById("McastWindowIFrame");
    mcastWindow.src = "/cgi/mcast.cgi?page=McastScreen&mcast=" + mcastId + "&proto=" + proto;

    var mcastTitle = document.getElementById("mcastTitle");
    
    mcastTitle.innerHTML = "MPS Mcast Layer - " + proto + " Link " + mcastId;
}

function oldMcastPop(mcast_line)
{
	edit_link_num = mcast_line;
	var mcastEditButton = document.getElementById("mcastButton");
	var mcastSubmitButton = document.getElementById("mcastSubmitButton");
	mcastEditButton.style.display="block";
	mcastSubmitButton.style.display="none";
	showGenDialogWindowMcast("../cgi/mcast.cgi", "Mcast", "", "Ok", 400);    

}

 function showGenDialogWindow(url,title,okaction, cancelText, height, width, closeAction)
    {
  showBlocker();
  var curWindow = document.getElementById("GenDialogWindow");
  var genIframe = document.getElementById("GenDialogIFrame");
  var okButton = document.getElementById("GenDialogOk");
  var okButtonCol = document.getElementById("GenDialogOkCol");
  var cancelButtonCol = document.getElementById("GenDialogCancelCol");
  var cancelButton = document.getElementById("GenDialogCancel");
  var titleDiv = document.getElementById("GenDialogTitle");

  titleDiv.innerHTML = title;
  if(closeAction)
      genDialogCloseAction = closeAction;
  else
      genDialogCloseAction = undefined;


var genDialogHeight = 450;
  var genDialogWidth = 500;
  if(height)
  {
      genDialogHeight = height;
  }

  if(width)
  {
      genDialogWidth = width;
  }
  genIframe.style.height = (genDialogHeight - 70) + "px";
  curWindow.style.height = genDialogHeight + "px";
  curWindow.style.width = genDialogWidth + "px";


  var windowX;
  var windowY;

 if(window.innerHeight)
  {
      windowX = window.innerWidth /2 - genDialogWidth / 2;
      windowY = window.innerHeight /2 - genDialogHeight /2;
  }
  else if(document.documentElement.clientHeight)
  {
      windowX = document.documentElement.clientWidth /2 - genDialogWidth /2 ;
      windowY = document.documentElement.clientHeight /2 - genDialogHeight /2;
  }
  else
  {
      windowX = document.body.clientWidth/ 2 - genDialogWidth /2;
      windowY = document.body.clientHeight/2 - genDialogHeight /2;
  }

  curWindow.style.top = windowY + "px";
  curWindow.style.left = windowX + "px";
  curWindow.style.display ="" ;
  genIframe.src = url;

if(okaction && okaction != "")
  {
      okButton.style.display="";
      okButtonCol.style.display="";
      okButtonCol.style.paddingLeft="20px";
      cancelButtonCol.style.paddingRight="20px";
      okButton.onclick = okaction;
  }
  else
  {
      okButton.style.display="NONE";
      okButtonCol.style.paddingLeft="0px";
      cancelButtonCol.style.paddingRight="0px";
  }

  if(cancelText)
  {
      GenDialogCancel.value = cancelText;
  }
  else
  {
      GenDialogCancel.value = "Cancel";
  }

    }

function showBlocker()
{
    var blocker = document.getElementById("blockwindow");
    var windowX;
    var windowY;
    var blockerWidth;
    var blockerHeight;

    if(window.innerHeight)
    {
        windowX = window.innerWidth /2 - 100;;
        windowY = window.innerHeight /2 -100;
        blockerWidth = window.innerWidth;
        blockerHeight = window.innerHeight;
    }
    else if(document.documentElement.clientHeight)
    {
        windowX = document.documentElement.clientWidth /2 - 100;;
        windowY = document.documentElement.clientHeight /2 -100;
        blockerWidth = document.documentElement.clientWidth;
        blockerHeight = document.documentElement.clientHeight;
    }
    else
    {
        windowX = document.body.clientWidth/ 2 - 100;
        windowY = document.body.clientHeight/2 - 100;
        blockerWidth = document.body.clientWidth;
        blockerHeight = document.body.clientHeight;
    }


    if(blockerWidth < document.body.scrollWidth)
    {
        blockerWidth = document.body.scrollWidth;
    }

    if(blockerHeight < document.body.scrollHeight)
    {
        blockerHeight = document.body.scrollHeight;
    }

    if(window.outerWidth && blockerWidth < window.outerWidth )
    {
         blockerWidth = window.outerWidth;
    }
    blocker.style.height = blockerHeight + "px";
    blocker.style.width = blockerWidth + "px";
    blocker.style.display = "";
}

function mcastSubmitEdit()
{
	var mcastForm = document.getElementsByTagName("form").length;	
	alert(mcastForm);
}

function mcastPopupEdit(mcast_line)
{
    	var mcastEditButton = document.getElementById("mcastButton");
	var mcastSubmitButton = document.getElementById("mcastSubmitButton");
	mcastEditButton.style.display="none";
	mcastSubmitButton.style.display="block";
   	showGenDialogWindowMcast("/mpsMcastEdit.html?mps_mcast="+mcast_line, "Mcast", "", "Close", 400);
}

function mcastPopupSubmit(mcast_line)
{
	document.getElementById("hiddenMcastSubmit").click();
	var mcastEditButton = document.getElementById("mcastButton");
	var mcastSubmitButton = document.getElementById("mcastSubmitButton");
	mcastEditButton.style.display="block";
	mcastSubmitButton.style.display="none";
	//showGenDialogWindowMcast("/mpsMcast.html?mps_mcast="+mcast_line, "Mcast", mcastPopupEdit(mcast_line), "Close", 400);
        showGenDialogWindowMcast("/mpsMcast.html?mps_mcast="+mcast_line, "Mcast", "", "Close", 400);
}


 function showGenDialogWindowMcast(url,title,okaction, cancelText, height, width, closeAction)
    {
  showBlocker();
  var curWindow = document.getElementById("GenDialogWindow");
  var genIframe = document.getElementById("GenDialogIFrame");
  var okButton = document.getElementById("GenDialogOk");
  var okButtonCol = document.getElementById("GenDialogOkCol");
  var cancelButtonCol = document.getElementById("GenDialogCancelCol");
  var cancelButton = document.getElementById("GenDialogCancel");
  var titleDiv = document.getElementById("GenDialogTitle");

  titleDiv.innerHTML = title;
  if(closeAction)
      genDialogCloseAction = closeAction;
  else
      genDialogCloseAction = undefined;

  var genDialogHeight = curWindow.offsetHeight;
  var genDialogWidth =  curWindow.offsetWidth; 
  var windowX;
  var windowY;

 if(window.innerHeight)
  {
      windowX = window.innerWidth /2 - genDialogWidth / 2;
      windowY = window.innerHeight /2 - genDialogHeight /2;
  }
 else if(document.documentElement.clientHeight)
  {
      windowX = document.documentElement.clientWidth /2 - genDialogWidth /2 ;
      windowY = document.documentElement.clientHeight /2 - genDialogHeight /2;
  }
  else
  {
      windowX = document.body.clientWidth/ 2 - genDialogWidth /2;
      windowY = document.body.clientHeight/2 - genDialogHeight /2;
  }

  curWindow.style.top = windowY + "px";
  curWindow.style.left = windowX + "px";
  curWindow.style.display ="" ;
  genIframe.src = url;

if(okaction && okaction != "")
  {
      okButton.style.display="";
      okButtonCol.style.display="";
      okButtonCol.style.paddingLeft="20px";
      cancelButtonCol.style.paddingRight="20px";
      okButton.onclick = okaction;
  }
  else
  {
      okButton.style.display="NONE";
      okButtonCol.style.paddingLeft="0px";
      cancelButtonCol.style.paddingRight="0px";
  }

  if(cancelText)
  {
      GenDialogCancel.value = cancelText;
  }
  else
  {
      GenDialogCancel.value = "Cancel";
  }

    }


function edit_mcast_start(mps_mcast)
{
var mcast_url="../cgi/edit_mpsMcast.sh?mcast="+mps_mcast;

//Begin communication with status.cgi
http.open("GET", mcast_url, true);

// When the state changes call our other method
// handleHttpResponse
http.onreadystatechange = handleHttpResponse3;

http.send(null);
}


function hideWindow(windowId, loadScreen)
{
    //unhide the div that "greys out" the background
    document.getElementById(windowId).style.display = "none";
    hideBlocker();
    if (loadScreen == true)
    {
        var mainFrame = document.getElementById(windowId);
        mainFrame.src = "/loading.html";
    }

    resetLogoutTimer();

}

function mcast_increment_field(field_id, min, max, increment)
{
    var value = parseInt(document.getElementById(field_id).value);
    if(value + increment > max)
    {
        return;
    }
    value += increment;
    document.getElementById(field_id).value = value;

}

function mcast_decrement_field(field_id, min, max, decrement)
{
    var value = parseInt(document.getElementById(field_id).value);

    if(value - decrement < min)
    {
        return;
    }
    value -= decrement;
    document.getElementById(field_id).value = value;

}

function mcastSave(mcast)
{
    mcastValidation();
    var success = true;
    var curDoc;
    var curFrame = document.getElementById("McastWindowIFrame");
        if(curFrame.contentDocument)
        {
            curDoc = curFrame.contentDocument;
        }
        else
        {
            curDoc = document.frames["McastWindowIFrame"].document;
        }
  
    var mcastHide = document.getElementById("mcastHide");

    if(mcast == "single")
    {

	curDoc.mcastForm.action = "/cgi/mcast.cgi?page=McastSave&mcastButton=single&mcast=" + mcast_link_num;
        curDoc.mcastForm.submit();
    }
    else if(mcast == "all")
    {

	alert("Setting all links");
	curDoc.mcastForm.action = "/cgi/mcast.cgi?page=McastSave&mcastButton=all&mcast=" + mcast_link_num;
        curDoc.mcastForm.submit();
    }

    else
    {
	alert(mcast_link_num);

	success = false;
    }

    // on save we let the CGI app update the window otherwise if we did it
    // we may inadvertanlty cancel the CGI app while it is working
    if(success)
    {
        hideWindow('McastWindow', false);

	window.location="/cgi/mpsMcast.cgi?page=mpsMcast.tmpl";
    }
    else
    {
      hideWindow('McastWindow', false);
    }
}

function testFunc()
{
 var mcastProto = document.getElementById("protocol");
 var mcastHDLC = document.getElementById("mcast_protocol_HDLC");
 var mcastASYNC = document.getElementById("mcast_protocol_ASYNC");
 var mcastASTERIX = document.getElementById("mcast_protocol_ASTERIX");
 var mcastCD2 = document.getElementById("mcast_protocol_CD2");
 var mcastTADILB = document.getElementById("mcast_protocol_TADILB");
 var mcastSBSI = document.getElementById("mcast_protocol_SBSI");
 var mcastTHOMCSF = document.getElementById("mcast_protocol_THOM_CSF");
 var mcastTHOMTVT2 = document.getElementById("mcast_protocol_THOM_TVT2");
 var mcastTOSHIBA = document.getElementById("mcast_protocol_TOSH");

 if(mcastProto.value == "HDLC")
 {

  mcastHDLC.style.display="";
  mcastASYNC.style.display="none";
  mcastASTERIX.style.display="none";
  mcastCD2.style.display="none";
  mcastTADILB.style.display="none";
  mcastSBSI.style.display="none";
  mcastTHOMCSF.style.display="none";
  mcastTHOMTVT2.style.display="none";
  mcastTOSHIBA.style.display="none";
  defaultAttr();
 }
 else if(mcastProto.value == "ASYNC")
 {
  mcastHDLC.style.display="none";
  mcastASYNC.style.display="";
  mcastASTERIX.style.display="none";
  mcastCD2.style.display="none";
  mcastTADILB.style.display="none";
  mcastSBSI.style.display="none";
  mcastTHOMCSF.style.display="none";
  mcastTHOMTVT2.style.display="none";
  mcastTOSHIBA.style.display="none";
  defaultAttr();
 }
 else if(mcastProto.value == "ASTERIX")
 {
  mcastHDLC.style.display="none";
  mcastASYNC.style.display="none";
  mcastASTERIX.style.display="";
  mcastCD2.style.display="none";
  mcastTADILB.style.display="none";
  mcastSBSI.style.display="none";
  mcastTHOMCSF.style.display="none";
  mcastTHOMTVT2.style.display="none";
  mcastTOSHIBA.style.display="none";
  defaultAttr();
 }
 else if(mcastProto.value == "CD-2")
 {
  mcastHDLC.style.display="none";
  mcastASYNC.style.display="none";
  mcastASTERIX.style.display="none";
  mcastCD2.style.display="";
  mcastTADILB.style.display="none";
  mcastSBSI.style.display="none";
  mcastTHOMCSF.style.display="none";
  mcastTHOMTVT2.style.display="none";
  mcastTOSHIBA.style.display="none";
  defaultAttr();
 }
 else if(mcastProto.value == "TADIL-B")
 {
  mcastHDLC.style.display="none";
  mcastASYNC.style.display="none";
  mcastASTERIX.style.display="none";
  mcastCD2.style.display="none";
  mcastTADILB.style.display="";
  mcastSBSI.style.display="none";
  mcastTHOMCSF.style.display="none";
  mcastTHOMTVT2.style.display="none";
  mcastTOSHIBA.style.display="none";
  defaultAttr();
 }
 else if(mcastProto.value == "SBSI")
 {
  mcastHDLC.style.display="none";
  mcastASYNC.style.display="none";
  mcastASTERIX.style.display="none";
  mcastCD2.style.display="none";
  mcastTADILB.style.display="none";
  mcastSBSI.style.display="";
  mcastTHOMCSF.style.display="none";
  mcastTHOMTVT2.style.display="none";
  mcastTOSHIBA.style.display="none";
  defaultAttr();
 }
 else if(mcastProto.value == "thom-csf")
 {
  mcastHDLC.style.display="none";
  mcastASYNC.style.display="none";
  mcastASTERIX.style.display="none";
  mcastCD2.style.display="none";
  mcastTADILB.style.display="none";
  mcastSBSI.style.display="none";
  mcastTHOMCSF.style.display="";
  mcastTHOMTVT2.style.display="none";
  mcastTOSHIBA.style.display="none";
  defaultAttr();
 }
 else if(mcastProto.value == "thom-tvt2")
 {
  mcastHDLC.style.display="none";
  mcastASYNC.style.display="none";
  mcastASTERIX.style.display="none";
  mcastCD2.style.display="none";
  mcastTADILB.style.display="none";
  mcastSBSI.style.display="none";
  mcastTHOMCSF.style.display="none";
  mcastTHOMTVT2.style.display="";
  mcastTOSHIBA.style.display="none";
  defaultAttr();
 }
 else if(mcastProto.value == "toshiba")
 {
  mcastHDLC.style.display="none";
  mcastASYNC.style.display="none";
  mcastASTERIX.style.display="none";
  mcastCD2.style.display="none";
  mcastTADILB.style.display="none";
  mcastSBSI.style.display="none";
  mcastTHOMCSF.style.display="none";
  mcastTHOMTVT2.style.display="none";
  mcastTOSHIBA.style.display="";
  defaultAttr();
 }
 else
 {
 alert("Protocol value doesnt exist, file may be corrupt");
 }
 
}

function defaultAttr()
{
 var mcastProto = document.getElementById("protocol");
 
 if(mcastProto.value == "HDLC")
 {
 	document.getElementById("hdlc_framesize").value = 512;
	document.getElementById("hdlc_baud").value = 38400;
	document.getElementById("hdlc_encoding").value = 0;
	document.getElementById("hdlc_mode").value = "0x0000";
	document.getElementById("hdlc_modem").value = 0;
	document.getElementById("hdlc_phyIf").value = 2;
	document.getElementById("hdlc_options1").value = "0x00000004";
	document.getElementById("hdlc_timeout_baud").value = 0;	
	document.getElementById("hdlc_noclock_to").value = 5;
 }
 else if(mcastProto.value == "ASYNC")
 {
        document.getElementById("asy_bits").value = 8;
        document.getElementById("asy_parity").value = 0;
        document.getElementById("asy_stops").value = 1;
        document.getElementById("asy_baud").value = 9600;
        document.getElementById("asy_rx_timeout").value = 0;
        document.getElementById("asy_rx_number").value = 512;
        document.getElementById("asy_rx_term").value = 1;
        document.getElementById("asy_rx_tcs").value = "0x0A";
        document.getElementById("asy_use_xon_xoff").value = 1;
        document.getElementById("asy_rx_xon").value = "0x11";
        document.getElementById("asy_rx_xoff").value = "0x13";
        document.getElementById("asy_modem").value = 0;
        document.getElementById("asy_noclock_to").value = 5;
        document.getElementById("asy_phyIf").value = 2;
        document.getElementById("asy_sendOnlyGoodData").value = 0;
        document.getElementById("asy_dl_options1").value = 0;
 }
 else if(mcastProto.value == "ASTERIX")
 {
        document.getElementById("rdr_max_messages").value = 1;
        document.getElementById("rdr_message_timeout").value = 30;
        document.getElementById("rdr_data_acks").value = 1;
        document.getElementById("rdr_options1").value = "0x00000004";
        document.getElementById("as_framesize").value = 512;
        document.getElementById("as_baud").value = 19200;
        document.getElementById("as_encoding").value = 0;
        document.getElementById("as_modem").value = 0;
        document.getElementById("as_phyIf").value = 2;
        document.getElementById("as_timeout_baud").value = 0;
        document.getElementById("as_fwd_time").value = 30;
        document.getElementById("as_noclock_to").value = 5;
 }
 else if(mcastProto.value == "CD-2")
 {
        document.getElementById("rdr_max_messages").value = 1;
        document.getElementById("rdr_message_timeout").value = 30;
        document.getElementById("rdr_data_acks").value = 1;
        document.getElementById("rdr_options1").value = "0x00000004";
        document.getElementById("cd_baud").value = 9600;
        document.getElementById("cd_timeout_baud").value = 0;
        document.getElementById("cd_maxmesg_size").value = 200;
        document.getElementById("cd_maxmesg_cnt").value = 1;
        document.getElementById("cd_fwd_time").value = 30;
        document.getElementById("cd_dma_blocksize").value = 512;
        document.getElementById("cd_invert").value = 0;
        document.getElementById("cd_idle_pattern").value = "0x03FF";
        document.getElementById("cd_modem_in").value = 0;
        document.getElementById("cd_sigtimeout").value = 10;
        document.getElementById("cd_phyIf").value = 2;
        document.getElementById("cd_encoding").value = 0;
        document.getElementById("cd_noclock_to").value = 5;
 }
 else if(mcastProto.value == "TADIL-B")
 {
        document.getElementById("tadilb_baud_rate").value = 9600;
        document.getElementById("tadilb_maxmesg_size").value = 128;
        document.getElementById("tadilb_dma_blocksize").value = 128;
        document.getElementById("tadilb_idle_char").value = "0x0055";
        document.getElementById("tadilb_encoding").value = 0;
        document.getElementById("tadilb_modem_in").value = 0;
        document.getElementById("tadilb_data_acks").value = 1;
        document.getElementById("tadilb_phyIf").value = 2;
        document.getElementById("tadilb_timeout_baud").value = 0;
        document.getElementById("tadilb_data_group_num").value = 6;
        document.getElementById("tadilb_check_group_type").value = 0;
        document.getElementById("tadilb_som").value = "0x0000";
        document.getElementById("tadilb_options1").value = 0;
        document.getElementById("tadilb_wanprot_options1").value = "0x00000004";
        document.getElementById("tadilb_num_idles_sent").value = 0;
        document.getElementById("tadilb_noclock_to").value = 5;
 }
 else if(mcastProto.value == "SBSI")
 {
        document.getElementById("sbsi_dl_max_frame").value = 512;
        document.getElementById("sbsi_dl_baud_rate").value = 38400;
        document.getElementById("sbsi_dl_rualive").value = 30;
        document.getElementById("sbsi_dl_data_acks").value = 1;
        document.getElementById("sbsi_dl_dump_idles").value = 1;
        document.getElementById("sbsi_dl_idlechar").value = "0xFF";
        document.getElementById("sbsi_dl_TxBitOrder").value = 0;
        document.getElementById("sbsi_dl_RxBitOrder").value = 0;
        document.getElementById("sbsi_dl_modem_out").value = 0;
        document.getElementById("sbsi_dl_modem_in").value = 0;
        document.getElementById("sbsi_dl_sigtimeout").value = 10;
        document.getElementById("sbsi_dl_phyIf").value = 2;
        document.getElementById("sbsi_dl_encoding").value = 0;
        document.getElementById("sbsi_dl_options1").value = "0x02000000";
        document.getElementById("sbsi_dl_noclock_to").value = 5;
 }  
 else if(mcastProto.value == "thom-csf")
 {
        document.getElementById("rdr_max_messages").value = 1;
        document.getElementById("rdr_message_timeout").value = 30;
        document.getElementById("rdr_data_acks").value = 1;
        document.getElementById("rdr_options1").value = "0x00000004";
        document.getElementById("tc_baud").value = 9600;
        document.getElementById("tc_timout_baud").value = 0;
        document.getElementById("tc_maxmesg_size").value = 256;
        document.getElementById("tc_maxmesg_cnt").value = 1;
        document.getElementById("tc_fwd_time").value = 30;
        document.getElementById("tc_dma_blocksize").value = 512;
        document.getElementById("tc_sync").value = "0x32";
        document.getElementById("tc_check_crc").value = 1;
        document.getElementById("tc_modem_in").value = 0;
        document.getElementById("tc_sigtimeout").value = 10;
        document.getElementById("tc_phyIf").value = 2;
        document.getElementById("tc_encoding").value = 0;
        document.getElementById("tc_noclock_to").value = 5;
        document.getElementById("tc_hdr1").value = "0x01";
        document.getElementById("tc_hdr2").value = "0x02";
 }
 else if(mcastProto.value == "thom-tvt2")
 {
        document.getElementById("rdr_max_messages").value = 1;
        document.getElementById("rdr_message_timeout").value = 30;
        document.getElementById("rdr_data_acks").value = 1;
        document.getElementById("rdr_options1").value = "0x00000004";
        document.getElementById("tc_baud").value = 9600;
        document.getElementById("tc_timout_baud").value = 0;
        document.getElementById("tc_maxmesg_size").value = 256;
        document.getElementById("tc_maxmesg_cnt").value = 1;
        document.getElementById("tc_fwd_time").value = 30;
        document.getElementById("tc_dma_blocksize").value = 512;
        document.getElementById("tc_sync").value = "0x16";
        document.getElementById("tc_check_crc").value = 1;
        document.getElementById("tc_modem_in").value = 0;
        document.getElementById("tc_sigtimeout").value = 10;
        document.getElementById("tc_phyIf").value = 2;
        document.getElementById("tc_encoding").value = 0;
        document.getElementById("tc_noclock_to").value = 5;
 } 
 else if(mcastProto.value == "toshiba")
 {
        document.getElementById("rdr_max_messages").value = 1;
        document.getElementById("rdr_message_timeout").value = 30;
        document.getElementById("rdr_data_acks").value = 1;
        document.getElementById("rdr_options1").value = "0x00000004";
        document.getElementById("tc_baud").value = 9600;
        document.getElementById("tc_timout_baud").value = 0;
        document.getElementById("tc_maxmesg_size").value = 256;
        document.getElementById("tc_maxmesg_cnt").value = 1;
        document.getElementById("tc_fwd_time").value = 30;
        document.getElementById("tc_dma_blocksize").value = 512;
        document.getElementById("tc_sync").value = "0x32";
        document.getElementById("tc_check_crc").value = 1;
        document.getElementById("tc_time_delay").value = 20;
        document.getElementById("tc_modem_in").value = 0;
        document.getElementById("tc_sigtimeout").value = 10;
        document.getElementById("tc_phyIf").value = 2;
        document.getElementById("tc_encoding").value = 0;
        document.getElementById("tc_noclock_to").value = 5;
 }
 else
 {
 alert("Protocol value doesnt exist, file may be corrupt");
 }
}

function mcastResetLinks()
{
	var rLinks = window.confirm("Are you sure you would like to reset all links?");
	if (rLinks == true) 
	{

		window.location="/cgi/mpsMcast.cgi?page=mpsMcast.tmpl&mcastDefault=setDefault";
	}
}

 function mcastValidation()
 {

 	var mcastProto = document.getElementById("protocol");
	var mcastError = [];

 	if(mcastProto.value == "HDLC")
 	{
		if(document.getElementById("hdlc_framesize").value < 8 || document.getElementById("hdlc_framesize").value > 5120)
		{
			mcastError.push("HDLC framesize must be greater than 8, less than 5120");
		}

	}


	if(mcastError[0] != null)
	{
		alert(mcastError[0]);
		mcastError.length = 0;
		return;
	}
 }
