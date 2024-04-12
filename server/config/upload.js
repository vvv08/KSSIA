import multer   from 'multer';
import multerS3  from "multer-s3";
import { S3Client }  from "@aws-sdk/client-s3";
import path  from "path";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY
    },
    region: "ap-southeast-2" 
})

const s3Storage = multerS3({
    s3: s3, // s3 instance
    //bucket: "kifproducts", // change it as per your project requirement
    bucket: "websitebuckettrial",
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});
function sanitizeFile(file, cb) {
    // Define the allowed extension 
    const fileExts = [".png", ".jpg", ".jpeg", ".gif",".webp"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}
const upload = multer({ storage: s3Storage ,fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback)
},
limits: {
    fileSize: 1024 * 1024 * 4 // 4mb file size
}})

export default upload