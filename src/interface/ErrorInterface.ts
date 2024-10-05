export interface IErrorResponse {
    message: string;
    response: {
        data: {
            error: {
                message: string
            };
            message: string;
        };
    };
}   