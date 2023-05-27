export interface ErrorResponse {
    response:{
        data: {
            error: string;
        },
        status: number;
    }
}