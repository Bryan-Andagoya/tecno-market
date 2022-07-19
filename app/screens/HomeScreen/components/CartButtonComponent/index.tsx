import { TouchableOpacity } from 'react-native';
import React from 'react';
import { ShoppingCartFA5Icon } from 'app/icons';

export const CartButtonComponent = () => {
  return (
    <TouchableOpacity onPress={() => console.log('cart')}>
      <ShoppingCartFA5Icon size={20} />
    </TouchableOpacity>
  );
};
