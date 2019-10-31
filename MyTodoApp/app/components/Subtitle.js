import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Subtitle({title}) {
  return (
    <View style={styles.subcontainer}>
      <Text style={styles.subtext}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    subcontainer: {
      marginTop: 50,
      marginBottom: 10,
    },
    subtext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3f4e66',
    },
  });