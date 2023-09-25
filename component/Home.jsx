
import React, { useState, useEffect, version } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Image } from 'react-native';
import userData from './data.json'; // Import user data
import SelectDropdown from 'react-native-select-dropdown';
const Home = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    domain: '',
    gender: '',
    availability: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [paginatedData, setPaginatedData] = useState([]);
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

  // Render user card component
  const renderUserCard = ({ item }) => (
    <View style={styles.box}>
      <View style={styles.inner}>
       
        <Text style={styles.text}>First Name: {item.first_name}</Text>
        <Text style={styles.text}>Last Name: {item.last_name}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
        <Text style={styles.text}>Domain: {item.domain}</Text>
        <Text style={styles.text}>Gender: {item.gender}</Text>
        <Text style={styles.text}>Availability: {item.available ? 'true' : 'false'}</Text>
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
              borderRadius:20,
              marginLeft:15,
              marginRight:5
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
            borderRadius:20,
            width:'100%'
          }}
          dropdownStyle={{
            backgroundColor: 'lightblue', 
          }}
        />  
          </View>
          
      </View>


      {/* User card list */}
      <FlatList
        data={paginatedData}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.mainButton}>
        <View style={styles.button}>
        {currentPage > 1 && (
        <Button title="Previous Page" onPress={handlePreviousPage} color={'red'}/>
      )}
        </View>
        <View style={styles.button}>
        {currentPage * itemsPerPage < userData.length && (
        <Button title="Next Page" onPress={handleNextPage}color={'purple'} />
      )}
        </View>
      </View>
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
    backgroundColor: 'green',
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
    width:'90%',
    marginBottom:5
  },
  domain:{
    
   
  },
  gender:{
    marginRight:20,
    width:'45%'
  }
})

export default Home;

