import { createContext, useContext, useEffect, useState } from "react";
import { fetchPlans, fetchServices } from "services/apiService";

const PricingContext = createContext(null);

// Plans and one-time services are fetched once when the app boots and shared
// from here, so no page refetches them on navigation.
export const PricingProvider = ({ children }) => {
  const [plans, setPlans] = useState(null);
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    Promise.all([fetchPlans(), fetchServices()])
      .then(([plansData, servicesData]) => {
        if (!active) return;
        setPlans(plansData);
        setServices(servicesData);
      })
      .catch((err) => {
        if (active) setError(err.message || "Unable to load pricing");
      });

    return () => {
      active = false;
    };
  }, []);

  const loading = !plans && !services && !error;

  return (
    <PricingContext.Provider value={{ plans, services, loading, error }}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricing must be used inside a PricingProvider");
  }
  return context;
};
