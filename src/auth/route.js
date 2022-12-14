import { useRouter } from "next/router";
import React from "react";
import LoginModal from "../../components/loginModal";
import useAuth from "./authContext";

export function withPublic(Component) {
	return function WithPublic(props) {
		const auth = useAuth();
		const router = useRouter();

		if (auth.user) {
			router.replace("/");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}

export function withProtected(Component) {
	return function WithProtected(props) {
		const auth = useAuth();
		const [showLogin, setShowLogin] = React.useState(true);

		if (!auth.user) {
			// return <LoginModal children={<Component {...props} />} />;
			return (
				<>
					<Component auth={auth} {...props} />
					{showLogin && <LoginModal message="This Page is Protected" setShowLogin={setShowLogin} />}
				</>
			)
		}
		return <Component auth={auth} {...props} />;
	};
}