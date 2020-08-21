import { AdminService } from './AdminService'
import { ComponentId } from '../../models'
import { Level, LogMetadata, LogMetadataD } from '../logger'
import { HttpTransport } from '../../utils/HttpTransport'
import { GatewayAdminPostRequest } from '../gateway/models/Gateway'
import { GetLogMetadata, SetLogLevel } from './models/PostCommand'
import { voidDecoder } from '../../utils/Decoder'

export class AdminServiceImpl implements AdminService {
  constructor(private readonly httpTransport: HttpTransport<GatewayAdminPostRequest>) {}

  getLogMetadata(componentId: ComponentId): Promise<LogMetadata> {
    return this.httpTransport.requestRes(new GetLogMetadata(componentId), LogMetadataD)
  }

  setLogLevel(componentId: ComponentId, level: Level): Promise<void> {
    return this.httpTransport.requestRes(new SetLogLevel(componentId, level), voidDecoder)
  }
}