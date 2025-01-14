import { Platform, NativeModules } from 'react-native';

export function useTimeFormat() {
    if (Platform.OS === 'android') {
        try {
            const { AndroidDateTimeFormat } = NativeModules;
            return AndroidDateTimeFormat.getTimeFormat();
        } catch (error) {
            console.warn('Error getting time format on Android:', error);
            return 'standard'; 
        }
    } else if (Platform.OS === 'ios') {
        // iOS doesn't have a direct API for getting the time format.
        // You can try to infer it from the user's locale:
        const locale = Intl.DateTimeFormat().resolvedOptions().locale;
        // Use locale to determine time format (e.g., 24-hour vs. 12-hour)
        // This might require some logic based on common locale conventions.
        // For example, you could check if the locale is generally associated with 24-hour time.
        // This is an approximation and might not be 100% accurate.

        // Example: (This is a simplified example and might not be accurate for all locales)
        const is24Hour = locale.includes('en-US') || locale.includes('en-GB'); 
        return is24Hour ? 'military' : 'standard'; 
    } else {
        console.warn('Unsupported platform.');
        return 'standard';
    }
}