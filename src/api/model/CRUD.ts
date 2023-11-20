
import { v4 as uuidv4 } from 'uuid';
import config from '../config/DefaultConfig';
import dynamodb from '../config/db'
import { Util } from '../../util';

class CRUDModel {
    tableName: string = config.tableName;

    async create(body: any, itemType: string) {
        const data = {
            id: uuidv4(),
            itemType,
            ...body
        }
        try {
            await dynamodb.put({ TableName: this.tableName, Item: data, }).promise();
            return Util.resCreated(data, itemType)
        } catch (err) {
            return Util.resError(err, "Error in create item")
        }
    }

    async read(id: string) {
        try {
            const item = await dynamodb.get({ TableName: this.tableName, Key: { id }, }).promise();
            return Util.resOk(item.Item)
        } catch (err) {
            return Util.resError(err, "Error in read item")
        }
    }

    // Template to update
    async update(id: string, data: any) {
        try {
            const params = {
                TableName: this.tableName,
                Key: { id },
                UpdateExpression: 'set param1 = :newParam1, param2 = :newParam2',
                ExpressionAttributeValues: {
                    ':newParam1': data.param1,
                    ':newParam2': data.param2,
                },
            };
            await dynamodb.update(params).promise()
            return Util.resOk("")
        } catch (err) {
            return Util.resError(err, "Error in update item")
        }
    }

    async delete(id: any) {
        const params = {
            TableName: this.tableName,
            Key: { id },
        };
        try {
            await dynamodb.delete(params).promise();
            return Util.resOk("")
        } catch (err) {
            return Util.resError(err, "Error in remove item")
        }
    }
}


export default new CRUDModel();