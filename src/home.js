//Home page
import { createTodoForm,  createProjForm } from './forms';

export default function home(){
    const mainContainer = document.createElement('div');
    const contentContainer = document.createElement('div');
    const sidebarContainer = document.createElement('div');
    const projectsContainer = document.createElement('div');
    const selectedProjectContainer = document.createElement('div');
    const addProjBtnContainer = document.createElement('div');
    const addProjBtn = document.createElement('div');
    const plusText = document.createElement('span');
    const addProjText = document.createElement('span');

    const myModal = document.createElement('div');
    myModal.setAttribute('id', 'myModal');
    myModal.setAttribute('class', 'modal');
    
    const projModal = document.createElement('div');
    projModal.setAttribute('id', 'projModal');
    projModal.setAttribute('class', 'modal');

    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');

    const projModalContent = document.createElement('div');
    projModalContent.setAttribute('class', 'modal-content');

    contentContainer.setAttribute('id', 'middle');
    projectsContainer.setAttribute('id', 'projects');
    addProjBtnContainer.setAttribute('id', 'addProjContainer');
    selectedProjectContainer.setAttribute('id', 'selectedProjContainer');
    selectedProjectContainer.style.display = "none";

    sidebarContainer.setAttribute('id', 'sidebar');

    plusText.textContent = "+";
    plusText.setAttribute('class', 'plus-text');
    addProjText.textContent = "Add Project";
    addProjText.setAttribute('class', 'proj-text');
    addProjBtn.setAttribute('id', 'addProj');
    addProjBtn.appendChild(plusText);
    addProjBtn.appendChild(addProjText);


    //Attach forms to modals
    modalContent.appendChild(createTodoForm());
    projModalContent.appendChild(createProjForm());

    myModal.appendChild(modalContent);
    projModal.appendChild(projModalContent);

    addProjBtnContainer.appendChild(addProjBtn);

    contentContainer.appendChild(sidebarContainer);
    contentContainer.appendChild(projectsContainer);
    contentContainer.appendChild(addProjBtnContainer);
    contentContainer.appendChild(selectedProjectContainer);

    mainContainer.appendChild(createHeader());
    mainContainer.appendChild(myModal);
    mainContainer.appendChild(projModal);
    mainContainer.appendChild(contentContainer);
    
    return mainContainer;
}


function createHeader(){
    const headerContainer = document.createElement('div');

    const logoContainer = document.createElement('div');
    const title = document.createElement('h1');
    const subheading = document.createElement('p');

    headerContainer.setAttribute('id', 'header');
    logoContainer.setAttribute('id', 'logo');

    title.textContent = "idil⌛";
    subheading.textContent = "i'll do it later...";

    logoContainer.appendChild(title);
    logoContainer.appendChild(subheading);

    headerContainer.appendChild(logoContainer);

    return headerContainer;
}


