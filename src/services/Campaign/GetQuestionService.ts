import prismaClient from '../../prisma'

interface CampaignRequest {
    id: string;
    client_id: string;
}

class GetQuestionService {
    async execute({ id, client_id }: CampaignRequest) {

        if (!id || !client_id) {
            throw new Error("Id da campanha é obrigatório")
        }
        
        let question = {}

        const campaign = await prismaClient.campaign.findUnique({
            where: {
                id: id
            },
            include: {
                questions: {
                    orderBy: {
                        order: "asc"
                    }
                },
            }
        })

        if (!campaign) {
            throw new Error("Campanha não existe")
        }
        
        const answers = await prismaClient.answersQuestion.findMany({
            where: {
                campaign_id: id,
                client_id: client_id
            },
        })

        if (answers.length == campaign.questions.length) {
            return null
        } else {
            question = campaign.questions[answers.length]
            return (question)
        }
    }
}

export { GetQuestionService }