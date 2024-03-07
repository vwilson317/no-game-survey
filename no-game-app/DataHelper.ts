import AsyncStorage from 'react-native';
import _ from 'lodash';
import Config from 'react-native-config';
import { Platform } from 'react-native';
import { QuestionSet } from './QuestionSet';
import { Question } from './question';

export const get = async (id: number | null = null): Promise<QuestionSet> => {
  let data = null;
  try {
    // TODO: see if the plaform matters with this config value. Expo might take care of everything for us.
    // let configUrl: string | undefined = '';
    // if (Platform.OS === 'web') {
    //   configUrl = ;
    // } else {
    //   configUrl = Config.API_URL;
    // }
    if (id) {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/questionsets/${id}`);
      data = await response.json();
    } else {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/questionsets?recent`);
      data = await response.json();
    }
    // await AsyncStorage.setItem('1', 'SomeQuestion')
    // const value = await AsyncStorage.getItem('1')

  } catch {
    /// error handeling
  }

  if (!_.isNil(data)) {
    return data;
  }
  else {
    return { Name: 'No question sets found' } as QuestionSet;
  }
}

export const getMenuItems = async (): Promise<object[]> => {
  let data = null;
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/questionsets`);
    data = await response.json();
  } catch {
  }

  return data;
}

export const saveQuestion = async (id: number, x: Question): Promise<Question> => {
  const date = new Date().toUTCString();
  const body = {
    ...x,
    UpdateUtc: date,
    CreateUtc: date
  };

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/questionsets/${id}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return data;
}

//   public async save() {
//     //await AsyncStorage.setItem('1', 'SomeQuestion')
//   }
// }

// export default DataHelper;