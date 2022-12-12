import React, { useEffect, useState } from "react";
import AuthService from "./AuthService";
import useAuth from "../auth/authContext";
import Loader from "../../components/loader";

export default function AuthStateChanged({ children }) {
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AuthService.waitForUser((userCred) => {
			setUser(userCred);
			setLoading(false);
		});
		//eslint-disable-next-line
	}, []);

	if (loading) {
		return (
			<div style={{ position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }}>
				<Loader />
			</div>
		)
	}

	return children;
}
