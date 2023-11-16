import prismaClient from '../../prisma'

interface CampaignRequest {
    id: string;
}

class GetCampaignService {
    async execute({ id}: CampaignRequest) {

        if (!id) {
            throw new Error("Id da campanha é obrigatório")
        }

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
                answers_question: {
                    orderBy: {
                        created_at: "asc"
                    }
                },
            }
        })

        if (!campaign) {
            throw new Error("Campanha não existe")
        }

        return (campaign)
    }
}

export { GetCampaignService }