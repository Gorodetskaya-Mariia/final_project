import { SIGN_IN, SIGN_OUT } from "./types";

export { auth, logout, authCheckState } from "./auth";

export { initServices, setSelectedService } from "./services";

export { fetchAppointments, createAppointment } from "./account";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
