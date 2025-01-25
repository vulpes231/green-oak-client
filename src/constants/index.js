const navLinks = [
  {
    id: "bank",
    title: "Bank",
  },
  {
    id: "borrow",
    title: "Borrow",
  },
  {
    id: "invest",
    title: "Invest",
  },
  {
    id: "about",
    title: "About",
  },
];

const dashLinks = [
  {
    id: "account",
    title: "Account",
  },
  {
    id: "payment",
    title: "Payment",
  },
  {
    id: "transfer",
    title: "Transfer",
  },
  {
    id: "profile",
    title: "Profile",
  },
  {
    id: "logout",
    title: "logout",
  },
];

const footerLinks = [
  {
    id: 1,
    name: "navigation",
    sublinks: ["bank", "borrow", "invest"],
  },
  {
    id: 2,
    name: "information",
    sublinks: ["fraud prevention", "remote deposit system", "lockbox service"],
  },
  {
    id: 3,
    name: "helpful links",
    sublinks: ["faq", "contact", "forms"],
  },
];

const contentLinks = [
  {
    id: 1,
    name: "manage alerts",
  },
  {
    id: 2,
    name: "change password",
  },
  {
    id: 3,
    name: "learn about digital wallet",
  },
  {
    id: 4,
    name: "settings",
  },
  {
    id: 5,
    name: "help",
  },
];

const devurl = "http://localhost:5000";
const liveurl = "https://server.regentoak.us";  //server.regentoak.us

const sendError = (error) => {
  if (error.response) {
    console.log(error.response.data.message);
    const errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  } else {
    throw error;
  }
};

const getAccessToken = () => {
  const accessTokenString = sessionStorage.getItem("token");
  if (accessTokenString) {
    return accessTokenString;
  } else {
    return null;
  }
};

export {
  navLinks,
  dashLinks,
  footerLinks,
  contentLinks,
  devurl,
  liveurl,
  sendError,
  getAccessToken,
};
