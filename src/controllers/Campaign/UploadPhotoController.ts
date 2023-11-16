import { Request, Response } from 'express';
import { UploadPhotoService } from '../../services/Campaign/UploadPhotoService';

class UploadPhotoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let file = ""

        if (req.file) {
            file = req.file.filename
        }

        const uploadPhotoService = new UploadPhotoService

        const photo = await uploadPhotoService.execute({
            file, campaign_id: id
        })

        return res.json(photo)
    }
}

export { UploadPhotoController }