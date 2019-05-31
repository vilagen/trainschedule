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

  var database = firebase.datebase()

  database.ref().on('value', function(snapshot){
      if (snapshot.child()
  })