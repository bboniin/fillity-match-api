import { Request, Response } from 'express';
import { CheckCampaignService } from '../../services/Campaign/CheckCampaignService';

class CheckCampaignController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { email } = req.body

        const checkCampaignService = new CheckCampaignService

        const campaign = await checkCampaignService.execute({
           id, email
        })

        return res.json(campaign)
    }
}

export { CheckCampaignController }