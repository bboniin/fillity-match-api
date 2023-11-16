import { Request, Response } from 'express';
import { GetQuestionService } from '../../services/Campaign/GetQuestionService';

class GetQuestionController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { client_id } = req.query

        const getQuestionService = new GetQuestionService

        const campaign = await getQuestionService.execute({
           id, client_id
        })

        return res.json(campaign)
    }
}

export { GetQuestionController }