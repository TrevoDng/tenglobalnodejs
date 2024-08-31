import { userData } from "./userData.js";
import { proofData } from "./getProofData.js";

//window.logout = function(element) {
  
    const logoutLink = document.getElementById('logout-btn');

  if (logoutLink) {
      logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        
        console.log("hi");

        (async() => {
          await userData(`${window.location.origin}/userbyid`, "LOGOUT");

          console.log("successful");
          //const users = await userData("http://localhost:3000/userbyid", "LOGOUT");
      })();
      
        //event.currentTarget.setAttribute('href', "/logout");
          window.location.href = "/logout";
          console.log("outside");
      });
  }
//}

//window.logout(this);

(async()=> {

  const users = await userData(`${window.location.origin}/userbyid`, "LOGIN"); //token data link
  const user = users.userData;
  
  console.log(users.isLoggedIn);
 
console.log(user.username); // Output: "Ann Nchela"
console.log(user.email);
console.log(user);
  

    const userImage = document.getElementById('profile_pic_id');
    const clientName = document.getElementById('username_id');

          clientName.innerHTML = user.username;
          userImage.setAttribute("src", user.profile_picture);
   // })


   const proofDataArray = await proofData(`${window.location.origin}/userbyid`);
   
   let initialNumber = 0 
   function totalFunction(proofDataArray) {
    for(const [index, proof] of Object.entries(proofDataArray)) {
      initialNumber += Number(proof.amount);
    }
  
    return initialNumber;
  } 

  const totalAmount = totalFunction(proofDataArray);
  const totalAmountStr = totalAmount.toString();

  const formattedNumber = (amount) => {
    return Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(parseFloat(amount));
  };

  const statementHeaderRow = document.getElementById("statement-header-row");
  if (statementHeaderRow.childElementCount === 0) {
    const tableHead1 = document.createElement("th");
    tableHead1.innerHTML = "Date";
    tableHead1.style.color = "gray";
    statementHeaderRow.appendChild(tableHead1);
  
    const tableHead2 = document.createElement("th");
    tableHead2.innerHTML = "Status";
    tableHead2.style.color = "gray";
    statementHeaderRow.appendChild(tableHead2);

    const tableHead3 = document.createElement("th");
    tableHead3.innerHTML = "Download";
    tableHead3.style.color = "gray";
    statementHeaderRow.appendChild(tableHead3);
  
    
  let statementData = [];
proofDataArray.sort((a, b)=> {
  return new Date(b.created_on) - new Date(a.created_on);
})
.forEach((proof, rowIndex) => {
    statementData.push({
      //title: "Date",
      date: /\d{4}-\d{2}-\d{2}/.exec(proof.created_on),
      status: proof.pending_action,
      download: `<button onclick=(downloadStatement(${rowIndex}))>Download</button>`,
        });
  });

   //window.alert(statementData.length);
  const statementTableBody = document.getElementById("table-body-statement");
  statementTable(statementData, statementHeaderRow, statementTableBody);
  }
  //end of statement data

  const accountTableBody = document.getElementById("table-body-account");
  if (accountTableBody.childElementCount === 0) {
    const accountData = [{
      title: "Name",
      name: user.username,
  },
  {
      title: "Account",
      account: user.account,
  },
  {
  
      title: "Registered Date",
      date: /\d{4}-\d{2}-\d{2}/.exec(user.registered_date),
  },
  {
      title: "Status",
      another: "Active",
  }
  ];
  
  generateTableRows(accountData, accountTableBody);
  }

  
  const profileTableBody = document.getElementById("table-body-profile");
  if (profileTableBody.childElementCount === 0) {
    const profileData = [{
      title: "Name",
      name: user.username,
  },
  {
      title: "Account",
      account: user.account,
  },
  {
  
      title: "Registered Date",
      date: /\d{4}-\d{2}-\d{2}/.exec(user.registered_date),
  },
  {
      title: "Status",
      another: "Active",
  }
  ];
  
  generateTableRows(profileData, profileTableBody);
  } 
    //history data
    const historyHeaderRow = document.getElementById("history-header-row");
    if (historyHeaderRow.childElementCount === 0) {
      const tableHead1 = document.createElement("th");
    tableHead1.innerHTML = "Date";
    tableHead1.style.color = "gray";
    historyHeaderRow.appendChild(tableHead1);
  
    const tableHead2 = document.createElement("th");
    tableHead2.innerHTML = "Amount";
    tableHead2.style.color = "gray";
    historyHeaderRow.appendChild(tableHead2);

    const tableHead3 = document.createElement("th");
    tableHead3.innerHTML = "Status";
    tableHead3.style.color = "gray";
    historyHeaderRow.appendChild(tableHead3);

      let historyData = [];
proofDataArray.forEach((proof) => {
    historyData.push({
      //title: "Date",
      date: /\d{4}-\d{2}-\d{2}/.exec(proof.created_on),
      amount: formattedNumber(proof.amount),
      status: proof.pending_action,
        });
  });
    const historyTableBody = document.getElementById("table-body-history");
    statementTable(historyData, historyHeaderRow, historyTableBody);
    }
    //end of history data

    //balance data
    //const totalAmount = proofDataArray.reduce((acc, current) => acc + current.amount, 0);
    const balanceTableBody = document.getElementById("table-body-balance");
    if (balanceTableBody.childElementCount === 0) {
      const balanceData = [
    {
        title: "Balance",
        balance: formattedNumber(totalAmountStr),
    }
    ];
    generateTableRows(balanceData, balanceTableBody);
    }
    //end of balance data
    
//user data
   
  })();
//}
//service table rows and col generator function
function generateTableRows(datas, tableBody) {
  datas.map((data, index) => {
    const tableRow = document.createElement("tr");
    Object.values(data).forEach((data) => {
      const tableCol = document.createElement("td");
      tableCol.innerHTML += data;
      tableCol.style.textAlign = "left";
      tableCol.style.padding = "5px 25px 5px 25px";

      if(tableCol.innerHTML === "...pending") {
        tableCol.style.color = "brown";
      }

      if(tableCol.innerHTML === "sent") {
        tableCol.style.color = "green";
      }
      //tableCol.style.margin = "0px 10px 0px 10px";
      tableRow.appendChild(tableCol);
    });
    if (index % 2 === 0) {
      tableRow.style.backgroundColor = "#dff7fa";
    }
    tableBody.appendChild(tableRow);
  });
}


function statementTable(datas, headerRow, tableBody) { 
  // Loop through data and create table rows
  datas.map((data, index) => {
    
    const tableRow = document.createElement("tr");
    
    // Create columns and append to tableRow
    Object.values(data).forEach((data, colIndex) => {
      const tableCol = document.createElement("td");
      tableCol.innerHTML = data;
      tableCol.style.textAlign = "left";
      tableCol.style.padding = "5px 25px 5px 25px";
      
        if(colIndex % 2 === 0) {
          tableCol.style.textAlign = "left";
        } else {
          tableCol.style.textAlign = "right";
        }

        if(tableCol.innerHTML === "...pending") {
          tableCol.style.color = "brown";
        }
  
        if(tableCol.innerHTML === "sent") {
          tableCol.style.color = "green";
        }

        tableRow.appendChild(tableCol);
    });
    
    // Alternate row colors
    if (index % 2 === 0) {
      tableRow.style.backgroundColor = "#dff7fa";
    }  
    // Append tableRow to tableBody
    tableBody.appendChild(tableRow);
  });
}

function downloadStatement(rowIndex){
  window.alert(rowIndex);
}