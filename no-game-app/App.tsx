import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { get } from './DataHelper.tsx';
import QuestionSetView from './QuestionSetView.tsx';
import { QuestionSet } from './QuestionSet.tsx';

// const dataHelper = new DataHelper();

export default function App() {
  const defaultQuestionSet: QuestionSet = {
    Id: 0,
    Name: null,
    LastUpdatedUtc: null,
    Questions: []
  };
  const [questionSet, setQuestionSets] = useState(defaultQuestionSet);

  const getQuestions = async () => {
    let questionSet = await get(1);
    setQuestionSets(questionSet);
  }

  useEffect(() => {
    getQuestions()
  }, []);

  // const questionsDom = questions.map((questionJson) => {

  // })
  return (
    <View style={styles.container}>
      <QuestionSetView questionSet={questionSet}/>
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
