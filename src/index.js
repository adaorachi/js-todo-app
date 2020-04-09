import UI from './ui';
import Logic from './logic';
import Storage from './localStorage';


const logic = Logic();

const storage = Storage();
storage.setDefaultProjectToStore();
storage.getDefault();


const ui = UI();

ui.getProjectContents();
ui.geteditTaskValues();
// ui.displaySections();
ui.getProjectFromStore();
ui.displayProjectInCard();
ui.addTaskToProject();
ui.validateForm();
ui.deleteTask();
ui.editTask();
ui.completeTask();


