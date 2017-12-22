import alertFormatter from './alert-formatter';
import alertsService from './alerts-service';
import alertTypesDialog from './AlertTypesDialog';
import AlertDialogsService from './alert-dialogs-service';
import alertFilter from './alert-filter';
import BaseAlertsListController from './base-alerts-list';
import attachServices from './services';

export default module => {
  module.service('alertFormatter', alertFormatter);
  module.service('alertsService', alertsService);
  module.component('alertTypesDialog', alertTypesDialog);
  module.service('AlertDialogsService', AlertDialogsService);
  module.directive('alertFilter', alertFilter);
  module.service('BaseAlertsListController', BaseAlertsListController);
  module.run(attachServices);
};
