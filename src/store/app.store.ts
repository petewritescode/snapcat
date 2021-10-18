import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { rootReducer } from './root.reducer';
import { rootSagas } from '../sagas/root.sagas';
import { imagesActions } from './images/images.slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [imagesActions.addImage.type],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSagas);
