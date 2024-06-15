const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

const s3Client=new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SEXCRET_ACCESS_KEY,
    }
});

async function getObjectURL(key){
    const command=new GetObjectCommand({
        Bucket:"private.noizyboy.cloud",
        Key:key,
    });
    return await getSignedUrl(s3Client,command)
}

async function init(){
    console.log("Signed URL",await getObjectURL("Screenshot (12).png"));
}


init();