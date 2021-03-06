import { takeEvery } from 'redux-saga';

import * as actions from './actions';
import { $uibModal, $uibModalStack } from './services';

function openModalDialog(action) {
  const { component, params } = action.payload;
  const resolve = {};
  if (params && params.resolve) {
    Object.keys(params.resolve).forEach(key => {
      resolve[key] = () => params.resolve[key];
    });
  }
  $uibModal.open({ component, resolve, size: params && params.size });
}

function closeModalDialog() {
  $uibModalStack.dismissAll();
}

export default function* watchCore() {
  yield takeEvery(actions.OPEN, openModalDialog);
  yield takeEvery(actions.CLOSE, closeModalDialog);
}
