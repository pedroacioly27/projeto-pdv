const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)
const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const uploadFile = async (patch, buffer, mimetype) => {

    const arquivo = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: patch,
        Body: buffer,
        ContentType: mimetype
    }).promise()
    return {
        url: arquivo.Location,
        patch: arquivo.Key
    }
    r

}

const excluirArquivo = async (patch) => {
    await s3.deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: patch
    }).promise()
}

module.exports = { uploadFile, excluirArquivo }