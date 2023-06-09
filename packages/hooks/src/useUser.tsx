import { getUser, type User } from "@creatorhub/utils";
import { useEffect, useState } from "react";

/**
 * A Hook which provides the user if authenticated
 */
export const useUser = () => {
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUser()
			.then(setUser)
			.catch(() => void 0)
			.then(() => setLoading(false));
	}, []);

	return { user, loading };
};
