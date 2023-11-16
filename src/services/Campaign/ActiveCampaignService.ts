import prismaClient from '../../prisma'

interface CampaignRequest {
    id: string;
}

class ActiveCampaignService {
    async execute({ id }: CampaignRequest) {

        if (!id) {
            throw new Error("Id da campanha é obrigatório")
        }

        const campaignGet = await prismaClient.campaign.findUnique({
            where: {
                id: id
            },
        })

        const campaign = await prismaClient.campaign.update({
            where: {
                id: id
            },
            data: {
                active: !campaignGet.active
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

        return (campaign)
    }
}

export { ActiveCampaignService }