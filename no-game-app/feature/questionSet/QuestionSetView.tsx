import { useEffect, useRef, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import QuestionItem, { ITEM_WIDTH, SLIDER_WIDTH } from "../question/QuestionItem";
import { Question } from "../../models/Question";
import { addQuestion, addQuestionSets, update } from "./questionSetSlice";
import { useDispatch } from "react-redux";
import { saveQuestionSet } from '../../data/DataHelper';
import { QuestionSet } from "../../models/QuestionSet";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const QuestionSetView = (props: any) => {
    // const [questions, setQuestions] = useState(props.data);
    const [showAddBtn, setShowAddBtn] = useState(true);
    const [questionSetName, setQuestionSetName] = useState(props.questionSet?.Name || 'New Question Set' as string);
    const dispatch = useDispatch();
    const addQuestionClick = () => {
        setShowAddBtn(false);
        dispatch(addQuestion({} as Question));
    }
    const [index, setIndex] = useState(0)
    const isCarousel = useRef(null)

    useEffect(() => {
        if (props.questionSet?.Questions?.length > 0) {
            const lastQuestion = props.questionSet.Questions[props.questionSet.Questions.length - 1];
            if (lastQuestion?.Id === undefined) {
                setShowAddBtn(false);
            }
            else {
                setShowAddBtn(true);
            }
        }
        else {
            setShowAddBtn(true);
        }
    });

    const onNameBlur = async () => {
        const x = { Name: questionSetName } as QuestionSet;
        const dbQuestionSet = await saveQuestionSet(x);
        dispatch(update({ id: dbQuestionSet.Id, name: questionSetName }));
        dispatch(addQuestionSets([dbQuestionSet]));
        addQuestionClick();
    }

    return (
        <>
            {props.questionSet?.Id !== undefined ? <Text>{props.questionSet?.Name}</Text>
                : <TextInput value={questionSetName} onChangeText={setQuestionSetName} autoFocus onBlur={onNameBlur} />}
            <Carousel
                layout="tinder"
                layoutCardOffset={9}
                ref={isCarousel}
                data={props.questionSet?.Questions}
                renderItem={({ item }) => <QuestionItem question={item} />}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={props.questionSet?.Questions?.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />

            {showAddBtn ? <Button title="Add Question" onPress={addQuestionClick} /> : <></>}
        </>
    );
}

export default QuestionSetView;