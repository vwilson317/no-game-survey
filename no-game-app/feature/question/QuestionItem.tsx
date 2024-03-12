import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Question } from '../../models/Question';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { updateQuestionText, updateQuestionId } from '../questionSet/questionSetSlice';
import QuestionTypeDropDown from './QuestionTypeDropDown';
import { saveQuestion } from '../../data/DataHelper';

interface QuestionItemProps {
  question: Question,
  index: number
}

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export default function QuestionItem(props: QuestionItemProps): JSX.Element {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [questionText, setQuestionText] = useState<string>('');
  const dispatch = useDispatch();
  const questionSetId = useSelector((state: any) => state.questionSet.questionSet.Id);
  const question = useSelector((state: any) => state.questionSet.questionSet.Questions.find((x: Question) => x.Id === props.question.Id));
  const [questionId, setQuestionId] = useState<number | undefined>(question?.Id);
  const inputRef = useRef(null);
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
    dispatch(updateQuestionId({ id: undefined, value: dbQuestion }));
    setQuestionId(dbQuestion.Id);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const options = (question: Question) => {
    if (questionId === undefined) {
      console.log(question.Id);
      return (
        <View>
          <TextInput ref={inputRef} style={styles.txtInput} placeholder='new question...'
            onChangeText={setQuestionText} value={questionText} onBlur={updateQuestion} />
          <QuestionTypeDropDown />
          <Button onPress={save}>
            Done
          </Button>
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
        <TextInput />
      )
    }
  }

  return (
    // <View style={styles.container} key={props.index}>
    <Card>
      <Card.Title title={question?.Text} />
      <Card.Content>
        {options(question)}
      </Card.Content>
    </Card>
    // </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  //   // direction: 'rtl'
  // },
  // txtInput: {
  //   borderColor: 'gray',
  //   borderWidth: 1,
  // }
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  // image: {
  //   width: ITEM_WIDTH,
  //   height: 300,
  // },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20
  }
});