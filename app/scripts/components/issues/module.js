import issuesService from './issues-service';
import IssueNavigationService from './issue-navigation-service';
import issueUsersService from './issue-users';
import issueCommentsService from './issue-comments-service';
import issueDetail from './issue-detail';
import { issueCommentsList } from './issue-comments-list';
import issueCommentsForm from './issue-comments-form';
import issuesList from './issues-list';
import issueRoutes from './routes';
import issuesWorkspace from './issues-workspace';
import { issuesDashboard } from './issues-dashboard';
import { issuesShortList } from './issues-short-list';
import issueQuickCreate from './issue-quick-create';
import issuesActivityStream from './issues-activity-stream';
import issuesListFiltered from './issues-list-filtered';
import issuesHelpdesk from './issues-helpdesk';
import issueCreateDialog from './issue-create-dialog';
import issueRegistration from './issue-registration';
import {ISSUE_IDS} from './constants';
import issueTypeSelect from './issue-type-select';

export default module => {
  module.constant('ISSUE_IDS', ISSUE_IDS);
  module.service('issuesService', issuesService);
  module.service('IssueNavigationService', IssueNavigationService);
  module.service('issueUsersService', issueUsersService);
  module.service('issueCommentsService', issueCommentsService);
  module.directive('issuesList', issuesList);
  module.component('issueDetail', issueDetail);
  module.component('issueCommentsList', issueCommentsList);
  module.directive('issueCommentsForm', issueCommentsForm);
  module.component('issuesWorkspace', issuesWorkspace);
  module.component('issuesDashboard', issuesDashboard);
  module.component('issuesShortList', issuesShortList);
  module.directive('issueQuickCreate', issueQuickCreate);
  module.directive('issuesActivityStream', issuesActivityStream);
  module.directive('issuesListFiltered', issuesListFiltered);
  module.directive('issuesHelpdesk', issuesHelpdesk);
  module.component('issueCreateDialog', issueCreateDialog);
  module.directive('issueRegistration', issueRegistration);
  module.component('issueTypeSelect', issueTypeSelect);
  module.config(issueRoutes);
};
