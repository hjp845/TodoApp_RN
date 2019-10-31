import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import {AntDesign} from "@expo/vector-icons";

export default function Listitem({name, isComplete, changeComplete, deleteItem}) {
  return (
    <View style={styles.listitembox}>
        <View style={styles.makerow}>
            <TouchableOpacity onPress={changeComplete}>
                <AntDesign name={isComplete? "checkcircle":"frowno"} size={20} style={styles.checkmargin}/>
            </TouchableOpacity>
            <Text style={styles.item}>{name}</Text>
        </View>        
        <TouchableOpacity onPress={deleteItem}>
          <AntDesign name="close" size={20} />
        </TouchableOpacity>
    </View>
  );
};

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    listitembox: {
        borderBottomWidth: 1,
        padding: 5,
        marginTop: 5,
        width: width - 90,
        flexDirection:"row",
        alignItems: "center", // flexDirection이 row일 때 이거 쓰면 세로 정렬이다. (원래 가로정렬)
        justifyContent: "space-between",
    },
    item: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    makerow: {
        flexDirection: "row",
    },
    checkmargin: {
        marginRight: 10,
    }
})