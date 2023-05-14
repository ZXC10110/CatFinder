function AddCat() {
  //setup 
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState(null)

  useEffect(() => {
    fetchCat("x", function() {
          console.log("cat : " + cat)
        })
  }, [session])

  //fetch data
  const fetchCat = async (param, callback) => {
    try {
      setLoading(true)
      //call page/api/queue/apiname
      const addcat = await fetch("/api/cat/addCat").then(console.log("welcome to add cat"))
      const data = await addcat.json()
      console.log("response : " + JSON.stringify(data))
      setCat(data)
    } finally {
      setLoading(false)
      console.log("cat : " + cat)
      callback()
    }
  }
 
    return (
      <h2>ลงทะเบียนแมว</h2>
    )
}
  
export default AddCat