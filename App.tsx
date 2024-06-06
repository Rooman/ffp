import {StatusBar} from 'expo-status-bar';
import {Image, ImageBackground, SafeAreaView, View} from 'react-native';
import {Asset} from "expo-asset";
import {Text, TextInput} from "react-native-paper";
import {Title} from "@/src/components/Title";
import React, {FC, PropsWithChildren, useReducer, useState} from "react";
import {calculateStatistics} from "@/src/util/calc";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context";
import {SelectList} from "react-native-select-bottom-list";
import {MaterialIcons} from "@expo/vector-icons";

import "./styles.css";

interface Action {
    type: string;
    payload: string | number;

}

const initialState = {
    msAndMedicoverCount: '',
    msClassicCount: '',
    noCardCount: '',
    cardUsages: '',
    courts: '1',
    people: '',
    pricePerHour: '',
    hours: 1,
}

export type StateType = typeof initialState;


export default function App() {

    const [state, dispatch] = useReducer((state: StateType, action: Action) => {
        if (state.hasOwnProperty(action.type)) {
            if (action.payload === "") {
                return {
                    ...state,
                    [action.type]: ''
                }
            }
            if (isNaN(Number(action.payload))) {
                return state;
            }
            return {
                ...state,
                [action.type]: Number(action.payload)
            }
        }
        return state;
    }, initialState);

    const statistics = calculateStatistics(state);

    const [courtsCountString, setCourtsCountString] = useState('1');
    const [hoursCountString, setHoursCountString] = useState('1');

    function updateCourts(stringValue: string) {
        const courtsCount = stringValue.split(' ')[0];
        setCourtsCountString(courtsCount);
        dispatch({
            type: 'courts',
            payload: courtsCount
        })
    }

    function updateHours(stringValue: string) {
        const hoursCount = stringValue.split(' ')[0];
        setHoursCountString(hoursCount);
        dispatch({
            type: 'hours',
            payload: hoursCount
        })
    }


    return (
        <View className={'h-full bg-[#221d37] w-full'}>
        <View className={"h-full mx-auto outline outline-[#4D4D9F]" }>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <StatusBar style={'light'}/>
                <BottomSheetModalProvider>
                    <ImageBackground
                        style={{flex: 1, width:'100%', height: '100%'}}
                        source={ require('./assets/bg.png')}
                    >
                        <View className={"h-full px-4 pt-4  min-h-[740px]"}>

                            <ContentRow>
                                <View className={'w-[48%] '}>
                                    <Title>Courts</Title>
                                    <SelectList
                                        renderIcon={() => <MaterialIcons name="keyboard-arrow-down" size={24}
                                                                         color="#E0E1E4"/>}
                                        style={{
                                            backgroundColor: '#241e2f',
                                            marginTop: 8,
                                            height: 44,
                                            borderColor: '#4D4D9F',
                                            borderRadius: 8
                                        }}

                                        headerTextStyle={{textAlign:'center'}}
                                        headerStyle={{paddingTop:4}}


                                        textStyle={{color: '#E0E1E4'}}
                                        onSelect={(item, index) => updateCourts(item)}
                                        value={courtsCountString}
                                        data={[
                                            '1 court', '2 courts', '3 courts', '4 courts', '5 courts'
                                        ]}
                                        headerTitle={'Courts'}
                                    />
                                </View>
                                <CommonInput title={'People'} value={state.people}
                                             onChangeText={(text: string) => dispatch({
                                                 type: 'people',
                                                 payload: text
                                             })}/>
                            </ContentRow>

                            <ContentRow>
                                <CommonInput title={'Price per 1h'} value={state.pricePerHour}
                                             onChangeText={(text: string) => dispatch({
                                                 type: 'pricePerHour',
                                                 payload: text
                                             })}/>
                                <View className={'w-[48%] '}>
                                    <Title>Hours</Title>
                                    <SelectList
                                        renderIcon={() => <MaterialIcons name="keyboard-arrow-down" size={24}
                                                                         color="#E0E1E4"/>}
                                        style={{
                                            backgroundColor: '#241e2f',
                                            marginTop: 8,
                                            height: 44,
                                            borderColor: '#4D4D9F',
                                            borderRadius: 8
                                        }}

                                        headerTextStyle={{textAlign:'center'}}
                                        headerStyle={{paddingTop:4}}
                                        textStyle={{color: '#E0E1E4'}}
                                        onSelect={(item, index) => updateHours(item)}
                                        value={hoursCountString}
                                        data={[
                                            '1 hour', '1.5 hours', '2 hours', '2.5 hours', '3 hours',
                                            '3.5 hours', '4 hours'
                                        ]}
                                        headerTitle={'Hours'}
                                    />
                                </View>

                            </ContentRow>

                            <Text variant="titleMedium"  style={{color:'white'}} className={'mt-6 text-white'}>Number of people</Text>

                            <ContentRow>
                                {/*<CommonInput title={'MS+/MC'} value={state.msAndMedicoverCount}*/}
                                {/*             onChangeText={(text: string) => dispatch({*/}
                                {/*                 type: 'msAndMedicoverCount',*/}
                                {/*                 payload: text*/}
                                {/*             })}/>*/}

                                {/*<CommonInput title={'MS classic'} value={state.msClassicCount}*/}
                                {/*             onChangeText={(text: string) => dispatch({*/}
                                {/*                 type: 'msClassicCount',*/}
                                {/*                 payload: text*/}
                                {/*             })}/>*/}

                            </ContentRow>

                            <ContentRow>
                                <CommonInput title={'No card'} value={state.noCardCount}
                                             onChangeText={(text: string) => dispatch({
                                                 type: 'noCardCount',
                                                 payload: text
                                             })}/>
                                
                                <CommonInput title={'Card usage'} value={state.cardUsages}
                                             onChangeText={(text: string) => dispatch({
                                                 type: 'cardUsages',
                                                 payload: text
                                             })}/>


                            </ContentRow>

                            <View className={'flex flex-row py-6 overflow-hidden'}>
                                {/*<Image*/}
                                {/*    resizeMethod={'resize'}*/}
                                {/*    style={{width: '100%'}}*/}
                                {/*    source={require('@/assets/divider.png')}*/}
                                {/*/>*/}
                            </View>


                            <ResultRow title={'MS+/MC:'} value={statistics.msAndMedicover}/>
                            <ResultRow title={'MS classic:'} value={statistics.msClassic}/>
                            <ResultRow title={'No card:'} value={statistics.noMs}/>
                            <ResultRow title={'Total w/o discount:'} value={statistics.totalPrice}/>
                            <ResultRow title={'Discount:'} value={statistics.discount}/>
                            <ResultRow title={'Total:'} value={statistics.priceAfterDiscount}/>


                        </View>

                    </ImageBackground>
                </BottomSheetModalProvider>
            </SafeAreaProvider>
        </View>
        </View>
    );
}


const ResultRow = ({title, value}: { title: string, value: string | number }) => {
    return <View className={'flex flex-row justify-between mb-3'}>
        <Text variant="titleSmall" className={'text-[#E0E1E4]'}>{title}</Text>
        <Text variant="titleSmall" className={'text-[#E0E1E4]'}>{value ? value + ' PLN' : '—'}</Text>
    </View>

}

const ContentRow: FC<PropsWithChildren> = ({children}) => {
    return (<View className={'flex flex-row justify-between mt-4 '}>
        {children}
    </View>)
}

const CommonInput = ({title, value, onChangeText}: {
    title: string,
    value: any,
    onChangeText: (text: string) => void
}) => {
    return <View className={"w-[30%]"}>
        <Title>{title}</Title>

        <TextInput
            placeholder={""}
            theme={{roundness: 8, colors: { background:'#241e2f'}}}
            className={"bg-[#241e2f] max-h-[44px] h-[44px] mt-2 rounded-lg p-0"}
            contentStyle={{color: "#E0E1E4", padding: 0, maxWidth: '100%'}}
            outlineStyle={{borderColor: "#4D4D9F"}}
            style={{padding: 0, height:44}}
            keyboardType={"numeric"}
            value={value.toString()}
            textAlign={"left"}
            mode={"outlined"}
            onChangeText={onChangeText}
        />
    </View>;
}
