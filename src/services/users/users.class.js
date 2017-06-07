export default class UserService {
  get(id, params) {
    return Promise.resolve({
      id,
      name: 'Viktor'
    });
  }
}
