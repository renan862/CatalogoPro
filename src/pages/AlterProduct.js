import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar o AsyncStorage
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Importar o axios

const AlterProduct = ({ route, navigation }) => {
  const { id, nome, ean, preco, custo, url, descricao } = route.params;

  // Definindo estados para cada campo
  const [nomeProduto, setNomeProduto] = useState(nome);
  const [eanProduto, setEanProduto] = useState(ean.toString());
  const [precoProduto, setPrecoProduto] = useState(preco.toString());
  const [custoProduto, setCustoProduto] = useState(custo.toString());
  const [urlImagem, setUrlImagem] = useState(url);
  const [descricaoProduto, setDescricaoProduto] = useState(descricao);

  // Função para atualizar os dados do produto
  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_IP}/update/produto/${id}`, {
        method: 'PUT', // Use PUT para atualização
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          nome: nomeProduto,
          ean: eanProduto,
          preco: precoProduto,
          custo: custoProduto,
          url: urlImagem,
          descricao: descricaoProduto,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        Alert.alert('Sucesso', data.message);
        // Redirecione para a tela de pesquisa após a atualização
        navigation.navigate('SearchProduct');
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
      const response = await fetch(`${API_IP}/delete/produto/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        const data = await response.json();
        Alert.alert('Sucesso', data.message);
        // Redirecione para a tela de pesquisa ou qualquer outra tela apropriada após a exclusão
        navigation.navigate('SearchProduct');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao excluir o produto.');
      }
    } catch (error) {
      console.error('Erro ao realizar a chamada API:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir o produto.');
    }
  };


  return (
    <View style={styles.container}>
    <Image
          source={require('./../../assets/fundo4.jpg')}
          style={styles.backgroundImage}
          />
      <Image
        source={require('./../../assets/editar-produto.png')}
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
        value={nomeProduto}
        onChangeText={text => setNomeProduto(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="EAN"
        value={eanProduto}
        onChangeText={text => {
          const numericText = text.replace(/[^0-9]/g, '');
          setEanProduto(numericText);
        }}
        keyboardType="numeric"
        maxLength={13}
      />

        <TextInput
            style={styles.input}
            placeholder="Preço de Venda"
            value={precoProduto}
            onChangeText={text => {
                // Use uma expressão regular para remover caracteres não numéricos
                const numericText = text.replace(/[^0-9.]/g, '');
                // Limita a 8 dígitos
                const limitedText = numericText.slice(0, 8);
                setPrecoProduto(limitedText);
            }}
            keyboardType="numeric" // Define o teclado como numérico
            maxLength={8} // Limita a 8 dígitos
            />

            <TextInput
            style={styles.input}
            placeholder="Preço de Custo"
            value={custoProduto}
            onChangeText={text => {
                // Use uma expressão regular para remover caracteres não numéricos
                const numericText = text.replace(/[^0-9.]/g, '');
                // Limita a 8 dígitos
                const limitedText = numericText.slice(0, 8);
                setCustoProduto(limitedText);
            }}
            keyboardType="numeric" // Define o teclado como numérico
            maxLength={8} // Limita a 8 dígitos
            />

            <TextInput
              style={styles.input}
              placeholder="URL da Imagem"
              value={urlImagem}
              onChangeText={text => setUrlImagem(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={descricaoProduto}
              onChangeText={text => setDescricaoProduto(text)}
            />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Image
            source={require('./../../assets/atualizar.png')}
            style={styles.imgButton}
          />
          <Text style={styles.buttonText}>Atualizar Produto</Text>
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
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
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
    backgroundColor: '#f5aa42',
    color: 'black',
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

export default AlterProduct;
