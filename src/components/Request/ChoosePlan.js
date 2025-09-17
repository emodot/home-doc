import { ReactComponent as CloseMenu } from "assets/icons/close-menu.svg";
import PricingPlans from "components/PlansAndPricing/PricingPlans";

const ChoosePlan = ({ closeModal, selectPlan }) => {
  return (
    <div className="bg-white absolute top-0 right-0 lgm:w-[75vw] w-full h-[100vh] py-[1rem] px-[1rem] z-20 overflow-auto">
      <div className=" w-[20px] cursor-pointer">
        <CloseMenu onClick={() => closeModal()} />
      </div>
      <div>
        <p className="font-publica_sans_m text-[27px] text-center">
          Select Plan
        </p>
      </div>
      <PricingPlans selectPlan={selectPlan} />
    </div>
  );
};

export default ChoosePlan;
