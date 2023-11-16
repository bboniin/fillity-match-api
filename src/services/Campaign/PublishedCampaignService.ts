import prismaClient from '../../prisma'

interface CampaignRequest {
    id: string;
}

class PublishedCampaignService {
    async execute({ id }: CampaignRequest) {

        if (!id) {
            throw new Error("Id da campanha é obrigatório")
        }

        const campaign = await prismaClient.campaign.update({
            where: {
                id: id
            },
            data: {
                published: true,
                active: true
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

export { PublishedCampaignService }