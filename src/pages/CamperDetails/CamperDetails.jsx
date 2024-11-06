import CampersDetails from "../../components/CampersDetails/CampersDetails";
import { useParams } from "react-router-dom";

export default function CamperDetails() {
  const { id } = useParams();
  return (
    <div>
      <CampersDetails id={id} />
    </div>
  );
}
