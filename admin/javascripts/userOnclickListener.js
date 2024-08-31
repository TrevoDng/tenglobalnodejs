import { showServicePages } from "./showServicePages.js";
import { showUserById } from "./showUserById.js";

export function userOnclickListener(typeLink, user) {
    
    //typeLink.forEach((link) => {
    Array.prototype.forEach.call(typeLink, (link, index)=> {    
        link.addEventListener('click', (e) => {
            const pTagLodingIconHolder = document.createElement('p');
            const loadingITag = `<i class="fa fa-refresh fa-spin"></i>`;
            pTagLodingIconHolder.className =  "pTag-loading-icon_holder";
            pTagLodingIconHolder.innerHTML  = loadingITag;
        
            pTagLodingIconHolder.style.position = "absolute";
            pTagLodingIconHolder.style.top = "20%"; 
            pTagLodingIconHolder.style.left = "50%";
            pTagLodingIconHolder.style.transform = "translate(-50%, -50%)";
    
            const userId = e.target.dataset.userId;
            const sectionId = e.target.dataset.link;
    
            const currentElement = e.target.closest(".items-users-list");
         
            //window.alert(userId);
            const myUser = user.find((user) => user.id === parseInt(userId));
            //alert(`${myUser.id}. ${myUser.username} ${sectionId}`);
    
            currentElement.append(pTagLodingIconHolder);
    
            setTimeout(()=> {
                pTagLodingIconHolder.style.display = "none"; 
                showServicePages(sectionId);
                showUserById(myUser, e);
            }, 1000);
            
        });
    });
}