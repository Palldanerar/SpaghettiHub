import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (file.fieldname == "avatar") {
            cb(null, "./uploads/avatars");
        }
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage })