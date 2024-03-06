import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { get } from './DataHelper';
import QuestionSetView from './QuestionSetView';
import { QuestionSet } from './QuestionSet';
import Menu from './Menu';
import type { RootState } from './store';
import { store } from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { change } from './feature/questionSet/questionSetSlice';

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
        // const x = useSelector((state: RootState) => state.questionSet.questionSet);
        // setQuestionSets(x);
    }

    useEffect(() => {
        getQuestionSet()
    }, []);

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Menu />
                <QuestionSetView questionSet={questionSet} />
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