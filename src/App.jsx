import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import FloatingShape from "./components/FloatingShape";






function App() {
  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
      >
        <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-emerald-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-lime-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />

        <Provider store={appStore}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/" element={<Feed />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/connections" element={<Connections />}></Route>
                <Route path="/requests" element={<Requests />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  );
}

export default App;
