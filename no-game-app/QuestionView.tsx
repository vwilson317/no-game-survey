import { useState } from "react";
import { FlatList, Text, View } from "react-native";

const QuestionView = (props: any) => {
    // const [questions, setQuestions] = useState(props.data);
    return(
        <View>
            <Text>{props.questionSet.Name}</Text>
            <FlatList data={props.questionSet.Questions}
            renderItem={({item}) => <Text>{item.Text}</Text>}/>
        </View>
        // <Text>Question view component</Text>
    );
}

export default QuestionView;