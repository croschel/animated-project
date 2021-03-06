/* eslint-disable react-native/no-inline-styles */
/*
  When we start to create some animation component we have to decide initialy whats kind of animation do we need...
  - Basically on RN we have two native options Layout Animations (easier animations) and Animated Module ( more custumized)
  After that we need to answer a simple three questions with animated module ->>
  1. Whats the current position of the animated element? -> (Value) -> Value and ValueXY
  2. How is the animation changing? (Types) -> Spring, Decay and Timing
  3. Apply the animation`s current position to an actual component. (Components) -> View, Text, Image...


 */
import React from 'react';
import {View, StatusBar, StyleSheet, SafeAreaView, Text} from 'react-native';
import {Card, Button} from 'react-native-elements';

import {Deck} from './src/components/Deck';
import {CARDS} from './src/mocks/cards';

const App = () => {
  const renderCard = (item: ItemCard) => {
    return (
      <Card key={item.id} containerStyle={{borderRadius: 16}}>
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

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>We don`t have more Cards</Card.Title>
        <Text style={{marginVertical: 16, textAlign: 'center'}}>
          There is no card to show!.
        </Text>
        <Button
          icon={{name: 'search'}}
          title="Get more!"
          buttonStyle={{backgroundColor: '#03A9F4'}}
        />
      </Card>
    );
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Deck
          data={CARDS}
          renderCard={renderCard}
          onSwipeLeft={() => {}}
          onSwipeRight={() => {}}
          onFinishCards={renderNoMoreCards}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});
