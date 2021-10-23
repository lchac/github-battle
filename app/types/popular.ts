import { BasicError } from "./global";

export type LanguageKeys = 'All' | 'JavaScript' | 'Ruby' | 'Java' | 'CSS' | 'Python'
export const languages: LanguageKeys[] = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

export interface ILanguagesNavProps {
    selected: LanguageKeys,
    onUpdateLanguage: (language: LanguageKeys) => void
}

export interface IOwner {
    login: string
    avatar_url: string
}

export interface IRepo {
    owner: IOwner
    html_url: string
    stargazers_count: number
    forks: number
    open_issues: number
}

export interface IReposGridProps {
    repos?: IRepo[]
}

export enum EPopularActionType {
    success = 'success',
    error = 'error'
}

export type PopularActionType = EPopularActionType.success | EPopularActionType.error
export interface IPopularAction {
    type: PopularActionType
    selectedLanguage: LanguageKeys
    repos?: IRepo[]
    error?: BasicError | null
}

export type PopularAction = {
    type: EPopularActionType.success
    selectedLanguage: LanguageKeys
    repos?: IRepo[]
} | {
    type: EPopularActionType.error
    error: BasicError | null
    selectedLanguage?: never
}

export type IPopularState = {
    error: string | undefined | null
} & Partial<Record<LanguageKeys, IRepo[]>>