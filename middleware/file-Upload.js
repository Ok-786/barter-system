import multer from 'multer';
import { v4 } from 'uuid';

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}

const fileUpload = multer({
    limit: 1000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            cb(null, `${v4()}${Date.now()}.${MIME_TYPE_MAP[file.mimetype]}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        const error = isValid ? null : new Error('Invalid file mime type.... only images allowed!');
        cb(error, isValid)
    }
})

export default fileUpload;