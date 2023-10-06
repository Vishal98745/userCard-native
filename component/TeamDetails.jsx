import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TeamDetails = ({ route }) => {
  const { team } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Team Details</Text>
      <FlatList
        data={team}
        renderItem={({ item }) => (
          <View style={styles.member}>
             <View style={styles.content}>
            <Text style={styles.detail}>First Name </Text>
             <Text style={styles.memberName}>
              :-    {item.first_name} {item.last_name}
            </Text>
             </View>
            <View style={styles.content}>
              <Text style={styles.domain} >Domain</Text>
            <Text style={styles.memberDomain}>:-    {item.domain}</Text>
            </View>
            
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center',
    color:'purple',
    textDecorationLine:'underline'
  },
  member: {
    marginBottom: 12, 
  },
  memberName: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
  },
  memberDomain: {
    fontSize: 24,
    color:'black',
    fontWeight: 'bold'
  },
  content:{
    flex:1,
    flexDirection:'row'
  },
  detail:{
   fontWeight:'bold',
   color:'black', 
   fontSize:24, 
   marginRight:10
  },
   domain:{
    fontWeight:'bold',
    color:'black', 
    fontSize:24, 
    marginRight:50
   }
});

export default TeamDetails;
