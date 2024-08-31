export function generateTableRows(datas, tableBody) {

  tableBody.innerHTML = "";
    datas.map((data, index) => {
      const   tableRow = document.createElement("tr");
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