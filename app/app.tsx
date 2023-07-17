import { LogBox } from "react-native"
import { Provider } from "react-redux"
import React, { useEffect } from "react"
import codePush from "react-native-code-push"
import realm from "./utils/database/schema"
import SplashScreen from "react-native-splash-screen"
import RealmPlugin from "realm-flipper-plugin-device"
import Player from "./components/AudioPlayer/Player"
import { store, persistor } from "./redux/store/store"
import { PersistGate } from "redux-persist/integration/react"
import RootNavigation from "./navigation/RootNavigation"
import ThemeProvider from "./utils/theming/themeProvider"
import Spinner from "./components/Spinner/Spinner.component"
import { AlertNotificationRoot } from "./components/AlertComponent"

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
    "`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead.",
  ])
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <AlertNotificationRoot>
              <RootNavigation />
              <Player />
              <Spinner />
              <RealmPlugin realms={[realm]} />
            </AlertNotificationRoot>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

// let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

// export default codePush(codePushOptions)(App);
export default App
