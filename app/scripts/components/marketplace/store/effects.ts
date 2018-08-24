import { all, fork } from 'redux-saga/effects';

import cartEffects from '../cart/store/effects';
import landingEffects from '../landing/store/effects';

export default function*() {
  yield all([
    fork(cartEffects),
    fork(landingEffects),
  ]);
}
