const UI = () => {
  const hideAndDisplayElement = (ele) => {
    const allproject = document.querySelectorAll('.all-projects .list-group-item');
    allproject.forEach((item) => {
      if (item.id === ele) {
        item.classList.add('clicked');
      } else {
        item.classList.remove('clicked');
      }
    });
  };
  const displayProjectToDom = () => {
    const projectsArea = document.getElementById('all-projects');
    projectsArea.addEventListener('click', (e) => {
      if (e.target.classList.contains('list-group-item')) {
        const { id } = e.target;
        hideAndDisplayElement(id);
        const projectTitle = document.getElementById('project-title');
        projectTitle.innerText = e.target.innerText;
      }
    });
  };


  return { displayProjectToDom };
};

module.exports = UI;