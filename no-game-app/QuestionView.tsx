import { useState } from "react";
import { FlatList, Text, View } from "react-native";

const QuestionView = (props: any) => {
    // const [questions, setQuestions] = useState(props.data);
    return(
        <View>
            <FlatList data={props.data}
            renderItem={({item}) => <Text>{item.Name}</Text>}/>
        </View>
        // <Text>Question view component</Text>
    );
}

export default QuestionView;