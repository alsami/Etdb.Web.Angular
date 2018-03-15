export interface Movie {
    id?: string;
    title: string;
    description: string;
    releasedOn: Date;
    movieCoverImageUrl?: string;
    concurrencyToken?: string;
}
