const s3 = require('../Services/awsServices').s3
const documentClient = require('../Services/awsServices').documentClient


// Function to upload image to S3 bucket
const uploadToS3 = async (img) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: img.name,
        Body: img.data,
    }
    try {
        const data = await s3.upload(params).promise()

        //return the URL of the image
        return data.Location

    } catch (err) {
        console.log(err)
    }
}

const postController = {

    // Get all posts
    getAllPosts: async (req, res) => {
        console.log("Get all posts")
        const params = {
            TableName: process.env.DYNAMODB_TABLE
        }

        try {
            const data = await documentClient.scan(params).promise()
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },

    // Create a post
    createPost: async (req, res) => {

        // get the title and description from the request body
        const { title, description } = req.body
        const img = req.files.img

        //push the image to S3 bucket and get URL
        const imgUrl = await uploadToS3(img);

        // get the current date
        const date = new Date().toISOString()

        // create a new post
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                postId: Number(Date.now().toString()),
                title: title,
                description: description,
                date: date,
                upvotes: 0,
                img: imgUrl
            }
        }

        try {
            await documentClient.put(params).promise()
            res.status(201).json({ message: "Post created successfully" })
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },

}

module.exports = { postController }