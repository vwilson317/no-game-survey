import React, { ReactHTMLElement } from 'react';
import { Button, FlatList, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getMenuItems } from './DataHelper';

interface MenuProps {
    // define your props here
}

const Menu: React.FC<MenuProps> = (props) => {
    const [questionSets, setQuestionSets] = useState([{ Name: '', Id: 0 }]);

    const getQuestions = async () => {
        let questionSet = await getMenuItems();
        setQuestionSets(questionSet);
    }

    useEffect(() => {
        getQuestions()
    }, []);

    const onPress = (id: int) => {
        console.log('Menu.onPress: ' + id);
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