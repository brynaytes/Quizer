var rawText = ["Info"];
var finishedText="";
var resultNumber = 3;
var questionNumber = 2;

//sequence which every function is ran from
function beginUnload(){
	window.alert("starting");
	var QName = document.getElementById("name").value;
	rawText.push(QName);
    
    InfoCheck("resID",1);
    var o =1;
    while(o <= questionNumber){
    QuestionChecker(o);
    o++;
    window.alert("checking");
    }
    
    rawText.push("Result");
    rawText.push(document.getElementById("resText").value);
    resChecker("resID",1);
    
    finishSorting();
	packageing(QName,finishedText);

    rawText = ["Info"];
}

//returns true if an element exists
function elementCheck(ID){
    if(document.getElementById(ID) != null){
       return true;
    }else{
       return false;
    }
}

//enters each result and finish text into the rawText
function resChecker(ID, num){
    if(elementCheck(ID + num)){
            var resultInfo = document.getElementById(ID + num).value + "---" + document.getElementById("res" + num).value;
            rawText.push(resultInfo);
            num++;
            resChecker(ID, num);
        
    }
}

//Inserts info into rawText
 function InfoCheck(ID, num){
    if(elementCheck(ID + num)){
    rawText.push(document.getElementById(ID + num).value);
    num++;
    InfoCheck(ID,num);
    } 
 }

//Inserts the questions into rawText
function QuestionChecker(Qnum){
    rawText.push('\r');
    if(elementCheck("Q"+Qnum)){
    rawText.push("Question");
    rawText.push(document.getElementById("Q"+Qnum).value);
    AnswerChecker(Qnum,1);
    Qnum++;
    QuestionChecker(Qnum);
    }
    
}

//called by QuestionChecker, finds diffrent answers
function AnswerChecker(Qnum,resNum){
    if(elementCheck("Q"+Qnum+"R"+resNum)){
     rawText.push(document.getElementById("Q"+Qnum+"R"+resNum).value + "---" + document.getElementById("Q"+Qnum+"A"+resNum).value);
    resNum++;
    AnswerChecker(Qnum,resNum);
    }
}

//changes the rawText array into a finshed single string
function finishSorting(){
    for(var i=0; i < rawText.length;i++){
        finishedText += rawText[i];
        finishedText += '\r\n';
    }
}

//creates the txt file, and enters the fihsined text into it
function packageing(filename,text){
var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

}

function newResult(){
    
    var holder = document.getElementById("resultHolder");
    
    var node = document.createElement("br");
    holder.appendChild(node);
    
    var node = document.createElement("a");
    var textnode = document.createTextNode("result Id");
    node.appendChild(textnode);
    holder.appendChild(node);
    
    var node = document.createElement("input");
    node.type="text";
    node.id="resID"+ resultNumber;
    holder.appendChild(node);
    
    var node = document.createElement("a");
    var textnode = document.createTextNode("output of result");
    node.appendChild(textnode);
    holder.appendChild(node);
    
    var node = document.createElement("textarea");
    node.id="res" + resultNumber;
    holder.appendChild(node);
    
    resultNumber++;
}

function newAnswer(Qnum){
 
    var holder = document.getElementById("QH"+Qnum);
             //window.alert(Qnum);
    
    
    var node = document.createElement("br");
    holder.appendChild(node);
    
    var node = document.createElement("a");
    var textnode = document.createTextNode("result Id:");
    node.appendChild(textnode);
    holder.appendChild(node);
    var responseNum = 1;
    while(elementCheck("Q"+Qnum+"R"+responseNum)){
        responseNum++;
    }
  
     var node = document.createElement("input");
    node.type="text";
    node.id="Q"+Qnum+"R"+ responseNum;
    holder.appendChild(node);
    
    var node = document.createElement("a");
    var textnode = document.createTextNode("answer:");
    node.appendChild(textnode);
    holder.appendChild(node);
    
    var node = document.createElement("textarea");
    node.id="Q"+Qnum+"A"+ responseNum;
    holder.appendChild(node);
    
}

function newQuestion(){
    var holder = document.getElementById("questionHolder");
    
    var node = document.createElement("div");
    node.id="QH"+questionNumber;
    holder.appendChild(node);
    var Qholder = document.getElementById("QH"+questionNumber);
    
     var node = document.createElement("a");
    var textnode = document.createTextNode("Question:");
    node.appendChild(textnode);
    Qholder.appendChild(node);

    
    var node = document.createElement("textarea");
    node.id="Q" + questionNumber;
    Qholder.appendChild(node);
    
    
     var node = document.createElement("a");
    var textnode = document.createTextNode("+");
    node.appendChild(textnode);
    var numforId = questionNumber;
    node.onclick = function(){newAnswer(numforId)};
    Qholder.appendChild(node);
    
    resultNumber++;
    questionNumber++;

}