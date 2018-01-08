import tap from 'tap'
import runJobScheduler from './runJobScheduler'

export default function testPSScheduler(scheduler) {
  return runJobScheduler(scheduler, time => {
    tap.matchSnapshot(scheduler.psScheduler.ready, `ps ready | T${time}`)
    tap.matchSnapshot(scheduler.psScheduler.dead, `ps dead | T${time}`)
  })
}
