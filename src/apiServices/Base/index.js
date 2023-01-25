export const REQUEST_TYPE = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
};
  
export const deploymentEnv = {
  PROD: "production",
  STAGING: "staging",
  DEMO: "demo",
  DEV: "development",
  LOCAL: "local"
};

  
export const BASE_URL = () => {
  // let binanceBaseUrl;
  // let densityBaseUrl;
  // let binanceWsBase;
  // let densityWsBase;
  let appUrl;
  let chartUrlBase;
  switch (process.env.REACT_APP_BUILD_TYPE) {
  case deploymentEnv.PROD:
  case deploymentEnv.STAGING:
    // binanceBaseUrl = "https://fapi.binance.com";
    // densityBaseUrl = "https://api.density.exchange";
    // chartUrlBase = "https://fapi.binance.com";
    // binanceWsBase = "wss://fstream.binance.com/stream";
    // densityWsBase = "wss://api.density.exchange/futures/ws?token={0}";
    appUrl = "app.density.exchange";
    break;
  case deploymentEnv.DEMO:
    // binanceBaseUrl = "https://testnet.binancefuture.com";
    // densityBaseUrl = "https://api-demo.density.exchange";
    // chartUrlBase = "https://testnet.binancefuture.com";
    // binanceWsBase = "wss://stream.binancefuture.com/stream";
    // densityWsBase = "wss://api-demo.density.exchange/futures/ws?token={0}";
    appUrl = "demo.density.exchange";
    break;
  case deploymentEnv.DEV:
  case deploymentEnv.LOCAL:
  default:
    // binanceBaseUrl = "https://testnet.binancefuture.com";
    // densityBaseUrl = "https://api-dev.density.exchange";
    // chartUrlBase = "https://testnet.binancefuture.com";
    // binanceWsBase = "wss://stream.binancefuture.com/stream";
    // densityWsBase = "wss://api-dev.density.exchange/futures/ws?token={0}";
    appUrl = "app-dev.density.exchange";
    break;
  }
  
  return {
    //   binanceBaseUrl,
    //   densityBaseUrl,
    //   binanceWsBase,
    //   densityWsBase,
    //   chartUrlBase,
    appUrl
  };
};
  



export function GetAppURL() {
  if (process.env.NODE_ENV === "production") {
    return "https://" + "auction-dev.pahal.cloud";
  }
  return "http://localhost:3000";
}
  