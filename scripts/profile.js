var currentUser; //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get().then((userDoc) => {
                if (userDoc.exists) {
                    console.log("Document data:", userDoc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

                //get the data fields of the user
                let userName = userDoc.data().name;
                let userSchool = userDoc.data().school;
                let userCity = userDoc.data().city;

                //if the data fields are not empty, then write them in to the form.
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userSchool != null) {
                    document.getElementById("schoolInput").value = userSchool;
                }
                if (userCity != null) {
                    document.getElementById("cityInput").value = userCity;
                }
            });
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById("personalInfoFields").disabled = false;
}

function saveUserInfo() {
    if (!currentUser) {
        console.log("No current user. Cannot save form data");
        return;
    }

    const userName = document.getElementById("nameInput").value; //get the value of the field with id="nameInput"
    const userSchool = document.getElementById("schoolInput").value; //get the value of the field with id="schoolInput"
    const userCity = document.getElementById("cityInput").value; //get the value of the field with id="cityInput"

    currentUser
        .update({
            name: userName,
            school: userSchool,
            city: userCity,
        })
        .then(() => {
            console.log("Document successfully updated!");
        });

    document.getElementById("personalInfoFields").disabled = true;
}

document.querySelector("#save")?.addEventListener("click", saveUserInfo);
