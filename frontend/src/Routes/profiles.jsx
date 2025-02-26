import React, { useState } from "react";
import { useUser } from "../Components/userContext.jsx";

const Profiles = () => {
  const {user} = useUser();

  return <div>This is the Profile of <strong>{user}</strong></div>;
};

export default Profiles;
