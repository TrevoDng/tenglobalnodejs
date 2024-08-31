    //show pages
    export const showServicePages =(sectionId) => {
        const pages = {
            main: "main",
            userpage: "userpage",
            proofpage: "proofpage",
            clients: "clients",
            transactions: "transactions",
        }
    
        Object.keys(pages).forEach((page) => {
            const pageElement = document.querySelector(`[data-page-id="${pages[page]}"]`);
            
            pageElement.style.display = page === sectionId ? "block" : "none";
        })
    }