import S3Storage from '../../utils/S3Storage';

interface ClientRequest {
    file: string;
    campaign_id: string;
}

class UploadPhotoService {
    async execute({ file, campaign_id }: ClientRequest) {

        if (!file  || !campaign_id) {
            throw new Error("Imagem e id da campanha é obrigatório")
        }
        
        const s3Storage = new S3Storage()

        await s3Storage.saveFile(file, campaign_id)
        
        return true
    }
}

export { UploadPhotoService }