export class Util {
    static fun(value: string) {
        return value
    }

    static getDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static resOk(data: any, message?: string) {
        return {
            statusCode: 200,
            message: 'Ok' || message,
            body: data
        }
    }

    static resCreated(data: any, itemType?: string,) {
        return {
            statusCode: 201,
            message: `${itemType || "Item"} created with success.`,
            body: data
        }
    }

    static resError(error: any, message?: string) {
        return {
            statusCode: 500,
            message: 'Intern server error' || message,
            error: error
        }
    }
}