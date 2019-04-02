var rightNow = moment().unix();

$("#submit-button").on("click", function() {
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTimeString = $("#first-train-time").val().trim();
    var firstTrainTime = moment(firstTrainTimeString, "h:mm");
    var firstTrainTimeUnix = moment(firstTrainTime).format("X");
    var frequency = $("#frequency").val().trim();

    if (trainName != "" && destination != "" && firstTrainTimeString != "" && frequency != "") {
        $("#add-train-card").removeClass("border-danger");
        $("#add-train-card-header").removeClass("text-danger");
        $("#error-message").addClass("text-hide");

        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrainTime: firstTrainTimeUnix,
            frequency: frequency
        };
    
        database.ref().push(newTrain);
    
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");     
    } else {
        $("#add-train-card").addClass("border-danger");
        $("#add-train-card-header").addClass("text-danger");
        $("#error-message").removeClass("text-hide");
    }
});

database.ref().on("child_added", function(childSnapshot) {
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = Number(childSnapshot.val().firstTrainTime);
    var frequency = childSnapshot.val().frequency;
    
    var firstTrainTimeReadable = moment.unix(firstTrainTime).format("HH:mm");
    var nextTrainTime = firstTrainTime;

    while (nextTrainTime < rightNow) {
        if (nextTrainTime > rightNow) {
            break;
        }
        nextTrainTime += (frequency * 60);        
    }

    var nextTrainTimeReadable = moment.unix(nextTrainTime).format("HH:mm");

    var trainNameCol = $("<td>").text(trainName);
    var destinationCol = $("<td>").text(destination);
    var frequencyCol = $("<td>").text(frequency);
    var nextArrivalCol = $("<td>").text(nextTrainTimeReadable);
    var MinutesAwayCol = $("<td>").text(Math.round((nextTrainTime - rightNow) / 60));
    var row = $("<tr>").append(trainNameCol, destinationCol, frequencyCol, nextArrivalCol, MinutesAwayCol);
    $("tbody").append(row);
});