const LocalStorage = () => {
  const getDefault = () => {
    const projectdefault = {
      'project-0': {
        id: 'project-0',
        title: 'General Projects',
        icon: 'fas fa-briefcase icon',
      },
    };
    localStorage.setItem('allProjects', JSON.stringify(projectdefault));
  };
  return { getDefault };
};

module.exports = LocalStorage;