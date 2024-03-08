import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import QuestionItem from "../question/QuestionItem";
import { Question } from "../../models/Question";
import { addQuestion } from "./questionSetSlice";
import { useDispatch } from "react-redux";

const QuestionSetView = (props: any) => {
    // const [questions, setQuestions] = useState(props.data);
    const [showAddBtn, setShowAddBtn] = useState(true);
    const dispatch = useDispatch();
    const addQuestionClick = () => {
        setShowAddBtn(false);
        dispatch(addQuestion({} as Question));
    }
    useEffect(() => {
        if(props.questionSet?.Questions?.length > 0) {
            const lastQuestion = props.questionSet.Questions[props.questionSet.Questions.length - 1];
            if (lastQuestion?.Id === undefined) {
                setShowAddBtn(false);
            }
            else{
                setShowAddBtn(true);
            }
        }
        else{
            setShowAddBtn(true);
        }
    });
    return(
        <>
            <Text>{props.questionSet?.Name}</Text>
            <FlatList data={props.questionSet?.Questions}
            renderItem={({item}) => <QuestionItem question={item}/>} />
            {showAddBtn ? <Button title="Add Question" onPress={addQuestionClick} /> : <></>}
        </>
    );
}

export default QuestionSetView;