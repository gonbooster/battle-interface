import { Route } from "react-router-dom";
import Home from "./views/home";
import Ghosts from "./views/ghosts";
import MyGhosts from "./views/myGhosts";
import Ghost from "./views/ghost";
import MainLayout from "./layouts/main";
import Admin from "./views/admin";

function App() {
  return (
    <MainLayout>
      <Route path="/" exact component={Home} />
      <Route path="/ghosts" exact component={Ghosts} />
      <Route path="/myghosts" exact component={MyGhosts} />
      <Route path="/ghosts/:tokenId" exact component={Ghost} />
      <Route path="/admin" exact component={Admin} />
    </MainLayout>
  );
}

export default App;
