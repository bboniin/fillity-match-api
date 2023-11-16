import { Request, Response } from 'express';
import { PublishedCampaignService } from '../../services/Campaign/PublishedCampaignService';

class PublishedCampaignController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const publishedCampaignService = new PublishedCampaignService

        const campaign = await publishedCampaignService.execute({
           id
        })

        return res.json(campaign)
    }
}

export { PublishedCampaignController }