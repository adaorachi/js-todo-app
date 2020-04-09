import UI from './ui';
import Storage from './localStorage';


const storage = Storage();
storage.setDefaultProjectToStore();
storage.getDefault();

const ui = UI();
ui.getProjectContents();
ui.geteditTaskValues();
ui.getProjectFromStore();
ui.displayProjectInCard();
ui.addTaskToProject();
ui.validateForm();
ui.deleteTask();
ui.editTask();
ui.completeTask();
ui.displayAllTasks();
