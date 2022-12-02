export const authService = {
  login: function ({email, password}: {email: string; password: string}) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (email && password === '12345') {
          sessionStorage.setItem('token', 'some_hash');
          resolve('some_hash');
        } else {
          reject();
        }
      }, 1000);
    });
  },
  logout: function () {
    sessionStorage.removeItem('token');
  },

  getStoredToken: function () {
    return sessionStorage.getItem('token');
  },
};
