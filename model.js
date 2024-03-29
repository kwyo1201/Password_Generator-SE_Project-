var rand= new Chance();
var generatedpass= document.getElementById('passcontainer');

function generatePassword(){
    // document.getElementById('passcontainer').innerText="HELLO!";
     // generatedpass.innerText="DAPASS";
     //setPassword("Hello!");
   let pwparams={};
   var selectedRadio;
   
     //Refactor this later
     //Grab radio input
     let radioButtons = document.getElementsByName('algo');
      for (let radio of radioButtons) {
         if (radio.checked) {
            //output.innerHTML = "The radio button is selected and it's value is " + radio.value;
           selectedRadio = document.querySelector('input[type=radio][name=algo]:checked');
         //  alert(selectedRadio.value);
         }
      }

     //Grab input from checkboxes
     let selectedCheckBoxes=[]
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
       
     console.log(pwparams);
    // console.log(selectedCheckBoxes)
     //setPassword(rand.string(arguments));
    // setPassword(rand.string({numeric: false, symbols:true}));
     setPassword(rand.string(pwparams));
     alert(generate())
   
   }
function generateCharPW( params){
    return rand.string(params);

   }
function generateWordPW(){
    return generate();
}