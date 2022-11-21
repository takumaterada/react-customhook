// 全ユーザー一覧を取得するカスタムフック
import { UserProfile } from "../types/userProfile";
import { useState } from "react";
import axios from "axios";
import { User } from "../types/api/user";

export const useAllUsers = () => {
  const [userProfiles, setuserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.street}${user.address.suite}`,
        }));
        setuserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { getUsers, userProfiles, loading, error };
};
