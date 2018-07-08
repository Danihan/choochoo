// Initialize Firebase
var config = {
apiKey: "AIzaSyBIKPGZzwDhYX5sscwrQ6cA9XOz6MoHi2o",
authDomain: "asdf-c6356.firebaseapp.com",
databaseURL: "https://asdf-c6356.firebaseio.com",
projectId: "asdf-c6356",
storageBucket: "asdf-c6356.appspot.com",
messagingSenderId: "641246996319"
};
firebase.initializeApp(config);
var database = firebase.database();

// Main Loop
$(document).ready(function() {
	$("#newTrain").on("click", function(event){
		event.preventDefault();

		var trainName = $("#trainName").val().trim();
		var dest = $("#dest").val().trim();
		var startTime = $("#startTime").val().trim();
		var freq = $("#freq").val().trim();

		database.ref().push({
			trainName: trainName,
			dest: dest,
			startTime: startTime,
			freq: freq,
			added: firebase.database.ServerValue.TIMESTAMP
		});
	});

	database.ref().on("child_added", function(childSnapshot){
		var snap = childSnapshot.val();
		console.log(snap)

		$("#trainName").val("");
		$("#dest").val("");
		$("#startTime").val("");
		$("#freq").val("");

		var calc = 15;
		var wait = 10;
		var nextTrain = 5;

		var newTrainRow = $("<tr>")
		var tdTrainName = $("<td>").text(snap.trainName);
		var tdDest = $("<td>").text(snap.dest);
		var tdFreq = $("<td>").text(snap.freq);
		var tdNext = $("<td>").text(nextTrain);
		var tdWait = $("<td>").text(wait);

		newTrainRow.append(tdTrainName);
		newTrainRow.append(tdDest);
		newTrainRow.append(tdFreq);
		newTrainRow.append(tdNext);
		newTrainRow.append(tdWait);
		console.log(newTrainRow);
		$("#trainData").prepend(newTrainRow);
	});
});