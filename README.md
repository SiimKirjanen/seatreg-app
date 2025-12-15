# SeatReg companion app

Mobile and web companion app for [SeatReg WordPress plugin](https://wordpress.org/plugins/seatreg/). Available at Google Play Store: https://play.google.com/store/apps/details?id=com.seatreg&hl=en

## Installation

1. Clone the repository
2. Run `npm ci`

## Development mobile

1. Start the development server with `npm run start`
2. Use Expo Go mobile app for development

## Development web

1. Start the development server with `npm run web:dev`
2. Open in web browser

## Testing manually Android build

1. `build:android:preview`
2. Go to expo.dev and wain until .APK is generated
3. Open the .APK in Android phone

## Android Deployment

1. For building a ready-to-submit binary use [EAS Build](https://docs.expo.dev/)
2. Bump `expo.version` and `expo.android.versionCode`
3. `npm run build:android` to start the build for Android
4. Monitor the build process at [expo.dev](https://expo.dev/accounts/[account]/projects/[project]/builds)
5. Manually upload result to Google Play

## Web Deployment
1. `build:web`
