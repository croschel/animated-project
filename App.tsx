/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, StyleSheet, SafeAreaView, Text} from 'react-native';
import {Card, Button} from 'react-native-elements';

import {Deck} from './src/components/Deck';
import {CARDS} from './src/mocks/cards';

const App = () => {
  const renderCard = (item: ItemCard) => {
    // return <Text>{item.text}</Text>;
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image source={{uri: item.uri}} />
        <Text style={{marginVertical: 16}}>I can customize this further.</Text>
        <Button
          icon={{name: 'code'}}
          title="View now!"
          buttonStyle={{backgroundColor: '#03A9F4'}}
        />
      </Card>
    );
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Deck data={CARDS} renderCard={renderCard} />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
