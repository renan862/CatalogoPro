import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SearchUser = () => {
  const [nome, setNome] = useState('');
  const [clientes, setClientes] = useState([]);  // Estado correto
  const [apiUrl, setApiUrl] = useState('');

  const navigation = useNavigation();

  const handleBuscar = async () => {
    if (!apiUrl) {
      Alert.alert('Erro', 'A URL da API não está configurada.');
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/buscar/cliente`, {
        params: { nome }
      });

      if (response.status === 200) {
        setClientes(response.data.data);  // Utilizando o estado correto
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os clientes.');
      }
    } catch (error) {
      console.error('Erro ao realizar a chamada API:', error);
      Alert.alert('Erro', `Ocorreu um erro ao buscar os clientes: ${error.message}`);
    }
  };

  // Adicionando o useEffect para carregar a URL da API a partir do AsyncStorage
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
          placeholder="Digite o nome do cliente"
          placeholderTextColor="#595757"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>

        <FlatList
          data={clientes}
          renderItem={({ item }) => (
            <View style={styles.clienteItem}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.textStyle}>Codigo: {item.id}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AlterUser', {
                      id: item.id,
                      nome: item.nome,
                      tel: item.tel,
                      cep: item.cep,
                      endereco: item.endereco,
                      num: item.num,
                      complemento: item.complemento,
                      bairro: item.bairro,
                      referencia: item.referencia,
                    });
                  }}
                >
                  <Image
                    source={require('./../../assets/editar.png')}
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textStyle}>Telefone: {item.tel}</Text>
              <Text style={styles.textStyle}>Nome: {item.nome}</Text>
              <Text style={styles.textStyle}>Endereço: {item.endereco}</Text>
              <Text style={styles.textStyle}>Bairro: {item.bairro}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  clienteItem: {
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
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',
  },
  textbottom: {
    color: '#111',
    fontSize: 18,
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
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
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

export default SearchUser;
