"use client";

import { userContext } from "@/context/userContext";
import User from "@/components/user/user";

const UserProfilePage = () => {
  const user = {
    name: "test",
    username: "testing254",
    email: "testing252@test.ee",
  };

  return (
    <userContext.Provider value={user}>
      <User />
    </userContext.Provider>
  );
};

export default UserProfilePage;
