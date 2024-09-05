import HeroGate from "../components/bramy/HeroGate";
import Gates from "../components/bramy/Gates";
import axios from "axios"


async function page() {
    const  getData = async() => {
    
        const response = await axios.get(`https://backend.acelgarage.pl/backend/wp-json/wp/v2/bramy?per_page=100`)
        const data = await response.data 
        return data
    }
    const data=await getData()
  return (
    <main className="flex flex-col items-center">
        <HeroGate/>
        <Gates data={data} />
    </main>
  )
}

export const revalidate = 3600

export default page