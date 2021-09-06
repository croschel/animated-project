import React, {ReactNode, useRef} from 'react';
import {View, PanResponder, Animated} from 'react-native';

import {styles} from './styles';

interface DeckProps {
  data: ItemCard[];
  renderCard: (item: ItemCard) => ReactNode;
}

export const Deck = ({data, renderCard}: DeckProps) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const {dx, dy} = gesture;
        position.setValue({x: dx, y: dy});
      },
      onPanResponderRelease: () => {},
    }),
  ).current;

  const renderAllCards = () => {
    return data.map(card => {
      return renderCard(card);
    });
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.container, position.getLayout()]}>
      {renderAllCards()}
    </Animated.View>
  );
};
