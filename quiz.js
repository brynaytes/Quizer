var rawData;
var pointHolder = [];
var QuizName;
var questions = [];
var questionNum =0;
var resultInfo = [];
//classes
function pointType(name, score){
                this.name = name;
                this.score = score;
}
function answer(a, pt){
                this.a = a;
                this.pt = pt;
}

//this doesnt do much right now
function main(y){
	clear();
	var header = document.getElementById("title");
	document.getElementById("goButton").style.display="block";
	document.getElementById("sec").style.display="none";
 	readTextFile(y);
	SplitRaw();
	header.innerHTML = QuizName;
	questionManager();
   //window.alert("done");
}

//accesses the desired txt doc
function readTextFile(file){
    var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", file , false);
    xmlhttp.send();
    if(xmlhttp.status == 200){
        rawData = xmlhttp.responseText;
    }
	//window.alert(rawData);
}

//splits raw data into relavent functions
function SplitRaw(){
	var temp = rawData.split("\n");
	rawData = temp;
	var sec = "I";
	var newSection = false;

	
	for(var i =0; i < rawData.length;i++){
		if(rawData[i].length <= 2){
			newSection = true;
			continue;
		}

		if(newSection == false){
			if(i == 1){
				QuizName = rawData[i];
			}else if(i > 1 && sec == "I"){
				var ptName = rawData[i].slice(0,-1);
				var pt = new pointType(ptName,0);
				pointHolder.push(pt);
			}else if(sec == "Q"){
				questions.push(rawData[i]);
			}else if(sec == "R"){
				resultInfo.push(rawData[i]);
			}
		}else if(newSection == true){
			if(rawData[i].charAt(0) == "I"){
				sec = "I";
			}else if(rawData[i].charAt(0) == "Q"){
				sec = "Q";
				questions.push("-|-");
			}else if(rawData[i].charAt(0) == "R"){
				sec = "R";
			}
			newSection = false;
			//window.alert(sec);
		}
	} 
}

//seperates questions from rawData
function questionManager(){
	var count=0;
	var largeQ = document.getElementById("Q");
	var w=0;
	while(w <= questions.length){
		if(questions[w] == "-|-" && count === questionNum){
			w++;
			questionNum++;
			largeQ.innerHTML= questions[w];
			w++;

			while(questions[w] != "-|-"){				
			var sep = questions[w].split("---");
			maker(sep[0],sep[1]);
			w++;
			}

			break;

		}else if(questions[w] == "-|-"){
		count++;
		w++;
		}else{
			w++;
		}
	}
	if(w >= questions.length){
		results();
	}
}

//gets questions from questionManager and prints them
function maker(type, words){
		var holder = document.getElementById("Qholder");
		var question1 = document.createElement("input");
		
		question1.setAttribute("type","radio");
		question1.setAttribute("value", type);
		question1.setAttribute("name",'re');
		question1.setAttribute("onclick", "checker(this)");
		holder.appendChild(question1);
		var txt =  document.createElement("a");
		var txt1 = document.createTextNode(words);
		txt.appendChild(txt1);
		holder.appendChild(txt);
		var br = document.createElement("br");
		holder.appendChild(br);
}

//gets information from radio input when button is pressed
function getter(type){
	var val = document.querySelector('input:checked').value;
	for(var e=0;e< pointHolder.length;e++){
		if(pointHolder[e].name == val){
			pointHolder[e].score++;
			break;
		}
	}
	clear();
	questionManager();
}

//clears Qholder of information
function clear(){
	document.getElementById("Qholder").innerHTML = "";
}

//prints out your highest scoring category
function results(){
	var max =0;
	var PtName = "";
	var PtName2 = "";
	var words = "";
	document.getElementById("Q").innerHTML =resultInfo[0];
	for(var o=0; o < pointHolder.length;o++){
		var points = pointHolder[o].score;
		if(points > max){
			max = points;
			PtName = pointHolder[o].name;
		}
		if(points == max && pointHolder[o].name != PtName && PtName != ""){
			PtName2 = pointHolder[o].name;
		}
	}
	
	var holder = document.getElementById("Qholder");
	var txt =  document.createElement("h3");
	
		
	for(var t=0;t< resultInfo.length;t++){
		var str = resultInfo[t].split("---");
		if(str[0] == PtName){
			words = str[1];
		}
		if(str[0] == PtName2 && PtName2 != ""){
			var tie =  document.createElement("h3");
			tie.innerHTML = "there was a tie!";
			holder.appendChild(tie);
			words = words + " and " + str[1];
		}
	}
	var txt1 = document.createTextNode(words);
	txt.appendChild(txt1);
	holder.appendChild(txt);
}
function checker(x){
	var allRadios = document.getElementsByName('re');
	for(var i = 0; i < allRadios.length;i++){
		if(allRadios[i] != x){
			allRadios.checked = false;
		}
	}
}