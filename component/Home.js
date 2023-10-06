
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Image,ScrollView } from 'react-native';
import userData from './data.json'; // Import user data
import SelectDropdown from 'react-native-select-dropdown';

const Home = ({navigation}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    domain: '',
    gender: '',
    availability: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [paginatedData, setPaginatedData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  useEffect(() => {
    // Apply filters and search query to user data
    let filteredData = userData.filter((user) => {
      const nameMatch = user.first_name.toLowerCase().includes(searchQuery.toLowerCase());
      const domainMatch = !filters.domain || user.domain === filters.domain;
      const genderMatch = !filters.gender || user.gender === filters.gender;
      const availabilityMatch = !filters.availability || user.availability === filters.availability;
      return nameMatch && domainMatch && genderMatch && availabilityMatch;
    });

    // Calculate the number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Update current page if it exceeds the total pages
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    filteredData = filteredData.slice(startIndex, endIndex);

    setPaginatedData(filteredData);
  }, [searchQuery, filters, currentPage]);

  // Handle pagination
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Function to add a user to the team
  const addToTeam = (user) => {
    setSelectedUsers([...selectedUsers, user]);
  };
  // Function to add a user to the team
  // const addToTeam = () => {
  //   // Filter selected users by unique domains
  //   const uniqueDomains = [...new Set(selectedUsers.map((user) => user.domain))];
  //   const uniqueUsersByDomain = selectedUsers.filter((user) => {
  //     const count = uniqueDomains.filter((domain) => domain === user.domain).length;
  //     return count === 1; // Include users from domains that appear only once
  //   });

  //   setTeam(uniqueUsersByDomain);
  // };

  // Render user card component
  const renderUserCard = ({ item }) => (
    <View style={styles.box}>
      <View style={styles.inner}>
        <Image
          source={{ uri: item.avatar }} // Set the image source to the avatar URL
          style={{ width: 100, height: 60 }} // Set the width and height of the image
        />
        <Text style={styles.text}>Full Name: {item.first_name} {item.last_name} </Text>
        <Text style={styles.text}>Email: {item.email}</Text>
        <Text style={styles.text}>Domain: {item.domain}</Text>
        <Text style={styles.text}>Gender: {item.gender}</Text>
        <Text style={styles.text}>Availability: {item.available ? 'true' : 'false'}</Text>
        
        <Button  title="Add To Team" onPress={() => addToTeam(item)}
          disabled={!item.available} 
        />
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by Name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {/* Filter components */}
      <View style={styles.filter}>
        <View style={styles.domain}>
          <SelectDropdown
            data={[
              'Marketing',
              'Sales',
              'Finance',
              'IT',
              'Management',
              'UI Designing',
              'Business Development',

            ]}
            onSelect={(selectedItem) => setFilters({ ...filters, domain: selectedItem })}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            defaultButtonText="Domains"
            rowTextForSelection={(item, index) => {

              return item;
            }}
            buttonStyle={{
              backgroundColor: 'lightblue',
              borderRadius: 20,
              marginLeft: 15,
              marginRight: 5
            }}
            dropdownStyle={{
              backgroundColor: 'lightblue',
            }}

          />
        </View>
        <View style={styles.gender}>
          <SelectDropdown
            data={[
              'Male',
              'Female'
            ]}
            onSelect={(selectedItem) => setFilters({ ...filters, gender: selectedItem })}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            defaultButtonText="Gender"
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{
              backgroundColor: 'lightblue',
              borderRadius: 20,
              width: '100%'
            }}
            dropdownStyle={{
              backgroundColor: 'lightblue',
            }}
          />
        </View>

      </View>


      {/* User card list */}
      <ScrollView style={styles.userListContainer}>
      <FlatList
        data={paginatedData}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id.toString()}
      />
      </ScrollView>

      <View style={styles.mainButton}>
        <View style={styles.button}>
          {currentPage > 1 && (
            <Button title="Previous Page" onPress={handlePreviousPage} color={'red'} />
          )}
        </View>
        <View style={styles.button}>
          {currentPage * itemsPerPage < userData.length && (
            <Button title="Next Page" onPress={handleNextPage} color={'purple'} />
          )}
        </View>
      </View>
    {/* View Team Details button */}
    <View style={{marginBottom:20,marginLeft:5,marginRight:10}}>
    <Button
        title="View Team Details"
        onPress={() => navigation.navigate('TeamDetails', { team: selectedUsers })}
        color={'red'}
      />
    </View>
    
      {/* <View style={styles.teamContainer}>
        <Button title="Add To Team" onPress={addToTeam} />
        <Text style={styles.teamTitle}>Team Members:</Text>
        {team.map((user) => (
          <Text key={user.id} style={styles.teamMember}>{user.first_name} {user.last_name} - {user.domain}</Text>
        ))}
      </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    // backgroundColor:'pink',
    width: '100%',
    height: '100%',

  },
  box: {
    margin: 5,
    backgroundColor: '#e802d5',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '75%',
    padding: 2,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  inner: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    marginRight: 10,
    width: '45%',
  },
  mainButton: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    margin: 12,
    padding: 10,
    borderRadius: 25,
  },
  filter: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 5
  },
  gender: {
    marginRight: 20,
    width: '45%'
  },
  teamContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  teamMember: {
    fontSize: 16,
    marginBottom: 5,
  },
  userListContainer: {
    flex: 1, // Allow the user list to take up available space
  }
})

export default Home;

