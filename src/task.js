const Task = (title, dueDate, description, priority, id, completed) => {
  const getName = () => title;
  const getDate = () => dueDate;
  const getDescription = () => description;
  const getPriority = () => priority;
  const getId = () => id;
  const taskCompleted = () => completed;

  return {
    getName, getDate, getDescription, getPriority, getId, taskCompleted,
  };
};

export default Task;
