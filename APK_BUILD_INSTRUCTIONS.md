# Building Android APK for Receipt Logs App

This guide will help you build an Android APK from your Next.js receipt submission app.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Android Studio** (latest version)
3. **Java JDK** (v17 or higher)
4. **Capacitor CLI**

## Setup Instructions

### 1. Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/camera
```

### 2. Export the Next.js App

```bash
npm run export
```

This creates a static build in the `out` directory.

### 3. Initialize Capacitor (First Time Only)

```bash
npx cap init
```

When prompted:
- App name: `Receipt Logs`
- App ID: `com.eatlowbrow.receiptlogs`
- Web asset directory: `out`

### 4. Add Android Platform

```bash
npx cap add android
```

### 5. Copy Web Assets to Native Project

```bash
npx cap copy android
```

### 6. Open Android Studio

```bash
npx cap open android
```

### 7. Build APK in Android Studio

1. Wait for Gradle sync to complete
2. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Wait for build to complete
4. Click "locate" in the notification to find your APK
5. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### 8. Install APK on Android Device

**Via USB:**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Or transfer the APK file to your phone and install manually**

## Development Workflow

When you make changes to your app:

```bash
# 1. Export the updated Next.js app
npm run export

# 2. Sync changes to native project
npx cap sync android

# 3. (Optional) Open in Android Studio to rebuild
npx cap open android
```

## App Permissions

The app has the following permissions configured:
- **INTERNET** - For submitting data to Google Sheets API
- **CAMERA** - For capturing receipt photos
- **READ_EXTERNAL_STORAGE** - For selecting files from gallery
- **WRITE_EXTERNAL_STORAGE** - For saving files

## Configuration Files

- `capacitor.config.json` - Capacitor configuration
- `android/app/src/main/AndroidManifest.xml` - Android permissions and settings
- `public/manifest.json` - PWA manifest for web app features

## Troubleshooting

**Build fails with Gradle errors:**
- Update Android Studio to the latest version
- Update Gradle wrapper: `./gradlew wrapper --gradle-version=8.2`

**Camera not working:**
- Check that camera permissions are enabled in device settings
- Verify AndroidManifest.xml has camera permissions

**App can't connect to internet:**
- Ensure `usesCleartextTraffic="true"` is set in AndroidManifest.xml
- Check that INTERNET permission is declared

**File upload not working:**
- Verify storage permissions in AndroidManifest.xml
- Check that the Google Apps Script API is publicly accessible

## Production Build

For a production-ready APK:

1. In Android Studio, go to **Build > Generate Signed Bundle / APK**
2. Select **APK**
3. Create or select your keystore
4. Choose **release** build variant
5. Sign and build

The release APK will be optimized and ready for distribution.

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Android Developer Guide](https://developer.android.com/studio/build)
