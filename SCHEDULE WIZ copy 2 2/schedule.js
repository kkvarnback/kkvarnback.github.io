//retrieve and display data from local storage
function output_schedule() {
    var header_element = document.getElementById("header-container");
    var schedule_element = document.getElementById("schedule-container");
    var departure_element = document.getElementById("departure-container");
    
    // get the data from local storage
    var rawData = localStorage.getItem("schedule");
    
    // If there is no data them output no data message
    if (rawData === null) {
      header_element.innerHTML = "<p>Something went wrong. Try again, you dumbass. ✨</p>";
      
    } else {
      // parse the data
      var data = JSON.parse(rawData);
      header_element.innerHTML = '';
      schedule_element.innerHTML = '';
      departure_element.innerHTML = '';
      
      // loop over each entry and output the data
      var destination = localStorage.getItem("destination");
      var arrival = localStorage.getItem("arrival");
      var commute = localStorage.getItem("commute");
      var total = localStorage.getItem("total");
  
      // calculate departure time
      var commutetime = moment.duration(commute, "HH:mm");
      var arrivaltime = moment.duration(arrival, "HH:mm");
      var differenceArrivalCommute = arrivaltime.subtract(commutetime);
      var departure = differenceArrivalCommute.hours() + ":" + (differenceArrivalCommute.minutes() < 10 ? "0" : "") + differenceArrivalCommute.minutes();
  
      // calculate when to start getting ready
      var totaltime = moment.duration(total, "HH:mm");
      var differenceArrivalTotal = arrivaltime.subtract(totaltime).add(commutetime);
      var getready = differenceArrivalTotal.hours() + ":" + (differenceArrivalTotal.minutes() < 10 ? "0" : "") + differenceArrivalTotal.minutes();
      
      // populate header element 
      header_element.innerHTML= "<p>If you want to go to " + destination + " and arrive at " + arrival + ",<br>" + "you will need " + total + " in total and start getting ready at " + getready + ".</p>";
      
      // Set the scheduletime to equal the getready time. This will be the first value so we can update the scheduletime each time we loop over the activities
      var scheduletime = moment(getready, "HH:mm");
          
      // populate schedule element
      data.forEach(activity => {
        schedule_element.innerHTML += "<p>🌸 Start " + activity.activity + " at " + scheduletime.format("HH:mm") + "</p>";
  
        // update the scheduletime by adding activity.duration to scheduletime
        scheduletime = scheduletime.add(activity.duration, 'minutes');
  
      });
  
      // populate footer element
      departure_element.innerHTML= "<p>And leave at " + departure + " sharp.</p>";
    }
    
  }
  
  // run the function when window loads
  window.onload = output_schedule;

  function doSomethingCool() {
    confetti.start();      
  } 

