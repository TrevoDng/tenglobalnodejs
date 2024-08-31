import { showProofById } from "./showProofById.js";
import { showServicePages } from "./showServicePages.js";

export function proofOnclickListener(typeLink, user) {
    
    //typeLink.forEach((link) => {
    Array.prototype.forEach.call((typeLink), (link, index) =>{
        link.addEventListener('click', (e) => {
    
            const pTagLodingIconHolder = document.createElement('p');
        const loadingITag = `<i class="fa fa-refresh fa-spin"></i>`;
        pTagLodingIconHolder.className =  "pTag-loading-icon_holder";
        pTagLodingIconHolder.innerHTML  = loadingITag;
        
        pTagLodingIconHolder.style.position = "absolute";
        pTagLodingIconHolder.style.top = "20%";
        pTagLodingIconHolder.style.left = "50%";
        pTagLodingIconHolder.style.transform = "translate(-50%, -50%)";
    
            const proofId = e.target.dataset.proofId;
            const sectionId = e.target.dataset.link;
    
            const currentElement = e.target.closest(".items-proof-list");
         
            //window.alert(`sectionId: ${sectionId}`);
            const myUser = user.find((user) => user.proof_id === parseInt(proofId));
            //alert(`${myUser.proof_id}. ${myUser.username} ${sectionId}`);
    
            
            currentElement.append(pTagLodingIconHolder);
    
            setTimeout(()=> {
                pTagLodingIconHolder.style.display = "none"; 
                showServicePages(sectionId);
                showProofById(myUser, e);
            }, 1000);
            
        });
    });
}