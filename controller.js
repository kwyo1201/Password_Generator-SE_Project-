function mySubmit(e) { 
    e.preventDefault(); 
    try {
    showPasswords(checkPwCount());
    } catch (e) {
     throw new Error(e.message);
    }
    return false;
  }
  function setPassword(text){
    document.getElementById('passcontainer').innerText=text;
  }
  
function checkPwAlgo(){
    //Grab radio input
    let radioButtons = document.getElementsByName('algo');
    for (let radio of radioButtons) {
       if (radio.checked) {
          //output.innerHTML = "The radio button is selected and it's value is " + radio.value;
         var selectedRadio = document.querySelector('input[type=radio][name=algo]:checked');
       //  alert(selectedRadio.value);
       }
    }
    return selectedRadio.value

}
function checkParams(){
    let selectedCheckBoxes=[]
    let pwparams={};
    const checked = document.querySelectorAll('input[type="checkbox"]:checked')
    selectedCheckBoxes = Array.from(checked).map(x => x.id);
  
    if(selectedCheckBoxes.includes("numeric")){
      pwparams['numeric']=true;
    } else {
      pwparams['numeric']=false;
    }
    if(selectedCheckBoxes.includes("symbol")){
    pwparams['symbols']=true;
    } else {
      pwparams['symbols']=false;
    }
    if(selectedCheckBoxes.includes("capitalLetters")){
      pwparams['capitalLetters']=true;
      } else {
        pwparams['capitalLetters']=false;
      }
    pwparams['alpha']=true;
  //alert("Checking params:")
    var length=document.getElementById('length').value;
   // alert("Checking params:"+ length)
    pwparams['length']=length;
    //alert("Checking params:"+ pwparams['length']);
    pwparams['userArray']=checkUserInput();
    
    return pwparams;
}
function checkUserInput(){
  var input = document.getElementById("list").value;
  //Split the array by commas and trim whitespace
  var inputArray=input.split(',').map(item => item.trim());
  return inputArray;
}
function checkPwCount(){
  return document.getElementById('numpw').value;
}
