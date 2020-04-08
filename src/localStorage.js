const LocalStorage = () => {
  const getDefault = () => {
    const projectdefault = {
      'project-0': {
        id: 'project-0',
        title: 'General Projects',
        icon: 'fas fa-briefcase icon',
      },
    };

    if (localStorage.getItem('allProjects') === null) {
      localStorage.setItem('allProjects', JSON.stringify(projectdefault));
    }

    const getAllProjects = JSON.parse(localStorage.getItem('allProjects'));

    Object.keys(getAllProjects).forEach((key, value) => {
      const allProjectsList = document.getElementById('all-projects');
      const keys = getAllProjects[key];
      const list = document.createElement('li');

      if (value === 0) {
        list.className = 'list-group-item clicked';
      } else {
        list.className = 'list-group-item';
      }

      list.id = `project-${value}`;
      list.innerHTML = `${keys.title} <span class="${keys.icon}"></span>`;
      allProjectsList.append(list);
    });


    const getClickedProject = localStorage.getItem('displayProject');
    const allTasksContent = document.getElementById('all-tasks-content');
    document.getElementById('add-task-button').className = `btn btn-sm btn-primary ${getClickedProject}`;
    const projectTitle = document.getElementById('project-title');
    projectTitle.innerHTML = document.getElementById(getClickedProject).innerHTML;

    //change color
    const array = document.querySelectorAll('.all-project-content .list-group-item');
    array.forEach((item) => {
      if (item.id === getClickedProject) {
        item.classList.add('clicked');
      } else {
        item.classList.remove('clicked');
      }
    });

    const getAllTasks = JSON.parse(localStorage.getItem('allTasks'));
    const getProjectTasks = Object.entries(getAllTasks).filter((item) => {
      const value = item[1];
      return value.id === getClickedProject;
    });

    let list = '';
    getProjectTasks.forEach((ele) => {
      const value = ele[1];
      const key = ele[0];
      list += `
          <li class="list-group-item ${value.task_radio}-border">
            <h6 class="card-title mb-1">${value.task_name} &nbsp;&nbsp;<small
                class="task-date">${value.task_date}</small> </h6>
            <small class="card-text">${value.task_description}
            </small>
            <div class="task-icons" id="task-icons">
              <i class="far fa-edit edit text-info" id="edit-${key}"></i>
              <i class="far fa-trash-alt delete text-danger" id="delete-${key}"></i>
            </div>
          </li>`;
    });
    allTasksContent.innerHTML = list;
  }

  return { getDefault };
};

module.exports = LocalStorage;


