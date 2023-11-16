import { Request, Response } from 'express';
import { ActiveCampaignService } from '../../services/Campaign/ActiveCampaignService';

class ActiveCampaignController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const activeCampaignService = new ActiveCampaignService

        const campaign = await activeCampaignService.execute({
           id
        })

        return res.json(campaign)
    }
}

export { ActiveCampaignController }