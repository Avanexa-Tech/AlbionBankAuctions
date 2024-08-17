// LocalitySelectionModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const LocalitySelectionModal = ({ visible, localities, onSelectLocality, onClose }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>Select a Locality</Text>
          {localities.map((locality, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelectLocality(locality);
                onClose();
              }}
            >
              <Text>{locality}</Text>
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

export default LocalitySelectionModal;
