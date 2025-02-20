import { api } from './api';

const api_name = 'api/';
const aution_api_name = 'api/';
const aution_GeoLocation_api_name = 'api/';

export default {
  login: data => {
    let url = api_name + 'Login/login_with_otp';
    return api.postMethod(url, data);
  },
  verify_OTP: data => {
    let url = api_name + 'Login/verify_otp';
    return api.postMethod(url, data);
  },
  login_with_gmail: data => {
    let url = api_name + 'Login/login_with_gmail';
    return api.postMethod(url, data);
  },
  profile_otpVerify: data => {
    let url = api_name + 'login/contact_verify';
    return api.postMethod(url, data);
  },
  Properties: data => {
    let url = api_name + 'Properties/show?' + data;
    return api.getMethod(url, data);
  },
  delete_Properties: data => {
    let url = api_name + 'Properties/update';
    return api.putMethod(url, data);
  },
  FilterData: data => {
    let url = api_name + 'Properties/show?' + data;
    return api.getMethod(url, data);
  },
  get_property_count: data => {
    let url = api_name + 'Properties/get_property_count?' + data;
    return api.getMethod(url, data);
  },
  create: data => {
    let url = api_name + 'Properties/create';
    return api.postMethod(url, data);
  },
  wishlist: data => {
    let url = api_name + 'WishList/show?' + data;
    return api.getMethod(url, data);
  },
  add_to_wishlist: data => {
    let url = api_name + 'WishList/add_to_wishlist';
    return api.postMethod(url, data);
  },
  remove_to_wishlist: data => {
    let url = api_name + 'WishList/remove_from_wishlist';
    return api.postMethod(url, data);
  },
  Banner: data => {
    let url = api_name + 'Banner/show';
    return api.getMethod(url, data);
  },
  toggle_wishlist: data => {
    let url = api_name + 'WishList/toggle_wishlist';
    return api.postMethod(url, data);
  },
  Location: data => {
    let url = api_name + 'Location/getLocation?' + data;
    return api.getMethod(url, data);
  },
  location_suggestion: data => {
    let url = api_name + 'Properties/getSuggestions?' + data;
    return api.getMethod(url, data);
  },
  getLocationSuggestions: data => {
    let url = api_name + 'Location/getLocationSuggestions?' + data;
    return api.getMethod(url, data);
  },
  getSellerDetails: data => {
    let url = api_name + 'Contacted/contact_owner';
    return api.postMethod(url, data);
  },
  Contacted: data => {
    let url = api_name + 'Contacted/show?' + data;
    return api.getMethod(url, data);
  },
  report_issue: data => {
    let url = api_name + 'Reports/create';
    return api.postMethod(url, data);
  },
  save_profile: data => {
    let url = api_name + 'Profile/save_profile';
    return api.postMethod(url, data);
  },
  show_users: data => {
    let url = api_name + 'users/show?' + data;
    return api.getMethod(url, data);
  },
  add_image: data => {
    let url = api_name + 'Profile/add_profile_img';
    return api.postMethod(url, data);
  },
  users_with_preference: data => {
    let url = api_name + 'Users/users_with_preference?' + data;
    return api.getMethod(url, data);
  },
  Blogs: data => {
    let url = api_name + 'Blogs/show';
    return api.getMethod(url, data);
  },
  checkout: data => {
    let url = api_name + 'Payments/checkout';
    return api.postMethod(url, data);
  },
  getNotification: data => {
    let url = api_name + 'Notify/show?' + data;
    return api.getMethod(url, data);
  },
  updateNotification: data => {
    let url = api_name + 'Notify/update';
    return api.postMethod(url, data);
  },
  check_quota: data => {
    let url = api_name + 'Users/check_quota?' + data;
    return api.getMethod(url, data);
  },
  pay_plan: data => {
    let url = api_name + 'payments/pay?' + data;
    return api.postMethod(url, data);
  },
  check_plan: data => {
    let url = api_name + '/plans/show?' + data;
    return api.postMethod(url, data);
  },
  verify_pay: data => {
    let url = api_name + 'payments/pay?' + data;
    return api.postMethod(url, data);
  },
  deleteData: data => {
    let url = api_name + '/users/delete'
    return api.postMethod(url, data);
  },


  // Side menu's API
  homeLoan_Api: data => {
    let url = api_name + 'Forms/upload_form';
    return api.postMethod(url, data);
  },

  //Auctions
  Auction_login: data => {
    let url = aution_api_name + 'login/login';
    return api.AuctionpostMethod(url, data);
  },
  Auction_OTPlogin: data => {
    let url = aution_api_name + 'login/login_with_otp';
    return api.AuctionpostMethod(url, data);
  },
  Auction_VerifyOTP: data => {
    let url = aution_api_name + 'login/verify_otp';
    return api.AuctionpostMethod(url, data);
  },
  Auction: data => {
    let url = aution_api_name + 'auction/show?filter=upcoming';
    return api.AuctiongetMethod(url, data);
  },
  Recent_Auction: data => {
    let url = aution_api_name + 'auction/show?filter=recent';
    return api.AuctiongetMethod(url, data);
  },
  Similar_Auction: data => {
    let url = aution_api_name + `auction/show?district=${data.district}`;
    return api.AuctiongetMethod(url, data);
  },
  get_Auction: async (data) => {
    let url = aution_api_name + 'auction/show?' + data;
    console.log("fffffffffff",url);
    
    const response = await api.AuctiongetMethod(url, data);
    return response;
  },
  get_banks: data => {
    let url = aution_api_name + 'auction/get_banks';
    return api.AuctiongetMethod(url, data);
  },
  Auction_getState: data => {
    let url = aution_GeoLocation_api_name + 'location/getState';
    return api.Auction_geolocation_getMethod(url, data);
  },
  Auction_getDistrict: data => {
    let url = aution_GeoLocation_api_name + 'location/getCity?' + data;
    return api.Auction_geolocation_getMethod(url, data);
  },
  Auction_get_banners: data => {
    let url = aution_api_name + 'auction/get_banners';
    return api.AuctiongetMethod(url, data);
  },
  Auction_register: data => {
    let url = aution_api_name + 'login/register';
    return api.AuctionpostMethod(url, data);
  },
  Auction_forgot_password: data => {
    let url = aution_api_name + 'login/forgot_password';
    return api.AuctionpostMethod(url, data);
  },
  Auction_verify_user: data => {
    let url = aution_api_name + 'login/verify_user';
    return api.AuctionpostMethod(url, data);
  },
  Auction_update_password: data => {
    let url = aution_api_name + 'login/update_password';
    return api.AuctionpostMethod(url, data);
  },
  Auction_contact_verify: data => {
    let url = aution_api_name + 'login/contact_verify';
    return api.AuctionpostMethod(url, data);
  },
  Auction_add_interest: data => {
    let url = aution_api_name + 'auction/add_interest';
    return api.AuctionpostMethod(url, data);
  },
  Auction_remove_interest: data => {
    let url = aution_api_name + 'auction/remove_interest';
    return api.AuctionpostMethod(url, data);
  },
  Auction_check_interest: data => {
    let url = aution_api_name + 'auction/check_interest?' + data;
    return api.AuctiongetMethod(url, data);
  },
  Auction_interest_show: data => {
    let url = aution_api_name + 'auction/show?' + data;
    return api.AuctiongetMethod(url, data);
  },
  Auction_notify_properties: data => {
    let url = aution_api_name + 'auction/add_notify_properties';
    return api.AuctionpostMethod(url, data);
  },
  Auction_deleteData: data => {
    let url = aution_api_name + 'login/delete_user'
    return api.AuctionpostMethod(url, data);
  },
  Auction_eventBankData: data => {
    let url = aution_api_name + 'auction/show'
    return api.AuctionpostMethod(url, data);
  },
  Auction_feedbackData: data => {
    let url = aution_api_name + 'auction/feedback'
    return api.AuctionpostMethod(url, data);
  },
  Auction_plan_check_Data: data => {
    let url = aution_api_name + 'plan/check/' + data;
    return api.AuctiongetMethod(url, data);
  },
  Auction_contactData: data => {
    let url = aution_api_name + 'auction/contact_us'
    return api.AuctionpostMethod(url, data);
  },
  Auction_verify_pay: (data, header) => {
    let url = api_name + 'plan/verify';
    return api.postMethod(url, data, header);
  },
  Auction_requestProperty: (data, header) => {
    let url = api_name + 'auction/request-property';
    return api.postMethod(url, data, header);
  },
  Auction_Notifylist :(data)=>{
    let url = aution_api_name + `auction/get-notify/${data}`;    
    return api.getMethod(url);
  },
  loginWithEmail :(data)=>{
    let url = aution_api_name + `login/login`;
    return api.postMethod(url, data);
  },
  DeleteNotify:(data)=>{
    let url = aution_api_name + `auction/delete-notify/${data}`
    return api.deleteMethod(url);
  },
  fetchAuction: (param) => {
    let url = aution_api_name + `auction/show?${param}`
    console.log("url",url);
    
    return api.getMethod(url)
  },
  Auction_Logout_Api:(data)=>{
    let url = `${aution_api_name}login/logout/${data}`;
    console.log("url",url);
    return api.getMethod(url)
  }
};
