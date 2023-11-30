import prismaClient from '../../prisma'

interface CampaignRequest {
    campaign_id: string;
    question_id: string; 
    client_id: string;
    colors: string;
    other_colours: boolean;
    suggested_value: string;
    liked: string;
}

class CreateAnswerQuestionService {
    async execute({ campaign_id, client_id, question_id, colors, other_colours , suggested_value, liked}: CampaignRequest) {

        if (!campaign_id || !client_id || !liked ) {
            throw new Error("Id da campanha, do cliente e pelo menos o primeiro voto são obrigatórios")
        }
        
        const answerGet = await prismaClient.answersQuestion.findFirst({
            where: {
                campaign_id: campaign_id,
                client_id: client_id,
                question_id: question_id
            },
        })
        
        if (answerGet) {
            throw new Error("Produto já foi respondido")
        }

        const question = await prismaClient.question.findFirst({
            where: {
                campaign_id: campaign_id,
                id: question_id
            },
        })

        const answersQuestion = await prismaClient.answersQuestion.create({
            data: {
                campaign_id: campaign_id,
                liked: liked,
                name: question.name,
                code: question.code,
                question_id: question_id,
                suggested_value: suggested_value,
                other_colours: other_colours,
                amarelo: colors.indexOf("Amarelo") == -1 ? false :  true, 
                azul: colors.indexOf("Azul") == -1 ? false :  true, 
                bege: colors.indexOf("Bege") == -1 ? false :  true, 
                branco: colors.indexOf("Branco") == -1 ? false :  true, 
                cinza: colors.indexOf("Cinza") == -1 ? false :  true, 
                dourado: colors.indexOf("Dourado") == -1 ? false :  true, 
                estampado: colors.indexOf("Estampado") == -1 ? false :  true, 
                laranja: colors.indexOf("Laranja") == -1 ? false :  true, 
                marinho: colors.indexOf("Marinho") == -1 ? false :  true, 
                marrom: colors.indexOf("Marrom") == -1 ? false :  true, 
                preto: colors.indexOf("Preto") == -1 ? false :  true, 
                rosa: colors.indexOf("Rosa") == -1 ? false :  true, 
                roxo: colors.indexOf("Roxo") == -1 ? false :  true, 
                verde: colors.indexOf("Verde") == -1 ? false :  true, 
                vermelho: colors.indexOf("Vermelho") == -1 ? false :  true, 
                client_id: client_id
            },
        })

        return (answersQuestion)
    }
}

export { CreateAnswerQuestionService }