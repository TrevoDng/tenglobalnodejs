import { generateTableRows } from "./generateTableRows.js";

export function showUserById(myUser, e) {
    const userId = e.target.dataset.userId;
    const profileTableBody = document.getElementById("table-body-profile");

    if (myUser.id === parseInt(userId)) {
        const profileData = [{
            title: "Name",
            name: myUser.username,
        },
        {
            title: "Contact Number",
            name: myUser.contact_number,
        },
        {
            title: "Account",
            account: myUser.account,
        },
        {
            title: "Registered Date",
            date: /\d{4}-\d{2}-\d{2}/.exec(myUser.registered_date),
        },
        {
            title: "Status",
            another: "Active",
        }
    ];
  
        generateTableRows(profileData, profileTableBody);
}
}