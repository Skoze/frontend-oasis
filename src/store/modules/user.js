export default {
  state: {
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || 'guest',
    name: localStorage.getItem('name') || ''
  },
  mutations: {
    setUserToken(state, { token, role, name }) {
      state.token = token;
      state.role = role;
      state.name = name;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
    },
    logout() {
      this.commit('setUserToken', { token: '', role: 'guest', name: '' });
    }
  }
};
