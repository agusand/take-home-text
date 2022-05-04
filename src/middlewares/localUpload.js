import multer from "multer";
import { dirname, resolve, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, resolve(__dirname, "../data/avatars/"));
	},
	filename: async (req, file, cb) => {
		const email = req.body.email;
		const fileExtension = extname(file.originalname);
		cb(null, `${email}${fileExtension}`);
	},
});
const upload = multer({
	storage,
});

export default upload;
