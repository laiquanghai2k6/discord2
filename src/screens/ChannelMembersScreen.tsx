import { View, Text ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import UserListItem from '../components/UserListItem';
const ChannelMembersScreen = () => {
    const [members, setMembers] = useState([]);
    const route = useRoute();
    const channel = route.params?.channel;


    const fetchMember = async () => {
        const response = await channel.queryMembers({});
        setMembers(response.members);
    }

    useEffect(() => {
        fetchMember()
    }, [channel]);
    return (
        <FlatList
            data={members}
            keyExtractor={(item)=>item.user_id}
            renderItem={({ item }) => (
            <UserListItem user={item.user} onPress={()=>{}} />
        )}

        />
    )
}

export default ChannelMembersScreen;