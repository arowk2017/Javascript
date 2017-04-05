function alertsize(pixels){
    pixels+=32;
    document.getElementById("mainContent").style.height=pixels+"px";
}

function hideTabs() {
    
    document.getElementById("userAccount").style.display = "none";
    document.getElementById("userReg").style.display = "none";
	document.getElementById("userLogin").style.display = "none";
	
}
//PAGE GOES BACK TO TOP
function myFrameLoaded() {
	
      var myFrame = document.getElementById("mainContent");
      if(myFrame) {
            myFrame.height = "";
            myFrame.height = myFrame.contentWindow.document.body.scrollHeight + "px";
	  }
       
	  
  }
  //PAGE STAYS PUT
  function myFrameLoadedMessage() {
	
      var myFrame = document.getElementById("mainContent");
      if(myFrame) {
           
            myFrame.height = myFrame.contentWindow.document.body.scrollHeight + "px";
	  }
       
	  
  }
  
  function clearSignIn(){
        var userName = document.getElementById("username");
		var passwd = document.getElementById("password");
        userName.value = "";
		passwd.value = "";
		$("a.dropdown-toggle").dropdown("toggle");
    }
	
  function verifySignIn(){
        var userName = document.getElementById("username");
		var passwd = document.getElementById("password");
        if(userName.value == "" || passwd.value == "")
		{
			alert("Please enter Username and Password");
			return false;
		}
    }
	
	  function popMemberUnregistered(){
		  
		  alert("Please register or sign in to view profile.");

	  
  }
  
  function popListingUnregistered(){
		  
		  alert("Please register or sign in to view listing.");

	  
  }

      function popMember(pro_id){
	  var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var arr = eval('(' + xmlhttp.responseText + ')');
				document.getElementById("popMemberUserName").innerHTML = arr[0];
				document.getElementById("popMemberAge").innerHTML = arr[1];
				document.getElementById("popMemberSex").innerHTML = arr[2];
				document.getElementById("popMemberLocation").innerHTML = arr[3];
				document.getElementById("popMemberAbout").innerHTML = arr[4];
				document.getElementById("popMemberImage0").innerHTML = arr[5];

				document.getElementById("popMessageName").innerHTML = arr[0]; 
				document.getElementById("popMessagePic").innerHTML = arr[6];
            }
        };
        xmlhttp.open("GET", "../scripts/popMember.php?pro_id=" + pro_id, true);
        xmlhttp.send();
	  $("#popMember").modal("toggle");
	  $("#popMemberMessageid").val(pro_id);
	    
	  
  }
  
  function popUser(pro_id){
	  var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var arr = eval('(' + xmlhttp.responseText + ')');
				document.getElementById("popUserName").innerHTML = arr[0];
				document.getElementById("popUserAge").innerHTML = arr[1];
				document.getElementById("popUserSex").innerHTML = arr[2];
				document.getElementById("popUserLocation").innerHTML = arr[3];
				document.getElementById("popUserAbout").innerHTML = arr[4];
				document.getElementById("popUserImage0").innerHTML = arr[5];
				
            }
        };
        xmlhttp.open("GET", "../scripts/popMember.php?pro_id=" + pro_id, true);
        xmlhttp.send();
	  $("#popUser").modal("toggle");
	  
	  
  }
  
  function popUserSample(pro_id){
	  var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var arr = eval('(' + xmlhttp.responseText + ')');
				document.getElementById("popUserName").innerHTML = arr[0];
				document.getElementById("popUserAge").innerHTML = arr[1];
				document.getElementById("popUserSex").innerHTML = arr[2];
				document.getElementById("popUserLocation").innerHTML = arr[3];
				document.getElementById("popUserAbout").innerHTML = arr[4];
				document.getElementById("popUserImage0").innerHTML = arr[5];
				
            }
        };
        xmlhttp.open("GET", "./scripts/popMember.php?pro_id=" + pro_id, true);
        xmlhttp.send();
	  $("#popUser").modal("toggle");
	  
	  
  }
  
    function popListView(list_id, list_name){

		var popListingContent = document.getElementById("popListingContent");
		document.getElementById("listHeader").innerHTML = list_name;
		popListingContent.src = "../main/mainPopListing.php?list_id=" + list_id;
	  $("#popHostList").modal("toggle"); 
	  
	  
  }
  
    function renderModal(selector, html, options) {
  var parent = "body",
      $this = $(parent).find(selector);

  options = options || {};
  options.width = options.width || "auto";

  if ($this.length == 0) {
    var selectorArr = selector.split(".");
	var $wrapper = $('<div class="modal hide fade ' + selectorArr[selectorArr.length-1] + '"></div>').append(html);
    $this = $wrapper.appendTo(parent);
    $this.modal();
  } else {
    $this.html(html).modal("show");
  }

  $this.css({
    width: options.width,
    "margin-left": function () {
      return -($(this).width() / 2);
    }
  });
}

function verifyMessage(){
	var messageSubject = document.getElementById("memberMessageSubject");
		var messageBody = document.getElementById("memberMessage");
		
		if( messageSubject.value == "")
		{
			messageSubject.value = "No Subject";
		}
		
		if( messageBody.value == "")
		{
			$("#memberMessage").focus();
			alert("Message body cannot be blank.");
			return false;
		}
		else
		{
			return true;
        }
  }
  
  function verifyMessageRead(){
	var messageSubject = document.getElementById("memberMessageSubjectRead");
		var messageBody = document.getElementById("memberMessageRead");
		
		if( messageSubject.value == "")
		{
			messageSubject.value = "No Subject";
		}
		
		if( messageBody.value == "")
		{
			$("#memberMessageRead").focus();
			alert("Message body cannot be blank.");
			return false;
		}
		else
		{
			return true;
        }
  }
  
  function sendMessage() {
	  
	  $("#messageForm").submit(function(e) {

          e.preventDefault();
		  
		  if (verifyMessage())
		  {
			$.ajax({
				type: "POST",
				url: "../scripts/sendMessage.php",
				data:  $(this).serialize(), 
				success: function () {alert( "Your message has been sent." ); 
				$("#popMemberMessage").modal("toggle"); 
				$("#messageForm").find("input[type=text], textarea").val("");}

				});
				
		  }
		  return false;
		}); 
	  
  }
  
  function sendMessageRead() {
	  
	  $("#messageFormRead").submit(function(e) {

          e.preventDefault();
		  
		  if (verifyMessageRead())
		  {
			$.ajax({
				type: "POST",
				url: "../scripts/sendMessageRead.php",
				data:  $(this).serialize(), 
				success: function () {alert( "Your message has been sent." ); 
				 window.location = '../main/mainMessage.php';
				$("#messageFormRead").find("input[type=text], textarea").val("");}

				});
				return true;
		  }
		  
		}); 
	  
  }

  	function verifyPassReg()
	{	
		var pass1 = document.getElementById('regPass');
		var pass2 = document.getElementById('regPass2');
		var regEmail = document.getElementById('regEmail');
		var regUser = document.getElementById('regUser');
		
		
		if (regEmail.value == "")
		{
			$("#regEmail").focus();
			alert('Email cannot be blank');
			return false;
		}
		
		if (regUser.value == "")
		{
			$("#regUser").focus();
			alert('Username cannot be blank');
			return false;
		}
		
		if (regUser.value.length > 16)
		{
			$("#regUser").focus();
			alert('Username cannot be more than 16 characters');
			return false;
		}
		
		if ((pass1.value == "") || (pass2.value == ""))
		{
		
			if (pass1.value == "")
			{
				$("#regPass").focus();
			
			}
		
			if (pass2.value == "")
			{
				$("#regPass2").focus();
			
			}
			alert('Password cannot be blank');
			return false;
		}
		
		if (!(pass1.value == pass2.value))
		{
			
			alert('passwords are not identical');
			return false;
		}
		else
			return true;
    }
	
	function verifyPassNew()
	{	
		var oldPass = document.getElementById('oldPass');
		var newPass = document.getElementById('newPass');
		var newPass2 = document.getElementById('newPass2');
		
		
		if (oldPass.value == "")
		{
			$("#oldPass").focus();
			alert('Old password cannot be blank');
			return false;
		}
		
		if (newPass.value == "")
		{
			$("#newPass").focus();
			alert('New password cannot be blank');
			return false;
		}
		
		if (newPass2.value == "")
		{
			$("#newPass2").focus();
			alert('New password cannot be blank');
			return false;
		}
		
		if ((oldPass.value == "") || (newPass.value == "") || (newPass2.value == ""))
		{
		
			if (oldPass.value == "")
			{
				$("#oldPass").focus();
			
			}
		
			if (newPass.value == "")
			{
				$("#newPass").focus();
			
			}
			
			if (newPass2.value == "")
			{
				$("#newPass2").focus();
			
			}
			alert('Password cannot be blank');
			return false;
		}
		
		if (!(newPass.value == newPass2.value))
		{
			
			alert('Passwords are not identical');
			return false;
		}
		else
			return true;
    }

	function verifyProEdit(){
        var fileUpload = $("input[type='file']");
        if (parseInt(fileUpload.get(0).files.length)>4){
         alert("You can only upload a maximum of 4 files");
        }
    }
	
		function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#userImage').attr('src', e.target.result).width(200).height(200);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

  function getFileName(s)
{
var sp = s.split('\\');
var file = sp[sp.length-1];
return file;
}

	 function verifyEmail(){
        var userEmail = document.getElementById('userEmail');
        if(userEmail.value == '')
		{
			alert('Please enter Email');
			return false;
		}
    }
	
function changePass()
{
$("#popChangePass").modal("toggle");
}
	
function changePic()
{
$("#popChangePic").modal("toggle");
}	

function viewPlans()
{
$("#showPlans").modal("toggle");
}	
	
function editProfileVerify()
{
	var proAge = document.getElementById('proAge');
		var proLocation = document.getElementById('proLocation');
		var proAbout = document.getElementById('proAbout');
		var fileInput = document.getElementById('userPic');
		
		//USE verifyProEdit() FOR 4 PICS
		
		
		
		if ((proAge.value == "") || (proLocation.value == "") || !($('#userPic').get(0).files.length == 0))
		{
		
			if (proAge.value == "")
			{
				$("#proAge").focus();
				alert('Age cannot be blank');
				return false;
			}
		
			if (proLocation.value == "")
			{
				$("#proLocation").focus();
				alert('Home Country cannot be blank');
				return false;
			}
		
			if (!fileInput.files[0].name.match(/\.(jpg|jpeg|png)$/))
			{
				alert('not an image');
				return false;
			}
			else
			{
				
				document.getElementById('imageSelect').value = "0";
			}
			
		}
		else
		{
			document.getElementById('imageSelect').value = "blank";
			return true;
		}
}

function deleteChecked() 
{
	$('#messageDelete').click(function(e) {
	
		var checkBoxChecked = $('input:checked').length;
		if(checkBoxChecked)
		{
			var deleteCheck = [];
			$('input:checkbox').each(function(){
				
				var deleteRow = $(this);
				
				if(deleteRow.is(':checked')){
					var deleteRow_id = deleteRow.attr('id');
		var deleteRow_idNew = deleteRow_id.substr(deleteRow_id.indexOf('_') + 1);
					deleteCheck.push(deleteRow_idNew);
				}
		
			}); 

  
			$.ajax({
				type: "POST",
				url: "../scripts/deleteMessages.php",
				data:  { deleteChecked : deleteCheck }, 
				success: function () {top.location = '../indexes/indexMessageUpdate.php' }
			});
		}
		else
		{
			alert("Please select a message to delete.");
		}
  });
}

function deleteCheckedSent() 
{
	$('#messageDelete').click(function(e) {
	
		var checkBoxChecked = $('input:checked').length;
		if(checkBoxChecked)
		{
			var deleteCheck = [];
			$('input:checkbox').each(function(){
				
				var deleteRow = $(this);
				
				if(deleteRow.is(':checked')){
					var deleteRow_id = deleteRow.attr('id');
		var deleteRow_idNew = deleteRow_id.substr(deleteRow_id.indexOf('_') + 1);
					deleteCheck.push(deleteRow_idNew);
				}
		
			}); 
		
  
			$.ajax({
				type: "POST",
				url: "../scripts/deleteMessagesSent.php",
				data:  { deleteChecked : deleteCheck }, 
				success: function () {top.location = '../indexes/indexMessageUpdateSent.php' }
			});
		}
		else
		{
			alert("Please select a message to delete.");
		}
  });
}

function deselect_all()
    {
      $('input:checkbox').removeAttr('checked');
     
	}

   function select_all()
    {
      $('input:checkbox').attr('checked', 'checked');
     
	}

	function clickMessage()
	{
		//PROFILE DISPLAY
		$('.clickMessage td:nth-child(2)').click(function(e) {

				
		var pop_id = this.id;
		var new_pop = pop_id.substr(pop_id.indexOf('_') + 1);
		
		window.parent.popMember(new_pop);
		});
		
		$('.clickMessage td:nth-child(3)').click(function(e) {
		
		var mess_id = this.id;
		var new_mess = mess_id.substr(mess_id.indexOf('_') + 1);
		
		window.location = '../main/mainMessageRead.php?mess_id=' + new_mess;
		
		});
		
		$('.clickMessage td:nth-child(4)').click(function(e) {
		
		var mess_id = this.id;
		var new_mess = mess_id.substr(mess_id.indexOf('_') + 1);
		
		window.location = '../main/mainMessageRead.php?mess_id=' + new_mess;
		
		});
		
		$('.clickMessage td:nth-child(5)').click(function(e) {
		
		var mess_id = this.id;
		var new_mess = mess_id.substr(mess_id.indexOf('_') + 1);
		
		window.location = '../main/mainMessageRead.php?mess_id=' + new_mess;
		
		});
	}
	
function clickMessageSent()
	{
		//PROFILE DISPLAY
		$('.clickMessageSent td:nth-child(2)').click(function(e) {

		var pop_id = this.id;
		var new_pop = pop_id.substr(pop_id.indexOf('_') + 1);
		
		window.parent.popMember(new_pop);
		});
		
		$('.clickMessageSent td:nth-child(3)').click(function(e) {

		var mess_id = this.id;
		var new_mess = mess_id.substr(mess_id.indexOf('_') + 1);
		
		window.location = '../main/mainMessageRead.php?mess_id=' + new_mess;
		
		});
		
		$('.clickMessageSent td:nth-child(4)').click(function(e) {

		var mess_id = this.id;
		var new_mess = mess_id.substr(mess_id.indexOf('_') + 1);
		
		window.location = '../main/mainMessageRead.php?mess_id=' + new_mess;
		
		});
	}
	
function loadMorePages(totalPages, mess_id, time_zone)
{
	
	var userClicks = 0; 
  
	if(userClicks >= totalPages - 1) 
            {
                $('#loadButton').hide();
            }
     
    $('#results').load('../scripts/fetchMessagePage.php', {'page': userClicks, 'sender_id': mess_id, 'time_zone': time_zone }, function() {window.parent.myFrameLoaded(); userClicks++;}); 


    $('#loadButton').click(function (e){ 
		
        $(this).hide(); 
        $('.animation_image').show(); 

        if(userClicks <= totalPages) 
        {
            
            $.post('../scripts/fetchMessagePage.php',{ 'page': userClicks, 'sender_id': mess_id, 'time_zone': time_zone }, function(data) {
            
                $('#loadButton').show(); 
				
                
                $('#results').append(data); 
                
                
                $('.animation_image').hide(); 
    
				
                userClicks++; 
				window.parent.myFrameLoadedMessage();
            
            }).fail(function(xhr, ajaxOptions, thrownError) { 
               
                $('#loadButton').show(); 
                $('.animation_image').hide(); 
            });
		
		
	
            
            if(userClicks >= totalPages - 1) 
            {
                $('#loadButton').attr('disabled', 'disabled');
				document.getElementById('loadButton').style.visibility = 'hidden';
            }
         }
          
	
        });

}

function callClass(callClass, callFunction)
{
	
	$.post('../scripts/callClass.php',{ 'callClass': callClass, 'callFunction': callFunction } );
	
}

function checkUnread()
{
	
	$.ajax({
				type: "POST",
				url: "../scripts/setUnreadMessages.php", 
				success: function (data) {  
				
				if (!(data.value =="") && !(0 === data.length))
				{
					
					document.getElementById('notify_num1').innerHTML = data;
					document.getElementById('notify_num2').innerHTML = data;
					$('#notify_num1, #notify_num2').show();
				}
				else{
					$('#notify_num1, #notify_num2').hide();
					
					
				}
			}
			});
	
}

function deleteCheckedImage() 
{
	$('#imageDelete').click(function(e) {
		e.preventDefault();
		var checkBoxChecked = $('input:checked').length - 1;
		if(checkBoxChecked)
		{
			var deleteCheck = [];
			$('input:checkbox').each(function(){
				
				var deleteRow = $(this);
				
				if(deleteRow.is(':checked')){
					var deleteRow_id = deleteRow.attr('id');
		var deleteRow_idNew = deleteRow_id.substr(deleteRow_id.indexOf('_') + 1);
		
					deleteCheck.push(deleteRow_idNew);
				}
		
			}); 
		
  
  $('.animation_image').show();
			$.ajax({
				type: "POST",
				url: "../scripts/deleteImages.php",
				data:  { deleteChecked : deleteCheck }, 
				success: function () {window.location = '../main/mainEditPro.php' }
			});
		}
		else
		{
			alert("Please select an image to delete.");
			return false;
		}
  });
}

function setCalendar(){
		  
		var nowTemp = new Date();
		var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
		
		var checkin = $("#searchDateIn").datepicker({
			startDate: now,
			autoclose: true
		});
		
		var checkin2 = $("#searchDateIn2").datepicker({
			startDate: now,
			autoclose: true
		});
	
  }
  
 function setLocation()
{

	$("#searchLoc").geocomplete({
	details: "form",
    types: ["geocode", "establishment"]});
	
}


function deleteImage() 
{
	$('#imageDelete').click(function(e) {
		e.preventDefault();
		
		
		var deleteConfirm = confirm("Are you sure you want to delete this Image?");
		if (deleteConfirm == true) 
		{
			var deleteCheck = [];
			 deleteCheck.push(0);
			$('.animation_image').show();
			$.ajax({
				type: "POST",
				url: "../scripts/deleteImages.php",
				data:  { deleteChecked : deleteCheck }, 
				success: function () {window.location = '../main/mainEditPro.php' }
			});
		} 
		
			
		
  });
}

function showBedroom(room)
{
	hideBedroom();
	
	
	if (room)
	{
	switch (parseInt(room)) 
	{
    case 1:
        $('#bedroom1').show();
        break;
    case 2:
		$('#bedroom1').show();
        $('#bedroom2').show();
        break;
    case 3:
		$('#bedroom1').show();
        $('#bedroom2').show();
        $('#bedroom3').show();
        break;
    case 4:
		$('#bedroom1').show();
        $('#bedroom2').show();
        $('#bedroom3').show();
        $('#bedroom4').show();
        break;        
	}
	}
	else 
	{
		var hostRoom = document.getElementById('hostRoom');
		
		switch (parseInt(hostRoom.value)) 
	{
    case 1:
        $('#bedroom1').show();
        break;
    case 2:
		$('#bedroom1').show();
        $('#bedroom2').show();
        break;
    case 3:
		$('#bedroom1').show();
        $('#bedroom2').show();
        $('#bedroom3').show();
        break;
    case 4:
		$('#bedroom1').show();
        $('#bedroom2').show();
        $('#bedroom3').show();
        $('#bedroom4').show();
        break; 
	}
	}
	
	window.parent.myFrameLoaded();
}

function hideBedroom()
{
		
	$('#bedroom1').hide();
	$('#bedroom2').hide();
	$('#bedroom3').hide();
	$('#bedroom4').hide();
}

function changPicVerify()
{
	
		var fileInput = document.getElementById('userMyPic');
		
		//USE verifyProEdit() FOR 4 PICS
		
		
		
		if (!($('#userMyPic').get(0).files.length == 0))
		{
				
			if (!fileInput.files[0].name.match(/\.(jpg|jpeg|png)$/))
			{
				alert('not an image');
				return false;
			}
						
		}
		else
		{
			alert('Please choose an image.');
			return false;
		}
}

function deleteCheckedImageUpload() 
{
	$('#imageDelete').click(function(e) {
		e.preventDefault();
		var checkBoxChecked = $('input:checked').length;
		
		
		if(checkBoxChecked)
		{
			var deleteCheck = [];
			$('input:checkbox').each(function(){
				
				var deleteRow = $(this);
				
				if(deleteRow.is(':checked')){
					var deleteRow_id = deleteRow.attr('id');
		var deleteRow_idNew = deleteRow_id.substr(deleteRow_id.indexOf('_') + 1);
		
					deleteCheck.push(deleteRow_idNew);
				}
		
			}); 
		
  
  $('.animation_image').show();
			$.ajax({
				type: "POST",
				url: "../scripts/deleteImages.php",
				data:  { deleteChecked : deleteCheck }, 
				success: function () {window.location = '../main/mainChangePic.php' }
			});
		}
		else
		{
			alert("Please select an image to delete.");
			return false;
		}
  });
}


function popMessage(pro_id){
	  var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var arr = eval('(' + xmlhttp.responseText + ')');
				
				document.getElementById("listMessageName").innerHTML = arr[0] + "'s Homestay"; 
				document.getElementById("listMessagePic").innerHTML = arr[2];
            }
        };
        xmlhttp.open("GET", "../scripts/popList.php?pro_id=" + pro_id, true);
        xmlhttp.send();
	  $("#popListMessage").modal("toggle");
	  $("#popListMessageId").val(pro_id);
	    
	  
  }
  
  
  function clickList()
	{
		//PROFILE DISPLAY
		
		$(document).on('click', '.clickable-row td:nth-child(1)', function (e) {	
			var pop_id = this.id;
			var new_pop = pop_id.substr(pop_id.indexOf('_') + 1);
			window.location = '../main/mainListingView.php?user_id=' + new_pop;
		});
		
			$(document).on('click', '.clickable-row td:nth-child(2)', function (e) {
			var pop_id = this.id;
			var new_pop = pop_id.substr(pop_id.indexOf('_') + 1);
			window.location = '../main/mainListingView.php?user_id=' + new_pop;
		});
	}
	
	  function clickListView()
	{
		
		$(document).on('click', '.clickable', function (e) {
		
		var pop_id = this.id;
			var new_pop = pop_id.substr(pop_id.indexOf('_') + 1);
			window.location = '../main/mainListingView.php?user_id=' + new_pop;
		
		});    
		
		$('#listViewDrop li').on('click', function(){
			
			
		if ($(this).text() == "Map")
		{
			
			$('#gridView').hide();
			$('#listView').hide();
			
		}
		else if ($(this).text() == "Grid")
		{
			
			if ($('#listPage').val() == "")
			{
				
				var listPage = 1;
			}
			else
			{
				var listPage = $('#listPage').val();
			}
			
			window.location = '../main/mainHostSearchLoggedIn.php?view=grid&page=' + listPage;
			
		}
		else
		{
			if ($('#listPage').val() == "")
			{
				
				var listPage = 1;
			}
			else
			{
				var listPage = $('#listPage').val();
			}
			window.location = '../main/mainHostSearchLoggedIn.php?page=' + listPage;

			
		}
			document.getElementById("listViewShow").innerHTML = $(this).text() + ' <span class="caret"></span>';
		
		return false;
		myFrameLoadedMessage();
		});
		
		
	}
	
	function clickListViewStudent()
	{
		
		$(document).on('click', '.clickable', function (e) {
		
		var pop_id = this.id;
			var new_pop = pop_id.substr(pop_id.indexOf('_') + 1);
			window.location = '../main/mainListingView.php?user_id=' + new_pop;

		});    
		
		$('#listViewDrop li').on('click', function(){
			
			
			
		if ($(this).text() == "Map")
		{
			
			$('#gridView').hide();
			$('#listView').hide();
			
		}
		else if ($(this).text() == "Grid")
		{
			
			if ($('#listPage').val() == "")
			{
				
				var listPage = 1;
			}
			else
			{
				var listPage = $('#listPage').val();
			}
			
			window.location = '../main/mainStudentSearchLoggedIn.php?view=grid&page=' + listPage;

			
		}
		else
		{
			if ($('#listPage').val() == "")
			{
				
				var listPage = 1;
			}
			else
			{
				var listPage = $('#listPage').val();
			}
			window.location = '../main/mainStudentSearchLoggedIn.php?page=' + listPage;

			
		}
			document.getElementById("listViewShow").innerHTML = $(this).text() + ' <span class="caret"></span>';
		
		return false;
		myFrameLoadedMessage();
		});
		
		
	}
	
	function clickListViewUnregistered()
	{
		
		
		  $(document).on('click', '.clickable', function (e) {
				popListingUnregistered();
		});  
		
		$('#listViewDrop li').on('click', function(){
			
			
			
		if ($(this).text() == "Map")
		{

			$('#gridView').hide();
			$('#listView').hide();
			
		}
		else if ($(this).text() == "Grid")
		{
			
			if ($('#listPage').val() == "")
			{
				
				var listPage = 1;
			}
			else
			{
				var listPage = $('#listPage').val();
			}
			
			window.location = '../main/mainHostSearch.php?view=grid&page=' + listPage;

			
		}
		else
		{
			if ($('#listPage').val() == "")
			{
				
				var listPage = 1;
			}
			else
			{
				var listPage = $('#listPage').val();
			}
			
			window.location = '../main/mainHostSearch.php?page=' + listPage;

			
		}
			document.getElementById("listViewShow").innerHTML = $(this).text() + ' <span class="caret"></span>';
		
		return false;
		myFrameLoadedMessage();
		});
		
		
	}
	
	function clickListViewStudentUnregistered()
	{
		
		
		  $(document).on('click', '.clickable', function (e) {
				popListingUnregistered();
		});  
		
		$('#listViewDrop li').on('click', function(){
			
			
			
		if ($(this).text() == "Map")
		{

			$('#gridView').hide();
			$('#listView').hide();
			
		}
		else if ($(this).text() == "Grid")
		{
			
			if ($('#listPage').val() == "")
			{
				
				var listPage = 1;
			}
			else
			{
				var listPage = $('#listPage').val();
			}
			
			window.location = '../main/mainStudentSearch.php?view=grid&page=' + listPage;
			
		}
		else
		{
			if ($('#listPage').val() == "")
			{
				
				var listPage = 1;
			}
			else
			{
				var listPage = $('#listPage').val();
			}
			window.location = '../main/mainStudentSearch.php?page=' + listPage;

			
		}
			document.getElementById("listViewShow").innerHTML = $(this).text() + ' <span class="caret"></span>';
		
		return false;
		myFrameLoadedMessage();
		});
		
		
	}
	
	//Google Maps radius
	function drawCircle(longitude, latitude)
	{
		
		var userLatLng = new google.maps.LatLng(parseInt(latitude), parseInt(longitude));
		
		var myOptions = {
		  zoom : 16,
		  center : userLatLng,
		  mapTypeId : google.maps.MapTypeId.ROADMAP
		}
		var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
		
		new google.maps.Marker({map: mapObject, position: userLatLng });
		
		var circle = new google.maps.Circle({
		  center: userLatLng,
		  radius: 16093,
		  map: mapObject,
		  fillColor: '#0000FF',
		  fillOpacity: 0.5,
		  strokeColor: '#0000FF',
		  strokeOpacity: 1.0
		});
		mapObject.fitBounds(circle.getBounds());
		
}

function homeClick()
	{
		//PROFILE DISPLAY
		$('#overImageButton2').click(function(e) {
			
			
			window.location = 'mainHostSearch.php';
		});
		
		$('#viewPlans').click(function(e) {
			
			window.location = 'mainRegistration.php';
		});
	}
	
function asyncCss(logged)
{
	var resource = document.createElement('link'); 
	var head = document.getElementsByTagName('head')[0];
	
	switch (logged) 
	{
    case 1:
	
		  resource.setAttribute("rel", "stylesheet");
		  resource.setAttribute("href","./css/pageStyle.css");
		  resource.setAttribute("type","text/css");     
		  resource.setAttribute("media","all");		  
		  head.appendChild(resource);
        break;
    case 2:
		  resource.setAttribute("rel", "stylesheet");
		  resource.setAttribute("href","./css/pageStyle.css");
		  resource.setAttribute("type","text/css");   
		  resource.setAttribute("media","all");	
		  head.appendChild(resource);
        break;
    case 3:
		//
        break;
    case 4:
		//
        break; 
	}
}

function hostSearchFilterLoggedIn(){
	
	
	
	$("#searchForm").submit(function(e) {
$('.animation_image').show(); 
          e.preventDefault();
		  
		  
			$.ajax({
				type: "POST",
				url: "../scripts/hostSearchFilterLoggedIn.php",
				data:  $(this).serialize(), 
				success: function (data) {
					
				$('.animation_image').hide(); 
				$('#searchPageDefault').hide();
				document.getElementById("listView").innerHTML = data;
				
				window.parent.myFrameLoaded();
				}
			
		}); 
	
	 });
	 
  }
	
function hostSearchFilter(){
	
	
	
	$("#searchForm").submit(function(e) {
$('.animation_image').show(); 
          e.preventDefault();
		  
		  
			$.ajax({
				type: "POST",
				url: "../scripts/hostSearchFilter.php",
				data:  $(this).serialize(), 
				success: function (data) {
					
				$('.animation_image').hide(); 
				$('#searchPageDefault').hide();
				document.getElementById("listView").innerHTML = data;
				
				window.parent.myFrameLoaded();
				}
	
		}); 
	 
	 });
	 
  }

  
  function studentSearchFilterLoggedIn(){
	
	
	
	$("#searchForm").submit(function(e) {
$('.animation_image').show(); 
          e.preventDefault();
		  
			$.ajax({
				type: "POST",
				url: "../scripts/StudentSearchFilterLoggedIn.php",
				data:  $(this).serialize(), 
				success: function (data) {
					
				$('.animation_image').hide(); 
				$('#searchPageDefault').hide();
				document.getElementById("listView").innerHTML = data;
	
				window.parent.myFrameLoaded();
				}

		}); 
	
	 
	 });
	 
  }
	
function studentSearchFilter(){
	
	
	
	$("#searchForm").submit(function(e) {
$('.animation_image').show(); 
          e.preventDefault();
		  
		  
			$.ajax({
				type: "POST",
				url: "../scripts/StudentSearchFilter.php",
				data:  $(this).serialize(), 
				success: function (data) {
					
				$('.animation_image').hide(); 
				$('#searchPageDefault').hide();
				document.getElementById("listView").innerHTML = data;
				
				window.parent.myFrameLoaded();
				}
	
		}); 
	 
	 });
	 
  }


  
  function memberSearchFilterLoggedIn(){
	
	
	
	$("#searchForm").submit(function(e) {
$('.animation_image').show(); 
          e.preventDefault();
		  
			$.ajax({
				type: "POST",
				url: "../scripts/memberSearchFilterLoggedIn.php",
				data:  $(this).serialize(), 
				success: function (data) {
					
				$('.animation_image').hide(); 
				$('#searchPageDefault').hide();
				document.getElementById("listView").innerHTML = data;
	
				window.parent.myFrameLoaded();
				}

		}); 
	
	 
	 });
	 
  }
	
function memberSearchFilter(){
	
	
	
	$("#searchForm").submit(function(e) {
$('.animation_image').show(); 
          e.preventDefault();
		  
		  
			$.ajax({
				type: "POST",
				url: "../scripts/memberSearchFilter.php",
				data:  $(this).serialize(), 
				success: function (data) {
					
				$('.animation_image').hide(); 
				$('#searchPageDefault').hide();
				document.getElementById("searchMember").innerHTML = data;
				
				window.parent.myFrameLoaded();
				}
	
		}); 
	 
	 });
	 
  }

  
  
  function landingSearchFilterLoggedIn(){
	
	
	
	$("#searchForm").submit(function(e) {

			var searchGeoLatitude = document.getElementById("searchGeoLatitude").value;
			var searchGeoLongitude = document.getElementById("searchGeoLongitude").value;
			var searchSubscribe = document.getElementById("searchSubscribe").value;
			var searchLoc = document.getElementById("searchLoc").value;			
	switch (parseInt(searchSubscribe)) 
	{
    case 1:
		window.location = '../main/mainStudentSearchLoggedInFilter.php?&searchGeoLatitude=' + searchGeoLatitude + '&searchGeoLongitude=' + searchGeoLongitude + '&searchDistance=25&searchLoc=' + searchLoc;

        break;
    case 2:
		window.location = '../main/mainHostSearchLoggedInFilter.php?&searchGeoLatitude=' + searchGeoLatitude + '&searchGeoLongitude=' + searchGeoLongitude + '&searchDistance=25&searchLoc=' + searchLoc;
	
        break;        
	}
		
	 e.preventDefault();
	 });
	 
  }
  
    function homeHostSearchFilterLoggedIn(){
	
	
	
	$("#searchForm").submit(function(e) {

			var searchGeoLatitude = document.getElementById("searchGeoLatitude").value;
			var searchGeoLongitude = document.getElementById("searchGeoLongitude").value;
			var searchSubscribe = document.getElementById("searchSubscribe").value;
			var searchLoc = document.getElementById("searchLoc").value;			
	if(parseInt(searchSubscribe) == 1) 
	{
		window.location = './mainHostSearchLoggedInFilter.php?&searchGeoLatitude=' + searchGeoLatitude + '&searchGeoLongitude=' + searchGeoLongitude + '&searchDistance=25&searchLoc=' + searchLoc;   
	}
		
	 e.preventDefault();
	 });
	 
  }
  
  function homeHostSearchFilter(){
	
	
	
	$("#searchForm").submit(function(e) {

			var searchGeoLatitude = document.getElementById("searchGeoLatitude").value;
			var searchGeoLongitude = document.getElementById("searchGeoLongitude").value;
			var searchSubscribe = document.getElementById("searchSubscribe").value;
			var searchLoc = document.getElementById("searchLoc").value;			
	if (parseInt(searchSubscribe) == 0) 
	{
		window.location = './mainHostSearchFilter.php?&searchGeoLatitude=' + searchGeoLatitude + '&searchGeoLongitude=' + searchGeoLongitude + '&searchDistance=25&searchLoc=' + searchLoc;
	}
		
	 e.preventDefault();
	 });
	 
  }
  
  //Stripe Checkout
  function parentCheckout(choosePlan, planDescript, planType, planLength){
	  
	  var handler = StripeCheckout.configure({
    key: "YOUR KEY",
    image: "YOUR IMAGE",
    locale: "auto",
    token: function(token) {
      
	  
	  console.log(token.email);
	  $.ajax({
				type: "POST",
				url: "../scripts/subscriptionCheckout.php",
				data:  { stripeToken : token.id, planType : planType, planLength : planLength, stripeEmail : token.email  }, 
				success: function (data) {
						
						top.location = '../indexes/indexInactivateReg.php?listType=' + planType;
						console.log("Success");
					
				},
				  error: function(data) {
					console.log("Ajax Error!");
					console.log(data);
					
					 top.location = 'indexInactivateReg.php';
				  }
	
		});  
    }
  });

	handler.open({
      name: "YOUR PRODUCT NAME",
      description: "Subscription Plan " + planDescript,
      amount: choosePlan,
	  zipCode: true,
	  billingAddress: true,
	  opened: function(){
		  window.parent.myFrameLoadedMessage();
	  }
    });
  


  $(window).on("popstate", function() {
	  window.parent.myFrameLoaded();
    handler.close();
	
  });

  }
  
  
  
  function parentCheckoutPaypal(planCost, planType, planLength, ppn){
	  
      
	  
	  $.ajax({
				type: "POST",
				url: "../scripts/subscriptionCheckoutPaypal.php",
				data:  { userCost : planCost, listType : planType, planLength : planLength, ppn : ppn  }, 
				success: function (data) {
						
						top.location = '../indexes/indexInactivateReg.php?listType=' + planType;
						console.log("Success");
						console.log(data);
						console.log(planType);
						console.log(planCost);
						

				},
				  error: function(data) {
					console.log("Ajax Error!");
					console.log(data);
					 top.location = 'indexInactivateReg.php?ajaxFail=' + data;
				  }
	
		}); 
   

  }
  
    function blockMember(member_num){
	  
      
	  
	  $.ajax({
				type: "POST",
				url: "../scripts/blockMember.php",
				data:  { member_num : member_num }, 
				success: function (data) {alert(data);}
				});
				
		  
		  return false;
	
  }
  
      function hideMember(){
	  
	  $.ajax({
				type: "POST",
				url: "../scripts/hideMember.php",
				data:  {  }, 
				success: function (data) {}
				});
			
  }
  
 
      function favoriteMember(member_num){
	  
			$.ajax({
				type: "POST",
				url: "../scripts/favoriteMember.php",
				data:  { member_num : member_num }, 
				success: function (data) {alert(data)}
				});

		  return false;

  }
  
    function parentCheckoutChange(choosePlan, planDescript, planType, planLength){
	  
	  var handler = StripeCheckout.configure({
    key: "YOUR KEY",
    image: "YOUR IMAGE",
    locale: "auto",
    token: function(token) {
      
	  
	  $.ajax({
				type: "POST",
				url: "../scripts/subscriptionCheckoutChange.php",
				data:  { stripeToken : token.id, planType : planType, planLength : planLength  }, 
				success: function (data) {
						alert("Your subcription has been updated.");
						top.location = '../indexes/indexLoggedIn.php';
						console.log("Success");
						console.log(data);
						console.log(planType);
						console.log(token.id);
						console.log(planLength);

				},
				  error: function(data) {
					console.log("Ajax Error!");
					console.log(data);
					 alert("Your order could not be processed.  Your card has not been charged.  Please try again.");
						top.location = '../indexes/indexLoggedIn.php';
				  }
	
		}); 
    }
  });

	handler.open({
      name: "YOUR PRODUCT NAME",
      description: "Subscription Plan " + planDescript,
      amount: choosePlan,
	  zipCode: true,
	  billingAddress: true,
	  opened: function(){
		  window.parent.myFrameLoadedMessage();
	  }
    });
  

  $(window).on("popstate", function() {
	  window.parent.myFrameLoaded();
    handler.close();
	
  });

  }
  
function checkoutCancel(){
	
	  $.ajax({
				type: "POST",
				url: "../scripts/subscriptionCheckoutCancel.php",
				data:  { }, 
				success: function (data) {
						alert("Your subcription has been cancelled.  Your listing is still active through subscription end date.");
						window.parent.popCancelSurvey();
						console.log("Success");
						console.log(data);

				},
				  error: function(data) {
					  alert("An error occured.  Cancellation has not been processed.  Please try again or email customer support for assistance at inquiry@sayhellohomestay.com.");
					console.log("Ajax Error!");
					console.log(data);
					 window.location = '../main/mainSubscription.php';
				  }
	
		}); 


  }
  
  
function cancelSurvey() {
	  
	  $("#cancelSurveyForm").submit(function(e) {

          e.preventDefault();
		  
		  if (verifyCancelSurvey())
		  {
			$.ajax({
				type: "POST",
				url: "../scripts/cancelSurvey.php",
				data:  $(this).serialize(), 
				success: function () {alert("Thank you for your feedback.  Sorry to see you go."); 
				$("#popCancel").modal("toggle"); 
				$("#cancelSurveyForm").find("input[type=text], textarea").val("");
				$("#cancelSurveyRate").val("");
				$("#cancelSurveyReason").val("");}

				});
								
		  }
		  return false;
		}); 
				
	  
  }
  
function feedbackSurvey() {
	  
	  $("#surveyForm").submit(function(e) {

          e.preventDefault();
		  
		  if (verifyFeedbackSurvey())
		  {
			$.ajax({
				type: "POST",
				url: "../scripts/feedbackSurvey.php",
				data:  $(this).serialize(), 
				success: function () {alert("Thank you for your feedback."); 
				$("#popSurvey").modal("toggle"); 
				$("#surveyForm").find("input[type=text], textarea").val("");
				$("#surveyRate").val("");}

				});
								
		  }
		  return false;
		}); 
				
	  
  }
  
  function popSurvey(){
	   
	  $("#popSurvey").modal("toggle");
	    
  }
  
function popCancelSurvey(){
	   
	  $("#popCancel").modal("toggle");
	    $('#popCancel').on('hidden.bs.modal', function () {
			top.location = '../indexes/indexLoggedIn.php';
		})
  }
  
  function verifyCancelSurvey(){
	var cancelSurveyReason = document.getElementById("cancelSurveyReason");
		var cancelSurveyRate = document.getElementById("cancelSurveyRate");
		
		if( cancelSurveyReason.value == "")
		{
			$("#cancelSurveyReason").focus();
			alert("Please provide a reason.");
			return false;
		}
		
		if( cancelSurveyRate.value == "")
		{
			$("#cancelSurveyRate").focus();
			alert("Please provide a rating.");
			return false;
		}
		else
		{
			return true;
        }
  }
  
   function verifyFeedbackSurvey(){
		var surveyRate = document.getElementById("surveyRate");
				
		if( surveyRate.value == "")
		{
			$("#surveyRate").focus();
			alert("Please provide a rating.");
			return false;
		}
		else
		{
			return true;
        }
  }
  
  
      function deleteMember(){
	  
      
	  
	  $.ajax({
				type: "POST",
				url: "../scripts/deleteMember.php",
				data:  {  }, 
				success: function (data) {alert(data);
				top.location = '../index.php';}
				});

  }
  
    function flagUser(){
	   
	  $("#popFlagUser").modal("toggle");
	    
  }
