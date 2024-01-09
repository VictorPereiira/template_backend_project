import DefaultController from "./api/controller/DefaultController";

export const handler = async (event: any) => {
    let body = ""
    const { method, path } = event.requestContext.http;
    const [route, param] = path.slice(1).split('/')
    if (method === "POST" || method === "PATCH") {
        body = JSON.parse(event.body);
    }

    console.log({
        method, path, route, param
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "test success",
            body: ""
        })
    };

    let res: any = ""
    switch (route) {
        case "init":
            switch (method) {
                case "POST":
                    res = await DefaultController.create(body)
                    break;
                case "GET":
                    res = await DefaultController.read(param)
                    break;
                case "DELETE":
                    res = await DefaultController.delete(param)
                    break;
            }
            break;
    }

    // Response
    if (res.error) {
        return {
            statusCode: res.statusCode,
            body: JSON.stringify({
                message: res.message,
                error: res.error
            })
        }
    }
    return {
        statusCode: res.statusCode,
        body: JSON.stringify({
            message: res.message,
            body: res.body
        })
    };

};