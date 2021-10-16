export interface IProfile {
    name: string
    location: string
    company: string
    followers: number
    following: number
}

export interface IProfileListProps {
    profile: IProfile
}

export interface IResultsProps {
    location: {
        search: string
    }
}