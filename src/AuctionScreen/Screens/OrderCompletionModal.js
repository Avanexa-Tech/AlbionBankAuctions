import { useNavigation } from '@react-navigation/native';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPayCancelVisible, setPaySuccessVisible } from '../../Redux';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LottieCancelled, LottieCheck } from '../../Components/Lottie';
import Color from '../../Config/Color';
import { Poppins } from '../../Global/FontFamily';

const PostCompletedModal = ({ }) => {
  const orderSuccessModal = useSelector(
    state => state.PayReducer.PaySuccessVisible,
  );
  const orderCancelVisible = useSelector(
    state => state.PayReducer.PayCancelVisible,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Modal
      transparent={true}
      visible={orderSuccessModal ? orderSuccessModal : orderCancelVisible}
      animationType={'fade'}>
      <View style={styles.OrderModalContainer}>
        <View style={styles.orderView}>
          {/* <TouchableOpacity
            style={styles.closeModal}
            onPress={() => {
              if (orderSuccessModal) {
                dispatch(setPaySuccessVisible(false));
              } else {
                dispatch(setPayCancelVisible(false));
              }
            }}>
            <MCIcon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity> */}
          {orderSuccessModal ? <LottieCheck /> : <LottieCancelled />}
          <Text style={styles.orderStatus}>
            {orderSuccessModal
              ? 'Plan Purchase Successful !'
              : 'Plan Cancelled'}
          </Text>
          <Text style={styles.orderModalMsg}>
            {orderSuccessModal
              ? 'Thank you for your purchase'
              : 'Your Plan has been cancelled, You want to try again'}
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              borderRadius: 5,
              backgroundColor: Color.primary,
              borderColor: Color.lightgrey,
              borderWidth: 1,
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              dispatch(setPayCancelVisible(false));
              dispatch(setPaySuccessVisible(false));
              navigation.navigate('ActionHome');
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Poppins.Bold,
                textAlign: 'center',
                color: Color.white,
              }}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PostCompletedModal;

const styles = StyleSheet.create({
  OrderModalContainer: {
    backgroundColor: Color.transparantBlack,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  orderView: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: Color.white,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  closeModal: { position: 'absolute', right: 10, top: 10 },
  orderStatus: {
    fontSize: 20,
    fontFamily: Poppins.Bold,
    textAlign: 'center',
    color: Color.black,
  },
  orderModalMsg: {
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
    textAlign: 'center',
    marginVertical: 20,
    color: Color.cloudyGrey,
    textTransform: 'capitalize',
  },
  OrderModalButton: {
    backgroundColor: Color.primary,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
