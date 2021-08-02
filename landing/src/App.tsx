import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";

import { Web3ContextProvider } from "shared/lib/hooks/web3Context";
import { getLibrary } from "shared/lib/utils/getLibrary";
import { Web3DataContextProvider } from "shared/lib/hooks/web3DataContext";
import { SubgraphDataContextProvider } from "shared/lib/hooks/subgraphDataContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PolicyPage from "./pages/PolicyPage";
import TermsPage from "./pages/TermsPage";
import FAQPage from "./pages/FAQ";
import colors from "shared/lib/designSystem/colors";

const Body = styled.div`
  // background-color: ${colors.background.one};
  // width: 1920px;
  // height: 100vh;
  // height: 1000px;
  width: 100%;

  background: radial-gradient(66.3% 234.24% at 50% 50%, #444974 0%, #010101 100%);
  border: 0.987147px solid #000000;
  box-sizing: border-box;
`;


function App() {
  return (
    <Web3ContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3DataContextProvider>
          <SubgraphDataContextProvider>
            <Body>
              <Router>
                <Header />

                <Switch>
                  <Route path="/" exact>
                    <Hero />
                    {/* <MainContent>
                      <ProductCarousel />
                      <Mission />
                      <Investors />
                    </MainContent> */}
                  </Route>

                  <Route path="/policy">
                    <PolicyPage></PolicyPage>
                  </Route>

                  <Route path="/terms">
                    <TermsPage></TermsPage>
                  </Route>

                  <Route path="/faq">
                    <FAQPage></FAQPage>
                  </Route>
                </Switch>

                {/* <Footer /> */}
              </Router>
            </Body>
          </SubgraphDataContextProvider>
        </Web3DataContextProvider>
      </Web3ReactProvider>
    </Web3ContextProvider>
  );
}

export default App;
