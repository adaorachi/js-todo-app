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

  return { getTaskValues };
};

module.exports = Logic;