        const emailForm = document.getElementById("update-email-form")
        const contactForm = document.getElementById('update-contact-form')
        const updateEmail = document.querySelector('#edit-email')
        const updateContact = document.querySelector('#edit-contact-number')
        const emailError = document.getElementById("update-email-error");
        const contactError = document.getElementById("update-contact-error");
        
        emailError.hidden = true;
        contactError.hidden = true;

        emailForm.addEventListener('submit', async (e)=> {
            e.preventDefault()
            
            try {
                const res = await fetch('/api/auth/update-email', {
                    method: 'PATCH',
                    body: JSON.stringify({ email: updateEmail.value, }),
                    headers: { 'content-Type': 'application/json' }
                })
    
                const data = await res.json();
    
                if (res.status === 400 || res.status === 401) {
                    emailError.hidden = false;
                    emailError.style.color = "red";
                    return emailError.innerHTML = `${data.emailError}`;
                }
                console.log(data)

                emailError.hidden = false;
                emailError.style.color = "green";
                emailError.innerHTML = `${data.emailMessage}`;
            } catch (err) {
                console.log(err.message)
            }
          })

          contactForm.addEventListener('submit', async (e)=> {
            e.preventDefault()
            
            try {
                const res = await fetch('/api/auth/update-contact-number', {
                    method: 'PATCH',
                    body: JSON.stringify({ contact_number: updateContact.value, }),
                    headers: { 'content-Type': 'application/json' }
                })
    
                const data = await res.json();
    
                if (res.status === 400 || res.status === 401) {
                    contactError.style.hidden = false;
                    contactError.style.color = "red";
                    return contactError.innerHTML = `${data.emailError}`;
                }
                console.log(data.role)

                contactError.hidden = false;
                contactError.style.color = "green";
                return emailError.style.innerHTML = `${data.emailMessage}`;
            } catch (err) {
                console.log(err.message)
            }
          });