const Task = (taskName, taskDate, taskDescription, taskRadio, id, completed) => {
  const getName = () => taskName;
  const getDate = () => taskDate;
  const getDescription = () => taskDescription;
  const getPriority = () => taskRadio;
  const getId = () => id;
  const taskCompleted = () => completed;

  return {
    getName, getDate, getDescription, getPriority, getId, taskCompleted,
  };
};

export default Task;