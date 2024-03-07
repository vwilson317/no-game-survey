import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { get } from './DataHelper';
import QuestionSetView from './QuestionSetView';
import { QuestionSet } from './QuestionSet';
import Menu from './Menu';
import type { RootState } from './store';
import { store } from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { change, addQuestion } from './feature/questionSet/questionSetSlice';
import { Question } from './question';

export default function AppEntry() {
    const dispatch = useDispatch();

    const defaultQuestionSet: QuestionSet = {
        Id: 0,
        Name: null,
        LastUpdatedUtc: null,
        Questions: []
    };
    // const [questionSet, setQuestionSets] = useState(defaultQuestionSet);
    const questionSet = useSelector((state: RootState) => state.questionSet.questionSet);
    const getQuestionSet = async () => {
        const result = await get();
        dispatch(change(result));
        setShowAddBtn(true);
    }
    const [showAddBtn, setShowAddBtn] = useState(true);

    const addQuestionClick = () => {
        setShowAddBtn(false);
        dispatch(addQuestion({} as Question));
    }

    // const addQuestionBtn = () => {
    //     if(questionSet?.Questions?.length > 0) {
    //         const lastQuestion = questionSet.Questions[questionSet.Questions.length - 1];
    //         if (lastQuestion?.Id === undefined) {
    //             debugger
    //             setShowAddBtn(false);
    //         }
    //     } 
    // }

    useEffect(() => {
        getQuestionSet()
        console.log(questionSet?.Questions?.length);
        // addQuestionBtn()
    }, []);

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Menu />
                <QuestionSetView questionSet={questionSet} />
                {showAddBtn ? <Button title="Add Question" onPress={addQuestionClick} /> : <></>}
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});