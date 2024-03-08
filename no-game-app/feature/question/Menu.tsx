import React, { ReactHTMLElement } from 'react';
import { Button, FlatList, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getMenuItems } from '../../data/DataHelper';
import { Question } from '../../models/Question';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestionSets, change } from '../questionSet/questionSetSlice';
import { get } from '../../data/DataHelper';

interface MenuProps {
    // define your props here
}

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
    const dispatch = useDispatch();
    // const [questionSets, setQuestionSets] = useState([{} as Question]);
    // const questionSet = useSelector((state: any) => state.questionSet.questionSet);
    // const [newQuestionClicked, setNewQuestionClicked] = useState(false);
    const questionSets = useSelector((state: any) => state.questionSet.questionSetsAvailable);

    useEffect(() => {
    }, [questionSets]);

    const onPress = (id: number) => {
        console.log('Menu.onPress: ' + id);

        get(id).then((questionSet) => {
            dispatch(change(questionSet[0]));
        });
    };

    const addQuestionSet = async () => {
        const newQuestionSet = { Id: undefined, Name: 'New Question Set', Questions: [] } as Question;
        dispatch(change(newQuestionSet));
        // setNewQuestionClicked(true);
        // questionSets.push(questionSet);
    };

    return (
        <View>
            <FlatList
                data={questionSets}
                renderItem={({ item }) => <Button title={item.Name} onPress={() => onPress(item.Id)} />}>
            </FlatList>
            <Button title="Add Question Set" onPress={addQuestionSet} />
        </View>
    );
}

export default Menu;