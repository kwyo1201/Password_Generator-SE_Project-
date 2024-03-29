function mySubmit(e) { 
    e.preventDefault(); 
    try {
    // generatePassword();
    switch(checkPwAlgo()){
        case "characters":
            var mypw =generateCharPW(checkParams());
            setPassword(mypw);
            break;
        case "words":
            var mypw=generateWordPW(checkParams());
            setPassword(mypw);
        break;
        default:
        alert("Please select a password algorithm!");
        break;
    }
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
    pwparams['alpha']=true;
  
    var length=document.getElementById('length').value;
    pwparams['length']=length;
    return pwparams;
}