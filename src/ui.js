const UI = () => {
  let getClickedIcon;

  const setProjects = (projectValues, id) => {
    const infoProjects = JSON.parse(localStorage.getItem('allProjects'));
    infoProjects[id] = projectValues;
    localStorage.setItem('allProjects', JSON.stringify(infoProjects));
  };

  const hideAndDisplayElement = (ele, arrayList) => {
    const array = document.querySelectorAll(arrayList);
    array.forEach((item) => {
      if (item.id === ele) {
        item.classList.add('clicked');
      } else {
        item.classList.remove('clicked');
      }
    });
  };

  const resetForm = (form) => {
    document.getElementById(form).reset();
  };

  const resetIcons = () => {
    const array = document.querySelectorAll('.select-icons .icon');
    array.forEach((icon) => {
      icon.classList.remove('clicked');
    });
  };

  const getClickedProjectIcon = () => {
    const iconArea = document.querySelector('.select-icons');
    iconArea.addEventListener('click', (e) => {
      if (e.target.classList.contains('icon')) {
        const { id } = e.target;
        hideAndDisplayElement(id, '.select-icons .icon');
        getClickedIcon = e.target.className;
      }
      return getClickedIcon;
    });
  };


  const addProjectToList = () => {
    const addProjectButton = document.getElementById('add-project-btn');
    const allProjectsList = document.getElementById('all-projects');
    const titleName = document.getElementById('project-name');
    let counter = 1;
    getClickedProjectIcon();
    addProjectButton.addEventListener('click', () => {
      const list = document.createElement('li');
      list.className = 'list-group-item';
      list.id = `project-${counter}`;
      list.innerHTML = `${titleName.value} <span class="${getClickedIcon}"></span>`;
      allProjectsList.append(list);
      const projectValues = { id: list.id, title: titleName.value, icon: getClickedIcon };
      setProjects(projectValues, list.id);
      resetForm('add-project-form');
      resetIcons();
      counter += 1;
    });
  };

  const displayProjectInCard = () => {
    const projectsArea = document.getElementById('all-projects');
    projectsArea.addEventListener('click', (e) => {
      if (e.target.classList.contains('list-group-item')) {
        const { id } = e.target;
        hideAndDisplayElement(id, '.all-project-content .list-group-item');
        const projectTitle = document.getElementById('project-title');
        projectTitle.innerHTML = e.target.innerHTML;
      }
    });
  };

  const createTaskContent = (getInputValues) => {
    const appendTask = document.createElement('li');
    appendTask.className = `list-group-item ${getInputValues.task_radio}-border`;
    appendTask.innerHTML = `
      <h6 class="card-title mb-1">${getInputValues.task_name} &nbsp;&nbsp;<small
          class="task-date">${getInputValues.task_date}</small> </h6>
      <small class="card-text">${getInputValues.task_description}</small>
      <div class="task-icons">
        <i class="far fa-edit edit text-info"></i>
        <i class="far fa-trash-alt delete text-danger"></i>
      </div>`;
    return appendTask;
  };


  const addTaskToProject = (getFormInput) => {
    const addTaskBtn = document.getElementById('add-task-button');
    const taskContainer = document.getElementById('all-tasks-content');
    const formInputs = document.querySelectorAll('#add-task-form .form-control');
    const formButtons = document.getElementsByName('priorityRadios');

    addTaskBtn.addEventListener('click', () => {
      const getinputs = getFormInput(formInputs, formButtons);
      const values = createTaskContent(getinputs);
      resetForm('add-task-form');
      taskContainer.append(values);
    });
  };

  const toggleAllProject = () => {
    const allProjectBtn = document.getElementById('display-all-project-btn');
    const projectContent = document.getElementById('all-project-content');
    allProjectBtn.addEventListener('click', () => {
      projectContent.classList.toggle('hide');
    });
  };

  const toggleTaskForm = () => {
    const addTaskBtn = document.getElementById('add-task-form-btn');
    const taskForm = document.getElementById('add-task-inputs');
    addTaskBtn.addEventListener('click', () => {
      taskForm.classList.toggle('hide');
    });
  };

  const validateForm = () => {
    const projectName = document.getElementById('project-name');
    projectName.addEventListener('keyup', () => {
      if (projectName.value !== '') {
        document.getElementById('add-project-btn').disabled = false;
      } else {
        document.getElementById('add-project-btn').disabled = true;
      }
    });
  };


  return {
    displayProjectInCard, addTaskToProject, validateForm, addProjectToList, toggleTaskForm, toggleAllProject,
  };
};

module.exports = UI;