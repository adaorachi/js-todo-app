
const Logic = () => {
  const addProjectToDom = () => {
    const addProjectButton = document.getElementById('add-project-btn');
    const allProjectsList = document.getElementById('all-projects');
    const titleName = document.getElementById('project-name');
    let counter = 1;
    addProjectButton.addEventListener('click', () => {
      const list = document.createElement('li');
      list.className = 'list-group-item';
      list.id = `project-${counter}`;
      list.innerText = titleName.value;
      allProjectsList.append(list);
      counter += 1;
    });
  };
  return { addProjectToDom };
};

module.exports = Logic;