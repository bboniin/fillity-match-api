import { Request, Response } from 'express';
import { ReportsCampaignService } from '../../services/Campaign/ReportsCampaignService';

class ReportsCampaignController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const reportsCampaignService = new ReportsCampaignService

        const campaign = await reportsCampaignService.execute({
           id
        })

        return res.json(campaign)
    }
}

export { ReportsCampaignController }