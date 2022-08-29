import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";
import { modeReducer } from "./reducer";

import Header from "./components/Header";
import LoginForm from "./components/user/LoginForm";
import Network from "./components/user/Network";
import RegisterForm from "./components/user/RegisterForm";
import Portfolio from "./components/Portfolio";
import { Button } from "react-bootstrap";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  const [modeState, modedispatch] = useReducer(modeReducer, {
    mode: "light",
  });

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("user/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  const moveTop = () => {
    // TOP버튼 펑션
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  // const [mode, setmode] = useState("Light"); //State about dark-mode

  // const toggleMode = () => {
  //   if (mode === "Light") {
  //     setmode("Dark");
  //     document.body.style.backgroundColor = "#202020"; //'#042743'
  //     document.body.style.color = "#ffffff"; //'#042743'
  //   } else {
  //     setmode("Light");
  //     document.body.style.backgroundColor = "white";
  //     document.body.style.color = "#000000"; //'#042743'
  //   }
  // };

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact element={<Portfolio />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/users/:userId" element={<Portfolio />} />
            <Route path="/network" element={<Network />} />
            <Route path="*" element={<Portfolio />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
      {/* <Button className="position-fixed top-0 end-0 m-5" onClick={toggleMode}>
        MODE
      </Button> */}
      <Button className="position-fixed bottom-0 end-0 m-5" onClick={moveTop}>
        TOP
      </Button>
    </DispatchContext.Provider>
  );
}

export default App;
