import {
  AgentService,
  HttpConnection,
  KillResponse,
  Prefix,
  SpawnResponse
} from 'esw-ts'

const auth = { token: '' }

//#agent-service-creation
const tokenFactory = () => auth.token

const agentService: AgentService = await AgentService(tokenFactory)
//#agent-service-creation

//#spawnSeqeunceManager
const agentPrefix = new Prefix('ESW', 'agent1')
const obsModeConfigPath = '/obs-mode.conf'
const sequenceManagerVersion = '1.0.0'

const spawnResponse1: SpawnResponse = await agentService.spawnSequenceManager(
  agentPrefix,
  obsModeConfigPath,
  false,
  sequenceManagerVersion
)
//#spawnSeqeunceManager

//#spawnSeqeunceComponent
const ocsAppVersion = '1.2.1'
const spawnResponse2: SpawnResponse = await agentService.spawnSequenceComponent(
  agentPrefix,
  'component1',
  ocsAppVersion
)
//#spawnSeqeunceComponent

//#killComponent
const componentPrefix = new Prefix('ESW', 'component1')
const httpConnection: HttpConnection = HttpConnection(
  componentPrefix,
  'SequenceComponent'
)
const killResponse: KillResponse = await agentService.killComponent(
  httpConnection
)
//#killComponent
