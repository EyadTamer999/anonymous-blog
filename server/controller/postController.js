const s3 = require('../Services/awsServices').s3
const documentClient = require('../Services/awsServices').documentClient


// Function to upload image to S3 bucket
const uploadToS3 = async (img, postId) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: postId + img.name,
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

// Function to delete image from S3 bucket
const deleteFromS3 = async (params) => {
    const data = await documentClient.get(params).promise()
    const img = data.Item.img
    const imgKey = img.split("/").pop()
    const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: imgKey
    }
    try {
        await s3.deleteObject(s3Params).promise()
    } catch (err) {
        res.status(500).json({ message: err })
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
        const { title, description, userId } = req.body
        const img = req.files.img

        if (!title || !description || !img) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const postId = Number(Date.now().toString())

        //push the image to S3 bucket and get URL
        const imgUrl = await uploadToS3(img, postId);

        // get the current date
        const date = new Date().toISOString()

        // create a new post
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                postId: postId,
                userId: userId,
                title: title,
                description: description,
                date: date,
                upvotes: 0,
                usersVoted: [],
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

    // Upvote a post
    upvotePost: async (req, res) => {
        const { postId } = req.params;
        const { userId } = req.body;

        try {
            // Retrieve the item from DynamoDB first
            const getItemParams = {
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                    postId: Number(postId)
                }
            };
            const { Item } = await documentClient.get(getItemParams).promise();

            // Check if userId already exists in usersVoted
            if (Item && Item.usersVoted && Item.usersVoted.includes(userId)) {
                return res.status(400).json({ message: "User already upvoted this post." });
            }

            // Perform update if user hasn't voted
            const updateParams = {
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                    postId: Number(postId)
                },
                UpdateExpression: "SET upvotes = upvotes + :val, usersVoted = list_append(usersVoted, :userId)",
                ExpressionAttributeValues: {
                    ":val": 1,
                    ":userId": [userId]
                },
                ReturnValues: "UPDATED_NEW"
            };

            const data = await documentClient.update(updateParams).promise();
            res.status(200).json(data);

        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Downvote a post
    downvotePost: async (req, res) => {
        const { postId } = req.params;
        const { userId } = req.body;

        try {
            // Retrieve the item from DynamoDB first
            const getItemParams = {
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                    postId: Number(postId)
                }
            };

            const { Item } = await documentClient.get(getItemParams).promise();

            // Check if userId already exists in usersVoted
            if (Item && Item.usersVoted && Item.usersVoted.includes(userId)) {
                return res.status(400).json({ message: "User already downvoted this post." });
            }

            // Perform update if user hasn't voted
            const updateParams = {
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                    postId: Number(postId)
                },
                UpdateExpression: "SET upvotes = upvotes - :val, usersVoted = list_append(usersVoted, :userId)",
                ExpressionAttributeValues: {
                    ":val": 1,
                    ":userId": [userId]
                },
                ReturnValues: "UPDATED_NEW"
            };

            const data = await documentClient.update(updateParams).promise();
            res.status(200).json(data);

        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Delete a post
    deletePost: async (req, res) => {
        const { postId } = req.params
        const { userId } = req.body

        // if the userId is not the same as the userId of the post, return unauthorized
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                postId: Number(postId)
            }
        }

        const data = await documentClient.get(params).promise()
        if (data.Item.userId !== userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        // delete image from S3 bucket
        await deleteFromS3(params)

        try {
            await documentClient.delete(params).promise()
            res.status(200).json({ message: "Post deleted successfully" })
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },
}

module.exports = { postController }