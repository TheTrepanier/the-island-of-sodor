$("#submit-button").on("click", function() {
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    }

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val(""); 
});

database.ref().on("child_added", function(childSnapshot) {

});