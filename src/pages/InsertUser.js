import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar o AsyncStorage
import axios from 'axios'; // Importar o axios
import { useNavigation } from '@react-navigation/native';

const InsertUser = ({ navigation }) => {
  //criando os construtores para receber os dados
  //campos da tabela cliente nome, tel, cep, endereco, num, complemento, bairro, referencia
  const [id, aetId] = useState('');
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [num, setNum] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [referencia, setReferencia] = useState('');

  //conexão com o Json, pois é ele que envia os dados para o SQL
  const handleInsert = async () => {
    try {

      const response = await fetch(`${API_IP}/insert/cliente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, tel, cep, endereco, num, complemento, bairro, referencia }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert('Sucesso', data.message);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao inserir os dados.');
      }
    } catch (error) {
      console.error('Erro ao realizar a chamada API:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao inserir os dados.');
    }
  };
// começo da tela
return (  
  
  <View style={styles.container}>

    <Image
                  source={require('./../../assets/fundo4.jpg')}
                  style={styles.backgroundImage}
    />

    <Image
        source={require('./../../assets/adicionar-usuario.png')}
        style={styles.logo}
    />

    <TextInput
      style={styles.input}
      placeholder="Nome"
      placeholderTextColor="#595757"
      value={nome}
      onChangeText={text => setNome(text)}
    />
    <TextInput
  style={styles.input}
  placeholder="Telefone"
  placeholderTextColor="#595757"
  value={tel}
  onChangeText={text => {
    const numericText = text.replace(/[^0-9]/g, '');
    const limitedText = numericText.slice(0, 11);
    setTel(limitedText);
  }}
  keyboardType="numeric" // Define o teclado como numérico
  maxLength={11} // Limita a 8 dígitos
/>

<TextInput
  style={styles.input}
  placeholder="CEP"
  placeholderTextColor="#595757"
  value={cep}
  onChangeText={text => {
    // Use uma expressão regular para remover caracteres não numéricos
    const numericText = text.replace(/[^0-9]/g, '');
    // Limita a 8 dígitos
    const limitedText = numericText.slice(0, 8);
    setCep(limitedText);
  }}
  keyboardType="numeric" // Define o teclado como numérico
  maxLength={8} // Limita a 8 dígitos
/>

    <TextInput
      style={styles.input}
      placeholder="Endereço"
      placeholderTextColor="#595757"
      value={endereco}
      onChangeText={text => setEndereco(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Numero"
      placeholderTextColor="#595757"
      keyboardType="numeric"
      value={num}
      onChangeText={text => setNum(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Complemento"
      placeholderTextColor="#595757"
      value={complemento}
      onChangeText={text => setComplemento(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Bairro"
      placeholderTextColor="#595757"
      value={bairro}
      onChangeText={text => setBairro(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Referencia"
      placeholderTextColor="#595757"
      value={referencia}
      onChangeText={text => setReferencia(text)}
    />
    
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={handleInsert}>
    <Image
        source={require('./../../assets/salvar.png')}
        style={styles.imgButton}
    />
        <Text style={styles.buttonText}>Cadastrar Cliente</Text>
      </TouchableOpacity>


      <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.navigate('SearchUser')}>
    <Image
        source={require('./../../assets/proucurar.png')}
        style={styles.imgButton}
    />
        <Text style={styles.buttonText}>Proucurar</Text>
      </TouchableOpacity>   
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  
    button: {
    marginTop:10,
    width: '40%',
    backgroundColor: '#4287f5',
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
    marginBottom: 50,
  },
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f2f2f2',
},
buttonContainer: {
  flexDirection: 'row', // Organiza os botões na mesma linha
  justifyContent: 'space-evenly', // Espaço igual entre os botões
  width: '90%', },
input: {

  width: '80%',
  height: 35,
  backgroundColor: 'white', // Cor de fundo branca
  borderWidth: 1,
  borderColor: 'gold', // Torna a borda transparente
  borderRadius: 13, // Valor grande para arredondar as bordas
  paddingHorizontal: 15,
  marginBottom: 10,
  shadowColor: '#ffffff', // Cor da sombra
  shadowOpacity: 0.3,  // Opacidade da sombra
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

export default InsertUser;