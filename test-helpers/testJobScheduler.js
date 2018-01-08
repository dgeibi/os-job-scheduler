import tap from 'tap'
import runJobScheduler from './runJobScheduler'

export default function testJobScheduler(scheduler) {
  return runJobScheduler(scheduler, time => {
    tap.matchSnapshot(scheduler.arrived, `arrived | T${time}`)
    tap.matchSnapshot(scheduler.dead, `dead | T${time}`)
  })
}
