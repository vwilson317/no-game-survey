import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { get } from './DataHelper.tsx';
import QuestionView from './QuestionView.tsx';

// const dataHelper = new DataHelper();

export default function App() {
  const [questionSet, setQuestionSets] = useState([]);

  const getQuestions = async () => {
    let item = await get(1);
    setQuestionSets(item);
  }

  useEffect(() => {
    getQuestions()
  }, []);

  // const questionsDom = questions.map((questionJson) => {

  // })
  return (
    <View style={styles.container}>
      <QuestionView questionSet={questionSet}/>
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
