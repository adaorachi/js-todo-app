const Logic = () => {
  const getTaskValues = (array, radioButtons) => {
    const getInputValues = {};
    array.forEach((input) => {
      getInputValues[input.id] = input.value;
    });

    radioButtons.forEach((button) => {
      if (button.checked) {
        getInputValues.task_radio = button.value;
      }
    });
    return getInputValues;
  };

  // const setProjects = (id) => {
  //   if (localStorage.getItem('allProjects') === null) {
  //     localStorage.setItem('allProjects', 'project-0');
  //   } else {
  //     const infoProjects = JSON.parse(localStorage.getItem('allProjects'));
  //     infoProjects.push(id);
  //     localStorage.setItem('allProjects', JSON.stringify(infoProjects));
  //   }
  // };
  return { getTaskValues };
};

module.exports = Logic;