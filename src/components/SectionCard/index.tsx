
import FooterInformation from "../FooterInformation/FooterInformation";
import PrimaryColorodoSection from "./PrimaryColorodoSection";
import PrimaryPreventionCard from "./PrimaryPreventionCard";

const SectionCard = () => {

    return (
        <div className=" bg-[#e7e3e3] rounded-[8px] w-[90%] lg:w-[65%]">
            <div className="px-[24px] py-[24px] flex flex-col gap-[24px]">
                <PrimaryPreventionCard />
                <PrimaryColorodoSection />
                <FooterInformation />
            </div>
        </div>
    );
};

export default SectionCard;