  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAFnQtWfRouglPq9yKwe_uUrl6ulYFSMcI",
    authDomain: "trainschedule-e1078.firebaseapp.com",
    databaseURL: "https://trainschedule-e1078.firebaseio.com",
    projectId: "trainschedule-e1078",
    storageBucket: "trainschedule-e1078.appspot.com",
    messagingSenderId: "215578445517",
    appId: "1:215578445517:web:69221cf1fcd245e5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database()

// vanilla JS as practice
document.getElementById('submitTrain').addEventListener('click', function(event){
    event.preventDefault()

    let date = new Date()
    console.log(date)

    let trainName = document.getElementById('trainInput').value
    let destination = document.getElementById('destinationInput').value
    let firstTrain = moment($('#firstTrainInput').val().trim(), 'hh:mm').format('LT')
    let frequency = document.getElementById('frequencyInput').value

    console.log(firstTrain)

    let newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    database.ref().push(newTrain)

    alert('Train Time Updated')

    document.getElementById('trainInput').value = ""
    document.getElementById('destinationInput').value = ""
    document.getElementById('firstTrainInput').value = ""
    document.getElementById('frequencyInput').value = ""

    
})

database.ref().on("child_added", function(childSnapshot){

    let trainName = childSnapshot.val().trainName
    let destination = childSnapshot.val().destination
    let firstTrain = childSnapshot.val().firstTrain
    let frequency = childSnapshot.val().frequency

    let firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years")
 
    let trainTime = moment().diff(moment(firstTrainConverted, "hh:mm"), 'minutes')
  

    let difference = trainTime % frequency
    

    let minutesAway = frequency - difference
   

    let nextArrival = moment().add(minutesAway, 'minutes').format('LT')
    
    

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    )


    $('tbody').append(newRow)
})