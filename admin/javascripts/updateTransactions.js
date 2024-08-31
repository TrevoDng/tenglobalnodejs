//import { adminGetProof } from "./adminGetProof.js";

      const form = document.getElementById('update-transaction-form');
      const transactionStatus = document.querySelector('#update-status');
      const transactionMessage = document.querySelector('#update-message');
      const userExists = document.getElementById("update-error");
      //const proofLink = document.getElementsByClassName("items-proof-list");
     // const myUser = user.find((user) => user.proof_id === parseInt(proofId));

      const statusValue = transactionStatus.value = "sent";
      
      export function updateTransaction(userId, proofId) {
        form.addEventListener('submit', async (e)=> {
          e.preventDefault()
          
          try {
              const res = await fetch('/api/auth/admin/update-transaction', {
                  method: 'POST',
                  body: JSON.stringify({user_id: userId, proof_id: proofId, pending_action: statusValue, update_message: transactionMessage.value }),
                  headers: { 'content-Type': 'application/json' }
              })
  
              const data = await res.json();
  
              if (res.status === 200 || res.status === 201) {
                userExists.innerHTML = "transaction updated!";
                userExists.style.color = "green";
              }

              if (res.status === 400 || res.status === 401) {
                    userExists.innerHTML = "Email or password is incorrect, Please try again!";
                    userExists.style.color = "red";
              }

              console.log(data.role)
          } catch (err) {
              console.log(err.message)
          }
        })
      }
