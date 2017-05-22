export default function() {
  const app = this;
  const Meeting = app.service('meetings');
  const Group = app.service('groups');

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
      },
      groups(root, args, context) {
        const params = context.merge({
          query: {
            $sort: { id: -1 }
          }
        })
        return Group.find(params).then(groups => groups.data);
      }
    },
    RootMutation: {
      createMeeting(root, { meeting }, context) {
        return Meeting.create(meeting, context);
      },
      createGroup(root, { group }, context) {
        return Group.create(group, context);
      }
    }
  }
}
