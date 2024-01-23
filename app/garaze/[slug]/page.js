
import GaragePage from "@/app/components/garaze/GaragePage";
import axios from "axios";


const getData = async ({ params }) => {
  const response = await axios.get(
    `https://backend.acelgarage.pl/backend/wp-json/wp/v2/garaze?slug=${params.slug}`
  );
  const data = await response.data;
  return data;
};

async function page({ params }) {

  const data = await getData({ params });

  return (
    <div>
      <GaragePage data={data}  />
    </div>
  );
}

export default page;
