import assert from 'assert'
import app from '../../server'
import knexCleaner from 'knex-cleaner'

const knex = app.get('knexClient')

describe("'attendants' service", () => {
  beforeAll(() => {
    return knexCleaner.clean(knex)
  })

  it('registered the service', () => {
    const service = app.service('api/attendants')

    assert.ok(service, 'Registered the service')
  })

  it('creates attendants', async () => {
    const User = app.service('api/users')
    const Meeting = app.service('api/meetings')
    const Group = app.service('api/groups')
    const Attendants = app.service('api/attendants')

    const user = await User.create({ id: 1 })
    const group = await Group.create({ color: 'black', name: 'Core' })
    const meeting = await Meeting.create({
      date: new Date(),
      groupId: group.id
    })

    const attendant = await Attendants.create({
      userId: user.id,
      meetingId: meeting.id
    })

    expect(attendant.userId).toBe(user.id)
    expect(attendant.meetingId).toBe(meeting.id)
  })
})
