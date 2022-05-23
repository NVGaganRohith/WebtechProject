function formValidation()
{
var frm = document.getElementById("createAccount");
var uname = document.getElementById("signupUsername");
var uemail = document.getElementById("email");
var passid = document.getElementById("passid");
if(allLetter(uname))
{
if(ValidateEmail(uemail))
{
if(passid_validation(passid,7,12))
{
if(matchPassword())
{
frm.submit();
} } } } 
document.getElementById("createAccount").reset();
}
function passid_validation(passid,mx,my)
{
var passid_len = passid.value.length;
if (passid_len == 0 ||passid_len >= my || passid_len < mx)
{
alert("Password should not be empty / length be between "+mx+" to "+my);
passid.focus();
return false;
}
return true;
}
function allLetter(uname)
{
var letters = /^[A-Za-z]+$/;
if(uname.value=="")
{
alert("Username should not be empty");
}
else if(uname.value.match(letters))
{
return true;
}
else
{
alert("Username must have alphabet characters only");
uname.value="";
uname.focus();
return false;
}
}
function ValidateEmail(uemail)
{
var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
if(uemail.value.match(mailformat))
{
return true;
}
else
{
alert("You have entered an invalid email address!");
uemail.focus();
return false;
}
}
function matchPassword() {  
  var pw1 = document.getElementById("passid");  
  var pw2 = document.getElementById("cpassid");  
  if(pw1 != pw2)  
  {   
    alert("Passwords did not match");
    return false; 
  } else {  
    return true;  
  }  
} 
