import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native'; //removed Text Button
import Rating from './Rating';
import { Container, Header, Content } from 'native-base';



export default function App() {

  const [texto, setTexto] = useState('');
  const [valores, setValores] = useState(new Object());

  const getSite = () => {

    axios
      .get('https://hn.algolia.com/api/v1/search?query=' + texto)
      .then(function (response) {
        //console.log(response.data);
        setValores(Object.values(response.data)[0])
        //console.log(Object.values(valores)[0]);
        //console.log(Object.values(setValores)[]);
        //console.log(valores[1])
      })
      .catch(function (error) {
        console.log(error.message);
      })
      .finally(function () {
        console.log('final do called');
      })

  }

  const Item = ({ title }) => (
    <View style={styles.item}>
        <Content>
          <Rating rating='1' />
        </Content>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={"Author: " + item.author + "\nTitulo: " + item.title + "\nURL: " + item.url} />
  );

  return (
    <View style={styles.container}>
      <Text></Text>
      <Text></Text>
      <Text>Marlon Duarte - 493408</Text>
      <View style={styles.pesquisa}>
        <View style={styles.busca}>
          <TextInput placeholder='Faça uma busca' onChangeText={texto => setTexto(texto)}></TextInput>
        </View>
        <Button onPress={getSite} title="🔍"></Button>
      </View>
      <FlatList
        data={valores}
        renderItem={renderItem}
        keyExtractor={function (item) {
          return item.title;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  pesquisa: {
    display: "flex",
    flexDirection: "row",
  },
  busca: {
    backgroundColor: '#F0F8FF',
    height: 40,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  item: {
    backgroundColor: '#759eba',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
  },
});
