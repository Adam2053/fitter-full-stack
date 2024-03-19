// import multer from 'multer';
// import fs from 'fs';

// export const multerStorage = () => {
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) {
//             const uploadDir = path.join(__dirname, 'uploads', new Date().toISOString().split("T")[0]);
//             if(!fs.existsSync(uploadDir)) {
//                 fs.mkdirSync(uploadDir, {recursive: true});
//             }
//             cb(null, uploadDir);
//         },
//         filename: (req, file, cb) => {
//             cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//         }
//     });

//     const upload = multer({
//         storage: storage,
//         limits: {
//             fileSize: 1024 * 1024 * 5 // 5mb limit
//         },
//         fileFilter: (req, file, cb) => {}
//     })
// }