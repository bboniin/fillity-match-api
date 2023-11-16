import { Request, Response } from 'express';
import { InitCampaignService } from '../../services/Campaign/InitCampaignService';

class InitCampaignController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { email, name } = req.body

        const initCampaignService = new InitCampaignService

        const campaign = await initCampaignService.execute({
           id, email, name
        })

        return res.json(campaign)
    }
}

export { InitCampaignController }