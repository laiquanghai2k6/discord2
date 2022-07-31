import {View,Text,StyleSheet, FlatList} from 'react-native';
import React from 'react';
import { useEffect,useState } from 'react';
import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import { useChatContext } from 'stream-chat-expo';
import UserListItem from '../components/UserListItem';
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const UserListScreen = () =>{
    const {client} = useChatContext();
    const [users,setUsers] = useState([]);
    const {userId} = useAuthContext();
    const navigation = useNavigation();

    const fetchUser = async () =>
    {
        const response = await client.queryUsers({})
        setUsers(response.users);
    }

    useEffect(()=>{
        fetchUser();
    },[])

    const startChannel =  async (user) =>{
        const channel = client.channel("messaging",{
            members:[userId,user.id],
            
        });
        await channel.create();

        navigation.navigate("ChannelScreen",{ channel });
    };

    return (
        // <GestureHandlerRootView style={{ flex: 1 }}>
       <FlatList
        data ={users}
         renderItem={({item}) => <UserListItem user={item} onPress={startChannel} />}
       
       />
    //    {/* </GestureHandlerRootView> */}

    )
}
const styles = StyleSheet.create({
    t:{
        color:'white'
    }


})

export default UserListScreen;