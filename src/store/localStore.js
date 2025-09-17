export const save2Local = (keyName, val) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(keyName, JSON.stringify(val));
  }
};

export const get4rmLocal = (keyName) => {
  if (typeof window !== "undefined") {
    const val = localStorage.getItem(keyName);
    if (val !== "undefined") {
      return JSON.parse(val);
    }
    return null;
  }
};

export const remove4rmLocal = (keyName) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(keyName);
  }
};

export const saveBusinessIndustry = (val) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("business_industries", JSON.stringify(val));
  }
};

export const getBusinessIndustry = () => {
  if (typeof window !== "undefined") {
    const val = localStorage.getItem("business_industries");
    if (val !== "undefined") {
      return JSON.parse(val);
    }
    return null;
  }
};


