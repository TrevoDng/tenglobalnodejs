
    const loadingContainer = document.getElementById("loading-animation");
    const pTagLodingIconHolder = document.createElement('p');
    
    const navDivs = [{
        sectionId: "main",
        title: "Send Proof",
        iTag: `<i class="fa-solid fa-file"></i>`,
    }, {
        sectionId: "sendproof",
        title: "Send Proof",
        iTag: `<i class="fa-solid fa-money-check"></i>`,
    },
        {
        sectionId: "account",
        title: "Account",
        iTag: `<i class="fa-solid fa-money-check"></i>`,
    },
    {
        sectionId: "statement",    
        title: "Statement",
        iTag: `<i class="fa-solid fa-file"></i>`,
    },
    {
        sectionId: "history",
        title: "History",
        iTag: `<i class="fa-solid fa-clock-rotate-left"></i>`,
    },
    {
        sectionId: "balance",
        title: "Balance",
        iTag: `<i class="fa-solid fa-money-bill-1-wave"></i>`,
    }].map((item, index)=> {
        const mainServiceFeature = document.createElement('div');
        const pTag = document.createElement('p');
        
        const pTagIconHolder = document.createElement('p');
        let mainServiceFeatureSpan = document.createElement('span');
        const loadingITag = `<i class="fa fa-refresh fa-spin"></i>`;    
        const textNode = document.createTextNode(item.title)
        //textNode.className = "text-node";

        if (index === 0) {
            mainServiceFeature.style.display = "none";
        }

        //set attributes and styles
        mainServiceFeature.id = "main_service_feature"+[index];
        mainServiceFeature.className = "nav-link";
        mainServiceFeature.style.cursor = "pointer";
        mainServiceFeature.dataset.target = `#${item.sectionId.toLowerCase()}`;
        
        pTag.className= "service-title"
        pTag.innerHTML = item.title;
        
        mainServiceFeatureSpan.className = "service-span-icon"
        
        pTagIconHolder.className = "pTag-icon-holder";
        pTagLodingIconHolder.className = "pTag_loading_icon_holder";
    
        //add values
        mainServiceFeatureSpan.innerHTML = item.iTag;
        pTagLodingIconHolder.innerHTML = loadingITag;

        pTagIconHolder.appendChild(mainServiceFeatureSpan)
        mainServiceFeature.appendChild(pTagIconHolder)

       // mainServiceFeature.style.padding = 5+"px";
        
        mainServiceFeature.append(pTag)

        mainServiceFeature.addEventListener('mouseover', () => {
            mainServiceFeature.classList.add('hover');
          });
          
        mainServiceFeature.addEventListener('mouseout', () => {
            mainServiceFeature.classList.remove('hover');
          });

        return mainServiceFeature
        
    });

    const navContainer = document.getElementById("nav-container");

    navDivs.forEach((div) => {
        navContainer.appendChild(div);
    });

    
    const sections = document.querySelectorAll('.service_section');

    sections.forEach((section) => {
        section.style.display = "none";
    })

function showServiceSection(sectionId) {
            const pages = {
                    main: "main",
                    sendproof: "sendproof",
                    account: "account",
                    statement: "statement",
                    history: "history",
                    balance: "balance",
                    notification: "notification",
                    contact: "contact",
                    about: "about",
                    profile: "profile",
                    editprofile: "editprofile",
            };
    
        Object.keys(pages).forEach((page) => {
            //create one div tohold pages based on id
            const pageElement = document.querySelector(`[data-page-id="${pages[page]}"]`)
            pageElement.style.display = page === sectionId ? "block" : "none";
        });
        }
    
        //add event listener
      
           const navLink = document.querySelectorAll('.nav-link');
           const pTagStored = document.getElementsByClassName("service-title"); 
           
            Array.prototype.forEach.call(navLink, (link, index) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault()
                
                    loadingContainer.style.display = "block";
                    loadingContainer.appendChild(pTagLodingIconHolder);
    
                    //const target = e.target.dataset.target || e.target.hash 
                    const target = e.target.closest('.nav-link').dataset.target || e.target.closest('.nav-link').hash;
                    const sectionId = target.substring(1) || target;

                    setTimeout(()=> {
                        loadingContainer.style.display = 'none';
                        showServiceSection(sectionId);
                    }, 1000);
        });
    });
    
    const gobackBtn = document.querySelectorAll(".goback");

    gobackBtn.forEach((backBtn)=> {
        // backBtn.innerHTML = goBackBtnIcon;
         backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
         backBtn.style.fontSize = 20;
     });
    
        Array.prototype.forEach.call(gobackBtn, (btn) => {
            btn.addEventListener('click', (e) => {
                btn.style.textContext = `<i class="fa-solid fa-arrow-left"></i>`;
                const target = e.target.closest('.goback').hash || e.target.closest('.goback').getAttribute('data-target')
                
                // e.target.hash || e.target.dataset.target;
                const sectionId = target || target.substring(1)
                //target.substring(1) || target;
                showServiceSection(sectionId)
            });
        });