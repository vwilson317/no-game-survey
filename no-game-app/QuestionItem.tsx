import { Text, View , StyleSheet, TextInput, Button} from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Question } from './question';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { updateQuestionText } from './feature/questionSet/questionSetSlice';

interface QuestionItemProps {
  question: Question
}

export default function QuestionItem(props: QuestionItemProps): JSX.Element {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [multSelectedId, setMultSelectedId] = useState<string | undefined>();
  const [questionText, setQuestionText] = useState<string>('');
  // const [question, setQuestion] = useState<Question>(props.question);
  const dispatch = useDispatch();

  const yesNoBtns: RadioButtonProps[] = useMemo(() => ([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Yes',
      value: '1'
    },
    {
      id: '2',
      label: 'No',
      value: '0'
    }
  ]), []);

  const updateQuestion = () => {
    dispatch(updateQuestionText({id: props.question.Id, text: questionText}));
  } 

  const options = (question: Question) => {
    if (question.Type === 'YesOrNo') {
      return (
        <RadioGroup radioButtons={yesNoBtns} onPress={setSelectedId} selectedId={selectedId} />
      )
    }
    if (question.Type === 'MutipleChoice') {
      const optionStrs: string[] | undefined = question.Text?.split("?")[1].split(" ");
      optionStrs?.shift();
      const mutipleChoiceBtns: RadioButtonProps[] = optionStrs?.map((option: string, index: number) => {
        return {
          id: index.toString(),
          label: option,
          value: option
        }
      }) || [];

      return (
        <RadioGroup radioButtons={mutipleChoiceBtns} onPress={setMultSelectedId} selectedId={multSelectedId} />
      )
    }
    if(question.Type === 'FillInTheBlank'){
      return (
        <TextInput style={styles.txtInput}/>
      )
    }
    if(question.Type === undefined){
      return (
        <TextInput style={styles.txtInput} placeholder='new question...' 
        onChangeText={setQuestionText} value={questionText} onBlur={updateQuestion}/>
      )
    }
  }

  return (
    <View style={styles.container}>
      {props.question?.Type !== undefined ? <Text>{props.question?.Text}</Text> : <></>}
      {options(props.question)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      direction: 'rtl'
  },
  txtInput: {
    borderColor: 'gray',
    borderWidth: 1,
  }
});