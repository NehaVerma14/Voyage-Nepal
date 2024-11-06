import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreatePlace from "./pages/CreatePlace";
import UpdatePlace from "./pages/UpdatePlace";
import CreateCategory from "./pages/CreateCategory";
import UpdateCategory from "./pages/UpdateCategory";
import CreateHotel from "./pages/CreateHotel";
import UserProfile from "./pages/UserProfile";
import ReviewPage from "./pages/ReviewPage";
import NotFound from "./pages/NotFound";
import ActivateAccount from "./pages/ActivateAccount";
import UserRole from "./pages/UserRole";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/terms" component={Terms} />
				<Route path="/privacy-policy" component={PrivacyPolicy} />
				<Route path="/user/verify" component={ActivateAccount} />
				<AdminRoute path="/place/create" component={CreatePlace} />
				<AdminRoute path="/place/update" component={UpdatePlace} />
				<AdminRoute path="/category/create" component={CreateCategory} />
				<AdminRoute path="/category/update" component={UpdateCategory} />
				<AdminRoute path="/hotel/create" component={CreateHotel} />
				<AdminRoute path="/user-profile" component={UserProfile} />
				<AdminRoute path="/user/review" component={ReviewPage} />
				<AdminRoute path="/user/update/role" component={UserRole} />
				<Route path="*" component={NotFound} />
			</Switch>
			<ToastContainer />
		</Router>
	);
}

export default App;
