// CitySelectionModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const CitySelectionModal = ({ visible, cities, onSelectCity, onClose }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>Select a City</Text>
          {cities.map((city, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelectCity(city);
                onClose();
              }}
            >
              <Text>{city}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CitySelectionModal;
