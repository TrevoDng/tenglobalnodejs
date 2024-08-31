import { showServicePages } from "./showServicePages.js";

const pTagLodingIconHolder = document.createElement('p');
    const loadingITag = `<i class="fa fa-refresh fa-spin"></i>`;
    pTagLodingIconHolder.className =  "pTag-loading-icon_holder";
    pTagLodingIconHolder.innerHTML  = loadingITag;
    
    pTagLodingIconHolder.style.position = "absolute";
    pTagLodingIconHolder.style.top = "50%";
pTagLodingIconHolder.style.left = "50%";
pTagLodingIconHolder.style.transform = "translate(-50%, -50%)";
    
  const userData = [{
    sectionId: "main",
    name: "Main",
},
{
    sectionId: "clients",
    name: "Clients",
    iTag: `<i class='fa fa-user'></i>`,
    //iTag: `<i class='fa fa-user' style='font-size:10px'></i>`,
},
{
    sectionId: "transactions",
    name: "Transactions",
    iTag: `<i class="fa-solid fa-file"></i>`,
},
].map((section, index) => {
    const div = document.createElement("div");
    const iconHolder = document.createElement("p");
    const nameHolder = document.createElement("p");

    if (index === 0) {
        div.style.display = "none";
    }
    
    div.className = "service-section";
    div.target = `${section.sectionId}`;
    //alert(div.target)
    
    iconHolder.innerHTML = section.iTag;
    nameHolder.innerHTML = section.name;
    div.appendChild(iconHolder);
    div.appendChild(nameHolder);

    return div;
});

const mainSectionPage = document.getElementById("main-service-section");

userData.forEach((div) => {
    mainSectionPage.appendChild(div);
})

const sections = document.querySelectorAll('.admin-service-section');

    sections.forEach((section) => {
        section.style.display = "none";
    })

const serviceSection = document.querySelectorAll(".service-section");

Array.prototype.forEach.call(serviceSection, (section, index) => {
    
   section.addEventListener('click', (e) => {
        e.preventDefault();

        serviceSection.forEach((e)=> {
  e.classList.add('admin-service-section');
        })
        
        const target = e.target.closest(".admin-service-section").target;
        
        const sectionId = target
        pTagLodingIconHolder.style.display = "block";
        const currentElement = e.target.closest(".admin-service-section");
         currentElement.appendChild(pTagLodingIconHolder);
  //currentElement.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        
        setTimeout(()=> {
pTagLodingIconHolder.style.display = "none"; 
        showServicePages(sectionId);
                    }, 1000);
    });
    
    serviceSection.forEach((e)=> { 
e.classList.remove('admin-service-section');
        });
        
});

const gobackBtn = document.querySelectorAll(".goback");
    
      
      gobackBtn.forEach((backBtn)=> {
         // backBtn.innerHTML = goBackBtnIcon;
          backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
          backBtn.style.fontSize = 20;
      })
    

Array.prototype.forEach.call(gobackBtn, (btn) => {
            btn.addEventListener('click', (e) => {
                const target = e.target.closest('.goback').hash || e.target.closest('.goback').getAttribute('data-target');
                
                const sectionId = target || target.substring(1)
                //alert(sectionId)
      showServicePages (sectionId)
            });    
        });