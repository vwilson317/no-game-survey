import AsyncStorage from 'react-native';
import _ from 'lodash';
import Config from 'react-native-config';
import { Platform } from 'react-native';

export const get = async (id: number): Promise<object> => {
  let data = null;
  try {
    // TODO: see if the plaform matters with this config value. Expo might take care of everything for us.
    // let configUrl: string | undefined = '';
    // if (Platform.OS === 'web') {
    //   configUrl = ;
    // } else {
    //   configUrl = Config.API_URL;
    // }
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/questionsets?recent`);
    data = await response.json();
    // await AsyncStorage.setItem('1', 'SomeQuestion')
    // const value = await AsyncStorage.getItem('1')

  } catch {
    /// error handeling
  }

  if (!_.isNil(data)) {
    return data;
  }
  else {
    return { Name: 'No questions found', questions: [] };
  }
}

export const getMenuItems = async (): Promise<object[]> => {
  let data = null;
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/questionsets`);
    data = await response.json();
  } catch {
  }
}

//   public async save() {
//     //await AsyncStorage.setItem('1', 'SomeQuestion')
//   }
// }

// export default DataHelper;