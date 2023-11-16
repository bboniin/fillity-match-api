import prismaClient from '../../prisma'

interface CampaignRequest {
    page: number;
}

class ListCampaignsService {
    async execute({page}: CampaignRequest) {

        const campaignsLength = await prismaClient.campaign.count({
            where: {
                published: true
            }
        })
        const campaigns = await prismaClient.campaign.findMany({
            where: {
                published: true
            },
            orderBy: {
                created_at: "asc"
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
            },
            take: 10,
            skip: page*10
        })

        return ({campaigns, campaignsLength})
    }
}

export { ListCampaignsService }