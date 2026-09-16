import { ReactComponent as OtherPlan } from "assets/icons/other-plan.svg";
import { ReactComponent as PremiumPlan } from "assets/icons/premium-plan.svg";

export const PlanIcon = ({ icon }) => (icon === "premium" ? <PremiumPlan /> : <OtherPlan />);
