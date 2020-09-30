import { LocationService, Location, Prefix, HttpConnection, Option, Done, TrackingEvent } from 'esw-ts'

const auth = { token: '' }

// @ts-ignore
//#location-service-creation
const tokenFactory = () => auth.token

const locationServiceWithToken: LocationService = await LocationService(
  tokenFactory
)

const locationService: LocationService = await LocationService()

//#location-service-creation
//#list
const locations: Location[] = await locationService.list()
// 
// iterate over locations to do further computation
// . 
// .
//#list

//#list-by-component-type
// valid Component type's : "HCD" | "Assembly" | "Service" | "Container" | "Sequencer" | "SequenceComponent" | "Machine"

const sequencerLocations: Location[] = await locationService.listByComponentType("Sequencer")

const hcdLocations: Location[] = await locationService.listByComponentType("HCD")

const assemblyLocations: Location[] = await locationService.listByComponentType("Assembly")
//#list-by-component-type

//#list-by-connection-type
// valid Connection types: "akka" | "http" | "tcp"
const akkaLocations: Location[] = await locationService.listByConnectionType("akka")

const httpLocations: Location[] = await locationService.listByConnectionType("http")

const tcpLocations: Location[] = await locationService.listByConnectionType("tcp")

//#list-by-connection-type
//#list-by-hostname
const remoteLocations: Location[] = await locationService.listByHostname("192.0.162.178")

const locationRegisteredWithDomain: Location[] = await locationService.listByHostname("tmt.org.com")

const localLocations: Location[] = await locationService.listByHostname("localhost")

//#list-by-hostname

//#list-by-prefix
const eswComponentLocations: Option<Location> = await locationService.find(HttpConnection(new Prefix("ESW","component"), "HCD"))
//#list-by-prefix


//#find
// Find the location of Hcd with esw.component-1 prefix
// ConnectionType's : HttpConnection , AkkaConnection & TCPConnection
const maybeLocation: Option<Location> = await locationService.find(HttpConnection(new Prefix("ESW","component"), "HCD"))
if(maybeLocation) {
    // use maybeLocation from here 
}else {
    // location not resolved
}
//#find

//#unregister
// ConnectionType's : HttpConnection , AkkaConnection & TCPConnection
const done: Done = await locationServiceWithToken.unregister(HttpConnection(new Prefix("ESW","component"), "HCD"))

//#unregister


//#resolve
// ConnectionType's : HttpConnection , AkkaConnection & TCPConnection
// Time unit : seconds, milliseconds, nanoseconds, microseconds, minutes, hours, days

const connection = HttpConnection(new Prefix("ESW", "component"), "HCD")

const maybeLocation1: Option<Location> = await locationService.resolve(connection, 10, 'seconds')
if(maybeLocation1) {
    // use maybeLocation inside here 
}else {
    // location did not resolved in 10 seconds
}
//#resolve

//#track
// a callback function
const onTrackingEvent = (event: TrackingEvent) => {
    if(event._type === 'LocationRemoved') {
        // do something when connection's location is removed from the location service
    }else if (event._type === 'LocationUpdated') {
        // do something when connection's location is update from the location service
    }
    
}
// connection to be tracked
const httpConnection = HttpConnection(new Prefix("ESW", "component"), "HCD")

locationService.track(httpConnection)(onTrackingEvent)

//#track