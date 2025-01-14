import AsyncStorage from '@react-native-async-storage/async-storage';

namespace Storage {
    export async function saveData(data : string) {
        try {
          await AsyncStorage.setItem('user-alarms', data);
          console.log('Data saved successfully!');
        } catch (error) {
          console.error('Error saving data:', error);
        }
    };
    
    export async function getData() : Promise<string | undefined> {
        try {
            const value = await AsyncStorage.getItem('user-alarms');
            if (value !== null) {
                return value; 
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };
}

export default Storage;

