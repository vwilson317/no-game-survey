import {Text} from 'react-native';

export default function QuestionItem (props: any): JSX.Element {
  return (
    <Text>{props.data.Text}</Text>
  )
}

// export default QuestionItem;