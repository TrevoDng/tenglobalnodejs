window.onload =( async()=> {

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

 let fileUrlPromise = null;

  const form = document.querySelector('form')
  const username = document.querySelector('#username')
  const surname = document.querySelector('#surname')
  const password = document.querySelector('#password')
  const matchPassword = document.querySelector('#match-password')
  const email = document.querySelector('#email')
  const country_name = document.querySelector('#country_name')
  const contact_number = document.querySelector('#register-contact-number')
  const display = document.querySelector('.error')
  const userExists = document.getElementById("userExists");
  const matchPasswordDisplay = document.getElementById("match-password-display");
  const submitBtn = document.getElementById("register-submit-btn");

  //save file to firebase
  const fileInput = document.getElementById('file');
  let fileUrl = "";

  contact_number.addEventListener("focusout", (e) => {
    e.preventDefault();
    e.target.value = e.target.value.replace(/\s+/g, '');
    if (e.target.value !== "") {
      // Do something with the trimmed value
    }
  });
  
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
  
    if (file && username.value.trim() !== "" && surname.value.trim() !== "" && contact_number.value!== "") {

    const usernameValue = username.value.trim();
    const surnameValue = surname.value.trim();
    const contactValue = contact_number.value//.trim();

      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`profile_pic/${usernameValue.toLowerCase()}_${surnameValue.toLowerCase()}/${contactValue}/${file.name}`);
  
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
      
    } else {
      console.log('No file uploaded or missing username/surname/contact_number');
    }
  });

  matchPassword.addEventListener("focusout", (ePasswordMatch) => {

      if (password.value === "") {
        matchPasswordDisplay.hidden = true;
      }
        if (ePasswordMatch.target.value !== password.value) {
          matchPasswordDisplay.hidden = false;
          matchPasswordDisplay.style.color = "red";
          matchPasswordDisplay.innerHTML = `<i class="fa-solid fa-check"></i>`;//"first password does not match!";
          //ePasswordMatch.preventDefault()
          //ePasswordMatch.stopPropagation()
          //ePasswordMatch.stopImmediatePropagation()
          submitBtn.disabled = true;
              return
      } else {
          submitBtn.disabled = false;
          matchPasswordDisplay.style.color = "green";
          matchPasswordDisplay.innerHTML = `<i class="fa-solid fa-check"></i>`; //"first password match";

          form.addEventListener('submit', async (e) => {
    
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            display.textContent = ''

            const passwordValue = password.value
            const matchPasswordValue = matchPassword.value

            if (passwordValue !== matchPasswordValue) {
              matchPasswordDisplay.hidden = false;
              matchPasswordDisplay.style.color = "red";
              matchPasswordDisplay.innerHTML = `<i class="fa-solid fa-check"></i>`;//"password does not match!";
              //e.stopPropagation()
              e.stopImmediatePropagation()
              e.preventDefault()
              return

            } else {
                matchPasswordDisplay.style.color = "green";
                matchPasswordDisplay.innerHTML = `<i class="fa-solid fa-check"></i>`;//"password match";

                // Later, when you need the fileUrl
                if (fileUrlPromise) {
                  fileUrlPromise.then((fileUrls) => {
                    fileUrl = fileUrls;

                    console.log("File URL:", fileUrl);

                    const userData = {
                      username: username.value, 
                      surname: surname.value, 
                      email: email.value, 
                      password: password.value, 
                      contact_number: contact_number.value, 
                      country_name: country_name.value,
                      file: fileUrl,
                    };

              (async() => {
          
                try {
                  const res = await fetch(`${window.location.origin}/api/auth/signup`, {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: { 'content-Type': 'application/json' },
                }).catch (err => {
                    console.log(err)
                }) 

                const data = await res.json()
        
                if(res.status === 400 || res.status === 401) {
                  userExists.style.color = "red";
                  window.alert(data.registerMessage);
                  return userExists.innerHTML = data.email_error_message;
                }
                  data.role === "USER" ? location.assign('/tenglobalhome') : location.assign('/signin')
                  //userExists.innerHTML = "";
              } catch (err) {
                  console.log(err.message)
                }
              
                    })();

                  });
                }  
            }
        })
      }
  });

});
