import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import QuestionItem from "./QuestionItem";
import Menu from "./Menu.tsx";

const QuestionSetView = (props: any) => {
    debugger
    // const [questions, setQuestions] = useState(props.data);
    return(
        <View>
            <Text>{props.questionSet?.Name}</Text>
            <FlatList data={props.questionSet?.Questions}
            renderItem={({item}) => <QuestionItem data={item}/>} />
            
            <Menu />
        </View>
    );
}

export default QuestionSetView;