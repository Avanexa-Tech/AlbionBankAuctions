# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-ignorewarnings
-dontwarn android.os.ServiceManager*
-dontwarn com.bun.miitmdid.core.MdidSdkHelper*
-dontwarn com.bun.miitmdid.interfaces.IIdentifierListener*
-dontwarn com.bun.miitmdid.interfaces.IdSupplier*
-dontwarn com.google.firebase.iid.FirebaseInstanceId*
-dontwarn com.google.firebase.iid.InstanceIdResult*
-dontwarn com.huawei.hms.ads.identifier.AdvertisingIdClient$Info*
-dontwarn com.huawei.hms.ads.identifier.AdvertisingIdClient*
-dontwarn com.tencent.android.tpush.otherpush.OtherPushClient*
-keep class io.invertase.firebase.** { *; }
-dontwarn io.invertase.firebase.**

