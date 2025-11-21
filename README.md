# seatreg-app

Mobile companion app for SeatReg WordPress plugin. Available at Google Play Store: https://play.google.com/store/apps/details?id=com.seatreg&hl=en&pli=1

## Installation

1. Clone the repository
2. Run `npm ci`

## Development

1. Start the development server with `npm run start`
2. Use Expo Go mobile app for development

## Testing build

1. `build:android:preview`
2. Go to expo.dev and wain until .APK is generated
3. Open the .APK in Android phone

## Deployment

1. For building a ready-to-submit binary use [EAS Build](https://docs.expo.dev/)
2. Bump `expo.version` and `expo.android.versionCode`
3. `npm run build:android` to start the build for Android
4. Monitor the build process at [expo.dev](https://expo.dev/accounts/[account]/projects/[project]/builds)
5. Manually upload result to Google Play
