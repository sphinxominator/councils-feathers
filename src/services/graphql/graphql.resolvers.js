export default function() {
  const app = this;
  const Meeting = app.service('meetings');

  const query = (context = {}, query = {}) => {
    return Object.assign({}, context, { query });
  }

  // The root provides a resolver function for each API endpoint
  return {
    RootQuery: {
      meeting(root, { id }, context) {
        return Meeting.get(id, context);
      },
      meetings(root, args, context) {
        return Meeting.find(context).then(meetings => meetings.data);
      }
    }
  }
}
