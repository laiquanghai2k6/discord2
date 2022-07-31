
import "react-native-gesture-handler";
import "react-native-get-random-values"
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import { StreamChat } from 'stream-chat';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { OverlayProvider, Chat, Theme ,DeepPartial} from 'stream-chat-expo';
import AuthContextComponent from "./src/context/AuthContext";
import { StreamColors } from "./src/constants/Colors";
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator} from 'aws-amplify-react-native'

Amplify.configure({...awsconfig,Analitics:{disabled:false}});

const API_KEY = "za54m4ra2j5f";

const client = StreamChat.getInstance(API_KEY);


const theme: DeepPartial<Theme> = {
  colors: StreamColors,
 

};

function App() {
  const isLoadingComplete = useCachedResources();


  useEffect(()=>{
    //this is done when component mount
    
    return () => {
      // this is done when component unmount

      client.disconnectUser();
    }


  },[])





  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
   
        {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
        <AuthContextComponent client={client}>
          <OverlayProvider value={{style:theme}}>
            <Chat client={client}>
            <Navigation colorScheme={"dark"}/>

            </Chat>
          </OverlayProvider>
          
        {/* </GestureHandlerRootView> */}
        </AuthContextComponent>
        <StatusBar style="light"/>
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);