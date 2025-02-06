import React, { useEffect, useState } from 'react';
import {
  LogBox,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
  BackHandler,
} from 'react-native';
import { NavigationContainer, useNavigation, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import Color from './Config/Color';
import SplashScreen from './Splash';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Store from './Redux/Store';
import Icon from 'react-native-vector-icons/Ionicons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider as PaperProvider } from 'react-native-paper';
import OnboardingScreen2 from './Screens/Onboarding/OnboardingScreen2';
import { Poppins } from './Global/FontFamily';
import ActionSelect from './ActionSelect';
import LoginScreen from './AuctionScreen/Auth/Login';
import Register from './AuctionScreen/Auth/Register';
import HomeScreen from './AuctionScreen/Screens/HomeScreen';
import { NavigationDrawerStructure } from './Components/Nav/NavDrawer';
import LogoTitle from './Components/LogoTitle';
import ListScreen from './AuctionScreen/Screens/ListScreen';
import ActionSingleProperty from './AuctionScreen/Screens/ActionSingleProperty';
import CategoriesList from './AuctionScreen/Screens/CategoriesList';
import AuctionSearchScreen from './AuctionScreen/Screens/AuctionSearchScreen';
import { Linking } from 'react-native';
import AuctionOTPScreen from './AuctionScreen/Auth/OTPScreen';
import ForgotPassword from './AuctionScreen/Auth/ForgotPassword';
import NumberVerify from './AuctionScreen/Auth/NumberVerify';
import UpdatePassword from './AuctionScreen/Auth/UpdatePassword';

import AuctionAboutUs from './AuctionScreen/Screens/SideMenu/AuctionAboutUs';
import AuctionContactUs from './AuctionScreen/Screens/SideMenu/AuctionContactUs';
import AuctionFAQs from './AuctionScreen/Screens/SideMenu/AuctionFAQs';
import AuctionNotificationList from './AuctionScreen/Screens/SideMenu/AuctionNotificationList';
import AuctionNotifyProperties from './AuctionScreen/Screens/SideMenu/AuctionNotifyProperties';
import InterestedProperties from './AuctionScreen/Screens/SideMenu/InterestedProperties';
import AdvanceSearch from './AuctionScreen/Screens/SideMenu/AdvanceSearch';
import AuctionProfile from './AuctionScreen/Screens/profile/AuctionProfile';
import ChangePassword from './AuctionScreen/Auth/ChangePassword';
import AuctionPrivacyPolicy from './AuctionScreen/Screens/SideMenu/AuctionPrivacyPolicy';
import AuctionTermsConditions from './AuctionScreen/Screens/SideMenu/AuctionTermsConditions';
import { navigate, navigationRef } from '../RootNavigation';
import { setAuctionSort } from './Redux';
import { Divider } from 'react-native-elements';
import { Modal } from 'react-native';
import { Text } from 'react-native';
import AlbionPrime from './AuctionScreen/Screens/AuctionPrime';
import SubscriptionDetails from './AuctionScreen/Screens/SubscriptionDetails';
import AuctionPrime from './AuctionScreen/Screens/AuctionPrime';
import FeedbackRatings from './AuctionScreen/Screens/SideMenu/FeedbackRatings';
import AuctionEditProfile from './AuctionScreen/Screens/profile/AuctionEditProfile';
import InvoiceList from './AuctionScreen/Screens/SideMenu/InvoiceList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const linking = {
    prefixes: ['albion://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'home',
        },
        SingleProperty: {
          path: 'review/:p_id',
        },
      },
    },
  };

  useEffect(() => {
    const handleInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const reviewMatch = initialUrl.match(/\/review\/(\d+)/);
        if (reviewMatch) {
          const p_id = reviewMatch[1];
          navigationRef.current?.navigate('SingleProperty', { p_id });
        }
      }
    };

    handleInitialUrl();
  }, []);

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const reviewMatch = url.match(/\/review\/(\d+)/);
      if (reviewMatch) {
        const p_id = reviewMatch[1];
        navigationRef.current?.navigate('SingleProperty', { p_id });
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{ swipeEnabled: false }}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <MyDrawer />
    </Provider>
  );
};

const MainApp = () => {
  const [sortVisible, setSortVisible] = useState(false);
  const [height, setHeight] = useState(undefined);
  const dispatch = useDispatch();
  const [sortData] = useState([
    { id: 1, label: 'Newest', value: 'created_at', order: 'desc' },
    { id: 2, label: 'Recent', value: 'created_at', order: 'asc' },
    {
      id: 3,
      label: 'Reserve Price (High to Low)',
      value: 'reserve_price',
      order: 'desc',
    },
    {
      id: 4,
      label: 'Reserve Price (Low to High)',
      value: 'reserve_price',
      order: 'asc',
    },
  ]);
  const navigation = useNavigation();
  const currentRoute = useNavigationState(state => state?.routes[state.index]?.name);

  useEffect(() => {
    const backAction = () => {
      if (currentRoute === 'ActionHome') { // Run only on ActionHome
        Alert.alert(
          'Hold on!',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', onPress: () => navigation.goBack(), style: 'cancel' },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true; // Prevent default back action
      }
      return false; // Let other screens use default back behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [currentRoute, navigation]); // Re-run effect when screen changes

  return (
    <>
      <StatusBar backgroundColor={Color.primary} />
      {/* <ForegroundHandler /> */}
      <Stack.Navigator initialRouteName="Splash">
        {/* Property Screens */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingScreen2"
          component={OnboardingScreen2}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ActionSelect"
          component={ActionSelect}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ActionLogin"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ActionRegister"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({ navigation, route }) => ({
            headerTitle: '',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.white },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.primary}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="NumberVerify"
          component={NumberVerify}
          options={({ navigation, route }) => ({
            headerTitle: '',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.white },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.primary}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="updatepassword"
          component={UpdatePassword}
          options={({ navigation, route }) => ({
            headerTitle: '',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.white },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.primary}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ActionHome"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: props => <LogoTitle {...props} />,
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: Color.primary, elevation: 0 },
            headerLeft: () => (
              <NavigationDrawerStructure navigation={navigation} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginEnd: 10 }}
                onPress={() => {
                  navigation.navigate('AuctionProfile');
                }}>
                <FontAwesome name="user" size={25} color={Color.white} />
              </TouchableOpacity>
            ),
            headerRightContainerStyle: { right: 10 },
          })}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={({ navigation, route }) => ({
            headerTitle: 'Auction List',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
            // headerRight: () => (
            //   <View
            //     style={{
            //       marginHorizontal: 10,
            //       marginRight: 20,
            //       alignItems: 'flex-end',
            //     }}>
            //     <F5Icon
            //       name="sort-amount-down-alt"
            //       style={{ width: '100%' }}
            //       size={20}
            //       color={Color.white}
            //       onPress={() => {
            //         setSortVisible(true);
            //       }}
            //     />
            //     <Modal
            //       transparent={true}
            //       visible={sortVisible}
            //       animationType="fade">
            //       <View
            //         style={{
            //           flex: 1,
            //           backgroundColor: Color.transparantBlack,
            //         }}>
            //         <Pressable
            //           style={{ flex: 1 }}
            //           onPress={() => {
            //             setSortVisible(false);
            //           }}
            //         />
            //         <View
            //           style={{
            //             backgroundColor: Color.white,
            //             height: height,
            //             padding: 10,
            //             borderTopRightRadius: 30,
            //             borderTopLeftRadius: 30,
            //           }}>
            //           <Text
            //             style={{
            //               fontSize: 18,
            //               color: Color.cloudyGrey,
            //               fontWeight: 'bold',
            //               marginVertical: 10,
            //             }}>
            //             Select Your Sort Method
            //           </Text>
            //           <Divider style={{ height: 1, marginVertical: 10 }} />
            //           <View
            //             style={{
            //               marginHorizontal: 20,
            //             }}>
            //             {sortData?.map((item, index) => {
            //               console.log("item ===============:", item);

            //               return (
            //                 <TouchableOpacity
            //                   key={index}
            //                   style={{}}
            //                   onPress={() => {
            //                     dispatch(setAuctionSort(item));
            //                     setSortVisible(false);
            //                   }}>
            //                   <Text
            //                     style={{
            //                       color: Color.black,
            //                       fontSize: 16,
            //                       fontFamily: Poppins.Medium,
            //                     }}>
            //                     {item?.label}
            //                   </Text>
            //                   {index < sortData?.length - 1 && (
            //                     <Divider
            //                       style={{ height: 1, marginVertical: 10 }}
            //                     />
            //                   )}
            //                 </TouchableOpacity>
            //               );
            //             })}
            //           </View>
            //         </View>
            //       </View>
            //     </Modal>
            //   </View>
            // ),
          })}
        />
        <Stack.Screen
          name="ActionSingleProperty"
          component={ActionSingleProperty}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoriesList"
          component={CategoriesList}
          options={({ navigation, route }) => ({
            headerTitle: 'Categories List',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionSearchScreen"
          component={AuctionSearchScreen}
          options={({ navigation, route }) => ({
            headerTitle: 'Search',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionOTPScreen"
          component={AuctionOTPScreen}
          options={({ navigation, route }) => ({
            headerTitle: 'Enter OTP',
            headerTitleStyle: { color: Color.white, paddingHorizontal: 20 },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: null,
            // headerLeft: () => (
            //   <View style={{ marginHorizontal: 10 }}>
            //     <Icon
            //       name="arrow-back"
            //       size={30}
            //       color={Color.white}
            //       onPress={() => navigation.goBack()}
            //     />
            //   </View>
            // ),
          })}
        />
        <Stack.Screen
          name="AuctionAboutUs"
          component={AuctionAboutUs}
          options={({ navigation, route }) => ({
            headerTitle: 'About Us',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionContactUs"
          component={AuctionContactUs}
          options={({ navigation, route }) => ({
            headerTitle: 'Contact Us',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionFAQs"
          component={AuctionFAQs}
          options={({ navigation, route }) => ({
            headerTitle: 'FAQs',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="FeedbackRatings"
          component={FeedbackRatings}
          options={({ navigation, route }) => ({
            headerTitle: 'Feedback & Ratings',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionNotificationList"
          component={AuctionNotificationList}
          options={({ navigation, route }) => ({
            headerTitle: 'Notification List',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionPrime"
          component={AuctionPrime}
          options={({ navigation, route }) => ({
            headerTitle: 'Auction Prime ',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionNotifyProperties"
          component={AuctionNotifyProperties}
          options={({ navigation, route }) => ({
            headerTitle: 'Notify Property ',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="SubscriptionDetails"
          component={SubscriptionDetails}
          options={({ navigation, route }) => ({
            headerTitle: 'Subscription Details',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="InterestedProperties"
          component={InterestedProperties}
          options={({ navigation, route }) => ({
            headerTitle: 'Interested Properties',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AdvanceSearch"
          component={AdvanceSearch}
          options={({ navigation, route }) => ({
            headerTitle: 'Advanced Search',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="InvoiceList"
          component={InvoiceList}
          options={({ navigation, route }) => ({
            headerTitle: 'Invoice List',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionProfile"
          component={AuctionProfile}
          options={({ navigation, route }) => ({
            headerTitle: 'Your Auction Profile',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionEditProfile"
          component={AuctionEditProfile}
          options={({ navigation, route }) => ({
            headerTitle: 'Edit Profile',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionPrivacyPolicy"
          component={AuctionPrivacyPolicy}
          options={({ navigation, route }) => ({
            headerTitle: 'Privacy Policy',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionTermsConditions"
          component={AuctionTermsConditions}
          options={({ navigation, route }) => ({
            headerTitle: 'Terms & Conditions',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={({ navigation, route }) => ({
            headerTitle: 'Change Password',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
