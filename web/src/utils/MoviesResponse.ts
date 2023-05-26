export interface MoviesResponse {
    id: number;
    name: string;
    summary: string;
	averageRate: number;
    image: {
        medium: string;
    };
}
