import UI from './ui';
import Logic from './logic';
import LocalStorage from './localStorage';

const logic = Logic();


const ui = UI();
ui.addProjectToList();
ui.displayProjectInCard();
ui.addTaskToProject(logic.getTaskValues);
ui.validateForm();
ui.toggleAllProject();
ui.toggleTaskForm();
ui.deleteTask();
ui.editTask();

const localStorage = LocalStorage();
localStorage.getDefault();
