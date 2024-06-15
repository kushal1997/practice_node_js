const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

const s3Client=new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SEXCRET_ACCESS_KEY,
    }
});

// async function getObjectURL(key){
//     const command=new GetObjectCommand({
//         Bucket:"private.noizyboy.cloud",
//         Key:key,
//     });
//     return await getSignedUrl(s3Client,command)
// }


async function putObject(filename,contentType){
    const command= new PutObjectCommand({
        Bucket:"private.noizyboy.cloud",
        Key:`uploads/${filename}`,
        ContentType:contentType,
    });
    return await getSignedUrl(s3Client,command);
}

async function listObjects(){
    const command=new ListObjectsV2Command({
        Bucket:"private.noizyboy.cloud",
        key:"/"
    })
    const result=await s3Client.send(command);

    console.log(result);
}
async function init(){
    // const key="uploads/video-1718422244404.mkv"
    // console.log("Signed URL",await getObjectURL(key));

    // console.log("URL for uploading",await putObject(`video-${Date.now()}.mkv`,"video/mkv"))

    await listObjects();
}


init();