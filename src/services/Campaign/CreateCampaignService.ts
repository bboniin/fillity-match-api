import prismaClient from '../../prisma'

interface CampaignRequest {
    name: string;
    questions: Array<[]>;
}

class CreateCampaignService {
    async execute({ name, questions }: CampaignRequest) {

        if (questions.length == 0) {
            throw new Error("Nenhum produto encontrado")
        }

        const campaign = await prismaClient.campaign.create({
            data: {
                id: Math.random().toString(16).slice(2),
                name: name,
                published: false,
                active: false
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

        questions.map(async (item, index) => {
            const question = await prismaClient.question.create({
                data: {
                    order: index,
                    campaign_id: campaign.id,
                    name: item["name"],
                    code: item["code"],
                    photos: item["photos"],
                    suggested_value: item["suggested_value"]
                }
            })
            campaign.questions.push(question)
        })

        return (campaign)
    }
}

export { CreateCampaignService }