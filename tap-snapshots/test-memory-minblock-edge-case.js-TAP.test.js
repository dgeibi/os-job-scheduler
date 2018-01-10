/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/memory-minblock-edge-case.js TAP > arrived | T0 1`] = `
[ JCB {
    jid: 1,
    memSize: 3,
    needTime: 2,
    arriveTime: 0,
    loadedTime: 0,
    finishedTime: NaN,
    cyclingTime: NaN,
    time: 0,
    state: 'RUNNING',
    partitions: 
     [ MemPartition {
         address: 0,
         size: 3,
         next: null,
         prev: null,
         state: 1,
         job: [Circular],
         holder: { memory: null } } ],
    pcbs: 
     [ PCB {
         pid: '_1',
         maxNeedTime: 2,
         needTime: 2,
         arriveTime: 0,
         finishedTime: NaN,
         cyclingTime: NaN,
         job: [Circular],
         state: 'WAITTING' } ] },
  JCB {
    jid: 2,
    memSize: 1,
    needTime: 1,
    arriveTime: 0,
    loadedTime: NaN,
    finishedTime: NaN,
    cyclingTime: NaN,
    time: 0,
    state: 'STANDBY',
    partitions: [],
    pcbs: [] } ]
`

exports[`test/memory-minblock-edge-case.js TAP > dead | T0 1`] = `
[]
`

exports[`test/memory-minblock-edge-case.js TAP > arrived | T2 1`] = `
[ JCB {
    jid: 2,
    memSize: 1,
    needTime: 1,
    arriveTime: 0,
    loadedTime: 1,
    finishedTime: NaN,
    cyclingTime: NaN,
    time: 0,
    state: 'RUNNING',
    partitions: 
     [ MemPartition {
         address: 0,
         size: 1,
         next: null,
         prev: null,
         state: 1,
         job: [Circular],
         holder: 
          { memory: 
             MemPartition {
               address: 1,
               size: 2,
               next: null,
               prev: null,
               state: 0,
               job: null,
               holder: [Circular] } } } ],
    pcbs: 
     [ PCB {
         pid: '_2',
         maxNeedTime: 1,
         needTime: 1,
         arriveTime: 1,
         finishedTime: NaN,
         cyclingTime: NaN,
         job: [Circular],
         state: 'WAITTING' } ] } ]
`

exports[`test/memory-minblock-edge-case.js TAP > dead | T2 1`] = `
[ JCB {
    jid: 1,
    memSize: 3,
    needTime: 2,
    arriveTime: 0,
    loadedTime: 0,
    finishedTime: 2,
    cyclingTime: 2,
    time: 2,
    state: 'FINISHED',
    partitions: [],
    pcbs: null } ]
`

exports[`test/memory-minblock-edge-case.js TAP > arrived | T3 1`] = `
[]
`

exports[`test/memory-minblock-edge-case.js TAP > dead | T3 1`] = `
[ JCB {
    jid: 1,
    memSize: 3,
    needTime: 2,
    arriveTime: 0,
    loadedTime: 0,
    finishedTime: 2,
    cyclingTime: 2,
    time: 2,
    state: 'FINISHED',
    partitions: [],
    pcbs: null },
  JCB {
    jid: 2,
    memSize: 1,
    needTime: 1,
    arriveTime: 0,
    loadedTime: 1,
    finishedTime: 3,
    cyclingTime: 3,
    time: 1,
    state: 'FINISHED',
    partitions: [],
    pcbs: null } ]
`
