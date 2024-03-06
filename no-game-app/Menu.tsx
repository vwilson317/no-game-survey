import React, { ReactHTMLElement } from 'react';
import { Button, FlatList, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getMenuItems } from './DataHelper';
import { Question } from './question';
import { useDispatch } from 'react-redux';
import { change } from './feature/questionSet/questionSetSlice';
import { get } from './DataHelper';

interface MenuProps {
    // define your props here
}

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
    const dispatch = useDispatch();
    const [questionSets, setQuestionSets] = useState([{} as Question]);

    const getQuestions = async () => {
        let questionSet = await getMenuItems();
        setQuestionSets(questionSet);
    }

    useEffect(() => {
        getQuestions()
    }, []);

    const onPress = (id: number) => {
        console.log('Menu.onPress: ' + id);
        get(id).then((questionSet) => {
            dispatch(change(questionSet[0]));
        });
    };

    return (
        <View>
            <FlatList
                data={questionSets}
                renderItem={({ item }) => <Button title={item.Name} onPress={() => onPress(item.Id)} />}>
            </FlatList>
        </View>
    );
}

export default Menu;