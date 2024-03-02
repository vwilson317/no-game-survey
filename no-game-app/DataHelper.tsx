import AsyncStorage from 'react-native';
import _ from 'lodash';

  export const get = async (id: int): string => {
    let data = null;
    try {
      const response = await fetch('http://localhost:3000/api/questions');
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
      return 'blahhhh';
    }
  }

//   public async save() {
//     //await AsyncStorage.setItem('1', 'SomeQuestion')
//   }
// }

// export default DataHelper;