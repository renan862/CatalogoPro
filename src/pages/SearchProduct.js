import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SearchProduct = () => {
  const [nome, setNome] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [apiUrl, setApiUrl] = useState('');

  const navigation = useNavigation();

  const handleBuscar = async () => {
    if (!apiUrl) {
      Alert.alert('Erro', 'A URL da API não está configurada.');
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/buscar/produtos`, {
        params: { nome }
      });

      if (response.status === 200) {
        setProdutos(response.data.data);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os produtos.');
      }
    } catch (error) {
      console.error('Erro ao realizar a chamada API:', error);
      Alert.alert('Erro', `Ocorreu um erro ao buscar os produtos: ${error.message}`);
    }
  };

  useEffect(() => {
    const loadApiUrl = async () => {
      try {
        const savedIp = await AsyncStorage.getItem('@app_ip');
        if (savedIp !== null) {
          setApiUrl(`http://${savedIp}:3000`);
        }
      } catch (error) {
        console.error('Failed to load API URL from storage', error);
      }
    };

    loadApiUrl();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={require('./../../assets/fundo4.jpg')}
          style={styles.backgroundImage}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o nome do produto"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>

        <FlatList
          data={produtos}
          renderItem={({ item }) => (
            <View style={styles.produtoItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.textStyle}>Codigo: {item.id}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AlterProduct', {
                      id: item.id,
                      nome: item.nome,
                      ean: item.ean,
                      preco: item.preco,
                      custo: item.custo,
                      url: item.url,
                      descricao: item.descricao,
                    });
                  }}
                >
                  <Image
                    source={require('./../../assets/editar.png')}
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textStyle}>Nome: {item.nome}</Text>
              <Text style={styles.textStyle}>EAN13: {item.ean}</Text>
              <Text style={styles.textStyle}>Preço: {item.preco}</Text>
              <Text style={styles.textStyle}>Custo: {item.custo}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  produtoItem: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
  },
  textStyle: {
    color: 'black',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '80%',
    height: '5%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default SearchProduct;
