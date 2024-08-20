import axios from "axios";
import GaragePage from "../../components/garaze/GaragePage";

const page = async ({ params }) => {
  const getData = async () => {
    const response = await axios.get(
      `https://backend.acelgarage.pl/backend/wp-json/wp/v2/kojce_wp/${params.id}`
    );
    const data = await response.data;
    return data;
  };
  const data = await getData();

  return (
    <div>
      <GaragePage data={data} />
    </div>
  );
};

export default page;

export const revalidate = 3600 
