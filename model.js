var rand= new Chance();
var generatedpass= document.getElementById('passcontainer');

function generatePassword(params, algoType){
  //Grab Length
  if(algoType=="characters"){
    return generateCharPW(params);
  }
  let targetLength = params['length'];
  let includeNumbers=params['numeric'];
  let includeSymbols=params['symbols'];

  //Specify quantity of numbers and symbols for each pw generation 'round' until completion
  let tokenCount= 1;
  var currentLength;
  currentLength=0;
  //Create pool 
  let pwarray = [];
  //let algoType="Word";
  while(currentLength<targetLength){
    pwarray.push(useAlgo(algoType))
    
    if(includeNumbers){
      pwarray.push(provideNumber());
    }
    if(includeSymbols){
      pwarray.push(provideSymbol());
    }
        pwarray=scrambleArray(pwarray);
        currentLength=totalLength(pwarray);
  }
  //Add random [type] to pool

  //Add tokens

  //Scramble pool

  //check if generation must continue

  //Assemble pool into a string
  return pwarray.join("")
  
}
function generateCharPW( params){
    return rand.string(params);

   }
function generateWordPW(params){
  alert("Generating word pw!");
  //generate() generates a 
  let targetLength = params['length'];
  let tokenCount= 1;//targetLength/4
  var currentLength;
  currentLength=0;
 // alert("target length"+targetLength);
  let pwarray = [];
  while(currentLength<targetLength){
   // alert("Target Length"+targetLength);
   // alert("tempLength"+tempLength);
    //Add a random word
    //result = str.charAt(0).toUpperCase() + str.slice(1);
    let randomword=generate();
    //Randomly capitalize the word
    if(Math.random()<0.5 || (params[capitalLetters] && currentLength==0)){
      randomword=randomword.charAt(0).toUpperCase() + randomword.slice(1);
    }
    
    pwarray.push(randomword);

    for(let i=0; i<tokenCount;i++){
        
    
    //Add a random number
    if(params['numeric']){
      let randomnumber=rand.character({pool: '0123456789'});
      pwarray.push(randomnumber);
    }
    //Add a symbol
    if(params['symbols']){
      let randomsymbol=rand.character({symbols: true});
      pwarray.push(randomsymbol);
    }
  }
    //Scramble the array
  //  alert("Before scrambling!");
//    alert(pwarray.join(""));
    pwarray=scrambleArray(pwarray);
  //  alert("After scrambling!");
  //  alert(pwarray.join(""));
    currentLength=totalLength(pwarray);
  }
    return pwarray.join("");
}
function totalLength(stringArray){
 // alert("Entering foreach!");
 // let currentLength=0;
 let tempLength=0;
  stringArray.forEach(element => {
   // currentLength+=element.length;
   tempLength+=element.length;
  })
  return tempLength;
 //alert("Total length:"+tempLength);
}
function scrambleArray(array){
  //array.sort(() => Math.random() - 0.5);
  //return array;
  return rand.shuffle(array);
}
function useAlgo(algoType){
  switch(checkPwAlgo()){
    case "perms":
        return providePerm();
        break;
    case "words":
        return provideWord();
    break;
    case "syllables":
      return provideSyllable();
    break;
    default:
    
    break;
    
}
}
function provideWord(){
  let randomword=generate();
    //Randomly capitalize the word
    if(Math.random()<0.5){
      randomword=randomword.charAt(0).toUpperCase() + randomword.slice(1);
    }
    return randomword;
}
function providePerm(){
  let myword=provideWord();
  let chanceToReplace=0.4;
  let replacements = {
    a: "4",
    b: "8",
    e: "3",
    i: "!",
    o: "0",
    p: "9",
    s: "5",
    t: "7",
    z: "2"
  }
  for(let i=0;i<myword.length;i++){
    if(replacements[myword[i].toLowerCase()] && Math.random() < chanceToReplace){
      myword = myword.replace(myword[i], replacements[myword[i]]);
    }
  }
return myword;
}
function provideSyllable(){
//Will always be lowercase this way
  return rand.syllable();
}
function provideNumber(){
  return rand.character({pool: '0123456789'});
}
function provideSymbol(){
  return rand.character({symbols: true});
}