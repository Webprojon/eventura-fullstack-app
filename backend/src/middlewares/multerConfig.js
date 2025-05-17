import multer from "multer";
import path from "path";

const uploadPath = path.join(process.cwd(), "src", "uploads");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		cb(null, Date.now() + "-" + file.fieldname + ext);
	},
});

export const upload = multer({ storage });
