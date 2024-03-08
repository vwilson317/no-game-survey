import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import QuestionItem from "../question/QuestionItem";
import { Question } from "../../models/Question";
import { addQuestion, addQuestionSets, update } from "./questionSetSlice";
import { useDispatch } from "react-redux";
import { saveQuestionSet } from '../../data/DataHelper';
import { QuestionSet } from "../../models/QuestionSet";

const QuestionSetView = (props: any) => {
    // const [questions, setQuestions] = useState(props.data);
    const [showAddBtn, setShowAddBtn] = useState(true);
    const [questionSetName, setQuestionSetName] = useState(props.questionSet?.Name || 'New Question Set' as string);
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

    const onNameBlur = async () => {
        const x = { Name: questionSetName } as QuestionSet;
        const dbQuestionSet = await saveQuestionSet(x);
        dispatch(update({id: dbQuestionSet.Id, name: questionSetName}));
        dispatch(addQuestionSets([dbQuestionSet]));
    }

    return(
        <>
            {props.questionSet?.Id !== undefined ? <Text>{props.questionSet?.Name}</Text> 
                : <TextInput value={questionSetName} onChangeText={setQuestionSetName} autoFocus onBlur={onNameBlur}/>}
            <FlatList data={props.questionSet?.Questions}
            renderItem={({item}) => <QuestionItem question={item}/>} />
            {showAddBtn ? <Button title="Add Question" onPress={addQuestionClick} /> : <></>}
        </>
    );
}

export default QuestionSetView;