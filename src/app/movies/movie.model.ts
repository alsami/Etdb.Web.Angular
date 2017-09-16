export interface Movie {
    id?: string,
    title: string,
    description: string,
    releasedOn: Date,
    concurrencyToken?: string
}