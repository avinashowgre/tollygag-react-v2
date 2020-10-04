import { configureSagaStore } from '@vmw/queue-for-redux-saga';
import { rootSliceGroup } from '@vmw/slices-for-redux';

export const appStore = configureSagaStore({ reducer: rootSliceGroup.reducer });

export const { dispatch } = appStore;