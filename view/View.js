import React, { Component } from 'react'
import { Button, Table, Tag, Row, Col } from 'antd'

import { connect } from 'redux-zero/react'
import shallowEqual from 'fbjs/lib/shallowEqual'
import styled from 'react-emotion'

import JobScheduler from '../core/FCFSJobScheduler'

const loadedJobsColumns = [
  { key: 'jid', title: '作业名', dataIndex: 'jid' },
  {
    key: 'arriveTime',
    title: '到达时间',
    dataIndex: 'arriveTime',
  },
  {
    key: 'time',
    dataIndex: 'time',
    title: '运行时间',
  },
  {
    key: 'needTime',
    dataIndex: 'needTime',
    title: '需要时间',
  },
  {
    key: 'loadedTime',
    title: '装入时间',
    dataIndex: 'loadedTime',
  },
  {
    key: 'memSize',
    title: '占用内存',
    dataIndex: 'memSize',
  },
]
const deadJobsColumns = [
  { key: 'jid', title: '作业名', dataIndex: 'jid' },
  {
    key: 'arriveTime',
    title: '到达时间',
    dataIndex: 'arriveTime',
  },
  {
    key: 'needTime',
    dataIndex: 'needTime',
    title: '需要时间',
  },
  {
    key: 'loadedTime',
    title: '装入时间',
    dataIndex: 'loadedTime',
  },
  {
    key: 'finishedTime',
    title: '完成时间',
    dataIndex: 'finishedTime',
  },
  {
    key: 'cyclingTime',
    title: '周转时间',
    dataIndex: 'cyclingTime',
  },
]
const H3 = styled.h3`
  margin-top: 16px;
`

class View extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      time: 0,
      timeoutId: null,
    }
    if (props.opts) {
      this.loadScheduler(props.opts)
    } else {
      this.scheduler = null
    }
  }

  loadScheduler(opts) {
    this.scheduler = new JobScheduler(opts)
    this.scheduler.loadJob(0)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.opts && !shallowEqual(nextProps.opts, this.props.opts)) {
      this.loadScheduler(nextProps.opts)
      if (this.state.time !== 0) {
        this.setState({
          time: 0,
        })
      }
      this.cancelContinuousRun()
    }
  }

  tick = () => {
    const { scheduler } = this
    if (scheduler && !scheduler.isQueueEmpty()) {
      this.setState({
        time: scheduler.run(this.state.time),
      })
    }
  }

  continuousRun = () => {
    const { scheduler } = this
    if (scheduler && !scheduler.isQueueEmpty()) {
      const time = scheduler.run(this.state.time)
      const ended = scheduler.isQueueEmpty()
      const timeoutId = ended ? null : setTimeout(this.continuousRun, 700)
      this.setState({
        timeoutId,
        time,
      })
    }
  }

  cancelContinuousRun() {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId)
      this.setState({
        timeoutId: null,
      })
    }
  }

  toggleContinuousRun = () => {
    if (this.state.timeoutId) {
      this.cancelContinuousRun()
    } else {
      this.continuousRun()
    }
  }

  componentWillUnmount() {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId)
    }
  }

  render() {
    const { scheduler } = this
    const { time, timeoutId } = this.state
    if (!scheduler) return null
    const ended = scheduler.isQueueEmpty()
    const loadedJobs = scheduler.arrived.filter(x => x.isRunning())
    const deadJobs = scheduler.dead
    return (
      <div
        css={{
          marginTop: '16px',
        }}
      >
        <Button
          type={timeoutId ? 'danger' : 'primary'}
          onClick={this.toggleContinuousRun}
          disabled={ended}
        >
          {timeoutId ? '暂停运行' : '自动运行'}
        </Button>{' '}
        <Button onClick={this.tick} disabled={ended || timeoutId}>
          手动执行
        </Button>
        <Row
          css={{
            marginTop: '7px',
          }}
          gutter={12}
        >
          <Col span={3}>
            {timeoutId ? (
              <Tag color="green">运行中</Tag>
            ) : (
              <Tag color="orange">暂停中</Tag>
            )}
          </Col>
          <Col span={3}>
            {ended ? <Tag color="red">已关机</Tag> : <Tag color="blue">已启动</Tag>}
          </Col>
          <Col span={6}>系统运行时间：{time}</Col>
          <Col span={6}>内存中的作业数：{scheduler.runningCnt}</Col>
        </Row>
        <H3>已装入的作业</H3>
        <Table
          pagination={false}
          rowKey="jid"
          dataSource={loadedJobs}
          columns={loadedJobsColumns}
        />
        <H3>已完成的作业</H3>
        <Table
          pagination={false}
          rowKey="jid"
          dataSource={deadJobs}
          columns={deadJobsColumns}
        />
      </div>
    )
  }
}

export default connect(({ opts }) => ({ opts }))(View)
