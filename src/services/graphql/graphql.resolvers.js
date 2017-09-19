export default function() {
  const app = this
  const Meeting = app.service('api/meetings')
  const Group = app.service('api/groups')
  const Attendant = app.service('api/attendants')
  const knex = app.get('knexClient')

  return {
    Meeting: {
      group(meeting, args, context) {
        return Group.get(meeting.groupId, context)
      },
      attendants(meeting, args, context) {
        return knex
          .select('*')
          .from('attendants')
          .where({
            meeting_id: meeting.id
          })
          .leftJoin('users', 'attendants.user_id', 'users.id')
      }
    },
    RootQuery: {
      meeting(root, { id }, context) {
        return Meeting.get(id, context)
      },
      meetings(root, args, context) {
        context.query = {
          $sort: { id: -1 }
        }
        return Meeting.find(context).then(meetings => meetings.data)
      },
      group(root, { id }, context) {
        return Group.get(id, context)
      },
      groups(root, args, context) {
        context.query = {
          $sort: { id: -1 }
        }
        return Group.find(context).then(groups => groups.data)
      }
    },
    RootMutation: {
      createMeeting(root, { meeting }, context) {
        return Meeting.create(meeting, context)
      },
      createGroup(root, { group }, context) {
        return Group.create(group, context)
      },
      createAttendant(root, { attendant }, context) {
        console.log(attendant)
        return Attendant.create(attendant, context)
      }
    }
  }
}
