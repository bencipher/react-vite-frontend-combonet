import defaults from "../config/siteDefaults.json";
import Socials from "./Socials";

const announcement = defaults.announcement;
const BeltComponent = () => {
  return (
    <div className="text-center flex flex-col sm:flex-row justify-between flex-wrap bg-black text-white py-2">
      <div className="md:ml-12 belt-social-icons min-w-fit md:px-2">
        <Socials />
      </div>
      <div className="hidden md:block w-full sm:w-3/5 max-w-3/5 text-right pr-14">
        {" "}
        {announcement && <p>{announcement}</p>}
      </div>
    </div>
  );
};

export default BeltComponent;
