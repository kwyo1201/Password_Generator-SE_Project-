function showPasswords(numToShow){
    //var numToShow=4;
    let tablebody=document.querySelector("#password-table-body");

    tablebody.innerHTML="";
    for(let i=0;i< numToShow;i++){
        let pw=generatePassword(checkParams(),checkPwAlgo());
        let row=document.createElement("tr");
        let pwcell=document.createElement("td");
        let strcell=document.createElement("td");
        let actioncell=document.createElement("td");
        let saveButton = document.createElement("button");
        saveButton.textContent="Save to database";
        saveButton.onclick= function(){
          saveClick(pw,saveButton);  
        };
        let examineButton = document.createElement("button");
        examineButton.textContent="Examine";
        examineButton.onclick= function(){
          examine(pw.pw);  
        };
        pwcell.textContent=pw.pw;
        strcell.textContent=pw.score+"/4";
        actioncell.appendChild(saveButton);
        actioncell.appendChild(examineButton);
        row.appendChild(pwcell);
        row.appendChild(strcell);
        row.appendChild(actioncell);
        tablebody.appendChild(row);
    }
}
var testPW=document.querySelector("#testpw");
    testPW.addEventListener('input',function(){
       examinePWs(testPW.value);
    } );
function examinePWs(value){
    var results=zxcvbnts.core.zxcvbn(value);
    var checkerBody=document.querySelector("#checker-table-body");
    checkerBody.innerHTML="";
    addCheckerRow(checkerBody,"Length",value.length)
    addCheckerRow(checkerBody,"Average # of Guesses",results.guesses);
    addCheckerRow(checkerBody,"Score",results.score);
    addCheckerRow(checkerBody,"Online Throttled Attack (100 Guesses/hr)",results.crackTimesDisplay.onlineThrottling100PerHour);
    addCheckerRow(checkerBody,"Online Unthrottled Attack (10 Guesses/sec)",results.crackTimesDisplay.onlineNoThrottling10PerSecond);
    addCheckerRow(checkerBody,"Offline Slow Hashing Attack (e^4 Guesses/sec)",results.crackTimesDisplay.offlineSlowHashing1e4PerSecond);
    addCheckerRow(checkerBody,"Offline Fast Hashing Attack (e^10 Guesses/sec)",results.crackTimesDisplay.offlineFastHashing1e10PerSecond);
    //Add the warning to the table if there is a warning
    if(results.feedback.warning!=""){addCheckerRow(checkerBody,"Warning",results.feedback.warning);}
    //Add all of the suggestions to the table
    results.feedback.suggestions.forEach(element => {addCheckerRow(checkerBody,"Suggestion",element);});
}
function examine(value){
    //alert(value);
    document.getElementById("testpw").value=value;
    examinePWs(value);
}
function addCheckerRow(checkerBody,first,second){
    let row=document.createElement("tr");
    let firstcell=document.createElement("td");
    let secondcell=document.createElement("td");
    firstcell.textContent=first;
    secondcell.textContent=second;
    row.appendChild(firstcell);
    row.appendChild(secondcell);
    checkerBody.appendChild(row);
}
function saveClick(password, button){
    //alert(password.pw);
    button.textContent="Saved!";
    savePassword(password.pw);
}
function savePassword(password){

}