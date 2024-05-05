const s3 = require('../Services/awsServices').s3
const documentClient = require('../Services/awsServices').documentClient


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

}

module.exports = { postController }