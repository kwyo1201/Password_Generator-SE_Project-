function mySubmit(e) { 
    e.preventDefault(); 
    try {
    // generatePassword();
    /*
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
      */
     //let temp = generateWordPW();
     //temp=generatePassword("no","what");
      var mypw =generatePassword(checkParams(),checkPwAlgo());
        setPassword(mypw+ "\n Score:"+zxcvbnts.core.zxcvbn(mypw).score );
    let ELMO=zxcvbnts.core.zxcvbn(mypw).crackTimesDisplay;
    console.log(zxcvbnts.core.zxcvbn(mypw));
    console.log(ELMO);
    console.log(ELMO.onlineThrottling100PerHour);
   // alert(ELMO);
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
    
    return pwparams;
}