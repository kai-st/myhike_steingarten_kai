//---------------------------------
// Your own functions here
//---------------------------------

function sayHello() {
    //do something
}
//sayHello();    //invoke function

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            // Sign-out successful.
            console.log("logging out user");
        })
        .catch((error) => {
            // An error happened.
        });
}

// Insert name function
function insertNameFromFirestore(user) {
    currentUserRef = db.collection("users").doc(user.uid);
    currentUserRef.get().then((userDoc) => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        // $("#name-goes-here").text(user_Name); //jquery
        document.getElementById("name-goes-here").innerText = user_Name;
    });
}
