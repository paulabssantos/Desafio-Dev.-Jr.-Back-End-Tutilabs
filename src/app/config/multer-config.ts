import { HttpException, HttpStatus } from "@nestjs/common"
import * as multer from "multer"
import * as crypto from 'crypto'
export const multerConfig = {
    fileFilter(req, file, callback) {
        const allowedFileTypes = ['application/pdf', 'text/plain']

        if (allowedFileTypes.includes(file.mimetype)) {
            callback(null, true)
        }
        else {
            callback(new HttpException('Formato de arquivo não suportado. Roteiro precisa ser um pdf ou .txt', HttpStatus.UNPROCESSABLE_ENTITY), false)
        }
    },
    dest: './uploads',
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, "./uploads")
        },
        filename(req, file, callback) {
            crypto.randomBytes(16, (err, hash) => {
                callback(null, `${hash.toString('hex')}-${file.originalname}`)
            })
        },
    })
}