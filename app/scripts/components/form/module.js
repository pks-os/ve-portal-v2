import appstoreForm from './appstore-form';
import appstoreField from './appstore-field';
import appstoreFieldString from './appstore-field-string';
import appstoreFieldEmail from './appstore-field-email';
import appstoreFieldTel from './appstore-field-tel';
import appstoreFieldTos from './appstore-field-tos';
import appstoreFieldPassword from './appstore-field-password';
import appstoreFieldText from './appstore-field-text';
import appstoreFieldInteger from './appstore-field-integer';
import appstoreFieldBoolean from './appstore-field-boolean';
import appstoreFieldErrors from './appstore-field-errors';
import appstoreFieldLabel from './appstore-field-label';
import appstoreFieldList from './appstore-field-list';
import appstoreFieldMultiselect from './appstore-field-multiselect';
import appstoreFieldSelect from './appstore-field-select';
import appstoreListDialog from './appstore-list-dialog';
import appstoreFormWizard from './appstore-form-wizard';
import FormUtils from './form-utils';
import fieldLabel from './field-label';
import helpicon from './help-icon';
import multiplyBy from './multiply-by';
import choicesTable from './choices-table';

export default module => {
  module.service('formUtils', FormUtils);
  module.directive('appstoreForm', appstoreForm);
  module.directive('appstoreField', appstoreField);
  module.component('appstoreFieldString', appstoreFieldString);
  module.component('appstoreFieldEmail', appstoreFieldEmail);
  module.component('appstoreFieldTel', appstoreFieldTel);
  module.component('appstoreFieldTos', appstoreFieldTos);
  module.directive('appstoreFieldPassword', appstoreFieldPassword);
  module.directive('appstoreFieldText', appstoreFieldText);
  module.component('appstoreFormWizard', appstoreFormWizard);
  module.component('appstoreFieldInteger', appstoreFieldInteger);
  module.component('appstoreFieldBoolean', appstoreFieldBoolean);
  module.directive('appstoreFieldErrors', appstoreFieldErrors);
  module.directive('appstoreFieldLabel', appstoreFieldLabel);
  module.directive('appstoreFieldList', appstoreFieldList);
  module.component('appstoreFieldMultiselect', appstoreFieldMultiselect);
  module.component('appstoreFieldSelect', appstoreFieldSelect);
  module.directive('appstoreListDialog', appstoreListDialog);
  module.directive('fieldLabel', fieldLabel);
  module.directive('helpicon', helpicon);
  module.directive('multiplyBy', multiplyBy);
  module.directive('choicesTable', choicesTable);
};
