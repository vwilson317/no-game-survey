import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Question } from '../../models/Question';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { updateQuestionText, updateId } from '../questionSet/questionSetSlice';
import QuestionTypeDropDown from './QuestionTypeDropDown';
import { saveQuestion } from '../../data/DataHelper';

interface QuestionItemProps {
  question: Question
}

export default function QuestionItem(props: QuestionItemProps): JSX.Element {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [questionText, setQuestionText] = useState<string>('');
  const dispatch = useDispatch();
  const questionSetId = useSelector((state: any) => state.questionSet.questionSet.Id);
  const question = useSelector((state: any) => state.questionSet.questionSet.Questions.find((x: Question) => x.Id === props.question.Id));
  const [questionId, setQuestionId] = useState<number | undefined>(question?.Id);
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
    const x = { id: props.question.Id, text: questionText } as Question;
    dispatch(updateQuestionText(x));
  }

  const save = async () => {
    const dbQuestion = await saveQuestion(questionSetId, question);
    dispatch(updateId({id: undefined, value: dbQuestion}));
    setQuestionId(dbQuestion.Id);
  }

  // useEffect(() => {
  //   // if (question !== undefined) {
  //   //   setQuestionText(question.Text || '');
  //   // }
  // }, [question.Id]);

  const options = (question: Question) => {
    if (questionId === undefined) {
      console.log(question.Id);
      return (
        <View>
          <TextInput style={styles.txtInput} placeholder='new question...'
            onChangeText={setQuestionText} value={questionText} onBlur={updateQuestion} />
            <QuestionTypeDropDown />
            <Button title="Done" onPress={save} />
        </View>
      )
    }

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
        <RadioGroup radioButtons={mutipleChoiceBtns} onPress={setSelectedId} selectedId={selectedId} />
      )
    }
    if (question.Type === 'FillInTheBlank') {
      return (
        <TextInput style={styles.txtInput} />
      )
    }
  }

  return (
    <View style={styles.container}>
      {question?.Type !== undefined ? <Text>{question?.Text}</Text> : <></>}
      {options(question)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // direction: 'rtl'
  },
  txtInput: {
    borderColor: 'gray',
    borderWidth: 1,
  }
});