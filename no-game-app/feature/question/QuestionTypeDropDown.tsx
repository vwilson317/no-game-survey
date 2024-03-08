import { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestionType } from "../questionSet/questionSetSlice";

interface TypeProps {
}

export default function QuestionTypeDropDown(props: TypeProps){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Fill In The Blank', value: 'FillInTheBlank'},
      {label: 'Multiple Choice', value: 'MultipleChoice'},
      {label: 'Yes or No', value: 'YesOrNo'},
      {label: 'Environmental', value: 'Enviromental'},
    ]);
    const dispatch = useDispatch();
    // const questionSetId = useSelector((state: any) => state.questionSet.questionSet.Id);

    const onTypeChange = (newVal: string | null) => {
        dispatch(updateQuestionType({id: undefined, value: newVal}));
    };

    return (
        <View>
            <DropDownPicker 
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  onChangeValue={onTypeChange}            
            />
        </View>
    );
}