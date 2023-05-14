/**
 * @swagger
 * /api/getexample:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export default async function handler(req, res) {
  const data = {
    topic1: "Email address",
    topic2: "Password",
    topic3: "name"
  }
  console.log("finish CatProfile")
  res.status(200).json(data)

}