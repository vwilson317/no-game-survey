import React from 'react';
import { Button, FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getMenuItems } from './DataHelper.tsx';

interface MenuProps {
    // define your props here
}

const Menu: React.FC<MenuProps> = (props) => {
    const [questionSets, setQuestionSets] = useState([{ Name: '' }]);

    const getQuestions = async () => {
        let questionSet = await getMenuItems();
        debugger
        setQuestionSets(questionSet);
    }

    useEffect(() => {
        getQuestions()
    }, []);

    const onPress = () => {
    };
    return (
        <View>
            <FlatList
                data={questionSets}
                renderItem={({ item }) => <Button title={item.Name} onPress={onPress} />}>
            </FlatList>
        </View>
    );
}

export default Menu;