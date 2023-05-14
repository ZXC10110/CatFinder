import { supabase } from "./supabase"

export default async function handler(req, res) {

  req = '*'
  const { data, error } = await supabase
  .from('cat_profile')
  .select(req)

  console.log("finish CatProfile")
  res.status(200).json(data)
}


