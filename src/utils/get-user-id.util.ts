import { USER_ID_LOCAL_STORAGE_KEY } from '../constants/user.constants';
import { v4 as uuidv4 } from 'uuid';

export const getUserId = () => {
  if (!localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY)) {
    localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY, uuidv4());
  }

  return localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY) as string;
};
