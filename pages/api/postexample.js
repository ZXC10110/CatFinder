export default async function handler(req, res) {
  console.log("postexample : " + JSON.stringify(req.body))
  res.status(200).json(req.body)
}