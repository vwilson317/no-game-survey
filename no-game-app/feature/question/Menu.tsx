import React, { ReactHTMLElement } from 'react';
import { Button, FlatList, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getMenuItems } from '../../data/DataHelper';
import { Question } from '../../models/Question';
import { useDispatch } from 'react-redux';
import { change } from '../questionSet/questionSetSlice';
import { get } from '../../data/DataHelper';

interface MenuProps {
    // define your props here
}

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
    const dispatch = useDispatch();
    const [questionSets, setQuestionSets] = useState([{} as Question]);

    const getMenu = async () => {
        const menuQuestionSets = await getMenuItems();
        setQuestionSets(menuQuestionSets);
    }

    useEffect(() => {
        getMenu()
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
            <Button title="Add Question Set" onPress={() => console.log('Add Question Set')} />
        </View>
    );
}

export default Menu;