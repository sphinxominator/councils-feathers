export default function() {
  const app = this;
  const Meeting = app.service('meetings');

  // The root provides a resolver function for each API endpoint
  return {
    RootQuery: {
      meeting(root, { id }, context) {
        return Meeting.get(id, context);
      },
      meetings(root, args, context) {
        const params = context.merge({
          query: {
            $sort: { id: -1 }
          }
        })
        return Meeting.find(params).then(meetings => meetings.data);
      }
    },
    RootMutation: {
      createMeeting(root, { meeting }, context) {
        return Meeting.create(meeting, context);
      }
    }
  }
}
