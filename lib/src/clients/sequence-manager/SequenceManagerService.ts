import type { Prefix, TokenFactory } from '../..'
import { resolveConnection, sequenceManagerConnection } from '../../config/Connections'
import type { Subsystem } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import type { ObsMode } from './models/ObsMode'
import type { ProvisionConfig } from './models/ProvisionConfig'
import type {
  AgentStatusResponse,
  ConfigureResponse,
  GetRunningObsModesResponse,
  ProvisionResponse,
  RestartSequencerResponse,
  ShutdownSequenceComponentResponse,
  ShutdownSequencersResponse,
  StartSequencerResponse
} from './models/SequenceManagerRes'
import { SequenceManagerImpl } from './SequenceManagerImpl'

/**
 * @category Service
 */
export interface SequenceManagerService {
  /**
   * For given observation mode, if all the required resources are available,
   * this API will start all the required sequencers.
   *
   * @param obsMode     Name of observation mode.
   * @returns           ConfigureResponse as Promise.
   */
  configure(obsMode: ObsMode): Promise<ConfigureResponse>

  /**
   * shutdown all the running sequence components and
   * provisions the new one in accordance with the provided config.
   *
   * @param config      ProvisionConfig containing list of AgentProvisionConfig.
   * @returns           ProvisionResponse as Promise.
   */
  provision(config: ProvisionConfig): Promise<ProvisionResponse>

  /**
   * Returns all the running observation modes.
   *
   * @returns           GetRunningObsModesResponse as Promise.
   */
  getRunningObsModes(): Promise<GetRunningObsModesResponse>

  /**
   * starts a sequencer for given subsystem and observing mode.
   * It starts a sequencer on an available sequence component for given subsystem.
   *
   * @param subsystem   The subsystem.
   * @param obsMode     The observation mode.
   * @returns           StartSequencerResponse as Promise.
   */
  startSequencer(subsystem: Subsystem, obsMode: ObsMode): Promise<StartSequencerResponse>

  /**
   * re-start the existing running sequencer for given subsystem and observing mode.
   *
   * @param subsystem   The subsystem.
   * @param obsMode     The observation mode.
   * @returns           RestartSequencerResponse as Promise.
   */
  restartSequencer(subsystem: Subsystem, obsMode: ObsMode): Promise<RestartSequencerResponse>

  /**
   * shutdowns the running sequencer found for given subsystem and observing mode.
   *
   * @param subsystem   The subsystem.
   * @param obsMode     The observation mode.
   * @returns           ShutdownSequencersResponse as Promise.
   */
  shutdownSequencer(subsystem: Subsystem, obsMode: ObsMode): Promise<ShutdownSequencersResponse>

  /**
   * shutdowns all the running sequencers found for given subsystem.
   *
   * @param subsystem   The subsystem.
   * @returns           ShutdownSequencersResponse as Promise.
   */
  shutdownSubsystemSequencers(subsystem: Subsystem): Promise<ShutdownSequencersResponse>

  /**
   * shutdowns all the running sequencers found for given observation mode.
   *
   * @param obsMode     The observation mode.
   * @returns           ShutdownSequencersResponse as Promise.
   */
  shutdownObsModeSequencers(obsMode: ObsMode): Promise<ShutdownSequencersResponse>

  /**
   * shutdowns all the running sequencers.
   *
   * @returns           ShutdownSequencersResponse as Promise.
   */
  shutdownAllSequencers(): Promise<ShutdownSequencersResponse>

  /**
   * shutdowns running sequence component of given prefix.
   *
   * @param prefix      The prefix of the sequence component
   * @returns           ShutdownSequenceComponentResponse as Promise.
   */
  shutdownSequenceComponent(prefix: Prefix): Promise<ShutdownSequenceComponentResponse>

  /**
   * shutdowns all the running sequence components.
   *
   * @returns           ShutdownSequenceComponentResponse as Promise.
   */
  shutdownAllSequenceComponents(): Promise<ShutdownSequenceComponentResponse>

  /**
   * gives status of TMT ecosystem components(agents, sequence components and sequencers).
   * It provides information about which agents are up and running, sequence components running on
   * those agents and sequencer script loaded on sequence component.
   *
   * @returns           AgentStatusResponse as Promise.
   */
  getAgentStatus(): Promise<AgentStatusResponse>
}

/**
 * Instantiate SequenceManagerService to enable interaction with the sequencer
 *
 * @param tokenFactory  a function that returns a valid token which has correct access roles and permissions for the specified componentId.
 * @return              SequencerService as Promise
 * @constructor
 */
export const SequenceManagerService = async (
  tokenFactory: TokenFactory
): Promise<SequenceManagerService> => {
  const { host, port } = await resolveConnection(sequenceManagerConnection)
  const postEndpoint = getPostEndPoint({ host, port })

  return new SequenceManagerImpl(new HttpTransport(postEndpoint, tokenFactory))
}
