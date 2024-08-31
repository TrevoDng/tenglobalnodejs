import { userData } from "./userData.js";

//window.onload =( async()=> {
// script.js
fetch('./example.env.json')
.then(response => response.json())
.then(envVars => {
  const firebaseConfig = {
    apiKey: envVars.FIREBASE_API_KEY,
    authDomain: envVars.FIREBASE_AUTH_DOMAIN,
    projectId: envVars.FIREBASE_PROJECT_ID,
    storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.FIREBASE_APP_ID,
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("Api key: " + envVars.FIREBASE_API_KEY);

const emails = envVars.ADMIN_EMAIL;
const passwords = envVars.ADMIN_PASSWORD;

firebase.auth().signInWithEmailAndPassword(emails, passwords)
.then(userCredential => {
  const user = userCredential.user;
  //console.log(JSON.stringify(user));
  console.log("UID:", user.uid);
  console.log("Email:", user.email);
  console.log("Name:", user.displayName);
})
  .catch(error => {
    console.error(error);
});
});

const formProof = document.querySelector("#proof-form");
const country_name_proof = document.querySelector('#country-input')
const amount = document.querySelector('#amount')
const destination = document.querySelector('#destination')
const message = document.getElementById('message');
const fileInput = document.querySelector('#file')
const display = document.querySelector('.error-proof');
const pending_action = "...pending";

let fileUrlPromise = null;
let fileUrl = "";

(async()=> {

const users = await userData(`${window.location.origin}/userbyid`, "LOGIN"); //token data link
const user = users.userData;

        formProof.addEventListener('submit', async (e) => {
          e.preventDefault();

          const file = fileInput.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`proof_file/${user.username.toLowerCase()}_${user.surname.toLowerCase()}/${user.contact_number}/${file.name}`);
  
      fileUrlPromise = new Promise((resolve) => {
        fileRef.put(file).then(snapshot => {
          console.log('File uploaded successfully!');
          console.log(`File path: ${snapshot.ref.fullPath}`);
          snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve(downloadURL);
            console.log(`Download URL: ${downloadURL}`);
          });
        });
        
        console.log(`File uploaded: ${file.name}`);
      });

          if(fileUrlPromise) {
              fileUrlPromise.then((fileUrls) => {
              fileUrl = fileUrls;

              const proofData = {
                username: user.username, 
                email: user.email,  
                user_id: user._id, 
                country_name: country_name_proof.value,
                amount: amount.value,
                destination: destination.value,
                message: message.value, 
                pending_action: pending_action,
                file: fileUrl,
              };
              
            (async()=> {
              const res = await fetch('api/auth/sendproof', {
                method: 'POST',
                body: JSON.stringify(proofData),
                headers: { 'content-Type': 'application/json' },
              }).catch (err => {
                console.log("fail to send proof")
              });
        
              const data = await res.json()
    
    
              if (data.messageStatus === "UNAUTHORIZED") {
                  location.assign('/signin')
                  return;
              }
    
              if (res.status === 400 || res.status === 401) {
                    display.style.display = "block";
                    display.innerText = data.proofError;
                    window.alert(data.proofError);
                    return;
              } else if (res.status === 200 || res.status === 201) {
                  window.alert("proof sent successful!");
                  location.assign('/tenglobalhome')
            
                }
            })();
            });
          }
        })

})();
//});