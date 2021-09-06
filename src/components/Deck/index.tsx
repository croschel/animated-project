import React, {ReactNode} from 'react';
// import {Card, Button} from 'react-native-elements';
import {View} from 'react-native';

import {styles} from './styles';

interface DeckProps {
  data: ItemCard[];
  renderCard: (item: ItemCard) => ReactNode;
}

export const Deck = ({data, renderCard}: DeckProps) => {
  const renderAllCards = () => {
    return data.map(card => {
      return renderCard(card);
    });
  };

  return <View style={styles.container}>{renderAllCards()}</View>;
};
