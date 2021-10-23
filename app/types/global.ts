export enum ETheme {
    light ='light',
    dark = 'dark'
}

export type ThemeType = ETheme.light | ETheme.dark

export type BasicError = {
    message?: string
}

