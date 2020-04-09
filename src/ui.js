import { format } from 'date-fns';
import Storage from './localStorage';
import Logic from './logic';

const logic = Logic();
const storage = Storage();

const UI = () => {
  let getClickedIcon;

  const resetForm = (form) => {
    document.getElementById(form).reset();
  };

  const resetIcons = () => {
    const array = document.querySelectorAll('.select-icons .icon');
    array.forEach((icon) => {
      icon.classList.remove('clicked');
    });
  };

  const clickedIcon = () => {
    const iconArea = document.querySelector('.select-icons');
    iconArea.addEventListener('click', (e) => {
      if (e.target.classList.contains('icon')) {
        const { id } = e.target;
        logic.hideAndDisplayElement(id, '.select-icons .icon');
        getClickedIcon = e.target.className;
      }
      return getClickedIcon;
    });
  };

  const getContentForDisplaySection = (getLink) => {
    if (getLink === 'get-all-tasks') {
      document.querySelector('.project-card').style.display = 'none';
      document.querySelector('.all-tasks').style.display = 'block';
    } else {
      document.querySelector('.project-card').style.display = 'block';
      document.querySelector('.all-tasks').style.display = 'none';

      document.getElementById('add-task-button').className = `fas fa-plus-circle ${getLink}`;
      const projectTitle = document.getElementById('project-title');
      projectTitle.innerHTML = document.getElementById(getLink).innerHTML;
    }

    logic.hideAndDisplayElement(getLink, '.get-links');
  };

  const displaySections = () => {
    if (localStorage.getItem('displayProject') === null) {
      localStorage.setItem('displayProject', 'get-all-tasks');
    }
    const getClickedProject = localStorage.getItem('displayProject');
    const allClickedList = document.querySelectorAll('.get-links');

    allClickedList.forEach((link) => {
      link.addEventListener('click', () => {
        localStorage.setItem('displayProject', link.id);
        getContentForDisplaySection(link.id);
      });
    });

    getContentForDisplaySection(getClickedProject);
  };

  const getProjectFromStore = () => {
    const getAllProjects = JSON.parse(localStorage.getItem('allProjects'));
    const allProjectsList = document.getElementById('all-projects');

    let list = '';
    Object.keys(getAllProjects).forEach((key) => {
      const keys = getAllProjects[key];
      list += `
      <li class="list-group-item get-links" id="${keys.id}">
        ${logic.capString(keys.title)} <span class="${keys.icon}"></span>
      </li>`;
    });
    allProjectsList.innerHTML = list;
    displaySections();
  };

  const getProjectContents = () => {
    const addProjectButton = document.getElementById('add-project-btn');
    const titleName = document.getElementById('project-name');

    const getAllProjects = JSON.parse(localStorage.getItem('allProjects'));
    const { length } = getAllProjects === null ? 0 : Object.keys(getAllProjects);

    clickedIcon();
    addProjectButton.addEventListener('click', () => {
      const listId = `project-${length}`;
      const projectValues = {
        id: listId, title: titleName.value, icon: getClickedIcon, completed: 0,
      };

      storage.setProjectToStore(projectValues, listId);
      getProjectFromStore();

      resetForm('add-project-form');
      resetIcons();
    });
  };

  const createTaskInfo = (getProjectTasks, id) => {
    const projects = JSON.parse(localStorage.getItem('allProjects'));
    const completedTasks = projects[id].completed;
    const info = `
      <div class="d-flex justify-content-center mb-3">
        <div class="task-info">
          All Tasks <span class="badge badge-primary badge-pill">${getProjectTasks.length}</span>
        </div>
        <div class="task-info">
          Completed <span class="badge badge-primary badge-pill" id="task-complete-info-${id}">${completedTasks}</span>
        </div>
        <div class="task-info">
          Due <span class="badge badge-primary badge-pill">0</span>
        </div>
      </div>`;
    return info;
  };

  const createTaskContent = (id) => {
    const getProjectTasks = storage.getFilteredTaskFromStore('allTasks', id);
    const allTasksContent = document.getElementById('all-tasks-content');
    let lists = '';
    if (getProjectTasks.length > 0) {
      lists += createTaskInfo(getProjectTasks, id);

      getProjectTasks.forEach((ele) => {
        const value = ele[1];
        const key = ele[0];
        const myDate = format(new Date(value.task_date), 'MM/dd/yyyy');
        const currentDate = format(new Date(), 'MM/dd/yyyy');
        const expiredDate = myDate < currentDate ? 'Task expired' : '';
        const completed = value.completed ? 'completed' : '';

        lists += `
          <li class="list-group-item ${value.task_radio}-border ${completed}" id="task-list-${key}">
            <div class="toggle-complete-task" id="complete-task-${key}" title="click to complete task">
              <h6 class="card-title mb-1"><span id= "task-title-${key}">${logic.capString(value.task_name)}</span> &nbsp;&nbsp;<small
                  class="task-date" id="task-date-${key}">${value.task_date}</small> </h6> <small>${expiredDate}</small>
              <small class="card-text" id= "task-description-${key}">${logic.capString(value.task_description)}
              </small>
            </div>
            <div class="task-icons" id="task-icons">
              <i class="far fa-edit edit text-info" id="edit-${key}" data-toggle="modal" data-target="#editModal"></i>
              <i class="far fa-trash-alt delete text-danger" id="delete-${key}"></i>
            </div>
            <div id="priority-btn">
            </div>
          </li>`;
      });
    } else {
      lists = '<p class="text-muted no-task">You have no task!</p>';
    }

    allTasksContent.innerHTML = lists;
  };

  const displayProjectInCard = () => {
    const projectsArea = document.getElementById('all-projects');
    const storeId = localStorage.getItem('displayProject');
    projectsArea.addEventListener('click', (e) => {
      if (e.target.classList.contains('list-group-item')) {
        const { id } = e.target;
        document.getElementById('add-task-button').className = `fas fa-plus-circle ${id}`;
        const projectTitle = document.getElementById('project-title');
        projectTitle.innerHTML = e.target.innerHTML;

        createTaskContent(id);
      }
    });

    createTaskContent(storeId);
  };

  const completeTask = () => {
    const storeId = localStorage.getItem('displayProject');
    const getAllTasks = JSON.parse(localStorage.getItem('allTasks'));
    const getAllProject = JSON.parse(localStorage.getItem('allProjects'));
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('toggle-complete-task')) {
        const { id } = e.target;
        const parentList = document.getElementById(id).parentElement;
        const parentListId = document.getElementById(id).parentElement.id;
        parentList.classList.toggle('completed');

        const taskComplete = document.getElementById(`task-complete-info-${storeId}`);
        let getCompletedValue;
        let isCompleted;
        if (parentList.classList.contains('completed')) {
          getCompletedValue = `${parseInt(taskComplete.innerText, 10) + 1}`;
          isCompleted = true;
        } else {
          getCompletedValue = `${parseInt(taskComplete.innerText, 10) - 1}`;
          isCompleted = false;
        }
        taskComplete.innerText = getCompletedValue;
        const taskId = parentListId.split('-')[2];
        getAllTasks[taskId].completed = isCompleted;

        getAllProject[storeId].completed = getCompletedValue;
        localStorage.setItem('allTasks', JSON.stringify(getAllTasks));
        localStorage.setItem('allProjects', JSON.stringify(getAllProject));
      }
    });
  };

  const addTaskToProject = () => {
    const addTaskBtn = document.getElementById('add-task-button');

    addTaskBtn.addEventListener('click', () => {
      const getAllTasks = JSON.parse(localStorage.getItem('allTasks'));
      const length = getAllTasks === null ? 0 : Object.keys(getAllTasks).length;
      const buttonId = addTaskBtn.className.split(' ')[2];
      const getinputs = logic.getTaskValues('#add-task-form .form-control', 'priorityRadios', buttonId);
      storage.setTaskToStore(getinputs, length);
      createTaskContent(buttonId);

      resetForm('add-task-form');
    });
  };

  const deleteTask = () => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        const deleteID = e.target.id;
        const confirmDelete = confirm('Are you sure you want to delete?');
        if (confirmDelete) {
          document.getElementById(deleteID).parentElement.parentElement.remove();
          const taskId = deleteID.split('-')[1];
          const getAllTasks = JSON.parse(localStorage.getItem('allTasks'));
          delete getAllTasks[taskId];
          localStorage.setItem('allTasks', JSON.stringify(getAllTasks));
        }
      }
    });
  };

  const editTask = () => {
    const editBtn = document.getElementById('confirm-edit-btn');
    editBtn.addEventListener('click', () => {
      const id = document.getElementById('confirm-edit-btn').className.split(' ')[3];
      const editedTaskValue = logic.getEditedTaskValue('#edit-task .form-control', 'priorityRadiosEdit');

      const currentInput = [`task-title-${id}`, `task-description-${id}`, `task-date-${id}`, `task-list-${id}`];

      const getAllTasks = JSON.parse(localStorage.getItem('allTasks'));

      Object.entries(editedTaskValue).forEach((input, val) => {
        const key = input[0];
        const value = input[1];
        getAllTasks[id][key] = value;
        if (key === 'task_radio') {
          document.getElementById(currentInput[val]).className = `list-group-item ${value}-border`;
        } else {
          document.getElementById(currentInput[val]).innerText = value;
        }
      });
      localStorage.setItem('allTasks', JSON.stringify(getAllTasks));
    });
  };

  const geteditTaskValues = () => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit')) {
        const editID = e.target.id;
        const id = editID.split('-')[1];
        const editBtn = document.getElementById('confirm-edit-btn');
        editBtn.className = `btn btn-sm button ${id}`;
        const [title, date, description] = [`task-title-${id}`, `task-date-${id}`, `task-description-${id}`];
        const currentTaskValue = [document.getElementById(title).innerText, document.getElementById(description).innerText, document.getElementById(date).innerText];

        const allEditedValue = document.querySelectorAll('#edit-task .form-control');
        allEditedValue.forEach((item, val) => {
          item.value = currentTaskValue[val];
        });
      }
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
    getProjectFromStore,
    displayProjectInCard,
    addTaskToProject,
    validateForm,
    getProjectContents,
    deleteTask,
    geteditTaskValues,
    editTask,
    completeTask,
  };
};

export default UI;