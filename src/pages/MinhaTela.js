import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const MinhaTela = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seja Bem Vindo</Text>

      <Image
              source={require('./../../assets/fundo3.jpg')}
              style={styles.backgroundImage}
            />

      <Image
        style={styles.image}
       source={require('./../../assets/caixa.png')}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductListScreen')}
      >
        <Image
        source={require('./../../assets/aplicativo-movel.png')}
        style={styles.imgButton}
    />
        <Text style={styles.buttonText}>Tela de Venda</Text>
      </TouchableOpacity>

       <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PaymentScreen')}
            >
              <Image
              source={require('./../../assets/addcart.png')}
              style={styles.imgButton}
          />
              <Text style={styles.buttonText}>Tela de Pagamento</Text>
       </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('InsertUser')}
        
      >
        <Image
        source={require('./../../assets/adicionar-usuario.png')}
        style={styles.imgButton}
    />
        <Text style={styles.buttonText}>Cadastro de Clientes</Text>
      </TouchableOpacity>   

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('InsertProduct')}
      >
        <Image
        source={require('./../../assets/adicionar-pacote.png')}
        style={styles.imgButton}
    />
        <Text style={styles.buttonText}>Cadastro de Produto</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Config')}
            >
              <Image
              source={require('./../../assets/editar.png')}
              style={styles.imgButton}
          />
              <Text style={styles.buttonText}>Configurações</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
    
  },
  button: {
    backgroundColor: '#4287f5',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row', // Coloca os elementos na mesma linha
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    
  },
  imgButton:{
    
    //marginBottom: 2,
    width: 30, // Ajuste o tamanho da imagem conforme necessário
    height: 30, // Ajuste o tamanho da imagem conforme necessário
    marginRight: 25, 
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // Pode ser 'cover' para preencher toda a tela
      position: 'absolute',
      width: '100%',
      height: '100%',
    }
});

export default MinhaTela;
