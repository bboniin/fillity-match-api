import prismaClient from '../../prisma'

interface CampaignRequest {
    id: string;
    email: string;
}

class CheckCampaignService {
    async execute({ id, email}: CampaignRequest) {

        if (!email || !id) {
            throw new Error("Id da campanha e email são obrigatórios")
        }

        const client = await prismaClient.client.findFirst({
            where: {
                campaign_id: id,
                email: email
            },
        })

        return (client || null)
    }
}

export { CheckCampaignService }