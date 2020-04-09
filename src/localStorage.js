const Storage = () => {
  const setProjectToStore = (projectValues, id) => {
    const infoProjects = JSON.parse(localStorage.getItem('allProjects'));
    infoProjects[id] = projectValues;
    localStorage.setItem('allProjects', JSON.stringify(infoProjects));
  };

  const setTaskToStore = (taskValues, id) => {
    if (localStorage.getItem('allTasks') === null) {
      const infoTasks = {};
      infoTasks[id] = taskValues;
      localStorage.setItem('allTasks', JSON.stringify(infoTasks));
    } else {
      const getAllTasks = JSON.parse(localStorage.getItem('allTasks'));
      getAllTasks[id] = taskValues;
      localStorage.setItem('allTasks', JSON.stringify(getAllTasks));
    }
  };

  const setDefaultProjectToStore = () => {
    const projectdefault = {
      'project-0': {
        id: 'project-0',
        title: 'General Projects',
        icon: 'fas fa-list-alt',
        completed: 0,
      },
    };

    if (localStorage.getItem('allProjects') === null) {
      localStorage.setItem('allProjects', JSON.stringify(projectdefault));
    }
  };

  const getFilteredTaskFromStore = (allTasks, id) => {
    let getAllTasks = JSON.parse(localStorage.getItem(allTasks));
    getAllTasks = getAllTasks === null ? {} : getAllTasks;
    return Object.entries(getAllTasks).filter((item) => {
      const value = item[1];
      return value.id === id;
    });
  };

  const getDefault = () => {
  };

  return {
    getDefault, setProjectToStore, setTaskToStore, setDefaultProjectToStore, getFilteredTaskFromStore,
  };
};

export default Storage;
