import {
  AdminService,
  ComponentId,
  Done,
  LogMetadata,
  Prefix
} from '@tmtsoftware/esw-ts'

//#admin-service-creation
const adminService: AdminService = await AdminService()
//#admin-service-creation

//#getLogMetadata
const prefix = new Prefix('TCS', 'filter.wheel')
const componentId = new ComponentId(prefix, 'HCD')

const logMetaData: LogMetadata = await adminService.getLogMetadata(componentId)

if (logMetaData.componentLevel !== 'ERROR') {
  const actionStatus: Done = await adminService.setLogLevel(
    componentId,
    'ERROR'
  )
}
//#getLogMetadata
