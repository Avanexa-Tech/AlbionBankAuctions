import React, {useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const MapContainer = ({location}) => {
  const mapRef = useRef();

  if (!location || !location.latitude || !location.longitude) {
    return <ActivityIndicator size="large" />;
  }

  const GOOGLE_MAP_KEY = 'AIzaSyBaclFXXGbKWdfL9A-MN6D0yj5OzU50q6U';
  return (
    <View style={styles.container}>
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: 200,
        }}
        ref={mapRef}
        apikey={GOOGLE_MAP_KEY}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
  },
});
