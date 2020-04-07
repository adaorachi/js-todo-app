import UI from './ui';
import Logic from './logic';

const logic = Logic();

const ui = UI();
ui.addProjectToList();
ui.displayProjectInCard();
ui.addTaskToProject(logic.getTaskValues);
ui.validateForm();
ui.toggleAllProject();
ui.toggleTaskForm();