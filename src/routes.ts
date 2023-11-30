import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'
import { AuthUserController } from './controllers/User/AuthUserController'
import { CreateCampaignController } from './controllers/Campaign/CreateCampaignController'
import { GetCampaignController } from './controllers/Campaign/GetCampaignController'
import { ListCampaignsController } from './controllers/Campaign/ListCampaignsController'
import { ActiveCampaignController } from './controllers/Campaign/ActiveCampaignController'
import { UploadPhotoController } from './controllers/Campaign/UploadPhotoController'
import { PublishedCampaignController } from './controllers/Campaign/PublishedCampaignController'
import { ReportsCampaignController } from './controllers/Campaign/ReportsCampaignController'
import { CheckCampaignController } from './controllers/Campaign/CheckCampaignController'
import { InitCampaignController } from './controllers/Campaign/InitCampaignController'
import { GetQuestionController } from './controllers/Campaign/GetQuestionController'
import { CreateAnswerQuestionController } from './controllers/Campaign/CreateAnswerQuestionController'


const upload = multer(uploadConfig)

const router = Router()

router.post('/session', new AuthUserController().handle)
router.get('/campaign/:id', new GetCampaignController().handle)
router.post('/check-campaign/:id', new CheckCampaignController().handle)
router.post('/init-campaign/:id', new InitCampaignController().handle)
router.get('/question/:id', new GetQuestionController().handle)
router.post('/answer/:question_id', new CreateAnswerQuestionController().handle)

router.use(isAuthenticated)

router.post('/campaign', new CreateCampaignController().handle)
router.post('/photo-campaign/:id', upload.single("file"), new UploadPhotoController().handle)
router.get('/reports-campaign/:id', new ReportsCampaignController().handle)
router.put('/active-campaign/:id', new ActiveCampaignController().handle)
router.put('/published-campaign/:id', new PublishedCampaignController().handle)
router.get('/campaigns', new ListCampaignsController().handle)




export { router }