import { Request, Response } from 'express';
import { CreateCampaignService } from '../../services/Campaign/CreateCampaignService';

class CreateCampaignController {
    async handle(req: Request, res: Response) {

        const { name, questions } = req.body

        const createCampaignService = new CreateCampaignService

        const campaign = await createCampaignService.execute({
            questions, name
        })

        return res.json(campaign)
    }
}

export { CreateCampaignController }