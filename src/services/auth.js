export const isAuthenticated = () =>
  localStorage.getItem("acess-token") !== null &&
  localStorage.getItem("acess-token") !== undefined;

export const getToken = () => localStorage.getItem("acess-token");

export const login = (token) => {
  localStorage.setItem("acess-token", token);
};

export const logout = () => {
  localStorage.removeItem("acess-token");
};
