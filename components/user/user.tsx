import { useUserContext } from "@/context/userContext";

export default function User() {
  const user = useUserContext();

  console.log("User details:", user)

  return (
    <div>
      <div>
        <div>
          <p>{user.username}</p>
        </div>
        <div>
          <p>{user.email}</p>
        </div>
        <div>
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
}
