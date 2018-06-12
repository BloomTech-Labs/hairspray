import {TEST_START, TEST_STOP} from '../actions';

export const testReducer = (test = {}, action) => {
    switch (action.type) {
      case TEST_START:
        return { ...test, testing: true };
      case TEST_STOP:
        return { ...test, testing: false };
    default:
        return test;
    }
};