
export function createProofList(container, data) {
    
    data.sort((a, b) => {
        return new Date(b.created_on) - new Date(a.created_on);
    }).forEach((user) => {
    const li = document.createElement('li');
    const arrowHolder = document.createElement("span");
    arrowHolder.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
    arrowHolder.style.float = "right";
    li.className = "items-proof-list";
    li.dataset.proofId = user.proof_id; // Store the user ID in the dataset
    li.dataset.proofUserId = user.user_id;
    li.dataset.link = "proofpage";
    const dateTimeParts = user.created_on.split('T');
li.innerHTML = `${user.username} ${dateTimeParts[0]} ${dateTimeParts[1].split('.')[0]} R${user.amount}`;
    li.appendChild(arrowHolder);
    container.appendChild(li);
    });
    }



    //li.classList.add("items-proof-list")
    //li.style.textAlign = "left";

    //li.innerHTML = `${user.username} ${/(.*)/.exec(user.created_on)[0]}`;
    //li.innerHTML = `${user.username} ${/\d{4}-\d{2}-\d{2}/.exec(user.created_on)}`;
    // 2024-08-17 00:50:34.86+02 
    // /\d{4}-\d{2}-\d{2}/
    // const match = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+/.exec(user.created_on);
    // li.innerHTML = `${user.username} ${match ? match[0] : ''}`;