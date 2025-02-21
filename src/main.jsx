import React, {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"

import RoundView from "./views/RoundView/RoundView.jsx"
import FinalView from "./views/FinalView/FinalView.jsx"
import PlayersView from "./views/PlayersView/PlayersView.jsx"

import {PlayersProvider} from "./context/PlayersContext"

import "./index.css";
import AppContainer from "./components/AppContainer/AppContainer.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <PlayersProvider>
            <AppContainer>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <span className="dummy-view">
                                    <Link to="/game/round/1" className="round-button next-round-button">⮕</Link>
                                </span>
                            }
                        />
                        <Route path="/game/round/:roundNum" element={<RoundView/>}/>
                        <Route path="/game/final" element={<FinalView/>}/>

                        <Route path="/players" element={<PlayersView/>}/>
                    </Routes>
                </BrowserRouter>
            </AppContainer>
        </PlayersProvider>
    </StrictMode>
);