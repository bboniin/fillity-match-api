import { Request, Response } from 'express';
import { ListCampaignsService } from '../../services/Campaign/ListCampaignsService';

class ListCampaignsController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listCampaignsService = new ListCampaignsService

        const campaigns = await listCampaignsService.execute({
            page: page ? parseInt(page) || 0 : 0
        })

        return res.json(campaigns)
    }
}

export { ListCampaignsController }