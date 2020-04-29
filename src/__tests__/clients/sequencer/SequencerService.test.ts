import { SequencerService } from 'clients/sequencer/SequencerService'
import { ComponentId } from 'models/ComponentId'
import { Prefix } from 'models/params/Prefix'
import { Setup } from 'clients/command/models/PostCommand'
import { Ok } from 'clients/sequencer/models/SequencerRes'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'
import { SubmitResponse } from 'models/params/CommandResponse'
import { SequenceCommand } from 'models/params/Command'
import { Pending, Step, StepList } from 'clients/sequencer/models/StepList'

const componentId = ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const sequencer = new SequencerService('localhost', 59623, componentId)

const setupCommand = new Setup('ESW.test', 'command-1', [])
const commands: SequenceCommand[] = [setupCommand]
const sequence: SequenceCommand[] = [setupCommand]

jest.mock('utils/Http')
const postMockFn = mocked(post, true)

describe('SequencerService', () => {
  test('should load a sequence in given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.loadSequence(sequence)
    expect(res).toEqual(Ok)
  })

  test('should start the sequence in given sequencer', async () => {
    const completedResponse: SubmitResponse = {
      _type: 'Completed',
      runId: '1234124'
    }

    postMockFn.mockResolvedValue(completedResponse)

    const res = await sequencer.startSequence()
    expect(res).toEqual(completedResponse)
  })

  test('should add given commands in the sequence of given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.add(commands)
    expect(res).toEqual(Ok)
  })

  test('should prepend given commands in the sequence of given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.prepend(commands)
    expect(res).toEqual(Ok)
  })

  test('should replace given id command with given commands', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.replace('id-123', commands)
    expect(res).toEqual(Ok)
  })

  test('should insert the given commands after given command of given id', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.insertAfter('id-123', commands)
    expect(res).toEqual(Ok)
  })

  test('should delete the given command from sequence', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.delete('id-123')
    expect(res).toEqual(Ok)
  })

  test('should add a breakPoint on the given command from sequence', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.addBreakpoint('id-123')
    expect(res).toEqual(Ok)
  })

  test('should remove the breakPoint on the given command from sequence', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.removeBreakpoint('id-123')
    expect(res).toEqual(Ok)
  })

  test('should reset the sequence in given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.reset()
    expect(res).toEqual(Ok)
  })

  test('should resume the sequence in given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.resume()
    expect(res).toEqual(Ok)
  })

  test('should pause the sequence in given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.pause()
    expect(res).toEqual(Ok)
  })

  test('should get a step list from sequencer', async () => {
    const step: Step = {
      id: 'bfec413e-e377-4e3a-8737-3e625d694bd1',
      command: setupCommand,
      status: Pending,
      hasBreakpoint: false
    }
    const stepList: StepList = [step]

    postMockFn.mockResolvedValue(stepList)

    const res = await sequencer.getSequence()
    expect(res).toEqual(stepList)
  })

  test('should return whether a sequencer is available', async () => {
    postMockFn.mockResolvedValue(true)

    const res = await sequencer.isAvailable()
    expect(res).toEqual(true)
  })

  test('should return whether a sequencer is online', async () => {
    postMockFn.mockResolvedValue(true)

    const res = await sequencer.isOnline()
    expect(res).toEqual(true)
  })

  test('should get a go online response from sequencer on GoOnline', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.goOnline()
    expect(res).toEqual(Ok)
  })

  test('should get a go offline response from sequencer on GoOffline', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.goOffline()
    expect(res).toEqual(Ok)
  })

  test('should abort a sequence from sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.abortSequence()
    expect(res).toEqual(Ok)
  })

  test('should stop a sequence from sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.stop()
    expect(res).toEqual(Ok)
  })

  test('should send diagnostic mode to sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.diagnosticMode(new Date('2020-10-08'), 'hint for diagnostic mode')
    expect(res).toEqual(Ok)
  })

  test('should send operations mode to sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.operationsMode()
    expect(res).toEqual(Ok)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})