var fieldId = 0;

// convert numbers to time
function NumToTime(num) { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  if (minutes < 10 ? "0" : "") {
    minutes = '0' + minutes; 
  }
  return hours + ":" + minutes;
};

// add and remove more fields to form
function add_activity() {
    fieldId++;
  var fields = document.getElementById("fields0")
  var div = document.createElement("div");
  var actlabel = document.createElement("label");
  var actinput = document.createElement("input");
  var durlabel = document.createElement("label");
  var durinput = document.createElement("input");
  var remove = document.createElement("button");
  var addMoreActivity = document.getElementById("addMoreButton");
  var doMagic = document.getElementById("magicButton");

  // set attributes to new div
  div.setAttribute("id", "fields"+(fieldId +1));
  div.setAttribute("class", "activities");

  // set attributes to new activity label and field
  actlabel.innerText = "Activity: ";
  actlabel.setAttribute("for", "activity"+(fieldId +1));
  actinput.setAttribute("type", "text");
  actinput.setAttribute("id", "act"+(fieldId +1));
  actinput.setAttribute("name", "activity"+(fieldId +1));
  actinput.setAttribute("class", "activity");
  
  // set attributes to new duration field and label
  durlabel.innerText = " Duration: ";
  durlabel.setAttribute("for", "duration"+(fieldId +1));
  durinput.setAttribute("type", "number");
  durinput.setAttribute("id", "dur"+(fieldId +1));
  durinput.setAttribute("name", "duration"+(fieldId +1));
  durinput.setAttribute("onchange", "btnCheck()");
  durinput.setAttribute("class", "duration");
  
  // set attributes to new remove button
  remove.innerText = "Remove";
  remove.setAttribute("class", "removeButton");
  remove.setAttribute("onclick", "btnCheck()");

  
  // disable "add more" and "do your magic" buttons
  addMoreActivity.disabled = true;
  doMagic.disabled = true;

  // set position of newly created elements 
  fields.appendChild(div);
  div.appendChild(actlabel);
  div.appendChild(actinput);
  div.appendChild(durlabel);
  div.appendChild(durinput);
  div.appendChild(remove);
};

// add an event listener to the entire document that checks internally what has been clicked 
document.addEventListener("click", function(e){
  // if it's our remove button then remove the parent div
  if(e.target && e.target.classList.contains("removeButton")){
    e.target.parentNode.remove();
  }
});

// disable "add more" and "do your magic" buttons if fields are empty
function btnCheck() {
  var firstActivity = document.getElementById('act0').value;
  if (firstActivity.length < 0) {
      document.getElementById("addMoreButton").disabled = true;
      document.getElementById("magicButton").disabled = true;
  } else {
      document.getElementById("addMoreButton").disabled = false;
      document.getElementById("magicButton").disabled = false;
  }
}

// find the form and attach an submit event listener
function setup_form() {
  var scheduleForm = document.getElementById("form");
  scheduleForm.addEventListener("submit", do_your_magic);
}

// run the setup form function when the page has loaded
window.onload = setup_form;

function do_your_magic(e) {
  var data = [];
  var total = 0;
  // find all the activity rows
  var activities = document.querySelectorAll(".activities");
  
  // loop over the activities
    //get the data for destination, commute time, and arrival time
    var destinationValue = document.getElementById("dest").value;
    var commuteValue = document.getElementById("comm").value;
    var arrivalValue = document.getElementById("arr").value;
  
    total = total + parseInt(commuteValue);

    activities.forEach(activity => {
    // get the data for activity and duration values
    var activityValue = activity.querySelector(".activity").value;
    var durationValue = activity.querySelector(".duration").value;
      
    total = total + parseInt(durationValue);
    
    // push the data into the array
    data.push({
      activity: activityValue,
      duration: durationValue,
    });

  });
  
  // Put the data into local storage
    // activities and duration in a string 
    localStorage.setItem("schedule", JSON.stringify(data));

    // other inputs, separatelly 
    localStorage.setItem("destination", destinationValue);
    localStorage.setItem("commute", NumToTime(commuteValue));
    localStorage.setItem("arrival", arrivalValue);

    // sum of activities duration + commute time
    localStorage.setItem("total", NumToTime(total));
};