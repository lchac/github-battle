export interface IPlayerProfile {
    avatar_url: string
    html_url: string
    login: string
}
export interface IProfile {
    name: string
    location: string
    company: string
    followers: number
    following: number
}

export interface IPlayer {
    score: number
    profile: IPlayerProfile & IProfile
}

export interface IProfileListProps {
    profile?: IProfile
}

export interface IResultsProps {
    location: {
        search: string
    }
}

export interface IResultsState {
    winner?: IPlayer
    loser?: IPlayer
    error: string | undefined | null
    loading: boolean
}

export enum EResultsActionType {
    success = 'success',
    error = 'error'
}

export type ResultsAction = {
    type: EResultsActionType.error
    message: string | null
    winner?: never
    loser?: never
} | {
    type: EResultsActionType.success
    winner: IPlayer
    loser: IPlayer
}