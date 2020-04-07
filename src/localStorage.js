const LocalStorage = () => {
  const getDefault = () => {
    // let items;
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

      list.className = 'list-group-item';
      list.id = `${keys}`;
      list.innerHTML = `${keys.title} <span class="${keys.icon}"></span>`;
      allProjectsList.append(list);
    });
  }
  return { getDefault };
};

module.exports = LocalStorage;

