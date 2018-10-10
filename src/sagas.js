import { takeLatest, put } from 'redux-saga/effects';

function* rootSaga() {
  yield takeLatest('UPDATED_POT', updateStateWithNewPot);
}

function* updateStateWithNewPot() {
  yield console.log('got it');
}

export default rootSaga;
