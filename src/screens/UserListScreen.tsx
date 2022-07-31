import {View,Text,StyleSheet, FlatList} from 'react-native';
import React from 'react';
import { useEffect,useState } from 'react';
import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import { useChatContext } from 'stream-chat-expo';
import UserListItem from '../components/UserListItem';
const UserListScreen = () =>{
    const {client} = useChatContext();
    const [users,setUsers] = useState([])
    const fetchUser = async () =>
    {
        const response = await client.queryUsers({})
        setUsers(response.users);
    }

    useEffect(()=>{
        fetchUser();
    },[])

    const startChannel = () =>{
        const channel = client.channel("messaging",{
            members:["",""],
            
        });
        await channel.create();
    };

    return (
       <FlatList
        data ={users}
         renderItem={({item}) => <UserListItem user={item} onPress={startChannel} />}
       
       />

    )
}
const styles = StyleSheet.create({
    t:{
        color:'white'
    }


})

export default UserListScreen;