import prismaClient from '../../prisma'

interface CampaignRequest {
    id: string;
}

class ReportsCampaignService {
    async execute({ id}: CampaignRequest) {

        if (!id) {
            throw new Error("Id da campanha é obrigatórios")
        }

        let campaign = await prismaClient.campaign.findUnique({
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
                    include: {
                        client: true
                    }
                }
            }
        })

        if (!campaign) {
            throw new Error("Campanha não existe")
        }

        let clients = {}
        let questions = {}
        campaign["liked_amei"] = 0
        campaign["liked_nao"] = 0
        campaign["liked_talvez"] = 0
        campaign["suggested_value_barato"] = 0
        campaign["suggested_value_bom"] = 0
        campaign["suggested_value_caro"] = 0
        campaign["other_colours_sim"] = 0
        campaign["other_colours_nao"] = 0

        campaign.questions.map((item) => {
            questions[item.id] = {
                ...item,
                    liked_amei: 0,
                    liked_talvez: 0,
                    liked_nao: 0,
                    suggested_value_barato: 0,
                    suggested_value_bom: 0,
                    suggested_value_caro: 0,
                    other_colours_sim: 0,
                    other_colours_nao: 0
            }
        })

        campaign.answers_question.map((item) => {
            if (!clients[item.client_id]) {
                clients[item.client_id] = true
            }
            if (item.other_colours) {
                questions[item.question_id].other_colours_sim += 1
                campaign["other_colours_sim"] += 1
            } else {
                questions[item.question_id].other_colours_nao += 1
                campaign["other_colours_nao"] += 1
            }
            if (item.suggested_value == "barato") {
                questions[item.question_id].suggested_value_barato += 1
                campaign["suggested_value_barato"] += 1
            } else {
                if (item.suggested_value == "caro") {
                    questions[item.question_id].suggested_value_caro += 1
                    campaign["suggested_value_caro"] += 1
                } else {
                    questions[item.question_id].suggested_value_bom += 1
                    campaign["suggested_value_bom"] += 1
                }
            }
            if (item.liked == "amei") {
                questions[item.question_id].liked_amei += 1
                campaign["liked_amei"] += 1
            } else {
                if (item.liked == "nao") {
                    questions[item.question_id].liked_nao += 1
                    campaign["liked_nao"] += 1
                } else {
                    questions[item.question_id].liked_talvez += 1
                    campaign["liked_talvez"] += 1
                }
            }
        })

        campaign.questions = Object.values(questions)
        campaign["clients"] = Object.values(clients).length

        return (campaign)
    }
}

export { ReportsCampaignService }