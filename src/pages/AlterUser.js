import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar o AsyncStorage
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Importar o axios

const AlterUser = ({ route, navigation }) => {
  const {
    id,
    nome: initialNome,
    tel: initialTel,
    cep: initialCep,
    endereco: initialEndereco,
    num: initialNum,
    complemento: initialComplemento,
    bairro: initialBairro,
    referencia: initialReferencia,
  } = route.params;

  // Definindo estados para cada campo
  const [nome, setNome] = useState(initialNome);
  const [tel, setTel] = useState(initialTel.toString());
  const [cep, setCep] = useState(initialCep.toString());
  const [endereco, setEndereco] = useState(initialEndereco);
  const [num, setNum] = useState(initialNum.toString());
  const [complemento, setComplemento] = useState(initialComplemento);
  const [bairro, setBairro] = useState(initialBairro);
  const [referencia, setReferencia] = useState(initialReferencia);

  // Função para atualizar os dados do cliente
  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_IP}/update/cliente/${id}`, {
        method: 'PUT', // Use PUT para atualização
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nome, tel, cep, endereco, num, complemento, bairro, referencia }),
      });

      if (response.status === 200) {
        const data = await response.json();
        Alert.alert('Sucesso', data.message);
        // Redirecione para a tela de pesquisa após a atualização
        navigation.navigate('SearchUser');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados.');
      }
    } catch (error) {
      console.error('Erro ao realizar a chamada API:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_IP}/delete/cliente/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        const data = await response.json();
        Alert.alert('Sucesso', data.message);
        // Redirecione para a tela de pesquisa ou qualquer outra tela apropriada após a exclusão
        navigation.navigate('SearchUser');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao excluir o cliente.');
      }
    } catch (error) {
      console.error('Erro ao realizar a chamada API:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir o cliente.');
    }
  };


  return (
    <View style={styles.container}>
      <Image
      source={require('./../../assets/fundo4.jpg')}
      style={styles.backgroundImage}
      />
      <Image
        source={require('./../../assets/editar-user.png')}
        style={styles.logo}
      />

      <TextInput
        style={styles.inputId}
        placeholder="Id"
        value={id.toString()}
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={text => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={tel}
        onChangeText={text => {
          const numericText = text.replace(/[^0-9]/g, '');
          setTel(numericText);
        }}
        keyboardType="numeric"
        maxLength={11}
      />

      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={text => {
          const numericText = text.replace(/[^0-9]/g, '');
          setCep(numericText);
        }}
        keyboardType="numeric"
        maxLength={8}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={text => setEndereco(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        keyboardType="numeric"
        value={num}
        onChangeText={text => setNum(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Complemento"
        value={complemento}
        onChangeText={text => setComplemento(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={text => setBairro(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Referência"
        value={referencia}
        onChangeText={text => setReferencia(text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Image
            source={require('./../../assets/atualizar.png')}
            style={styles.imgButton}
          />
          <Text style={styles.buttonText}>Atualizar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleDelete} >
        <Image
          source={require('./../../assets/excluir.png')}
          style={styles.imgButton}
        />
        <Text style={styles.buttonText}>Excluir</Text>

      </TouchableOpacity>
        {/* Você pode adicionar outros botões aqui, se necessário */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '40%',
    backgroundColor: '#f5aa42',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    flexWrap: 'wrap',
  },
  input: {
    width: '80%',
    height: 35,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 13,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: '#ffffff',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inputId: {
    width: 'auto',
    height: 35,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 13,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: '#ffffff',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Pode ser 'cover' para preencher toda a tela
        position: 'absolute',
        width: '100%',
        height: '100%',
      }
});

export default AlterUser;
