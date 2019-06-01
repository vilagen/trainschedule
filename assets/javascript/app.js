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

//   database.ref().on('value', function(snapshot){
//       if (snapshot.child()
//   })

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
 
    let trainTime = Math.abs(moment().diff(moment(firstTrain, "hh:mm"), 'minutes'))
    // console.log(trainTime)

    let difference = trainTime % frequency
    // console.log(difference)

    let minutesAway = frequency - difference
    console.log(minutesAway)

    let nextArrival = moment().add(minutesAway, 'minutes').format('LT')
    // console.log(nextArrival)

    // let nextArrival = moment().add(minutesAway, 'minutes')
    // console.log(nextArrival)

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    )

    // console.log(newRow)

    $('tbody').append(newRow)
})