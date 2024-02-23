import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DataHelper } from './DataHelper.tsx';

const dataHelper = new DataHelper();

export default function App() {
  const [data, setData] = useState();

  const getQuestions = async () => {
    let item = await dataHelper.get(1);
    setData(item);
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{data}</Text>
      <Text>Neeeeew code</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
