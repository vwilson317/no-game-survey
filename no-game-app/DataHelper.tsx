import AsyncStorage from 'react-native';
import _ from 'lodash';

export class DataHelper {

  constructor() {

  }

  public async get(id: int): promise<string> {
    try {
      debugger 
      const response = await fetch('http://localhost:3000/api/questions')
      const data = response.json();
      // await AsyncStorage.setItem('1', 'SomeQuestion')

      // const value = await AsyncStorage.getItem('1')
      debugger
      if (!_.isNil(data)) {
        return data;
      }
      else {
        return '';
      }
    } catch {
      /// error handeling
    }
  }

  public async save() {
    //await AsyncStorage.setItem('1', 'SomeQuestion')
  }
}

// export default DataHelper;