import { generateTableRows } from "./generateTableRows.js";
import { updateTransaction } from "./updateTransactions.js";

export function showProofById(myUser, e) {
    const userId = e.target.dataset.proofUserId;
    const proofId = e.target.dataset.proofId;

    //window.alert(`userId: ${userId} proofId: ${proofId}`);
    
    const proofTableBody = document.getElementById("table-body-proof");

    if (myUser.proof_id === parseInt(proofId)) {

        const proofData = [{
            title: "Name",
            name: myUser.username,
        },
        {
            title: "Amount",
            account: myUser.amount,
        },
        {
            title: "Destination",
            account: myUser.destination,
        },
        {
            title: "Reference",
            account: myUser.reference,
        },
        {
            title: "Proof ID",
            account: myUser.proof_id,
        },
        {
            title: "User ID",
            account: myUser.user_id,
        },
        {
            title: "Date",
            date: /\d{4}-\d{2}-\d{2}/.exec(myUser.created_on),
        },
        {
            title: "Status",
            another: myUser.pending_action,
        }
    ];
  
        generateTableRows(proofData, proofTableBody);
}

    updateTransaction(userId, proofId);
}