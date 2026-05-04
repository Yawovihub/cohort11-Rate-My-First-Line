import {ReviewPage} from "./pages/ReviewPage.tsx";
import ViewReviews from "./pages/ViewReviews.tsx";
import SubmitLeader from "./components/SubmitLeader.tsx";
import Navbar from "./components/Navbar.tsx";
import ReviewModal from "./components/ReviewModal.tsx";

export const App = () => {
    return (
        <div>
            {/*<Navbar/>*/}
            <ReviewModal/>
        </div>
    )
}

export default App;