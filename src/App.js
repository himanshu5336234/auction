import { ThemeProvider } from "@mui/material/styles";
import React, { Suspense } from "react";

import theme from "./assets/theme/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import * as reactRouterDom from "react-router-dom";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";

import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import { palette, style } from "./assets/supertokens.styled";
import { GetAppURL } from "./apiServices/Base/index";
import BasicOverLayLoader from "./ui/Loader/Loader";
const LandingPage = React.lazy(() => import("./pages/landingPage/LandingPage"));
const BidderRegistration = React.lazy(() => import("./components/bidder/Registration/Index"));
const AuctionDetails = React.lazy(()=>import("./components/bidder/Auction/AuctionDetails/index"));
const AddAccount =React.lazy(()=>import("./components/bidder/Accounts/AddAccount"));
const BidderDashboard = React.lazy(()=>import( "./pages/bidder/Dashboard/Dashboard"));
const AuctionFloor =React.lazy(()=>import("./pages/bidder/AuctionFloor/AuctionFloor"));
const AdminDashboard =React.lazy(()=>import("./pages/admin/Dashboard/AdminDashboard"));
const AuctionFloorDashboard =React.lazy(()=>import("./pages/bidder/AuctionFloor/Dashboard"));
const KYCInitiate =React.lazy(()=>import("./components/bidder/KYCInitiate/KYCInitiate"));
const BidderNotifications =React.lazy(()=>import("./pages/bidder/Notifications/BidderNotifications"));
const WinningAuctionDetails =React.lazy(()=>import("./components/bidder/Auction/WinningAuctionDetail/index"));
const AdminWallet =React.lazy(()=>import( "./components/bidder/Wallet/Index"));
// import BidderRegistration from "./components/bidder/Registration/Index";
// import AuctionDetails from "./components/common/AuctionDetails/AuctionDetails";
// import AddAccount from "./components/bidder/Accounts/AddAccount";
// import BidderDashboard from "./pages/bidder/Dashboard/Dashboard";
// import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
// import AuctionFloor from "./pages/bidder/AuctionFloor/AuctionFloor";
// import AuctionFloorDashboard from "./pages/bidder/AuctionFloor/Dashboard";
// import KYCInitiate from "./components/bidder/KYCInitiate/KYCInitiate";
// import BidderNotifications from "./pages/bidder/Notifications/BidderNotifications";
// import LandingPage from "./pages/landingPage/LandingPage";
// import WinningAuctionDetails from "./components/bidder/Auction/WinningAuctionDetails/index";
// import AdminWallet from "./components/bidder/Wallet/Index";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "Density",
    apiDomain: "https://auction-api-dev.pahal.cloud",
    websiteDomain: GetAppURL(),
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    Passwordless.init({
      palette,
      style,
      contactMethod: "PHONE",
      signInUpFeature: {
        disableDefaultUI: false,
        signUpForm: {
          formFields: [
            {
              id: "phoneNumber",
              label: "Number",
              placeholder: "Your Number",
            },
          ],
        },
      },
      getRedirectionURL: async function(context) {
        if (context.action === "SUCCESS") {
          const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
          if (accessTokenPayload.is2faComplete === true) {
            if (context.redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              return context.redirectToPath;
            }
            if (context.isNewUser) {
              // user signed up
              return "/bidder/registration";
            }
            return "/";
          }
          return "/bidder/registration";
        }
      },
    }),
    Session.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            doesSessionExist: async function(input) {
              if (!(await originalImplementation.doesSessionExist(input))) {
                // The user has not finished the first factor.
                // So the second factor screen, nor the protected website routes
                // should be given access.
                return false;
              }
              if (
                window.location.pathname.startsWith("/auth") ||
                input.userContext.forceOriginalCheck === true
              ) {
                // In our example, this "if condition" is true for the first factor. Here we do not
                // want to return false because a session exists at this point, which means
                // that the user finished the first factor already.
                return true;
              }
              const accessTokenPayload = await this.getAccessTokenPayloadSecurely(
                input
              );

              // this means both the factors have been completed.
              return true;
            },
          };
        },
      },
    }),
  ],
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<BasicOverLayLoader />}>
          <BrowserRouter>
            <Routes>
              {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}

              <Route path="/" element={<LandingPage />} />

              {/* Bidder Routes */}

              <Route
                path="/Bidder"
                element={
                  <Passwordless.PasswordlessAuth>
                    <BidderDashboard />
                  </Passwordless.PasswordlessAuth>
                }
              />
              <Route
                path="/Bidder/addAccount"
                element={
                  <Passwordless.PasswordlessAuth>
                    <AddAccount />
                  </Passwordless.PasswordlessAuth>
                }
              />
              <Route
                path="/Bidder/Registration"
                element={
                  <Passwordless.PasswordlessAuth>
                    <BidderRegistration />
                  </Passwordless.PasswordlessAuth>
                }
              />
              <Route
                path="/Bidder/KYCInitiate"
                element={
                  <Passwordless.PasswordlessAuth>
                    <KYCInitiate />
                  </Passwordless.PasswordlessAuth>
                }
              />
              <Route
                path="/bidder/notification"
                element={
                  <Passwordless.PasswordlessAuth>
                    <BidderNotifications />
                  </Passwordless.PasswordlessAuth>
                }
              />

              <Route
                path="/Bidder/auctionDetails/:auctionId"
                element={
                  <Passwordless.PasswordlessAuth>
                    <AuctionDetails />
                  </Passwordless.PasswordlessAuth>
                }
              />

              <Route
                path="/Bidder/WauctionDetails/:auctionId"
                element={
                  <Passwordless.PasswordlessAuth>
                    <WinningAuctionDetails />
                  </Passwordless.PasswordlessAuth>
                }
              />

              <Route
                path="/bidder/wallet"
                element={
                  <Passwordless.PasswordlessAuth>
                    <AdminWallet />
                  </Passwordless.PasswordlessAuth>
                }
              />

              <Route
                path="/Bidder/auctionDetails/:auctionId/AuctionFloor"
                element={
                  <Passwordless.PasswordlessAuth>
                    <AuctionFloor />
                  </Passwordless.PasswordlessAuth>
                }
              />
              <Route
                path="/Bidder/WauctionDetails/:auctionId/AuctionFloor"
                element={
                  <Passwordless.PasswordlessAuth>
                    <AuctionFloor />
                  </Passwordless.PasswordlessAuth>
                }
              />
              <Route
                path="/Bidder/auctionDetails/:auctionId/AuctionFloor/dashboard"
                element={
                  <Passwordless.PasswordlessAuth>
                    <AuctionFloorDashboard />
                  </Passwordless.PasswordlessAuth>
                }
              />

              {/* Admin Routes */}

              <Route
                path="/admin"
                element={
                  <Passwordless.PasswordlessAuth>
                    <AdminDashboard />
                  </Passwordless.PasswordlessAuth>
                }
              />
              <Route
                path="/admin/auctionDetails/:auctionId"
                element={
                  <Passwordless.PasswordlessAuth>
                    <AuctionDetails />
                  </Passwordless.PasswordlessAuth>
                }
              />
              {/* if url page not found  */}

              <Route
                path="/*"
                element={
                  <Passwordless.PasswordlessAuth>
                    <LandingPage />
                  </Passwordless.PasswordlessAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;
