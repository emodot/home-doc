import { useEffect, useState } from "react";
import { fetchPlans } from "services/apiService";

export const usePlans = () => {
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    fetchPlans()
      .then((data) => {
        if (active) setPlans(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Unable to load plans");
      });

    return () => {
      active = false;
    };
  }, []);

  return { plans, loading: !plans && !error, error };
};
