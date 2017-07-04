import selectWorkspaceToggle from './select-workspace-toggle';
import selectWorkspaceDialog from './select-workspace-dialog';
import sidebar from './sidebar';
import sidebarToggle from './sidebar-toggle';
import siteHeader from './site-header';
import titleService from './title-service';
import setTitleFromState from './set-title-from-state';
import uiSrefActiveIf from './ui-sref-active-if';
import WorkspaceService from './workspace-service';
import { breadcrumbs } from './breadcrumbs';
import { appFooter } from './app-footer';
import headerModule from './header/module';
import cookiesConsent from './cookies-consent';

export default module => {
  module.component('selectWorkspaceToggle', selectWorkspaceToggle);
  module.component('selectWorkspaceDialog', selectWorkspaceDialog);
  module.component('sidebar', sidebar);
  module.component('sidebarToggle', sidebarToggle);
  module.component('siteHeader', siteHeader);
  module.service('titleService', titleService);
  module.run(setTitleFromState);
  module.directive('uiSrefActiveIf', uiSrefActiveIf);
  module.service('WorkspaceService', WorkspaceService);
  module.component('breadcrumbs', breadcrumbs);
  module.component('appFooter', appFooter);
  module.component('cookiesConsent', cookiesConsent);
  headerModule(module);
};
