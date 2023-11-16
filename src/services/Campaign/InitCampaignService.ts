import prismaClient from '../../prisma'

interface CampaignRequest {
    id: string;
    email: string;
    name: string;
}

class InitCampaignService {
    async execute({ id, email, name}: CampaignRequest) {

        if (!email || !name || !id) {
            throw new Error("Id da campanha, nome e  email são obrigatórios")
        }
        
        const clientGet = await prismaClient.client.findFirst({
            where: {
                campaign_id: id,
                email: email,
            },
        })

        if (clientGet) {
            throw new Error("Email já cadastrado nesta campanha")
        }

        const client = await prismaClient.client.create({
            data: {
                campaign_id: id,
                email: email,
                name: name,
                type: "type"
            },
        })

        return (client)
    }
}

export { InitCampaignService }