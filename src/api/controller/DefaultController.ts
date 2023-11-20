import { z } from "zod";
import { Util } from '../../util';
import CRUDModel from '../model/CRUD'

class InitController {
    itemType: string = "itemType_name";
    schema: any = z.object({
        name: z.string(),
        age: z.number(),
        isActive: z.boolean(),
    })

    async create(body: any) {
        const hasErrorSchema = this.schema.safeParse(body);
        if (!hasErrorSchema.success) {
            return Util.resError(hasErrorSchema.error.errors)
        };
        try {
            const res: any = await CRUDModel.create(body, this.itemType);
            return Util.resCreated(res.body, this.itemType)
        } catch (err) {
            return Util.resError(err)
        }
    };

    async read(id: string) {
        try {
            const res: any = await CRUDModel.read(id);
            return Util.resOk(res.body, `${this.itemType} read with success`)
        } catch (err) {
            return Util.resError(err)
        }
    }

    async delete(id: string) {
        try {
            const res: any = await CRUDModel.delete(id);
            return Util.resOk(res.body, `${this.itemType} read with success`)
        } catch (err) {
            return Util.resError(err)
        }
    }
};

export default new InitController();