import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { get } from './data/DataHelper';
import QuestionSetView from './feature/questionSet/QuestionSetView';
import { QuestionSet } from './models/QuestionSet';
import Menu from './feature/question/Menu';
import type { RootState } from './store';
import { store } from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { change, addQuestion } from './feature/questionSet/questionSetSlice';
import { Question } from './models/Question';

export default function AppEntry() {
    const dispatch = useDispatch();

    const questionSet = useSelector((state: RootState) => state.questionSet.questionSet);
    const getQuestionSet = async () => {
        const result = await get();
        dispatch(change(result));
    }

    useEffect(() => {
        getQuestionSet()
    }, []);

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <QuestionSetView questionSet={questionSet} />
                <Menu />
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
        overflow: 'scroll',
        width: '90%',
    },
});