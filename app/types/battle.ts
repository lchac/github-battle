
export enum EPlayer {
    One = 'playerOne',
    Two = 'playerTwo'
}

export interface IPlayerPreviewProps {
    username: string,
    onReset: () => void,
    label: string
}

export interface IPlayerInputProps {
    onSubmit: (username: string) => void,
    label: string
}