import AsyncStorage from 'react-native';
import _ from 'lodash';

export class DataHelper {

    constructor(){

    }

    public async get(id: int): promise<string>{
        try {
            debugger
       //await AsyncStorage.setItem('1', 'SomeQuestion')

          const value = "some data";// await AsyncStorage.getItem('1')
          if(!_.isNil(value)){
            return value;
          }
          else{
            return "BAHAHAHA";
          }
        } catch{
          debugger
            /// error handeling
        }
    }

    public async save(){
       //await AsyncStorage.setItem('1', 'SomeQuestion')
    }
}

// export default DataHelper;