import { View, Text ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute,useNavigation } from '@react-navigation/native';
import UserListItem from '../components/UserListItem';
import Button from '../components/Button';
import InviteMembersScreen from './InviteMembersScreen';

const ChannelMembersScreen = () => {
    const [members, setMembers] = useState([]);
    const route = useRoute();
    const navigation = useNavigation();
    const channel = route.params.channel;


    const fetchMember = async () => {
        const response = await channel.queryMembers({});
        setMembers(response.members);
    };

    useEffect(() => {
        fetchMember()
    }, [channel]);
    return (
        <FlatList
        data={members}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => (
          <UserListItem user={item.user} onPress={() => {}} />
        )}
        ListHeaderComponent={() => (
          <Button
            title="Invite members"
            onPress={() => {
              navigation.navigate("InviteMembers", { channel });
            }}
          />
        )}
      />
    )
}

export default ChannelMembersScreen;