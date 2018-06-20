

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBcteWGKaFORmGYvEvEgbRhKwDnGsTRIwA",
    authDomain: "radford-train-schedualer.firebaseapp.com",
    databaseURL: "https://radford-train-schedualer.firebaseio.com",
    projectId: "radford-train-schedualer",
    storageBucket: "radford-train-schedualer.appspot.com",
    messagingSenderId: "977132890919"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
    var trainFrequecy = $("#frequency-input").val().trim();
  
    // Creates local "ttrainorary" object for holding train data
    var newtrain = {
      name: trainName,
      destination: trainDestination,
      start: trainFirst,
      frequency: trainFrequecy
    };
  
    // Uploads train data to the database
    database.ref().push(newtrain);
  
    // Logs everything to console
    console.log(newtrain.name);
    console.log(newtrain.destination);
    console.log(newtrain.start);
    console.log(newtrain.frequency);
  
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().start;
    var trainFrequecy = childSnapshot.val().frequency;
  

    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainFirstConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    console.log(trainFirstConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainFirstConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequecy;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequecy - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    
    
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequecy);
    console.log(nextTrain);
    console.log(tMinutesTillTrain);
  
    // Prettify the train start
    //var trainFirstPretty; 
  
  
  
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequecy + "</td><td>" + moment(nextTrain).format("hh:mm") +"</td><td>"+tMinutesTillTrain+ "</td></tr>");
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume train start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any atttraint we use meets this test case
  