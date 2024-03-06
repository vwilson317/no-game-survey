import { Text, View , StyleSheet} from 'react-native';
import React, { useState, useMemo } from 'react';
import { Question } from './question';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

export default function QuestionItem(props: any): JSX.Element {

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

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [multSelectedId, setMultSelectedId] = useState<string | undefined>();

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
  }

  return (
    <View style={styles.container}>
      <Text>{props.data.Text}</Text>
      {options(props.data)}
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
});

// export default QuestionItem;