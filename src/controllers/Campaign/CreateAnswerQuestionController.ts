import { Request, Response } from 'express';
import { CreateAnswerQuestionService } from '../../services/Campaign/CreateAnswerQuestionService';

class CreateAnswerQuestionController {
    async handle(req: Request, res: Response) {
        const { question_id } = req.params
        const { client_id, campaign_id, liked, suggested_value, other_colours, colors} = req.body

        const createAnswerQuestionService = new CreateAnswerQuestionService

        const campaign = await createAnswerQuestionService.execute({
         client_id, question_id, campaign_id, liked, suggested_value, other_colours: other_colours == "sim" ? true : false, colors
        })

        return res.json(campaign)
    }
}

export { CreateAnswerQuestionController }