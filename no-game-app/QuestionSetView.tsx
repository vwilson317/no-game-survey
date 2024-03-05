import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import QuestionItem from "./QuestionItem";

const QuestionSetView = (props: any) => {
    // const [questions, setQuestions] = useState(props.data);

    return(
        <View>
            <Text>{props.questionSet?.Name}</Text>
            <FlatList data={props.questionSet?.Questions}
            renderItem={({item}) => <QuestionItem data={item}/>} />
        </View>
    );
}

export default QuestionSetView;