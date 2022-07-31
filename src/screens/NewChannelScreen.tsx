import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Button from '../components/Button';
import { useState } from 'react';
import { useChatContext } from 'stream-chat-expo';
import {v4 as uuidv4} from 'uuid'
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
const NewChannelScreen = () => {

    const {client} = useChatContext();    
    const {userId} = useAuthContext();
    const [name,setName] = useState("");
    const navigation = useNavigation();
    const createChannel = async () => {
        const channel = client.channel("team",uuidv4() , {name})
        await channel.create()
        await channel.addMembers([userId]);
        navigation.navigate("ChannelScreen",{channel});
     };
    return (
        <View style={styles.root}>
            <TextInput
             placeholder='Channel Name' style={styles.input}
                placeholderTextColor="lightgray"
                value={name}
                onChangeText={setName}
                
            />
            <Button title='Create Channel'
                onPress={createChannel}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    root: {
        padding: 10,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        padding:10,
        borderRadius:5,
        marginHorizontal:10,
        color: 'white'
    }
})

export default NewChannelScreen;