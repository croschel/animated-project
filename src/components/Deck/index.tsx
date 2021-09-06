import React, {ReactNode, useRef} from 'react';
import {View, PanResponder, Animated} from 'react-native';
import {SCREEN_WIDTH} from '../../utils/metrics';

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
        const {dx} = gesture;
        position.setValue({x: dx, y: 0});
      },
      onPanResponderRelease: () => {
        resetCardPosition();
      },
    }),
  ).current;

  const resetCardPosition = () => {
    Animated.spring(position, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyles = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [
        {
          rotate,
        },
      ],
    };
  };

  const renderAllCards = () => {
    return data.map((card, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={card.id}
            {...panResponder.panHandlers}
            style={[styles.container, getCardStyles()]}>
            {renderCard(card)}
          </Animated.View>
        );
      }
      return renderCard(card);
    });
  };

  return <View style={styles.container}>{renderAllCards()}</View>;
};
