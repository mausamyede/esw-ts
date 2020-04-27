export type Tag =
  | 'BASE'
  | 'OIWFS1'
  | 'OIWFS2'
  | 'OIWFS3'
  | 'OIWFS4'
  | 'ODGW1'
  | 'ODGW2'
  | 'ODGW3'
  | 'ODGW4'
  | 'GUIDER1'
  | 'GUIDER2'

export type SolarSystemObject =
  | 'Mercury'
  | 'Venus'
  | 'Moon'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Neptune'
  | 'Uranus'
  | 'Pluto'

export type EqFrame = 'ICRS' | 'FK5'

export interface RaDec {
  ra: number
  dec: number
}

export interface ProperMotion {
  pmx: number
  pmy: number
}

export interface EqCoord extends Coord {
  _type: 'EqCoord'
  tag: Tag
  ra: number
  dec: number
  frame: EqFrame
  catalogName: string
  pm: ProperMotion
}

export interface MinorPlanetCoord extends Coord {
  _type: 'MinorPlanetCoord'
  tag: Tag
  epoch: number
  inclination: number
  longAscendingNode: number
  argOfPerihelion: number
  meanDistance: number
  eccentricity: number
  meanAnomaly: number
}

export interface SolarSystemCoord extends Coord {
  _type: 'SolarSystemCoord'
  tag: Tag
  body: SolarSystemObject
}

export interface CometCoord extends Coord {
  _type: 'CometCoord'
  tag: Tag
  epochOfPerihelion: number
  inclination: number
  longAscendingNode: number
  argOfPerihelion: number
  perihelionDistance: number
  eccentricity: number
}

export interface AltAzCoord extends Coord {
  _type: 'AltAzCoord'
  tag: Tag
  alt: number
  az: number
}

export interface Coord {
  _type: string
  tag: Tag
}
