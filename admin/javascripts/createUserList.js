
export function createUserList(container, data) {
    data.forEach((user) => {
    const li = document.createElement('li');
    const arrowHolder = document.createElement("span");
    arrowHolder.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
    arrowHolder.style.float = "right";
    li.className = "items-users-list";
    //li.style.textAlign = "left";
    li.dataset.userId = user.id; // Store the user ID in the dataset
    li.dataset.link = "userpage";
    li.innerHTML = user.username;
    li.appendChild(arrowHolder);
    container.appendChild(li);
    });
    }