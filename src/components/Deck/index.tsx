import React, {ReactNode, useRef, useState} from 'react';
import {View, PanResponder, Animated} from 'react-native';
import {SCREEN_WIDTH} from '../../utils/metrics';

import {styles} from './styles';

// Constants
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.35;

interface DeckProps {
  data: ItemCard[];
  renderCard: (item: ItemCard) => ReactNode;
  onSwipeLeft: (card: ItemCard) => void;
  onSwipeRight: (card: ItemCard) => void;
  onFinishCards: () => ReactNode;
}

export const Deck = ({
  data,
  renderCard,
  onSwipeLeft,
  onSwipeRight,
  onFinishCards,
}: DeckProps) => {
  // States
  const [activeCard, setActiveCard] = useState<number>(0);

  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const {dx} = gesture;
      position.setValue({x: dx, y: 0});
    },
    onPanResponderRelease: (event, gesture) => {
      const {dx} = gesture;
      if (dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else {
        resetCardPosition();
      }
    },
  });
  const resetCardPosition = () => {
    Animated.spring(position, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  const forceSwipe = (direction: PossibleDirectionsSwipe) => {
    Animated.timing(position, {
      toValue: {
        x: direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0,
      },
      duration: 300,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: PossibleDirectionsSwipe) => {
    console.log('Active Card onSwipeComplete :: ', activeCard);
    const card = data[activeCard];
    direction === 'right' ? onSwipeRight(card) : onSwipeLeft(card);
    position.setValue({x: 0, y: 0});
    setActiveCard(activeCard + 1);
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
    if (activeCard >= data.length) {
      return onFinishCards();
    }
    return data.map((card, index) => {
      if (index < activeCard) {
        return null;
      }
      if (index === activeCard) {
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
  console.log('Active Card index :: ', activeCard);

  return <View style={styles.container}>{renderAllCards()}</View>;
};
