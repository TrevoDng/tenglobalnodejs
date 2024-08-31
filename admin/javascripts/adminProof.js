//import { userData } from "../../public/javascripts/userData";
import { adminGetProof } from "./adminGetProof.js";

import { createProofList } from "./createProofList.js";
import { proofOnclickListener } from "./proofOnClickListener.js";

const olProof = document.getElementById("transaction-element");
const typeLink = document.getElementsByClassName("items-proof-list");

        //create user names list
            (async()=> {
              const data = await adminGetProof();
            //console.log(JSON.stringify(data, null, 1));
            createProofList(olProof, data)

            proofOnclickListener(typeLink , data);
            })();