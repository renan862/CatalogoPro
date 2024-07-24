import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProductListScreen = () => {
  const [nome, setNome] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [apiUrl, setApiUrl] = useState('');

  const handleAdicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, { ...produto, cartId: Date.now() }]);
  };

  const navigation = useNavigation();

  const handleShowCart = () => {
    navigation.navigate('CartScreen', { carrinho, setCarrinho });
  };

  const handleBuscar = async () => {
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
          // Exemplo de URL completa com porta (substitua a porta 3000 pela sua porta)
          setApiUrl(`http://${savedIp}:3000`);
        }
      } catch (error) {
        console.error('Failed to load API URL from storage', error);
      }
    };

    loadApiUrl();
  }, []);

  useEffect(() => {
    if (apiUrl) {
      handleBuscar();
    }
  }, [apiUrl]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer}>
      <Image source={{ uri: item.url }} style={styles.productImage} />
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productDescription}>{item.descricao}</Text>
      <Text style={styles.productPrice}>R${parseFloat(item.preco).toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAdicionarAoCarrinho(item)}
      >
        <Text style={styles.addToCartButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require('./../../assets/promo2.jpg')}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do produto"
        placeholderTextColor="#595757"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleBuscar}>
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />

      <TouchableOpacity style={styles.cartIconContainer} onPress={handleShowCart}>
        <Image source={require('./../../assets/compras.png')} style={styles.cartIcon} />
        <Text style={styles.cartItemCount}>{carrinho.length}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  productContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  productImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    color: 'black',
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    color: 'red',
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    marginTop: 12,
    padding: 8,
    borderRadius: 4,
  },
  addToCartButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
  },
  input: {
    height: 40,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  cartItemCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: "#000",
  },
});

export default ProductListScreen;
